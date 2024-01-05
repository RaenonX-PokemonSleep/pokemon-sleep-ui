import React from 'react';

import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {StrengthGrowthChart} from '@/components/shared/chart/strength/main';
import {StrengthGrowthDataEntry} from '@/components/shared/chart/strength/type';
import {PokemonDetailedProducingStats} from '@/components/shared/pokemon/production/stats/main';
import {PokemonSpecialtyIcon} from '@/components/shared/pokemon/specialty/icon';
import {specialtyIdMap} from '@/const/game/pokemon';
import {getTeamCompCalcResult} from '@/ui/team/analysis/calc/comp';
import {TeamAnalysisPokemonMemberConfig} from '@/ui/team/analysis/setup/pokemon/popup/config';
import {
  TeamAnalysisPokemonPopupCommonProps,
  TeamAnalysisStrengthGrowthDataType,
  teamAnalysisStrengthGrowthDataTypes,
} from '@/ui/team/analysis/setup/pokemon/popup/type';
import {
  getTotalEnergyOfPokemonProducingRate,
  getTotalIngredientRateOfPokemon,
} from '@/utils/game/producing/rateReducer';
import {formatFloat} from '@/utils/number/format';
import {generateNumberTicks} from '@/utils/number/generator';
import {isNotNullish} from '@/utils/type';


export const TeamAnalysisPokemonPopupContent = ({
  state,
  ...props
}: TeamAnalysisPokemonPopupCommonProps) => {
  const {
    currentTeam,
    slotName,
    stats,
    pokemon,
    pokemonMaxLevel,
  } = props;
  const {type} = state.control;

  const t = useTranslations('UI.Producing');

  if (type === 'memberConfig') {
    return <TeamAnalysisPokemonMemberConfig {...props}/>;
  }

  if (type === 'detailedStats') {
    return (
      <PokemonDetailedProducingStats
        rate={stats}
        calculatedSettings={stats.calculatedSettings}
        specialty={pokemon.specialty}
      />
    );
  }

  if (type === 'growthChart') {
    return (
      <Flex className="info-section h-80 sm:w-[80vw]">
        <AdsUnit/>
        <StrengthGrowthChart
          dataKeys={[...teamAnalysisStrengthGrowthDataTypes]}
          dataNames={({show}) => ({
            berry: <PokemonSpecialtyIcon specialty={specialtyIdMap.berry} active={show.berry}/>,
            ingredient: <PokemonSpecialtyIcon specialty={specialtyIdMap.ingredient} active={show.ingredient}/>,
            skill: <PokemonSpecialtyIcon specialty={specialtyIdMap.skill} active={show.skill}/>,
            total: t('Total'),
          })}
          data={[...generateNumberTicks({
            max: pokemonMaxLevel,
            interval: 1,
            start: 1,
          })].map((level): StrengthGrowthDataEntry<TeamAnalysisStrengthGrowthDataType> | null => {
            const rate = getTeamCompCalcResult({
              period: currentTeam.analysisPeriod,
              state: 'equivalent',
              overrideLevel: level,
              ...props,
            }).bySlot[slotName];

            if (!rate) {
              return null;
            }

            return {
              level,
              strength: {
                berry: rate.berry.energy.equivalent,
                ingredient: getTotalIngredientRateOfPokemon({
                  rate,
                  target: 'energy',
                  state: 'equivalent',
                }),
                skill: rate.skill.energy.equivalent,
                total: getTotalEnergyOfPokemonProducingRate(rate),
              },
            };
          }).filter(isNotNullish)}
          classNameOfData={{
            berry: '[&>path]:stroke-green-700 [&>path]:dark:stroke-green-500',
            ingredient: '[&>path]:stroke-amber-600 [&>path]:dark:stroke-yellow-400',
            skill: '[&>path]:stroke-blue-600 [&>path]:dark:stroke-blue-400',
            total: '[&>path]:stroke-neutral-800 [&>path]:dark:stroke-slate-200',
          }}
          formatTicks={formatFloat}
          leftMargin={15}
          currentLevel={stats.level}
        />
      </Flex>
    );
  }

  if (type === null) {
    return null;
  }

  throw new Error(`Unhandled Team Analysis Pokemon popup type [${type satisfies never}]`);
};
