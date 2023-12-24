import {FilterInclusionMap} from '@/components/input/filter/type';
import {IngredientId, IngredientMap} from '@/types/game/ingredient';
import {MealTypeId} from '@/types/game/meal/main';
import {Migratable} from '@/types/migrate';
import {CookingUserSettingsRequiredData, UserSettingsBundle} from '@/types/userData/settings';


export type MealFilter = Migratable & {
  mealType: FilterInclusionMap<MealTypeId>,
  mealLevel: number,
  ingredient: FilterInclusionMap<IngredientId>,
  potCapacity: number | null,
  showEnergy: boolean,
};

export type MealDataProps = CookingUserSettingsRequiredData & {
  ingredientMap: IngredientMap,
  preloaded: UserSettingsBundle,
};
