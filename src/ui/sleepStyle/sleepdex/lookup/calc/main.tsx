import React from 'react';

import isEqual from 'lodash/isEqual';
import {useCustomCompareEffect} from 'use-custom-compare';

import {useWorker} from '@/hooks/worker/main';
import {SleepdexLookupDataCalcWorkerOpts} from '@/ui/sleepStyle/sleepdex/lookup/calc/type';
import {SleepdexLookupDataEntry} from '@/ui/sleepStyle/sleepdex/lookup/filter/type';


type UseSleepdexLookupDataCalcWorkerOpts = {
  workerOpts: SleepdexLookupDataCalcWorkerOpts,
  setLoading: (loading: boolean) => void,
};

export const useSleepdexLookupDataCalcWorker = ({
  workerOpts,
  setLoading,
}: UseSleepdexLookupDataCalcWorkerOpts) => {
  const [processedData, setProcessedData] = React.useState<SleepdexLookupDataEntry[]>([]);
  const {work} = useWorker<SleepdexLookupDataCalcWorkerOpts, SleepdexLookupDataEntry[]>({
    workerName: 'Sleepdex Lookup Filter & Sort',
    generateWorker: () => new Worker(new URL('main.worker', import.meta.url)),
    onCompleted: (result) => {
      setLoading(false);
      setProcessedData(result);
    },
    onError: () => setLoading(false),
  });

  useCustomCompareEffect(
    () => {
      work(workerOpts);
      setLoading(true);
    },
    [workerOpts],
    (prev, next) => isEqual(prev, next),
  );

  return processedData;
};
