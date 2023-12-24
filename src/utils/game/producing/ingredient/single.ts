import {specialtyIdMap} from '@/const/game/pokemon';
import {Ingredient} from '@/types/game/ingredient';
import {
  ProducingRateCommonParams,
  ProducingRateOfItemOfSessions,
  ProducingRateProportion,
} from '@/types/game/producing/rate';
import {applyBonus} from '@/utils/game/producing/apply/bonus';
import {getProducingRateBase} from '@/utils/game/producing/rateBase';


export type GetIngredientProducingRateOpts = ProducingRateCommonParams & {
  ingredient: Ingredient | undefined,
} & (
  ProducingRateProportion | {
    count?: never,
    picks?: never,
  }
);

export const getIngredientProducingRate = ({
  pokemon,
  frequency,
  calculatedSettings,
  energyMultiplier,
  ingredient,
  count,
  picks,
}: GetIngredientProducingRateOpts): ProducingRateOfItemOfSessions | null => {
  const {bonus} = calculatedSettings;

  if (!ingredient) {
    return null;
  }

  const data = {
    id: ingredient.id,
    frequency,
    ...getProducingRateBase({
      frequency,
      count: count || (pokemon.specialty === specialtyIdMap.ingredient ? 2 : 1),
      picks: picks ?? 1,
      energyPerCount: ingredient.energy,
    }),
  };

  return {
    id: ingredient.id,
    sleep: applyBonus({
      bonus,
      energyMultiplier,
      producingState: 'sleep',
      data,
    }),
    awake: applyBonus({
      bonus,
      energyMultiplier,
      producingState: 'awake',
      data,
    }),
  };
};
