import {FilterInclusionMap} from '@/components/input/filter/type';
import {BerryId} from '@/types/game/berry';
import {IngredientId, IngredientMap} from '@/types/game/ingredient';
import {
  PokemonInfo,
  PokemonSkillId,
  PokemonSleepTypeId,
  PokemonSpecialtyId,
  PokemonTypeId,
} from '@/types/game/pokemon';
import {EvolutionStage} from '@/types/game/pokemon/evolution';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {SleepMapId} from '@/types/game/sleepStyle';
import {SnorlaxFavorite} from '@/types/game/snorlax';


export type EvolutionStageSelection = EvolutionStage | 'final';

export type PokemonInputFilter = {
  // `null` means that the filter is intended to use as level-agnostic
  // This affects at least the filtering logic of ingredient
  level: number | null,
  pokemonType: FilterInclusionMap<PokemonTypeId>,
  specialty: FilterInclusionMap<PokemonSpecialtyId>,
  sleepType: FilterInclusionMap<PokemonSleepTypeId>,
  ingredient: FilterInclusionMap<IngredientId>,
  berry: FilterInclusionMap<BerryId>,
  evolutionStage: FilterInclusionMap<EvolutionStageSelection>,
  mainSkill: FilterInclusionMap<PokemonSkillId>,
};

export type PokemonInputType = keyof PokemonInputFilter;

export type PokemonInputFilterExtended = Omit<PokemonInputFilter, 'level'> & PokemonIndividualParams & {
  mapId: FilterInclusionMap<SleepMapId>,
  snorlaxFavorite: SnorlaxFavorite,
};

export type UsePokemonFilterCommonData = {
  ingredientMap: IngredientMap,
  ingredientChainMap: IngredientChainMap,
};

export type PokemonInputFilterCheckingOpts = UsePokemonFilterCommonData & {
  filter: PokemonInputFilter,
  pokemon: PokemonInfo,
  pokemonLevel?: number,
};

export type PokemonInputFilterCheckExclusion = (opts: PokemonInputFilterCheckingOpts) => boolean;
