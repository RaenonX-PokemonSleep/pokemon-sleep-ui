import {MealCoverage} from '@/types/game/cooking';
import {IngredientCounter} from '@/types/game/ingredient';
import {PokemonProducingRateStage, PokemonProducingRateWithPayload} from '@/types/game/producing/rate';
import {PokeInBox} from '@/types/userData/pokebox/main';
import {GetPokemonProducingRateOpts} from '@/utils/game/producing/main/type';


export const teamMakerMemberCount = [
  1,
  2,
  3,
  4,
  5,
] as const;

export type TeamMakerMemberCount = typeof teamMakerMemberCount[number];

export type TeamMakerBasisValue = {
  strength: number,
  mealCoverage: MealCoverage,
};

export type TeamMakerBasisValueAtStage = {[stage in PokemonProducingRateStage]: TeamMakerBasisValue};

export type TeamMakerReferenceUnit = {
  pokeInBox: PokeInBox,
  levelUsed: number,
};

export type TeamMakerIntermediateRate = {
  rate: PokemonProducingRateWithPayload<null>,
  refData: TeamMakerReferenceUnit,
  calcOpts: GetPokemonProducingRateOpts,
  basisValueAtStage: TeamMakerBasisValueAtStage,
};

export type TeamMakerIngredientStats = {
  supply: IngredientCounter,
  surplus: IngredientCounter,
  shortage: IngredientCounter,
};
