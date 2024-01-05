import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {RatingBasisSelection} from '@/components/shared/pokemon/rating/basis/selection/main';
import {RatingBasisTitle} from '@/components/shared/pokemon/rating/basis/title';
import {RatingResultProps} from '@/components/shared/pokemon/rating/type';
import {RatingResultTarget} from '@/components/shared/pokemon/rating/units/target';
import {
  RatingWeightedStatsUI,
  RatingWeightedStatsUiProps,
} from '@/components/shared/pokemon/rating/units/weightedStats';


type Props = RatingResultProps & RatingWeightedStatsUiProps;

export const RatingResultSummary = (props: Props) => {
  const {
    request,
    setRequest,
    subSkillMap,
  } = props;

  if (!request) {
    return null;
  }

  if (setRequest) {
    return (
      <Flex className="gap-1.5">
        <RatingBasisSelection
          current={request.setup.basis}
          onSelect={(basis) => setRequest({
            ...request,
            setup: {
              ...request.setup,
              basis,
            },
            timestamp: Date.now(),
          })}
        />
        <RatingWeightedStatsUI {...props}/>
      </Flex>
    );
  }

  return (
    <Flex className="gap-1.5 md:flex-row">
      <RatingResultTarget request={request} subSkillMap={subSkillMap}/>
      <Flex className="info-highlight-inner justify-evenly self-stretch p-3">
        <RatingBasisTitle basis={request.setup.basis} larger/>
        <RatingWeightedStatsUI {...props}/>
      </Flex>
    </Flex>
  );
};
