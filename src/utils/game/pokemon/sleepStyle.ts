import {PokemonId, PokemonInfo, PokemonInfoWithMap} from '@/types/game/pokemon';
import {PokemonBranchData} from '@/types/game/pokemon/branch';
import {SleepStyleNormalMap} from '@/types/game/sleepStyle';
import {toUnique} from '@/utils/array';
import {Nullable} from '@/utils/type';


type GetPokedexWithMapOpts = {
  pokemonList: PokemonInfo[],
  sleepStyleMap: SleepStyleNormalMap,
};

export const getPokedexWithField = ({pokemonList, sleepStyleMap}: GetPokedexWithMapOpts): PokemonInfoWithMap[] => {
  return pokemonList.map((pokemon) => ({
    info: pokemon,
    mapsAvailable: toUnique(sleepStyleMap[pokemon.id]?.map(({mapId}) => mapId) ?? []),
  }));
};

type GetPokemonSleepStyleId = {
  pokemonId: number,
  pokemonBranch: Nullable<PokemonBranchData>,
};

export const getPokemonIdForSleepStyle = ({pokemonId, pokemonBranch}: GetPokemonSleepStyleId): PokemonId => {
  if (pokemonBranch && pokemonBranch.branches.includes(pokemonId)) {
    return pokemonBranch.pokemonId;
  }

  return pokemonId;
};
