import {defaultSeedUsage} from '@/const/game/seed';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {TeamAnalysisMember} from '@/types/teamAnalysis';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon/evolution';
import {generateDefaultIngredientProductionAtLevels} from '@/utils/game/producing/ingredient/chain';


type ToTeamAnalysisMemberFromVanillaOpts = {
  pokemon: PokemonInfo,
  chain: IngredientChain,
};

export const toTeamAnalysisMemberFromVanilla = ({
  pokemon,
  chain,
}: ToTeamAnalysisMemberFromVanillaOpts): TeamAnalysisMember => {
  return {
    pokemonId: pokemon.id,
    level: 1,
    nature: null,
    subSkill: {},
    ingredients: generateDefaultIngredientProductionAtLevels(chain),
    evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
    seeds: defaultSeedUsage,
  };
};
