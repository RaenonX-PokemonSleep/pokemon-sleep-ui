import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {BerryDataMap} from '@/types/game/berry';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {MealMap} from '@/types/game/meal/main';
import {PokedexMap} from '@/types/game/pokemon';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {SnorlaxDataOfMap} from '@/types/game/snorlax';
import {PokeInBox} from '@/types/userData/pokebox/main';
import {UserSettingsBundle} from '@/types/userData/settings';


export type TeamMakerServerDataProps = UsePokemonFilterCommonData & {
  pokedexMap: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  berryDataMap: BerryDataMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  mealMap: MealMap,
  mapMeta: FieldMetaMap,
  snorlaxData: SnorlaxDataOfMap[],
  pokemonMaxLevel: number,
  preloaded: UserSettingsBundle,
};


export type TeamMakerDataProps = TeamMakerServerDataProps & {
  pokeboxList: PokeInBox[],
};
