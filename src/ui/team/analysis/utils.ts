import {TeamAnalysisComp, TeamAnalysisMember, TeamAnalysisSetup, TeamAnalysisSlotName} from '@/types/teamAnalysis';
import {teamAnalysisCompMigrators} from '@/utils/migrate/teamAnalysis/comp/migrators';


type GetCurrentTeamOpts = {
  setup: TeamAnalysisSetup,
} & ({
  overrideSlot: TeamAnalysisSlotName,
  overrideMember: TeamAnalysisMember | null,
} | {
  overrideSlot?: never,
  overrideMember?: never,
});

export const getCurrentTeam = ({setup, overrideSlot, overrideMember}: GetCurrentTeamOpts): TeamAnalysisComp => {
  const {config, comps} = setup;

  const currentTeam = comps[config.current];

  // Should not check `overrideMember` because it can be `null`, which is falsy
  if (!overrideSlot) {
    return currentTeam;
  }

  return {
    ...currentTeam,
    members: {
      ...currentTeam.members,
      [overrideSlot]: overrideMember,
    },
  };
};

export const getDefaultTeamName = (teamUuid: string): string => {
  return teamUuid.substring(0, 8);
};

export const getTeamName = (team: TeamAnalysisComp): string => {
  return team.name || getDefaultTeamName(team.uuid);
};

export const generateEmptyTeam = (uuid: string): TeamAnalysisComp => {
  return {
    version: teamAnalysisCompMigrators.length,
    uuid,
    name: getDefaultTeamName(uuid),
    snorlaxFavorite: {},
    analysisPeriod: 'daily',
    staminaConfig: null,
    members: {
      A: null,
      B: null,
      C: null,
      D: null,
      E: null,
    },
  };
};
