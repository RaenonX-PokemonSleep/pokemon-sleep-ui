import {ActivationKey, activationType} from '@/types/mongo/activation';


const testActivationKey: Omit<ActivationKey, 'key'> = {
  generatedAt: new Date(),
  activation: Object.fromEntries(activationType.map((type) => [type, true])),
  expiry: new Date(),
  source: 'patreon',
  contact: {
    patreon: 'test@email.com',
  },
  note: '',
};

export const testActivations: ActivationKey[] = [
  {
    ...testActivationKey,
    key: 'danglingPatreon',
  },
  {
    ...testActivationKey,
    source: 'discord',
    key: 'danglingDiscord',
  },
  {
    ...testActivationKey,
    source: 'discord',
    key: 'discordPending',
    contact: {
      discord: 'discordPendingId',
    },
  },
  {
    ...testActivationKey,
    source: 'discord',
    key: 'discordActive',
    contact: {
      discord: 'discordActiveId',
    },
  },
  {
    ...testActivationKey,
    source: 'patreon',
    key: 'patreonPending',
    contact: {
      patreon: 'patronPending@email.com',
    },
  },
  {
    ...testActivationKey,
    source: 'patreon',
    key: 'patreonActive',
    contact: {
      patreon: 'patronActive@email.com',
    },
  },
  {
    ...testActivationKey,
    source: 'patreon',
    key: 'patreonDeclined',
    contact: {
      patreon: 'patronDeclined@email.com',
    },
  },
  {
    ...testActivationKey,
    source: 'patreon',
    key: 'patreonExpired',
    contact: {
      patreon: 'patronExpired@email.com',
    },
  },
];
