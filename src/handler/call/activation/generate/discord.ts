import {NextRequest} from 'next/server';

import {generateActivationKey} from '@/controller/user/activation/key';
import {getActivationPresetSingle} from '@/controller/user/activation/preset';
import {throwIfNotInboundApiToken} from '@/handler/common/check';
import {DiscordActivationGeneratePayload} from '@/types/subscription/discord/request';
import {defaultExpiryDays} from '@/utils/user/activation/const';


export const generateDiscordActivationLink = async (request: NextRequest) => {
  const params: Partial<DiscordActivationGeneratePayload> = (
    Object.fromEntries(new URLSearchParams(await request.text()).entries())
  );

  throwIfNotInboundApiToken(params.token);

  const discordId = params.discordId;
  if (!discordId) {
    throw new Error('Attempted to generate Discord activation without providing user ID');
  }

  const roleIds = params.roleIds;
  if (!roleIds) {
    throw new Error(
      `Requested to generate Discord activation without providing role IDs for ${discordId}`,
    );
  }

  const preset = await getActivationPresetSingle({
    source: 'discord',
    tags: roleIds.split(','),
  });
  if (!preset) {
    throw new Error(`No preset found when generating activation for ${discordId} with role IDs: ${roleIds}`);
  }

  const now = new Date();

  const activationLink = await generateActivationKey({
    executorUserId: process.env.NEXTAUTH_ADMIN_UID,
    source: 'discord',
    contact: {
      discord: discordId,
    },
    expiry: new Date(now.setDate(now.getDate() + defaultExpiryDays)),
    isCmsMod: false,
    activation: preset.activation,
    note: '',
  });

  if (!activationLink) {
    throw new Error(`Duplicated Discord activation for ${discordId}`);
  }

  /* eslint-disable no-console */
  console.log(`Generated activation link for Discord user ${discordId} - ${activationLink}`);
  /* eslint-enable no-console */

  return new Response(activationLink);
};
