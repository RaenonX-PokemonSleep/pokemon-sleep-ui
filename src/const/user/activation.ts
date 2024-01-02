import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {ActivationType} from '@/types/mongo/activation';


export const userActivationI18nId: {
  [activation in ActivationType]: I18nMessageKeysOfNamespace<'UI.Subscription.Activation'>
} = {
  adsFree: 'AdsFree',
  premium: 'Premium',
};
