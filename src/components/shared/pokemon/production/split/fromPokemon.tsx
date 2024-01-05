import React from 'react';

import {PokemonProductionSplit} from '@/components/shared/pokemon/production/split/main';
import {PokemonProductionSplitCommonProps} from '@/components/shared/pokemon/production/split/type';
import {PokemonProducingRate} from '@/types/game/producing/rate';
import {ProducingStateOfRate} from '@/types/game/producing/state';
import {toSum} from '@/utils/array';


type Props = PokemonProductionSplitCommonProps & {
  rate: PokemonProducingRate,
  state: ProducingStateOfRate,
};

export const PokemonProductionSplitFromPokemonRate = ({rate, state, ...props}: Props) => {
  const {
    berry,
    ingredient,
    skill,
  } = rate;

  return (
    <PokemonProductionSplit
      berry={berry.energy[state]}
      ingredient={toSum(Object.values(ingredient).map(({energy}) => energy[state]))}
      skill={skill.energy[state]}
      {...props}
    />
  );
};
