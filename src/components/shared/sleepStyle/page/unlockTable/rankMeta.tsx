import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {MapUnlockTableRowProps} from '@/components/shared/sleepStyle/page/unlockTable/type';
import {SnorlaxRankUI} from '@/components/shared/snorlax/rank';
import {toSum} from '@/utils/array';
import {formatInt} from '@/utils/number/format';
import {isNotNullish} from '@/utils/type';


export const MapUnlockTableRankMeta = (props: MapUnlockTableRowProps) => {
  const {
    rank,
    accumulator,
    sleepStyleData,
    snorlaxDataAtRank,
  } = props;
  const {energy} = accumulator;

  const t = useTranslations('UI.Common');
  const t2 = useTranslations('UI.InPage.Map');

  return (
    <Flex noFullWidth className="justify-between gap-1 sm:flex-row">
      <Flex direction="row" center noFullWidth className="gap-1 xl:w-52 xl:flex-col">
        <SnorlaxRankUI rank={rank} hideTextBelowMd/>
        <Flex direction="row" center noFullWidth className="gap-0.5">
          <ColoredEnergyIcon alt={t('Strength')}/>
          <div>
            {formatInt(energy.current?.value)}
          </div>
          {
            !!energy.current?.value && !!energy.previous?.value &&
            <div className="text-slate-500">
              (+{(energy.current.value / energy.previous.value * 100 - 100).toFixed(2)}%)
            </div>
          }
        </Flex>
      </Flex>
      <Flex direction="row" center noFullWidth className="gap-1 whitespace-nowrap xl:w-28 xl:flex-col">
        <Flex direction="row" center className="gap-0.5">
          <GenericPokeballIcon dimension="h-6 w-6" alt={t2('SleepStylesUnlocked')}/>
          <div>
            {toSum(Object.values(accumulator.unlockable).filter(isNotNullish))}
          </div>
          <div>
            {sleepStyleData.length ? ` (+${sleepStyleData.length})` : ''}
          </div>
        </Flex>
        <Flex direction="row" center>
          <GenericIcon src="/images/generic/gift.png" alt={t('DreamShards')} dimension="h-6 w-6"/>
          <GenericIcon src="/images/generic/shard.png" alt={t('DreamShards')} dimension="h-6 w-6" noInvert/>
          <div>
            {formatInt(snorlaxDataAtRank.rewardShard)}
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
};
