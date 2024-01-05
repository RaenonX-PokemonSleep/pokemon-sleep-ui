import {BerryId} from '@/types/game/berry';
import {IngredientId} from '@/types/game/ingredient';
import {EvolutionData} from '@/types/game/pokemon/evolution';
import {IngredientChainId, IngredientLevel} from '@/types/game/pokemon/ingredient';
import {PokemonExpTypeId} from '@/types/game/pokemon/xp';
import {SleepMapId} from '@/types/game/sleepStyle';


export type PokemonId = number;

export type PokemonTypeId = number;

export type PokemonSleepTypeId = number;

export type PokemonSkillId = number;

export type PokemonSpecialtyId = number;

export type PokemonEventTypeId = number;

export type PokemonStats = {
  frequency: number,
  maxCarry: number,
  friendshipPoints: number,
  recruit: {
    exp: number,
    shards: number
  },
  transfer: {
    candy: number,
  },
};

export type PokemonBerry = {
  id: BerryId,
  quantity: number,
};

export type PokemonInfo = {
  id: PokemonId,
  type: PokemonTypeId,
  specialty: PokemonSpecialtyId,
  sleepType: PokemonSleepTypeId,
  stats: PokemonStats,
  berry: PokemonBerry,
  ingredientChain: IngredientChainId,
  skill: PokemonSkillId,
  evolution: EvolutionData,
  expType: PokemonExpTypeId,
  eventType: PokemonEventTypeId,
};

export type PokemonInfoWithMap = {
  info: PokemonInfo,
  mapsAvailable: SleepMapId[],
};

export type PokemonIngredientProduction = {
  pokemonId: PokemonId,
  ingredientChainId: IngredientChainId,
};

export type PokemonIngredientProductionMapOfLevel = {[ingredient in IngredientId]?: PokemonIngredientProduction[]};

export type PokemonIngredientProductionMap = {[level in IngredientLevel]: PokemonIngredientProductionMapOfLevel};

export type PokemonFinalEvolutionInfo = {
  id: PokemonId,
  evolutionCount: number,
};

export type PokedexMap = {[id in PokemonId]?: PokemonInfo};
