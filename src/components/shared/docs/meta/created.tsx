'use client';
// This has to be a client component, or the timezone will not be correctly handled
import React from 'react';

import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import {format} from 'date-fns/format';

import {DocsMetaItem} from '@/components/shared/docs/meta/item';
import {DocsMetadata} from '@/types/mongo/docs';


type Props = Pick<DocsMetadata, 'createdEpoch'>;

export const DocsMetaCreatedUI = ({createdEpoch}: Props) => {
  return (
    <DocsMetaItem
      icon={<PlusCircleIcon className="h-6 w-6"/>}
      content={format(createdEpoch, 'yyyy-MM-dd HH:mm:ss')}
    />
  );
};
