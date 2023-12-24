import isEqual from 'lodash/isEqual';
import {useCustomCompareMemo} from 'use-custom-compare';

import {CookingUserSettings} from '@/types/userData/settings';
import {toCookingUserSettings, ToCookingUserSettingsOpts} from '@/utils/user/settings/cooking';


export const useCookingUserSettings = ({
  cooking,
  mealMap,
}: ToCookingUserSettingsOpts): CookingUserSettings => {
  return useCustomCompareMemo(
    () => toCookingUserSettings({
      cooking,
      mealMap,
    }),
    [cooking, mealMap],
    (prev, next) => isEqual(prev, next),
  );
};
