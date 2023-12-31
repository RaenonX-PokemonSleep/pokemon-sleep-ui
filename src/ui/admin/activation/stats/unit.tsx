import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {ActivationDataAtClient} from '@/types/mongo/activation';
import {ActivationUiCommonProps} from '@/ui/admin/activation/type';


type Props = ActivationUiCommonProps & {
  title: string,
  filter: (data: ActivationDataAtClient) => boolean,
};

export const ActivationStatsUnit = ({control, title, filter}: Props) => {
  const filtered = control.state.data.filter(filter);

  return (
    <Flex direction="row" className="items-end justify-center gap-1">
      <div className="text-slate-600 dark:text-slate-400">{title}</div>
      <div className="text-2xl">{filtered.length}</div>
    </Flex>
  );
};
