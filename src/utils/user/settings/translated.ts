import {TranslatedUserSettings} from '@/types/userData/settings';
import {toCalculatedUserSettings, ToCalculatedUserSettingsOpts} from '@/utils/user/settings/calculated';
import {toCookingUserSettings, ToCookingUserSettingsOpts} from '@/utils/user/settings/cooking';


type ToTranslatedSettingsOpts = ToCalculatedUserSettingsOpts & ToCookingUserSettingsOpts;

export const toTranslatedSettings = (opts: ToTranslatedSettingsOpts): TranslatedUserSettings => {
  return {
    calculatedSettings: toCalculatedUserSettings(opts),
    cookingSettings: toCookingUserSettings(opts),
  };
};
