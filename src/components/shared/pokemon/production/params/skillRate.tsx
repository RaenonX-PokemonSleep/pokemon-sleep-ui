import React from 'react';

import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericMainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/generic';
import {PokemonProducingParamsCommonProps} from '@/components/shared/pokemon/production/params/type';
import {
  getProducingParamsSectionStyle,
  isParamsTrustWorthy,
} from '@/components/shared/pokemon/production/params/utils';
import {formatFloat, formatFloat3} from '@/utils/number/format';


export const PokemonMainSkillTriggerRate = ({params, noIcon, dimension}: PokemonProducingParamsCommonProps) => {
  const {dataCount, skillPercent} = params;

  const t = useTranslations('UI.InPage.Pokedex.Stats');

  return (
    <Flex direction="row" noFullWidth className={getProducingParamsSectionStyle(params)}>
      {!noIcon && <GenericMainSkillIcon alt={t('MainSkillTriggerRate')} dimension={dimension}/>}
      {!isParamsTrustWorthy(dataCount) && <ExclamationTriangleIcon className={dimension}/>}
      <span>
        {formatFloat3(skillPercent)}%
        {
          skillPercent &&
          <>&nbsp;(<span className="text-xs">1:</span>{formatFloat(1 / (skillPercent / 100))})</>
        }
      </span>
    </Flex>
  );
};
