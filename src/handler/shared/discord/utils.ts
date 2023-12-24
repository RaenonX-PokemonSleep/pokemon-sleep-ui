import {getActivationPropertiesByContact} from '@/controller/user/activation/util';
import {ActionSendActivationPayload} from '@/handler/action/activation/type';
import {ActivationStatus} from '@/types/mongo/activation';
import {ActivationPresetLookup} from '@/types/mongo/activationPreset';
import {DiscordSubscriber} from '@/types/subscription/discord/data';
import {toDiscordSubscriberInfo} from '@/utils/external/discord';
import {getActivationExpiryOfDefault} from '@/utils/user/activation/utils';


type GetActivationFromDiscordSubscriberOpts = {
  member: DiscordSubscriber,
  presetLookup: ActivationPresetLookup,
};

export const getActivationFromDiscordSubscriber = ({
  member,
  presetLookup,
}: GetActivationFromDiscordSubscriberOpts): ActivationStatus | null => {
  const {roleId} = member;

  const activation = presetLookup[roleId];
  if (!activation) {
    console.warn(
      `Role ID ${roleId} on user ${toDiscordSubscriberInfo(member)} on Discord without associated activation`,
    );

    return null;
  }

  return activation.activation;
};

export const toActivationPayloadFromDiscord = async (
  opts: GetActivationFromDiscordSubscriberOpts,
): Promise<ActionSendActivationPayload> => {
  const {member} = opts;
  const {userId} = member;

  const existedActivationProperties = (await getActivationPropertiesByContact({
    source: 'discord',
    contact: userId,
  }));

  /* eslint-disable no-console */
  console.log(`>>> Converting Discord member of ${toDiscordSubscriberInfo(member)} to activation payload`);
  if (existedActivationProperties) {
    console.log(
      `Existing activation properties of ${toDiscordSubscriberInfo(member)} on Discord:`,
      JSON.stringify(existedActivationProperties),
    );
  }
  /* eslint-enable no-console */

  let activation = existedActivationProperties?.activation ?? null;
  if (!existedActivationProperties?.isActivationLocked) {
    activation = getActivationFromDiscordSubscriber(opts);
  }

  if (!activation) {
    return {contact: userId, email: null, activationProperties: null};
  }

  return {
    contact: userId,
    email: null,
    activationProperties: {
      ...existedActivationProperties,
      expiry: getActivationExpiryOfDefault(),
      activation,
      source: 'discord',
      contact: {
        // Keep the existed ones except `discord` to make sure the reference used for polling is correct
        ...existedActivationProperties?.contact,
        discord: userId,
      },
      note: '',
    },
  };
};
