import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal/main';
import {PokedexMap, PokemonIngredientProductionMap} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {
  CookingUserSettingsRequiredData,
  TranslatedUserSettings,
  UserSettingsBundle,
} from '@/types/userData/settings';


export type MealServerDataProps = CookingUserSettingsRequiredData & {
  meal: Meal,
  pokedex: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  ingredientChainMap: IngredientChainMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  pokemonIngredientProductionMap: PokemonIngredientProductionMap,
  pokemonMaxLevel: number,
  preloaded: UserSettingsBundle,
};

export type MealCommonProps = MealServerDataProps & {
  translatedSettings: TranslatedUserSettings,
};
