import {PokedexMap, PokemonFinalEvolutionInfo, PokemonId, PokemonInfo} from '@/types/game/pokemon';


type GetEvolutionCountFromPokemonInfoOpts = {
  pokemon: PokemonInfo,
};

export const getEvolutionCountFromPokemonInfo = ({pokemon}: GetEvolutionCountFromPokemonInfoOpts) => {
  const {evolution} = pokemon;

  return evolution.stage - 1;
};

export const getPokemonMaxEvolutionCount = (pokemonList: PokemonInfo[]) => (
  Math.max(...pokemonList.map(({evolution}) => evolution.stage))
);

export type GetPokemonFinalEvolutionIdsOpts = {
  pokemonId: PokemonId,
  pokedex: PokedexMap,
  evolutionCount?: number,
};

export const getPokemonFinalEvolutionIds = ({
  pokemonId,
  pokedex,
  evolutionCount = 0,
}: GetPokemonFinalEvolutionIdsOpts): PokemonFinalEvolutionInfo[] => {
  const pokemon = pokedex[pokemonId];
  if (!pokemon) {
    return [];
  }

  const {evolution} = pokemon;
  if (!evolution.next.length) {
    return [{id: pokemonId, evolutionCount}];
  }

  return evolution.next.flatMap(({id}) => getPokemonFinalEvolutionIds({
    pokemonId: id,
    pokedex,
    evolutionCount: evolutionCount + 1,
  }));
};
