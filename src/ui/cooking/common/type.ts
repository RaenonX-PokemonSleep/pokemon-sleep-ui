import {RecipeLevel} from '@/types/game/cooking';
import {IngredientCounter, IngredientMap} from '@/types/game/ingredient';
import {MealsMarked} from '@/types/game/meal/main';
import {UserPreloadedData} from '@/types/userData/main';
import {CookingUserSettingsRequiredData, UserSettings, UserSettingsBundle} from '@/types/userData/settings';


export type CookingPreloadedData = {
  cooking: UserPreloadedData['cooking'],
  settings: UserSettings,
};

export type CookingServerDataProps = CookingUserSettingsRequiredData & {
  ingredientMap: IngredientMap,
  preloaded: UserSettingsBundle,
};

export type CookingCommonFilter = {
  recipeLevel: RecipeLevel,
  inventory: IngredientCounter,
  mealsMarked: MealsMarked,
};
