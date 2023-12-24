import {defaultExpType} from '@/const/game/xp';
import {PokedexMap, PokemonId} from '@/types/game/pokemon';
import {PokemonExpValueData, PokemonExpValueMap} from '@/types/game/pokemon/xp';
import {Nullable} from '@/utils/type';


type GetPokemonExpValueDataOpts = {
  pokemonId: Nullable<PokemonId>,
  pokedexMap: PokedexMap,
  xpValueData: PokemonExpValueMap,
};

export const getPokemonExpValueData = ({
  pokemonId,
  pokedexMap,
  xpValueData,
}: GetPokemonExpValueDataOpts): PokemonExpValueData | undefined => {
  return xpValueData[pokemonId ? (pokedexMap[pokemonId]?.expType ?? defaultExpType) : defaultExpType];
};

type GetDefaultExpRequiredOpts = {
  level: number,
  expData: PokemonExpValueData,
};

export const getDefaultExpRequired = ({level, expData}: GetDefaultExpRequiredOpts) => {
  return expData.data.at(level - 1)?.toNext ?? NaN;
};
