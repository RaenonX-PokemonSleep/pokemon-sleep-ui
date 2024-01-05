import React from 'react';

import {MealCoverage} from '@/types/game/cooking';
import {ProducingRate} from '@/types/game/producing/rate';
import {getTeamCompCalcResult} from '@/ui/team/analysis/calc/comp';
import {useTeamProducingStatsTotal} from '@/ui/team/analysis/calc/hook/total';
import {UseTeamProducingStatsOpts} from '@/ui/team/analysis/calc/type';
import {stateOfRateToShow} from '@/ui/team/analysis/setup/const';
import {TeamProducingStats} from '@/ui/team/analysis/setup/type';
import {getMealCoverage} from '@/utils/game/cooking';
import {toIngredientProductionCounterFromGroupedRate} from '@/utils/game/producing/ingredient/utils';
import {getTotalOfGroupedProducingRate} from '@/utils/game/producing/rateReducer';


export const useTeamProducingStats = (opts: UseTeamProducingStatsOpts): TeamProducingStats => {
  const {
    setup,
    bundle,
    currentTeam,
    cookingSettings,
  } = opts;
  const {
    snorlaxFavorite,
    analysisPeriod,
    members,
  } = currentTeam;

  const deps: React.DependencyList = [snorlaxFavorite, analysisPeriod, members, setup, bundle];

  const compsStats = React.useMemo(
    () => getTeamCompCalcResult({
      period: analysisPeriod,
      state: stateOfRateToShow,
      snorlaxFavorite,
      ...opts,
    }),
    deps,
  );
  const {
    bySlot,
    grouped,
  } = compsStats;

  const total = useTeamProducingStatsTotal({
    period: analysisPeriod,
    bySlot,
    state: stateOfRateToShow,
    deps,
  });

  const overall: ProducingRate = React.useMemo(() => ({
    period: analysisPeriod,
    energy: getTotalOfGroupedProducingRate({rate: total, key: 'energy'}),
    quantity: getTotalOfGroupedProducingRate({rate: total, key: 'quantity'}),
  }), deps);

  const mealCoverage: MealCoverage = React.useMemo(() => getMealCoverage({
    meals: cookingSettings.targetMeals,
    ingredientProduction: toIngredientProductionCounterFromGroupedRate(grouped.ingredient),
    period: analysisPeriod,
  }), deps);

  return {
    total,
    overall,
    mealCoverage,
    ...compsStats,
  };
};
