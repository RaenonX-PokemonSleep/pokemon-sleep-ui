import {isFilterIncludingSome, isFilterMismatchOnSingle} from '@/components/input/filter/utils/check';
import {
  PokemonInputFilter,
  PokemonInputFilterCheckExclusion,
  PokemonInputFilterCheckingOpts,
  PokemonInputFilterExtended,
  PokemonInputType,
} from '@/components/shared/pokemon/filter/type';
import {defaultPokemonIndividualParams} from '@/const/game/pokemon';
import {defaultLevel} from '@/const/game/production';
import {PokemonInfo} from '@/types/game/pokemon';
import {toUnique} from '@/utils/array';
import {getPossibleIngredientsFromChain} from '@/utils/game/producing/ingredient/level';
import {isNotNullish} from '@/utils/type';


const filterCheckToExclude: {[inputType in PokemonInputType]: PokemonInputFilterCheckExclusion} = {
  level: ({filter, pokemonLevel}) => {
    if (!pokemonLevel) {
      return false;
    }

    return !!filter.level && pokemonLevel < filter.level;
  },
  pokemonType: ({filter, pokemon}) => isFilterMismatchOnSingle({
    filter,
    filterKey: 'pokemonType',
    id: pokemon.type,
  }),
  specialty: ({filter, pokemon}) => isFilterMismatchOnSingle({
    filter,
    filterKey: 'specialty',
    id: pokemon.specialty,
  }),
  sleepType: ({filter, pokemon}) => isFilterMismatchOnSingle({
    filter,
    filterKey: 'sleepType',
    id: pokemon.sleepType,
  }),
  berry: ({filter, pokemon}) => isFilterMismatchOnSingle({
    filter,
    filterKey: 'berry',
    id: pokemon.berry.id,
  }),
  ingredient: ({filter, pokemon, ingredientChainMap}) => !isFilterIncludingSome({
    filter,
    filterKey: 'ingredient',
    ids: getPossibleIngredientsFromChain({
      level: filter.level,
      chain: ingredientChainMap[pokemon.ingredientChain],
    }),
  }),
  mainSkill: ({filter, pokemon}) => isFilterMismatchOnSingle({
    filter,
    filterKey: 'mainSkill',
    id: pokemon.skill,
  }),
  evolutionStage: ({filter, pokemon}) => {
    if (!!filter.evolutionStage.final) {
      return !!pokemon.evolution.next.length;
    }

    return isFilterMismatchOnSingle({
      filter,
      filterKey: 'evolutionStage',
      id: pokemon.evolution.stage,
    });
  },
};

export const isPokemonIncludedFromFilter = (opts: PokemonInputFilterCheckingOpts) => {
  return !Object.values(filterCheckToExclude).some((checker) => checker(opts));
};

type GeneratePokemonInputFilterOpts = {
  isLevelAgnostic: true,
  defaultPokemonLevel?: never,
} | {
  isLevelAgnostic: false,
  defaultPokemonLevel?: number,
};

export const generatePokemonInputFilter = ({
  isLevelAgnostic,
  defaultPokemonLevel,
}: GeneratePokemonInputFilterOpts): PokemonInputFilter => ({
  level: isLevelAgnostic ? null : (defaultPokemonLevel ?? defaultLevel),
  pokemonType: {},
  sleepType: {},
  specialty: {},
  ingredient: {},
  berry: {},
  mainSkill: {},
  evolutionStage: {},
});

export const generatePokemonInputFilterExtended = (): PokemonInputFilterExtended => ({
  mapId: {},
  snorlaxFavorite: {},
  ...generatePokemonInputFilter({isLevelAgnostic: false}),
  ...defaultPokemonIndividualParams,
});

type GetFilterIdsFromPokemonOpts<TId> = {
  pokemonList: PokemonInfo[],
  toId: (single: PokemonInfo) => TId | TId[] | null | undefined,
};

export const getFilterIdsFromPokemon = <TId extends number>({
  pokemonList,
  toId,
}: GetFilterIdsFromPokemonOpts<TId>) => {
  return toUnique(pokemonList.flatMap(toId))
    .filter(isNotNullish)
    .sort((a, b) => a - b);
};
