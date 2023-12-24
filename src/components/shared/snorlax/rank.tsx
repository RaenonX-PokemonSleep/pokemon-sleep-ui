import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {imageSmallIconSizes} from '@/styles/image';
import {SnorlaxRank} from '@/types/game/rank';
import {Dimension} from '@/types/style';


type Props = {
  rank: SnorlaxRank,
  dimension?: Dimension,
  hideText?: boolean,
  hideTextBelowMd?: boolean,
};

export const SnorlaxRankUI = ({rank, dimension, hideText, hideTextBelowMd}: Props) => {
  const t = useTranslations('UI.Common');
  const t2 = useTranslations('Game.RankTitle');

  const rankTitle = t2(rank.title.toString());

  return (
    <Flex direction="row" center noFullWidth className="gap-1">
      <div className={clsx('relative', dimension ?? 'h-6 w-6')}>
        <NextImage
          src={`/images/rank/${rank.title}.png`} alt={t('Rank')}
          sizes={imageSmallIconSizes}
        />
      </div>
      {
        !hideText &&
        <div className={clsx('whitespace-nowrap', hideTextBelowMd && 'hidden md:block')}>
          {rankTitle}
        </div>
      }
      <div>{rank.number}</div>
    </Flex>
  );
};
