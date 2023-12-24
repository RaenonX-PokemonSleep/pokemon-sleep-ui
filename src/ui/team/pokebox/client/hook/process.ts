import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonInfoWithSortingPayload} from '@/components/shared/pokemon/sorter/type';
import {useSortingWorker} from '@/components/shared/pokemon/sorter/worker/hook';
import {Pokebox, PokeInBox} from '@/types/game/pokebox/main';
import {UserSettingsBundle} from '@/types/userData/settings';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredient/multi';
import {
  getPokemonProducingParams,
  getProducingRateImplicitParamsFromPokeInbox,
  getProducingRateSingleParams,
} from '@/utils/game/producing/params';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {isNotNullish} from '@/utils/type';
import {toCalculatedUserSettings} from '@/utils/user/settings/calculated';
import {toCookingUserSettings} from '@/utils/user/settings/cooking';


type Props = PokeboxCommonProps & {
  pokebox: Pokebox,
  bundle: UserSettingsBundle,
  pokeInBoxToCalc: PokeInBox[],
  filter: PokeboxViewerFilter,
  isIncluded: FilterInclusionMap<PokeInBox['uuid']>,
  setLoading: (loading: boolean) => void,
};

export const useProcessedPokebox = ({
  pokedexMap,
  pokemonProducingParamsMap,
  berryDataMap,
  ingredientMap,
  mainSkillMap,
  subSkillMap,
  mealMap,
  pokebox,
  bundle,
  pokeInBoxToCalc,
  filter,
  isIncluded,
  setLoading,
}: Props) => useSortingWorker({
  data: pokeInBoxToCalc
    .filter(({uuid}) => isIncluded[uuid])
    .map((pokeInBox) => {
      const pokemon = pokedexMap[pokeInBox.pokemon];

      if (!pokemon) {
        return null;
      }

      const {level, dateAdded} = pokeInBox;
      const singleParams = getProducingRateSingleParams({
        ...pokeInBox,
        subSkillMap,
      });

      return {
        pokemon,
        pokemonProducingParams: getPokemonProducingParams({
          pokemonId: pokemon.id,
          pokemonProducingParamsMap,
        }),
        level,
        dateAdded,
        extra: pokeInBox,
        ingredients: getEffectiveIngredientProductions({level, ingredients: pokeInBox.ingredients}),
        calculatedSettings: toCalculatedUserSettings({
          ...bundle,
          recoveryRate: toRecoveryRate(singleParams),
        }),
        cookingSettings: toCookingUserSettings({
          ...bundle,
          mealMap,
        }),
        ...singleParams,
        ...getProducingRateImplicitParamsFromPokeInbox({pokeInBox}),
      } satisfies PokemonInfoWithSortingPayload<PokeInBox>;
    })
    .filter(isNotNullish),
  sort: filter.sort,
  snorlaxFavorite: filter.snorlaxFavorite,
  berryDataMap,
  ingredientMap,
  mainSkillMap,
  // Cannot use `pokeInBoxToCalc` as re-calc dependency here, as it is always a new object after each calculation
  triggerDeps: [pokebox, filter, bundle],
  setLoading,
});
