'use client';
import React from 'react';

import {UserDataLazyLoad} from '@/components/shared/userData/lazyLoad/main';
import {TeamAnalysisLoadedClient} from '@/ui/team/analysis/client/loaded';
import {TeamAnalysisServerDataProps} from '@/ui/team/analysis/type';
import {getPokemonMaxEvolutionCount} from '@/utils/game/pokemon/evolution';
import {isNotNullish} from '@/utils/type';


export const TeamAnalysisClient = (props: TeamAnalysisServerDataProps) => {
  const {pokedexMap} = props;

  const maxEvolutionCount = getPokemonMaxEvolutionCount(Object.values(pokedexMap).filter(isNotNullish));

  return (
    <UserDataLazyLoad
      options={{type: 'teamAnalysis'}}
      loadingText="Team"
      content={({data, session}) => (
        <TeamAnalysisLoadedClient
          data={data?.teamAnalysis}
          maxEvolutionCount={maxEvolutionCount}
          bundleFromClient={session.data?.user.preloaded}
          {...props}
        />
      )}
    />
  );
};
