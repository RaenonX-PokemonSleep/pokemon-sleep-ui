import React from 'react';

import {FilterInclusionMap} from '@/components/input/filter/type';


export type StrengthGrowthDataEntry<TKey extends string> = {
  level: number,
  strength: {[key in TKey]: number},
};

export type StrengthGrowthData<TKey extends string> = StrengthGrowthDataEntry<TKey>[];

export type StrengthGrowthChartState<TKey extends string> = {
  show: FilterInclusionMap<TKey>,
};

export type StrengthGrowthChartCommonProps<TKey extends string> = {
  dataKeys: TKey[],
  dataNames: (state: StrengthGrowthChartState<TKey>) => {[key in TKey]: React.ReactNode},
  data: StrengthGrowthData<TKey>,
};
