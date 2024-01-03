import React from 'react';

import {useWorker} from '@/hooks/worker/main';
import {PokemonInfo} from '@/types/game/pokemon';
import {AnalysisStats, GetAnalysisStatsOpts} from '@/ui/analysis/page/calc/type';


type UseCalculationWorkerOpts = Omit<GetAnalysisStatsOpts, 'pokemonList'> & {
  pokemonToAnalyze: PokemonInfo[],
  setStats: (stats: AnalysisStats) => void,
  setLoading: (loading: boolean) => void,
  calculateDeps: React.DependencyList,
};

export const useCalculationWorker = ({
  pokemon,
  pokemonProducingParamsMap,
  berryDataMap,
  ingredientMap,
  ingredientChainMap,
  mainSkillMap,
  subSkillMap,
  sleepStyleMap,
  mealMap,
  pokemonMaxLevel,
  calculatedSettings,
  cookingSettings,
  level,
  subSkill,
  nature,
  ingredients,
  pokemonToAnalyze,
  snorlaxFavorite,
  setStats,
  setLoading,
  calculateDeps,
}: UseCalculationWorkerOpts) => {
  const {work} = useWorker<GetAnalysisStatsOpts, AnalysisStats>({
    workerName: 'Analysis Calculator',
    generateWorker: () => new Worker(new URL('main.worker', import.meta.url)),
    onCompleted: (result) => {
      setLoading(false);
      setStats(result);
    },
    onError: () => setLoading(false),
  });

  const requestStats = () => {
    work({
      pokemon,
      pokemonProducingParamsMap,
      berryDataMap,
      ingredientMap,
      ingredientChainMap,
      mainSkillMap,
      subSkillMap,
      sleepStyleMap,
      mealMap,
      pokemonMaxLevel,
      calculatedSettings,
      cookingSettings,
      level,
      subSkill,
      nature,
      ingredients,
      pokemonList: pokemonToAnalyze,
      snorlaxFavorite,
    });
    setLoading(true);
  };

  React.useEffect(() => {
    requestStats();
  }, calculateDeps);
};
