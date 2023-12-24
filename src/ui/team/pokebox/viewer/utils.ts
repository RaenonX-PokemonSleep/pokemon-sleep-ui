import {
  isFilterIncludingSome,
  isFilterMatchingSearch,
  isFilterMismatchOnSingle,
} from '@/components/input/filter/utils/check';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {generatePokemonInputFilter, isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils';
import {natureDataMap} from '@/data/nature';
import {PokeboxDataProps} from '@/ui/team/pokebox/type';
import {PokeboxPokemonForView, PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredient/multi';
import {migrate} from '@/utils/migrate/main';
import {pokeboxDisplayMigrators} from '@/utils/migrate/pokeboxDisplay/migrators';


export const generatePokeboxViewerFilter = (preloaded: PokeboxDataProps['preloaded']): PokeboxViewerFilter => ({
  ...generatePokemonInputFilter({
    isLevelAgnostic: false,
    defaultPokemonLevel: 1,
  }),
  name: '',
  snorlaxFavorite: {},
  subSkill: {},
  natureBuff: {},
  natureNerf: {},
  ...migrate({
    original: {
      sort: 'id',
      ratingBasis: null,
      displayOfGrid: 'productionTotal',
      displayOfTable: {},
      viewType: 'table',
      previewLevel: null,
      previewFinalEvolution: false,
      version: pokeboxDisplayMigrators.length,
    },
    override: preloaded.display ?? {},
    migrators: pokeboxDisplayMigrators,
    migrateParams: {},
  }),
});

export const isPokeInBoxIncluded = (
  filterData: UsePokemonFilterCommonData,
) => (
  filter: PokeboxViewerFilter,
  data: PokeboxPokemonForView,
) => {
  const {level, ingredients, nature, subSkill} = data.inBox;

  if (!isFilterMatchingSearch({filter, filterKey: 'name', search: data.names})) {
    return false;
  }

  if (!isFilterIncludingSome({
    filter,
    filterKey: 'ingredient',
    ids: getEffectiveIngredientProductions({
      level,
      ingredients,
    }).map(({id}) => id),
  })) {
    return false;
  }

  if (!isFilterIncludingSome({
    filter,
    filterKey: 'subSkill',
    ids: Object.values(subSkill),
  })) {
    return false;
  }

  if (isFilterMismatchOnSingle({
    filter,
    filterKey: 'natureBuff',
    id: nature ? natureDataMap[nature]?.buff : null,
  })) {
    return false;
  }

  if (isFilterMismatchOnSingle({
    filter,
    filterKey: 'natureNerf',
    id: nature ? natureDataMap[nature]?.nerf : null,
  })) {
    return false;
  }

  return isPokemonIncludedFromFilter({
    filter,
    pokemon: data.info,
    pokemonLevel: level,
    ...filterData,
  });
};
