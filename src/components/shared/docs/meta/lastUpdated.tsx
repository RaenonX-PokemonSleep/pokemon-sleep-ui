'use client';
// This has to be a client component, or the timezone will not be correctly handled
import React from 'react';

import CloudArrowUpIcon from '@heroicons/react/24/outline/CloudArrowUpIcon';
import {format} from 'date-fns/format';

import {DocsMetaItem} from '@/components/shared/docs/meta/item';
import {DocsMetadata} from '@/types/mongo/docs';


type Props = Pick<DocsMetadata, 'lastUpdatedEpoch'>;

export const DocsMetaLastUpdatedUI = ({lastUpdatedEpoch}: Props) => {
  return (
    <DocsMetaItem
      icon={<CloudArrowUpIcon className="h-6 w-6"/>}
      content={format(lastUpdatedEpoch, 'yyyy-MM-dd HH:mm:ss')}
    />
  );
};
