import React from 'react';

import {PokemonItemStatsCalcResult} from '@/components/shared/pokemon/icon/itemStats/type';
import {PokemonItemStatsWorkerOpts} from '@/components/shared/pokemon/icon/itemStats/worker/type';
import {useWorker} from '@/hooks/worker/main';


type UsePokemonProducingStatsWorkerOpts = PokemonItemStatsWorkerOpts & {
  setLoading?: (loading: boolean) => void,
};

export const usePokemonProducingStats = ({setLoading, ...opts}: UsePokemonProducingStatsWorkerOpts) => {
  const {
    pokedex,
    pokemonProducingParamsMap,
    pokemonIngredientProduction,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    input,
    translatedSettings,
  } = opts;

  const [
    producingStats,
    setProducingStats,
  ] = React.useState<PokemonItemStatsCalcResult[]>([]);

  const {work} = useWorker<PokemonItemStatsWorkerOpts, PokemonItemStatsCalcResult[]>({
    workerName: 'Pokemon Stats Calculator',
    generateWorker: () => new Worker(new URL('main.worker', import.meta.url)),
    onCompleted: (result) => {
      if (setLoading) {
        setLoading(false);
      }

      setProducingStats(result);
    },
    onError: () => {
      if (setLoading) {
        setLoading(false);
      }
    },
  });

  const calculate = () => {
    // Explicit to avoid copying unwanted properties
    work({
      pokedex,
      pokemonProducingParamsMap,
      pokemonIngredientProduction,
      berryDataMap,
      ingredientMap,
      ingredientChainMap,
      mainSkillMap,
      subSkillMap,
      input,
      translatedSettings,
    });
    if (setLoading) {
      setLoading(true);
    }
  };

  React.useEffect(() => {
    calculate();
  }, [input, translatedSettings, pokemonIngredientProduction]);

  return producingStats;
};
