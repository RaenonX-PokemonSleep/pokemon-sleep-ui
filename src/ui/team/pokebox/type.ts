import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {BerryDataMap} from '@/types/game/berry';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokedexMap} from '@/types/game/pokemon';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {CookingUserSettingsRequiredData, UserSettingsBundle} from '@/types/userData/settings';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export type PokeboxDataProps = UsePokemonFilterCommonData & CookingUserSettingsRequiredData & {
  pokedexMap: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  pokemonMaxLevel: number,
  preloaded: {
    bundle: UserSettingsBundle,
    display: Partial<PokeboxViewerDisplay> | undefined,
  },
};

export type PokeboxCommonProps = PokeboxDataProps & {
  berryDataMap: BerryDataMap,
  mapMeta: FieldMetaMap,
};
