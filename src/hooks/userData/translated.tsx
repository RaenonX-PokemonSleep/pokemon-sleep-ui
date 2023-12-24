import isEqual from 'lodash/isEqual';
import {useCustomCompareMemo} from 'use-custom-compare';

import {useUserSettingsBundle} from '@/hooks/userData/bundle';
import {UseUserDataOpts} from '@/hooks/userData/type';
import {UserCookingPreset} from '@/types/userData/cooking';
import {
  CookingUserSettingsRequiredData,
  TranslatedUserSettings,
  UserSettings,
  UserSettingsBundle,
} from '@/types/userData/settings';
import {toCalculatedUserSettings} from '@/utils/user/settings/calculated';
import {toCookingUserSettings} from '@/utils/user/settings/cooking';


type UseTranslatedUserSettingsOpts = CookingUserSettingsRequiredData & {
  bundle: UseUserDataOpts<UserSettingsBundle>,
};

type UseTranslatedUserSettingsReturn = {
  settings: UserSettings,
  cooking: UserCookingPreset,
  translatedSettings: TranslatedUserSettings,
};

export const useTranslatedUserSettings = ({
  bundle,
  mealMap,
}: UseTranslatedUserSettingsOpts): UseTranslatedUserSettingsReturn => {
  const {settings, cooking} = useUserSettingsBundle({bundle});

  return useCustomCompareMemo(
    () => {
      const calculatedSettings = toCalculatedUserSettings({settings});
      const cookingSettings = toCookingUserSettings({
        cooking,
        mealMap,
      });

      return {
        settings,
        cooking,
        translatedSettings: {
          calculatedSettings,
          cookingSettings,
        },
      };
    },
    [settings, cooking],
    (prev, next) => isEqual(prev, next),
  );
};
