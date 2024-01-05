import React from 'react';

import {clsx} from 'clsx';

import {FadingLayout} from '@/components/layout/fading/main';
import {Flex} from '@/components/layout/flex/common';
import {RankingResultPercentage} from '@/components/shared/pokemon/rating/units/percentage';
import {RankingResultPercentile} from '@/components/shared/pokemon/rating/units/percentile';
import {RatingRelativeStrength} from '@/components/shared/pokemon/rating/units/relativeStrength';
import {RatingWeightedStats, RatingWeightedStatsBasis} from '@/types/game/pokemon/rating/config';


export type RatingWeightedStatsUiProps = {
  rating: RatingWeightedStats,
  basis: RatingWeightedStatsBasis,
};

export const RatingWeightedStatsUI = ({rating, basis}: RatingWeightedStatsUiProps) => {
  const {percentile, percentage, relativeStrength} = rating;

  const heightClass = 'h-12';

  return (
    <Flex center className={heightClass}>
      <FadingLayout
        current={basis}
        contents={{
          percentile: (
            <RankingResultPercentile
              percentile={percentile}
              classOfMark="text-lg"
              classOfValue="text-3xl"
              classBarHeight="h-1.5"
              className={clsx('justify-around', heightClass)}
            />
          ),
          percentage: (
            <RankingResultPercentage
              percentage={percentage}
              classOfValue="text-3xl"
              classBarHeight="h-1.5"
              className={clsx('justify-around', heightClass)}
            />
          ),
          relativeStrength: (
            <RatingRelativeStrength
              baseDiffPercent={relativeStrength}
              iconDimension="h-7 w-7"
              className={clsx('text-3xl', heightClass)}
            />
          ),
        }}
      />
    </Flex>
  );
};
