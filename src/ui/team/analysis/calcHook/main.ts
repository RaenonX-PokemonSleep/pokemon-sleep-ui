import React from 'react';

import {useCookingUserSettings} from '@/hooks/userData/cookingSettings';
import {MealCoverage} from '@/types/game/cooking';
import {ProducingRate} from '@/types/game/producing/rate';
import {useTeamProducingStatsComp} from '@/ui/team/analysis/calcHook/comp';
import {useTeamProducingStatsTotal} from '@/ui/team/analysis/calcHook/total';
import {UseTeamProducingStatsOpts} from '@/ui/team/analysis/calcHook/type';
import {stateOfRateToShow} from '@/ui/team/analysis/setup/const';
import {TeamProducingStats} from '@/ui/team/analysis/setup/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';
import {getMealCoverage} from '@/utils/game/cooking';
import {toIngredientProductionCounterFromGroupedRate} from '@/utils/game/producing/ingredient/utils';
import {getTotalOfGroupedProducingRate} from '@/utils/game/producing/rateReducer';


export const useTeamProducingStats = (opts: UseTeamProducingStatsOpts): TeamProducingStats => {
  const {
    setup,
    mealMap,
    bundle,
  } = opts;
  const {
    snorlaxFavorite,
    analysisPeriod,
    members,
  } = getCurrentTeam({setup});

  const cookingSettings = useCookingUserSettings({...bundle, mealMap});

  const deps: React.DependencyList = [snorlaxFavorite, analysisPeriod, members, setup, bundle];

  const compsStats = useTeamProducingStatsComp({
    period: analysisPeriod,
    state: stateOfRateToShow,
    deps,
    cookingSettings,
    snorlaxFavorite,
    ...opts,
  });
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
