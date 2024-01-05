import {TeamAnalysisMember, TeamAnalysisSlotName} from '@/types/teamAnalysis';
import {TeamAnalysisFilledSlotProps} from '@/ui/team/analysis/setup/team/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';


export type TeamAnalysisPokemonProps = TeamAnalysisDataProps & TeamAnalysisFilledSlotProps & {
  setMember: (slotName: TeamAnalysisSlotName, update: Partial<TeamAnalysisMember>) => void,
};

export type TeamAnalysisPokemonPopupType =
  'memberConfig' |
  'detailedStats' |
  'growthChart' |
  'sharableLink';
