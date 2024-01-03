import {generatePokemonInputFilterExtended} from '@/components/shared/pokemon/filter/utils';
import {PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {defaultPokemonSort} from '@/const/filter';
import {PokedexDisplayType} from '@/ui/pokedex/index/input/type';
import {PokedexDisplay, PokedexFilter} from '@/ui/pokedex/index/type';
import {migrate} from '@/utils/migrate/main';
import {pokedexMigrators} from '@/utils/migrate/pokedex/migrators';
import {PokedexFilterMigrateParams} from '@/utils/migrate/pokedex/type';


const exhaustIngredientCombinationsIfSort: PokemonSortType[] = [
  'ingredientCount',
  'ingredientEnergy',
  'frequency',
  'frequencyOfIngredient',
  'timeToFullPack',
  'totalEnergy',
  // Time to full pack indirectly affects how many skills could proc
  'mainSkillTriggerValue',
];

const exhaustIngredientCombinationsIfDisplay: PokedexDisplayType[] = [
  ...exhaustIngredientCombinationsIfSort,
  'ingredient',
];

export const toCalculateAllIngredientPossibilities = ({display, sort}: PokedexFilter): boolean => {
  return (
    exhaustIngredientCombinationsIfSort.includes(sort) ||
    exhaustIngredientCombinationsIfDisplay.includes(display)
  );
};

export const generateInitialFilter = (preloadedDisplay: Partial<PokedexDisplay> | undefined): PokedexFilter => {
  return migrate<PokedexFilter, PokedexFilterMigrateParams>({
    original: {
      name: '',
      sort: defaultPokemonSort,
      display: 'mainSkill',
      ...generatePokemonInputFilterExtended(),
      version: pokedexMigrators.length,
    },
    override: preloadedDisplay ?? null,
    migrators: pokedexMigrators,
    migrateParams: {},
  });
};
