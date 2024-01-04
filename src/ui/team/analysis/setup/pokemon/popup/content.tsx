import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {StrengthGrowthChart} from '@/components/shared/chart/strength/main';
import {PokemonDetailedProducingStats} from '@/components/shared/pokemon/production/stats/main';
import {TeamAnalysisPokemonMemberConfig} from '@/ui/team/analysis/setup/pokemon/popup/config';
import {TeamAnalysisPokemonPopupCommonProps} from '@/ui/team/analysis/setup/pokemon/popup/type';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {getTotalEnergyOfPokemonProducingRate} from '@/utils/game/producing/rateReducer';
import {formatFloat} from '@/utils/number/format';
import {generateNumberTicks} from '@/utils/number/generator';


export const TeamAnalysisPokemonPopupContent = ({
  state,
  ...props
}: TeamAnalysisPokemonPopupCommonProps) => {
  const {
    stats,
    singleOpts,
    pokemon,
    pokemonMaxLevel,
  } = props;
  const {type} = state.control;

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
        <StrengthGrowthChart
          data={[...generateNumberTicks({
            max: pokemonMaxLevel,
            interval: 1,
            start: 1,
          })].map((level) => ({
            level,
            strength: getTotalEnergyOfPokemonProducingRate(getPokemonProducingRateSingle({
              ...singleOpts,
              level,
            }).atStage.final),
          }))}
          formatTicks={formatFloat}
          leftMargin={10}
        />
      </Flex>
    );
  }

  if (type === null) {
    return null;
  }

  throw new Error(`Unhandled Team Analysis Pokemon popup type [${type satisfies never}]`);
};
