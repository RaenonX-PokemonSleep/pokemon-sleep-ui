import {BerryData} from '@/types/game/berry';
import {EventDrowsyPowerMultiplierData} from '@/types/game/event/drowsyPowerMultiplier';
import {IngredientMap} from '@/types/game/ingredient';
import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {PokemonBranchData} from '@/types/game/pokemon/branch';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {SleepStyleNormal, SleepStyleSpecial} from '@/types/game/sleepStyle';
import {SnorlaxDataMap} from '@/types/game/snorlax';
import {
  CookingUserSettingsRequiredData,
  TranslatedUserSettings,
  UserSettingsBundle,
} from '@/types/userData/settings';


export type PokemonDataProps = CookingUserSettingsRequiredData & {
  pokedex: PokedexMap,
  pokemon: PokemonInfo,
  pokemonBranches: PokemonBranchData | null,
  pokemonProducingParams: PokemonProducingParams,
  sleepStyles: SleepStyleNormal[],
  sleepStylesSpecial: SleepStyleSpecial[],
  berryData: BerryData,
  ingredientMap: IngredientMap,
  ingredientChainMap: IngredientChainMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  snorlaxDataMap: SnorlaxDataMap,
  eventDrowsyPowerMultipliers: EventDrowsyPowerMultiplierData[],
  preloaded: UserSettingsBundle,
};

export type PokemonDataCommonProps = PokemonDataProps & {
  translatedSettings: TranslatedUserSettings,
};
