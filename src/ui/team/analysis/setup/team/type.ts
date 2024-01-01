import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamAnalysisComp, TeamAnalysisMember, TeamAnalysisSlotName} from '@/types/teamAnalysis';
import {UserSettingsBundle} from '@/types/userData/settings';
import {TeamProducingStatsSingle} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisSetupModifyingProps} from '@/ui/team/analysis/type';


export type TeamAnalysisFilledProps = TeamAnalysisSetupModifyingProps & {
  showPokemon: (pokemon: PokemonInfo) => void,
  currentTeam: TeamAnalysisComp,
  bundle: UserSettingsBundle,
};

export type TeamAnalysisFilledSlotProps = TeamAnalysisFilledProps & {
  snorlaxFavorite: SnorlaxFavorite,
  slotName: TeamAnalysisSlotName,
  member: TeamAnalysisMember,
  pokemon: PokemonInfo,
  pokemonProducingParams: PokemonProducingParams,
  stats: TeamProducingStatsSingle,
};

export type TeamAnalysisEmptySlotPopupType = 'vanilla' | 'pokebox' | 'cloudPull';
