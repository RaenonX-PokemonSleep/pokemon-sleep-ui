import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {PokemonBranchData} from '@/types/game/pokemon/branch';


type GetRelatedPokemonIdsOpts = {
  pokemon: PokemonInfo,
  branchData: PokemonBranchData | null,
};

export const getRelatedPokemonIds = ({pokemon, branchData}: GetRelatedPokemonIdsOpts): PokemonId[] => {
  const {evolution} = pokemon;

  const relatedId: PokemonId[] = evolution.next.map(({id}) => id);

  if (evolution.previous) {
    relatedId.push(evolution.previous);
  }

  if (branchData) {
    relatedId.push(branchData.pokemonId, ...branchData.branches);
  }

  return relatedId;
};
