import {Session} from 'next-auth';

import {FilterInclusionMap, FilterWithUpdaterProps} from '@/components/input/filter/type';
import {PokemonInputFilter, UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokeInBox} from '@/types/game/pokebox/main';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonKeyLevel} from '@/types/game/pokemon/level';
import {NatureEffectId} from '@/types/game/pokemon/nature';
import {RatingBasis} from '@/types/game/pokemon/rating';
import {SubSkillData, SubSkillId, SubSkillMap} from '@/types/game/pokemon/subSkill';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {Migratable} from '@/types/migrate';


export const pokeboxViewType = [
  'grid',
  'table',
] as const;

export type PokeboxViewType = typeof pokeboxViewType[number];

export const pokeboxDisplayType = [
  'info',
  'pokemon',
  'productionTotal',
  'productionBerry',
  'productionIngredient',
  'rating',
  'skills',
  'frequency',
  'maxCarry',
] as const;

export type PokeboxDisplayType = typeof pokeboxDisplayType[number];

export type PokeboxPokemonForView = {
  info: PokemonInfo,
  inBox: PokeInBox,
  names: string[],
};

export type PokeboxViewerDisplay = Migratable & {
  sort: PokemonSortType,
  ratingBasis: RatingBasis | null,
  viewType: PokeboxViewType,
  displayOfGrid: PokeboxDisplayType,
  displayOfTable: FilterInclusionMap<PokeboxDisplayType>,
  previewLevel: PokemonKeyLevel | null,
  previewFinalEvolution: boolean,
};

export type PokeboxViewerFilter = PokemonInputFilter & PokeboxViewerDisplay & {
  name: string,
  snorlaxFavorite: SnorlaxFavorite,
  subSkill: FilterInclusionMap<SubSkillId>,
  natureBuff: FilterInclusionMap<NatureEffectId>,
  natureNerf: FilterInclusionMap<NatureEffectId>,
};

export type PokeboxViewerInputCommonProps =
  FilterWithUpdaterProps<PokeboxViewerFilter> &
  UsePokemonFilterCommonData & {
    pokemonList: PokemonInfo[],
    subSkillMap: SubSkillMap,
    subSkillList: SubSkillData[],
    mapMeta: FieldMetaMap,
    session: Session | null,
  };
