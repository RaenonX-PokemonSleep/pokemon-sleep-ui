import React from 'react';

import {CompletionResultUI} from '@/components/shared/completion/main';
import {MapIndexSleepdexCompletionOfMap} from '@/components/shared/sleepStyle/common/type';


type Props = {
  sleepdexCompletionOfMap: MapIndexSleepdexCompletionOfMap,
};

export const MapSleepdexUnlockCount = ({sleepdexCompletionOfMap}: Props) => {
  const {completed, total} = sleepdexCompletionOfMap;

  return <CompletionResultUI completed={completed} total={total}/>;
};
