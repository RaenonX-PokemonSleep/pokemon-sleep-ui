import {getActivationPropertiesByContact} from '@/controller/user/activation/util';
import {ActionSendActivationPayload} from '@/handler/action/activation/type';
import {getPatreonMember} from '@/handler/shared/patreon/api/member/main';
import {ActivationStatus} from '@/types/mongo/activation';
import {ActivationPresetLookup} from '@/types/mongo/activationPreset';
import {PatreonMember} from '@/types/subscription/patreon/common/member';
import {isPatronActive} from '@/utils/external/patreon';
import {getActivationExpiryFromPatreon} from '@/utils/user/activation/utils';


type GetActivationFromPatreonMemberOpts = {
  email: string,
  member: PatreonMember,
  presetLookup: ActivationPresetLookup,
};

export const getActivationFromPatreonMember = ({
  email,
  member,
  presetLookup,
}: GetActivationFromPatreonMemberOpts): ActivationStatus | null => {
  const activeTier = member.relationships.currently_entitled_tiers.data.at(0);
  if (!activeTier) {
    /* eslint-disable no-console */
    console.log(`User of ${email} on Patreon does not seem to have entitled tiers`);
    /* eslint-enable no-console */

    return null;
  }

  const activation = presetLookup[activeTier.id];
  if (!activation) {
    console.warn(
      `Tier ID ${activeTier.id} is on user of ${email} on Patreon, but no associated activation configured`,
    );

    return null;
  }

  return activation.activation;
};

export const toActivationPayloadFromPatreon = async (
  opts: Omit<GetActivationFromPatreonMemberOpts, 'email'>,
): Promise<ActionSendActivationPayload> => {
  const {member} = opts;
  const {id, attributes} = member;
  const {email} = attributes;

  if (!isPatronActive(member)) {
    return {contact: email, email, activationProperties: null};
  }

  const memberData = await getPatreonMember({userId: id});

  const social = memberData.included[0].attributes.social_connections;
  const existedActivationProperties = (await getActivationPropertiesByContact({
    source: 'patreon',
    contact: email,
  }));

  /* eslint-disable no-console */
  console.log(`>>> Converting Patreon member of ${id} (${email}) to activation payload`);
  if (existedActivationProperties) {
    console.log(
      `Existing activation properties of ${email} on Patreon:`,
      JSON.stringify(existedActivationProperties),
    );
  }
  /* eslint-enable no-console */

  const activation = getActivationFromPatreonMember({email, ...opts});
  if (!activation) {
    return {contact: email, email, activationProperties: null};
  }

  return {
    contact: email,
    email,
    activationProperties: {
      ...existedActivationProperties,
      expiry: getActivationExpiryFromPatreon(member),
      activation,
      source: 'patreon',
      contact: {
        // Keep the existed ones except `patreon` to make sure the reference used for polling is correct
        ...existedActivationProperties?.contact,
        patreon: email,
        ...(social?.discord && {discord: social.discord.user_id}),
      },
      note: '',
    },
  };
};
