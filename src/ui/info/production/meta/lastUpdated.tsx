'use client';
import React from 'react';

import {format} from 'date-fns/format';


type Props = {
  epochMs: number,
};

export const ProducingParamsMetaLastUpdated = ({epochMs}: Props) => {
  // This needs to be client side for the timezone to be correctly detected
  return (
    <div>
      {format(epochMs, 'yyyy-MM-dd HH:mm:ss')}
    </div>
  );
};
