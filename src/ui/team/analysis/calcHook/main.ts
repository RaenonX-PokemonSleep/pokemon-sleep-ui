import React from 'react';

import {useCookingUserSettings} from '@/hooks/userData/cookingSettings';
import {ProducingRate} from '@/types/game/producing/rate';
import {useTeamProducingStatsComp} from '@/ui/team/analysis/calcHook/comp';
import {useTeamProducingStatsTotal} from '@/ui/team/analysis/calcHook/total';
import {UseTeamProducingStatsOpts} from '@/ui/team/analysis/calcHook/type';
import {stateOfRateToShow} from '@/ui/team/analysis/setup/const';
import {TeamProducingStats} from '@/ui/team/analysis/setup/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';
import {getTotalOfGroupedProducingRate} from '@/utils/game/producing/rateReducer';
import {hasHelperSubSkill} from '@/utils/game/subSkill/effect';


export const useTeamProducingStats = (opts: UseTeamProducingStatsOpts): TeamProducingStats => {
  const {
    setup,
    subSkillMap,
    mealMap,
    bundle,
  } = opts;
  const {
    snorlaxFavorite,
    analysisPeriod,
    members,
  } = getCurrentTeam({setup});

  const helperCount = React.useMemo(() => Object.values(members)
    .filter((member) => {
      if (!member) {
        return false;
      }

      const {level, subSkill} = member;
      return hasHelperSubSkill({level, pokemonSubSkill: subSkill, subSkillMap});
    }).length,
  [members, subSkillMap],
  );
  const cookingSettings = useCookingUserSettings({...bundle, mealMap});

  const deps: React.DependencyList = [snorlaxFavorite, analysisPeriod, members, setup, helperCount, bundle];

  const {
    bySlot,
    grouped,
  } = useTeamProducingStatsComp({
    period: analysisPeriod,
    state: stateOfRateToShow,
    deps,
    cookingSettings,
    snorlaxFavorite,
    helperCount,
    ...opts,
  });

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

  return {bySlot, total, grouped, overall};
};
