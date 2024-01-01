import {MealCoverage} from '@/types/game/cooking';
import {PokemonProducingRate, PokemonProducingRateByType, ProducingRate} from '@/types/game/producing/rate';
import {TeamAnalysisSlotName} from '@/types/teamAnalysis';
import {CalculatedUserSettings} from '@/types/userData/settings';


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

export type TeamProducingStats = {
  bySlot: TeamProducingStatsBySlot,
  total: TeamProducingStatsTotal,
  grouped: PokemonProducingRateByType,
  overall: ProducingRate,
  mealCoverage: MealCoverage,
};

export type TeamFinalEstimateInput = {
  endsAt: string,
  currentEnergy: number,
};
