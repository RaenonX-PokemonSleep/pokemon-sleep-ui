import {GameEventId} from '@/types/game/event';
import {PokemonId} from '@/types/game/pokemon';
import {SnorlaxRank} from '@/types/game/rank';


export type SleepMapId = number;

export type SleepStyleId = number | 'onSnorlax';

export type SleepReward = {
  exp: number,
  shards: number,
  candy: number,
};

export type SleepStyleSpoRequirement = {
  drowsyScore: number,
  snorlaxStrength: number,
};

export type SleepStyleCommon = {
  style: SleepStyleId,
  spo: number,
  rarity: number,
  rewards: SleepReward,
};

export type SleepStyle = SleepStyleCommon & {
  rank: SnorlaxRank,
  events: GameEventId[],
};

export type SleepStyleNormal = {
  pokemonId: PokemonId,
  mapId: SleepMapId,
  styles: SleepStyle[],
};

export type SleepStyleNormalFlattened = {
  pokemonId: PokemonId,
  mapId: SleepMapId,
  style: SleepStyle,
};

export type SleepStyleNormalMap = {[id in PokemonId]?: SleepStyleNormal[]};

export type FieldToFlattenedSleepStyleMap = {[id in SleepMapId]?: SleepStyleNormalFlattened[]};

export type SleepStyleSpecial = SleepStyleCommon & {
  pokemonId: PokemonId,
  unreleased: boolean,
};

export type SleepStyleSpecialMap = {[id in PokemonId]?: SleepStyleSpecial[]};
