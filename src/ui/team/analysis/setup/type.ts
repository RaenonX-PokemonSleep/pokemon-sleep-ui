import {MealCoverage} from '@/types/game/cooking';
import {PokemonProducingRate, ProducingRate} from '@/types/game/producing/rate';
import {TeamAnalysisSlotName} from '@/types/teamAnalysis';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {TeamCompCalcResult} from '@/ui/team/analysis/calc/type';
import {Nullable} from '@/utils/type';


export type TeamProducingStatsTotal = {
  berry: ProducingRate,
  ingredient: ProducingRate | null,
  skill: ProducingRate,
};

export type TeamProducingStatsSingle = PokemonProducingRate & {
  total: ProducingRate,
  calculatedSettings: CalculatedUserSettings,
  level: Nullable<number>,
};

export type TeamProducingStatsBySlot = {[slot in TeamAnalysisSlotName]: TeamProducingStatsSingle | null};

export type TeamProducingStats = TeamCompCalcResult & {
  total: TeamProducingStatsTotal,
  overall: ProducingRate,
  mealCoverage: MealCoverage,
};

export type TeamFinalEstimateInput = {
  endsAt: string,
  currentEnergy: number,
};
