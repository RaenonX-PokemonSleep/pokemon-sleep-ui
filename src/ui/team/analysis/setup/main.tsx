import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {PokemonGroupedProduction} from '@/components/shared/pokemon/production/grouped/main';
import {useUserSettingsBundle} from '@/hooks/userData/bundle';
import {UserSettingsBundle} from '@/types/userData/settings';
import {useTeamProducingStats} from '@/ui/team/analysis/calcHook/main';
import {TeamAnalysisSetupControl} from '@/ui/team/analysis/setup/control';
import {TeamAnalysisSummary} from '@/ui/team/analysis/setup/summary/main';
import {TeamAnalysisTeamView} from '@/ui/team/analysis/setup/team/main';
import {TeamAnalysisFilledProps} from '@/ui/team/analysis/setup/team/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {DeepPartial} from '@/utils/type';


type Props = TeamAnalysisDataProps & Omit<TeamAnalysisFilledProps, 'showPokemon' | 'bundle'> & {
  bundleFromClient: DeepPartial<UserSettingsBundle> | undefined,
};

export const TeamAnalysisSetupView = (props: Props) => {
  const {
    setup,
    setSetup,
    snorlaxData,
    preloaded,
    bundleFromClient,
  } = props;

  const bundle = useUserSettingsBundle({
    bundle: {
      server: preloaded,
      client: bundleFromClient,
    },
  });
  const statsOfTeam = useTeamProducingStats({
    ...props,
    bundle,
  });
  const {state, setState, showPokemon} = usePokemonLinkPopup();

  return (
    <>
      <PokemonLinkPopup state={state} setState={setState}/>
      <TeamAnalysisTeamView
        {...props}
        showPokemon={showPokemon}
        statsOfTeam={statsOfTeam}
        bundle={bundle}
      />
      <TeamAnalysisSetupControl setup={setup} setSetup={setSetup}/>
      <AdsUnit/>
      <PokemonGroupedProduction grouped={statsOfTeam.grouped}/>
      <TeamAnalysisSummary
        period="weekly"
        stats={statsOfTeam}
        snorlaxData={snorlaxData}
      />
      <AdsUnit/>
    </>
  );
};
