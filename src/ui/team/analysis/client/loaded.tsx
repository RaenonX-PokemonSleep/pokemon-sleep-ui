import React from 'react';

import {v4} from 'uuid';

import {AdsUnit} from '@/components/ads/main';
import {TeamAnalysisComp, TeamAnalysisConfig, TeamAnalysisSetup} from '@/types/teamAnalysis';
import {UserSettingsBundle} from '@/types/userData/settings';
import {TeamAnalysisSetupView} from '@/ui/team/analysis/setup/main';
import {TeamAnalysisCompDependentInput} from '@/ui/team/analysis/setup/team/input';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {generateEmptyTeam, getCurrentTeam} from '@/ui/team/analysis/utils';
import {migrate} from '@/utils/migrate/main';
import {teamAnalysisCompMigrators} from '@/utils/migrate/teamAnalysis/comp/migrators';
import {teamAnalysisConfigMigrators} from '@/utils/migrate/teamAnalysis/config/migrators';
import {DeepPartial, isNotNullish} from '@/utils/type';


type Props = TeamAnalysisDataProps & {
  bundleFromClient: DeepPartial<UserSettingsBundle> | undefined,
};

export const TeamAnalysisLoadedClient = (props: Props) => {
  const {
    pokedexMap,
    data,
  } = props;
  const pokemonList = Object.values(pokedexMap).filter(isNotNullish);

  const initialSetup = React.useMemo((): TeamAnalysisSetup => {
    // Migrate first for older data version
    // If the user is not logged in or new, they won't have `preloadedSetup` so they need an initial comp
    // Therefore generate the initial comp for migration, then ignore it if it's not needed
    const initialCompUuid = v4();

    const config: TeamAnalysisConfig = migrate({
      original: {
        current: initialCompUuid,
        version: teamAnalysisConfigMigrators.length,
      },
      override: data?.config ?? null,
      migrators: teamAnalysisConfigMigrators,
      migrateParams: {},
    });

    const compsToMigrate = data?.comps ?? [generateEmptyTeam(initialCompUuid)];
    const comps: TeamAnalysisComp[] = compsToMigrate.map((team) => migrate({
      original: generateEmptyTeam(team.uuid),
      override: team,
      migrators: teamAnalysisCompMigrators,
      migrateParams: {},
    }));

    return {
      config,
      comps: Object.fromEntries(comps.map((team) => [team.uuid, team])),
    };
  }, []);
  const [setup, setSetup] = React.useState<TeamAnalysisSetup>(initialSetup);
  const currentTeam = getCurrentTeam({setup});

  return (
    <>
      <AdsUnit/>
      <TeamAnalysisCompDependentInput
        pokemonList={pokemonList}
        currentTeam={currentTeam}
        setSetup={setSetup}
        {...props}
      />
      <TeamAnalysisSetupView
        setup={setup}
        setSetup={setSetup}
        currentTeam={currentTeam}
        {...props}
      />
    </>
  );
};
