import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {formatInt} from '@/utils/number/format';


type Props = {
  iconSrc: string,
  iconAlt: string,
  value: number,
};

export const PokemonSleepStyleRewardCell = ({iconSrc, iconAlt, value}: Props) => {
  return (
    <Flex direction="row" center className="gap-0.5">
      <GenericIconLarger src={iconSrc} alt={iconAlt} noInvert/>
      <div>{formatInt(value)}</div>
    </Flex>
  );
};
