import React from 'react';

import {initialRatingResult} from '@/const/game/rating';
import {RatingResultOfLevel} from '@/types/game/pokemon/rating/result';
import {UseCalculatePokeInBoxRatingReturn} from '@/ui/team/pokebox/content/pokeInBox/type';
import {toRatingWorkerOpts} from '@/ui/team/pokebox/content/pokeInBox/utils';
import {pokeboxWorkerPool} from '@/ui/team/pokebox/content/pokeInBox/workerPool';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const useCalculatePokeInBoxRating = (opts: PokeInBoxCommonProps): UseCalculatePokeInBoxRatingReturn => {
  const {pokeInBox} = opts;

  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<RatingResultOfLevel>({
    ...initialRatingResult,
    level: pokeInBox.level,
  });

  React.useEffect(() => {
    setLoading(true);

    pokeboxWorkerPool.queue(async (rate) => {
      const calculatedResult = await rate(toRatingWorkerOpts(opts));

      if (calculatedResult) {
        setResult(calculatedResult);
      }

      setLoading(false);

      if (!calculatedResult) {
        console.warn(`Failed to calculate the rating of ${pokeInBox.uuid}`);
        return;
      }
    });
  }, [pokeInBox]);

  return {loading, result};
};
