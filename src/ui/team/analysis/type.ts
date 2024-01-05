import React from 'react';

import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokedexMap} from '@/types/game/pokemon';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {SnorlaxDataOfMap} from '@/types/game/snorlax';
import {TeamAnalysisComp, TeamAnalysisSetup} from '@/types/teamAnalysis';
import {UserLazyLoadedData} from '@/types/userData/main';
import {CookingUserSettingsRequiredData, UserSettingsBundle} from '@/types/userData/settings';


export type TeamAnalysisServerDataProps = UsePokemonFilterCommonData & CookingUserSettingsRequiredData & {
  pokedexMap: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  mainSkillMap: MainSkillMap,
  snorlaxData: SnorlaxDataOfMap[],
  mapMeta: FieldMetaMap,
  subSkillMap: SubSkillMap,
  pokemonMaxLevel: number,
  preloaded: UserSettingsBundle,
};

export type TeamAnalysisDataProps = TeamAnalysisServerDataProps & {
  data: UserLazyLoadedData['teamAnalysis'],
  maxEvolutionCount: number,
};

export type TeamAnalysisSetupModifyingProps = {
  setup: TeamAnalysisSetup,
  setSetup: React.Dispatch<React.SetStateAction<TeamAnalysisSetup>>,
  currentTeam: TeamAnalysisComp,
};
