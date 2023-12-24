import {PokeInBox} from '@/types/game/pokebox/main';
import {ProduceType} from '@/types/game/producing/common';
import {PokemonProducingRateFinal} from '@/types/game/producing/rate';
import {SnorlaxRankFinalEstimate} from '@/types/game/rank';
import {TeamMakerBasisValue, TeamMakerIngredientStats} from '@/ui/team/maker/type/common';
import {TeamMakerBasis} from '@/ui/team/maker/type/input';


export type TeamMakerResultComp = {
  rates: PokemonProducingRateFinal<PokeInBox>,
  strengthByType: {[type in ProduceType]: number},
  basisValue: TeamMakerBasisValue,
  ingredientStats: TeamMakerIngredientStats,
  finalEstimates: SnorlaxRankFinalEstimate[],
};

export type TeamMakerResult = {
  comps: TeamMakerResultComp[],
  basis: TeamMakerBasis,
};
