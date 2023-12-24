import {useFilterInput} from '@/components/input/filter/hook';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {enforceFilterWithSkillValue} from '@/components/shared/pokemon/sorter/enforcer/skillValue';
import {defaultPokemonSort} from '@/const/filter';
import {Pokebox} from '@/types/game/pokebox/main';
import {PokemonId} from '@/types/game/pokemon';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {PokeboxPokemonForView, PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';
import {generatePokeboxViewerFilter, isPokeInBoxIncluded} from '@/ui/team/pokebox/viewer/utils';
import {isNotNullish} from '@/utils/type';


type UsePokeboxViewerFilterOpts = UsePokemonFilterCommonData & PokeboxCommonProps & {
  pokebox: Pokebox,
  pokemonNameMap: {[id in PokemonId]?: string},
};

export const usePokeboxViewerFilter = ({
  pokebox,
  pokedexMap,
  pokemonNameMap,
  preloaded,
  ...filterData
}: UsePokeboxViewerFilterOpts) => {
  return useFilterInput<PokeboxViewerFilter, PokeboxPokemonForView, string>({
    data: Object.values(pokebox)
      .filter(isNotNullish)
      .map((inBox) => {
        const pokemonId = inBox.pokemon;
        if (!pokemonId) {
          return null;
        }

        const pokemon = pokedexMap[pokemonId];
        if (!pokemon) {
          return null;
        }

        return {
          info: pokemon,
          inBox,
          names: [inBox.name, pokemonNameMap[pokemonId]].filter(isNotNullish),
        } satisfies PokeboxPokemonForView;
      })
      .filter(isNotNullish),
    dataToId: ({inBox}) => inBox.uuid,
    initialFilter: generatePokeboxViewerFilter(preloaded),
    isDataIncluded: isPokeInBoxIncluded(filterData),
    deps: [pokebox],
    onSetFilter: (original, updated) => enforceFilterWithSkillValue<
      PokeboxViewerFilter,
      PokeboxViewerFilter['sort']
    >({
      original,
      updated,
      config: {
        mainSkill: {key: 'mainSkill', defaultValue: {[Object.values(pokedexMap).filter(isNotNullish)[0].skill]: true}},
        sort: [
          {key: 'sort', defaultValue: defaultPokemonSort},
        ],
      },
    }),
  });
};
