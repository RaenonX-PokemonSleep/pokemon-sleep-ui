import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {ProgressBar} from '@/components/progressBar';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {IngredientId} from '@/types/game/ingredient';
import {formatFloat3} from '@/utils/number/format';


type Props = {
  id: IngredientId,
  coverage: number,
};

export const MealCoverageDetailsSingle = ({id, coverage}: Props) => {
  const percent = coverage * 100;

  return (
    <Flex direction="row" noFullWidth className="w-24">
      <PokemonIngredientIcon id={id} noLink/>
      <Flex center className="text-xs">
        <div>{formatFloat3(percent)}%</div>
        <ProgressBar percent={percent} classBarHeight="h-1"/>
      </Flex>
    </Flex>
  );
};
