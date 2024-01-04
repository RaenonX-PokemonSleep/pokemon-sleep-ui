import {MealCoverage} from '@/types/game/cooking';
import {PokemonProducingRate, ProducingRate} from '@/types/game/producing/rate';
import {TeamAnalysisSlotName} from '@/types/teamAnalysis';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {UseTeamCompStatsReturn} from '@/ui/team/analysis/calcHook/type';
import {GetPokemonProducingRateSingleOpts} from '@/utils/game/producing/main/single';


export type TeamProducingStatsTotal = {
  berry: ProducingRate,
  ingredient: ProducingRate | null,
  skill: ProducingRate,
};

export type TeamProducingStatsSingle = PokemonProducingRate & {
  total: ProducingRate,
  calculatedSettings: CalculatedUserSettings,
};

export type TeamProducingStatsBySlot = {[slot in TeamAnalysisSlotName]: TeamProducingStatsSingle | null};

export type TeamProducingStatsOptsBySlot = {[slot in TeamAnalysisSlotName]?: GetPokemonProducingRateSingleOpts};

export type TeamProducingStats = UseTeamCompStatsReturn & {
  total: TeamProducingStatsTotal,
  overall: ProducingRate,
  mealCoverage: MealCoverage,
};

export type TeamFinalEstimateInput = {
  endsAt: string,
  currentEnergy: number,
};
