import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {ProducingRateContentCommonProps} from '@/components/shared/production/rate/type';
import {getProbabilityOfNoSkill, GetProbabilityOfNoSkillOpts} from '@/utils/game/producing/probability';
import {formatFloat} from '@/utils/number/format';


type Props = ProducingRateContentCommonProps & GetProbabilityOfNoSkillOpts;

export const PokemonProbabilityOfNoSkill = ({normalSize, ...props}: Props) => {
  const t = useTranslations('UI.Producing.Probability');
  const probability = React.useMemo(() => getProbabilityOfNoSkill(props), [props]);

  return (
    <Flex noFullWidth direction="row" className={clsx('items-center gap-0.5', !normalSize && 'text-sm')}>
      <GenericIcon
        src="/images/generic/mainSkillSlash.png"
        alt={t('NoSkillAfterWakeup')}
        dimension={normalSize ? 'h-5 w-5' : 'h-4 w-4'}
      />
      <div>{probability ? formatFloat(probability * 100) : '-'}%</div>
    </Flex>
  );
};
