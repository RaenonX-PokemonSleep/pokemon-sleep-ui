import {durationOfDay} from '@/const/common';
import {ActivationKeyAtClient, ActivationPropertiesAtClient} from '@/types/mongo/activation';
import {toIsoTimestampString} from '@/utils/date';
import {getActivationExpiryOfDefault} from '@/utils/user/activation/utils';


export const generateInitialActivationPropertiesAtClient = (): ActivationPropertiesAtClient => ({
  expiry: toIsoTimestampString(getActivationExpiryOfDefault()),
  activation: {
    adsFree: true,
    premium: true,
  },
  source: null,
  contact: {},
  note: '',
});

type IsExpiringSoonOpts = {
  data: ActivationKeyAtClient,
  now: Date,
};

export const isExpiringSoon = ({data, now}: IsExpiringSoonOpts): boolean => {
  if (data.source === 'adClick') {
    return false;
  }

  return new Date(data.expiry).getTime() - now.getTime() < durationOfDay * 3 * 1000;
};
