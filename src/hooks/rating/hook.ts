
import {RatingWorkerHookReturn} from '@/hooks/rating/type';
import {useWorker} from '@/hooks/worker/main';
import {RatingOpts, RatingSetupData, RatingWorkerOpts} from '@/types/game/pokemon/rating/request';
import {RatingResultOfLevel} from '@/types/game/pokemon/rating/result';


type UseRatingWorkerOpts = {
  setLoading: (loading: boolean) => void,
  onRated: (result: RatingResultOfLevel) => void,
  opts: RatingOpts,
};

export const useRatingWorker = ({setLoading, onRated, opts}: UseRatingWorkerOpts): RatingWorkerHookReturn => {
  const {
    level,
    pokemonProducingParams,
    ingredientChainMap,
    ingredientMap,
    berryDataMap,
    mainSkillMap,
    subSkillMap,
    mealMap,
    useNestedWorker,
  } = opts;
  const {work} = useWorker<RatingWorkerOpts, RatingResultOfLevel>({
    workerName: 'Rating',
    generateWorker: () => new Worker(new URL('main.worker', import.meta.url)),
    onCompleted: (result) => {
      setLoading(false);
      onRated(result);
    },
    onError: () => setLoading(false),
  });

  const rate = (setupData: RatingSetupData) => {
    // Explicitly stating everything to make sure no additional props passed to the worker
    work({
      level,
      pokemon: setupData.pokemon,
      pokemonProducingParams,
      ingredients: setupData.ingredients,
      snorlaxFavorite: setupData.snorlaxFavorite,
      subSkill: setupData.subSkill,
      nature: setupData.nature,
      evolutionCount: setupData.evolutionCount,
      seeds: setupData.seeds,
      bundle: setupData.bundle,
      basis: setupData.basis,
      friendshipLevel: setupData.friendshipLevel,
      ingredientChainMap,
      ingredientMap,
      berryDataMap,
      mainSkillMap,
      subSkillMap,
      mealMap,
      useNestedWorker,
    });
    setLoading(true);
  };

  return {rate};
};
