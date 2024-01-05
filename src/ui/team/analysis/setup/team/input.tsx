import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {Flex} from '@/components/layout/flex/common';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {productionStatsPeriodI18nId} from '@/const/game/production';
import {PokemonInfo} from '@/types/game/pokemon';
import {productionPeriod} from '@/types/game/producing/display';
import {TeamAnalysisSetup, TeamAnalysisComp} from '@/types/teamAnalysis';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';


type Props = TeamAnalysisDataProps & {
  pokemonList: PokemonInfo[],
  currentTeam: TeamAnalysisComp,
  setSetup: React.Dispatch<React.SetStateAction<TeamAnalysisSetup>>,
};

export const TeamAnalysisCompDependentInput = ({currentTeam, setSetup, ...props}: Props) => {
  const t = useTranslations('UI.InPage.Team');
  const t2 = useTranslations('UI.InPage.Pokedex.Stats.Energy');

  return (
    <Flex className="gap-1">
      <SnorlaxFavoriteInput
        filter={currentTeam}
        setFilter={(getUpdatedTeam) => setSetup((setup) => {
          const updated = getUpdatedTeam(getCurrentTeam({setup}));

          return {
            ...setup,
            comps: {
              ...setup.comps,
              [updated.uuid]: updated,
            },
          };
        })}
        filterKey="snorlaxFavorite"
        {...props}
      />
      <FilterTextInput
        title={t('Analysis.Period')}
        idToText={(period) => t2(productionStatsPeriodI18nId[period])}
        ids={[...productionPeriod]}
        isActive={(period) => period === currentTeam.analysisPeriod}
        onClick={(analysisPeriod) => setSetup((setup) => ({
          ...setup,
          comps: {
            ...setup.comps,
            [currentTeam.uuid]: {
              ...currentTeam,
              analysisPeriod,
            } satisfies TeamAnalysisComp,
          },
        }))}
      />
    </Flex>
  );
};
