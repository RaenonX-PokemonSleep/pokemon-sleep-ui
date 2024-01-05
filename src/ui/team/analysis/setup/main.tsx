import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {MealCoverageDetails} from '@/components/shared/meal/coverage/details/main';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {PokemonGroupedProduction} from '@/components/shared/pokemon/production/grouped/main';
import {useUserSettingsBundle} from '@/hooks/userData/bundle';
import {useCookingUserSettings} from '@/hooks/userData/cookingSettings';
import {UserSettingsBundle} from '@/types/userData/settings';
import {useTeamProducingStats} from '@/ui/team/analysis/calc/hook/main';
import {TeamAnalysisSetupControl} from '@/ui/team/analysis/setup/control';
import {TeamAnalysisSummary} from '@/ui/team/analysis/setup/summary/main';
import {TeamAnalysisTeamView} from '@/ui/team/analysis/setup/team/main';
import {TeamAnalysisFilledProps} from '@/ui/team/analysis/setup/team/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {DeepPartial} from '@/utils/type';


type Props = TeamAnalysisDataProps & Omit<TeamAnalysisFilledProps, 'showPokemon' | 'bundle' | 'cookingSettings'> & {
  bundleFromClient: DeepPartial<UserSettingsBundle> | undefined,
};

export const TeamAnalysisSetupView = (props: Props) => {
  const {
    currentTeam,
    setup,
    setSetup,
    snorlaxData,
    mealMap,
    preloaded,
    bundleFromClient,
  } = props;

  const bundle = useUserSettingsBundle({
    bundle: {
      server: preloaded,
      client: bundleFromClient,
    },
  });

  const cookingSettings = useCookingUserSettings({...bundle, mealMap});

  const statsOfTeam = useTeamProducingStats({
    ...props,
    bundle,
    cookingSettings,
  });
  const {state, setState, showPokemon} = usePokemonLinkPopup();

  return (
    <>
      <PokemonLinkPopup state={state} setState={setState}/>
      <TeamAnalysisTeamView
        showPokemon={showPokemon}
        statsOfTeam={statsOfTeam}
        bundle={bundle}
        cookingSettings={cookingSettings}
        {...props}
      />
      <TeamAnalysisSetupControl
        setup={setup}
        setSetup={setSetup}
        currentTeam={currentTeam}
      />
      <AdsUnit/>
      <PokemonGroupedProduction grouped={statsOfTeam.grouped}/>
      <MealCoverageDetails coverage={statsOfTeam.mealCoverage} className="button-bg rounded-lg p-2"/>
      <TeamAnalysisSummary
        period="weekly"
        stats={statsOfTeam}
        snorlaxData={snorlaxData}
      />
      <AdsUnit/>
    </>
  );
};
