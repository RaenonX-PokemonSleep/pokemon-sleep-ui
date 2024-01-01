import React from 'react';

import {MainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/main';
import {ProducingRateUI} from '@/components/shared/production/rate/main';
import {ProducingRateContentCommonProps} from '@/components/shared/production/rate/type';
import {MainSkillId} from '@/types/game/pokemon/mainSkill';
import {ProducingRate} from '@/types/game/producing/rate';


type Props = ProducingRateContentCommonProps & {
  id: MainSkillId,
  rate: ProducingRate,
  hideStrength?: boolean,
};

export const PokemonSkillProduction = ({id, rate, hideStrength, ...props}: Props) => {
  return (
    <ProducingRateUI
      rate={rate}
      getIcon={(dimension) => <MainSkillIcon id={id} dimension={dimension}/>}
      hideStrength={hideStrength}
      {...props}
    />
  );
};
