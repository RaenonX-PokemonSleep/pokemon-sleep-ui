import React from 'react';

import {useWorker} from '@/hooks/worker';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TranslatedUserSettings} from '@/types/userData/settings';
import {AnalysisStats, GetAnalysisStatsOpts} from '@/ui/analysis/page/calc/type';
import {AnalysisPageCommonProps} from '@/ui/analysis/page/type';


type UseCalculationWorkerOpts =
  Omit<AnalysisPageCommonProps, 'pokemonList' | 'mapMeta' | 'preloaded'> &
  TranslatedUserSettings & {
    level: number,
    ingredients: IngredientProduction[],
    pokemonToAnalyze: PokemonInfo[],
    snorlaxFavorite: SnorlaxFavorite,
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
  sleepStyleMap,
  mealMap,
  calculatedSettings,
  cookingSettings,
  level,
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
      sleepStyleMap,
      mealMap,
      calculatedSettings,
      cookingSettings,
      level,
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
