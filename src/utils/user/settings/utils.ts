import {specialtyIdMap} from '@/const/game/pokemon';
import {Meal, MealMap, MealTypeId} from '@/types/game/meal/main';
import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {UserCookingTarget} from '@/types/userData/cooking';
import {UserCalculationFullPackBehavior} from '@/types/userData/settings';
import {isNotNullish} from '@/utils/type';


type IsFullPackEffectiveOpts = {
  fullPackBehavior: UserCalculationFullPackBehavior,
  specialty: PokemonSpecialtyId | null,
};

export const isFullPackEffective = ({fullPackBehavior, specialty}: IsFullPackEffectiveOpts): boolean => {
  if (fullPackBehavior === 'berryOnly') {
    return specialty === specialtyIdMap.berry;
  }

  if (fullPackBehavior === 'always') {
    return true;
  }

  if (fullPackBehavior === 'disable') {
    return false;
  }

  throw new Error(`Unhandled full pack behavior [${fullPackBehavior}]`);
};

export type ToTargetMealsOpts = {
  mealType: MealTypeId,
  target: UserCookingTarget,
  mealMap: MealMap,
};

export const toTargetMeals = ({mealType, target, mealMap}: ToTargetMealsOpts): Meal[] => Object
  .values(target[mealType] ?? {})
  .filter(isNotNullish)
  .map((mealId) => mealMap[mealId])
  .filter(isNotNullish);
