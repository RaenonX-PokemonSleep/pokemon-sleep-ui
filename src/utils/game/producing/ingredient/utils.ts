import {GroupedProducingRate} from '@/types/game/producing/rate';
import {isNotNullish} from '@/utils/type';


export const toIngredientProductionCounterFromGroupedRate = (grouped: GroupedProducingRate<number>) => {
  return Object.fromEntries(
    Object.entries(grouped)
      .map(([id, rate]) => [
        id,
        rate?.quantity,
      ])
      .filter(isNotNullish),
  );
};
