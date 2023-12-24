import {
  CookingUserSettingsRequiredData,
  CookingUserSettings,
  UserSettingsBundle,
} from '@/types/userData/settings';
import {toTargetMeals} from '@/utils/user/settings/utils';


export type ToCookingUserSettingsOpts = CookingUserSettingsRequiredData & Pick<UserSettingsBundle, 'cooking'>;

export const toCookingUserSettings = ({
  cooking,
  mealMap,
}: ToCookingUserSettingsOpts): CookingUserSettings => {
  return {
    recipeLevel: cooking.recipeLevel,
    targetMeals: toTargetMeals({
      mealType: cooking.mealType,
      target: cooking.target,
      mealMap,
    }),
  };
};
