import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {PokemonComplexFilterDataProps} from '@/components/shared/pokemon/predefined/complexPicker/type';
import {PokemonConfigPokemonData} from '@/components/shared/pokemon/predefined/config/type';
import {PokemonOnDeskDataProps, PokemonOnDeskState} from '@/components/shared/pokemon/predefined/lab/onDesk/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {PokedexMap} from '@/types/game/pokemon';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {OcrTranslationsForPokemonInfo} from '@/types/ocr/extracted/pokemon';
import {CookingUserSettingsRequiredData, UserSettingsBundle} from '@/types/userData/settings';


export type SkillTriggerOnDeskState = PokemonOnDeskState & {
  level: number,
};

export type SkillTriggerAnalysisState = {
  base: SkillTriggerAnalysisUnit | null,
  targets: {[id in string]: SkillTriggerAnalysisUnit},
};

export type SkillTriggerAnalysisUnit = PokemonConfigPokemonData & {
  show: boolean,
};

export type SkillTriggerAnalysisServerDataProps = UsePokemonFilterCommonData & CookingUserSettingsRequiredData & {
  pokedexMap: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  pokemonMaxLevel: number,
  ocrTranslations: OcrTranslationsForPokemonInfo,
  preloaded: UserSettingsBundle,
};

export type SkillTriggerAnalysisDataProps =
  SkillTriggerAnalysisServerDataProps &
  PokemonComplexFilterDataProps &
  PokemonOnDeskDataProps & {
    bundle: UserSettingsBundle,
  };
