import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {ProgressBar} from '@/components/progressBar';
import {MealCoverageDetailsSingle} from '@/components/shared/meal/coverage/details/single';
import {MealCoverageSummary} from '@/components/shared/meal/coverage/summary';
import {MealCoverage} from '@/types/game/cooking';


type Props = {
  coverage: MealCoverage,
  className?: string,
};

export const MealCoverageDetails = ({coverage, className}: Props) => {
  return (
    <Flex className={clsx('items-center gap-1.5 md:flex-row', className)}>
      <Flex className="gap-1.5">
        <Flex direction="row" noFullWidth wrap className="items-center justify-between gap-1.5">
          {Object.entries(coverage.byIngredient).map(([id, coverage]) => {
            if (coverage == null) {
              return null;
            }

            return <MealCoverageDetailsSingle key={id} id={parseInt(id)} coverage={coverage}/>;
          })}
        </Flex>
        <ProgressBar percent={coverage.total * 100} classBarHeight="h-2"/>
      </Flex>
      <MealCoverageSummary coverage={coverage} dimension="h-7 w-7" className="text-xl"/>
    </Flex>
  );
};
