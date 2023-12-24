import {CookingUserSettings, UserSettings} from '@/types/userData/settings';
import {TeamMakerDataProps} from '@/ui/team/maker/type';
import {TeamMakerIntermediateRate} from '@/ui/team/maker/type/common';
import {TeamMakerInput} from '@/ui/team/maker/type/input';


export type TeamMakerCalcInitOpts = TeamMakerDataProps & {
  input: TeamMakerInput,
  settings: UserSettings,
};

export type TeamMakerCalcGenerateCompOpts = TeamMakerCalcInitOpts & {
  cookingSettings: CookingUserSettings,
  candidates: TeamMakerIntermediateRate[],
};

export type TeamMakerCalcResultsOpts = TeamMakerCalcGenerateCompOpts & {
  teamComps: TeamMakerIntermediateRate[][],
};

export type TeamMakerCalcInitReturn = TeamMakerCalcGenerateCompOpts;

export type TeamMakerCalcGenerateCompReturn = TeamMakerCalcGenerateCompOpts & {
  allPossibleTeamComps: TeamMakerIntermediateRate[][],
};
