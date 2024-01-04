import React from 'react';

import {ProductionPeriod} from '@/types/game/producing/display';
import {PokemonProducingRateByType} from '@/types/game/producing/rate';
import {ProducingStateOfRate} from '@/types/game/producing/state';
import {TeamAnalysisSetup} from '@/types/teamAnalysis';
import {UserSettingsBundle} from '@/types/userData/settings';
import {
  TeamProducingStatsBySlot,
  TeamProducingStatsOptsBySlot,
} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';


export type UseTeamProducingStatsOpts = TeamAnalysisDataProps & {
  setup: TeamAnalysisSetup,
  bundle: UserSettingsBundle,
};

export type UseTeamProducingStatsCommonOpts = {
  period: ProductionPeriod,
  state: ProducingStateOfRate,
  deps: React.DependencyList,
};

export type UseTeamCompStatsReturn = {
  bySlot: TeamProducingStatsBySlot,
  singleOpts: TeamProducingStatsOptsBySlot,
  grouped: PokemonProducingRateByType,
};
