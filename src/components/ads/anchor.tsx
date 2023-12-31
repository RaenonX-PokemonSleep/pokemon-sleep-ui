'use client';
import React from 'react';

import ArrowDownIcon from '@heroicons/react/24/outline/ArrowDownIcon';

import {anchorAdsAutoHideMs} from '@/components/ads/const';
import {AdsUnit} from '@/components/ads/main';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex/common';
import {isProduction} from '@/utils/environment';


export const AnchorAdsUnit = () => {
  const state = useCollapsible(isProduction());
  const {setShow} = state;

  React.useEffect(() => {
    setTimeout(() => setShow(false), anchorAdsAutoHideMs);
  }, []);

  return (
    <Collapsible state={state} classNameForHeight="h-32" button={
      <Flex direction="row" center className="gap-1.5">
        <ArrowDownIcon className="h-4 w-4"/>
        <div>Ads</div>
        <ArrowDownIcon className="h-4 w-4"/>
      </Flex>
    }>
      <AdsUnit/>
    </Collapsible>
  );
};
