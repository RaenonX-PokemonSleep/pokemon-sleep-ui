import React from 'react';

import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {MapInputWithDataProps} from '@/components/shared/sleepStyle/page/input/type';
import {MapPageFilter} from '@/components/shared/sleepStyle/page/type';
import {textFilterButtonStyle} from '@/styles/input';


export const MapInputMarkSleepdexToggle = ({filter, setFilter, isLoggedIn}: MapInputWithDataProps) => {
  const {markingSleepdex} = filter;

  const t = useTranslations('UI.InPage.Map.Toggle');

  if (!isLoggedIn) {
    return null;
  }

  return (
    <ToggleButton
      active={markingSleepdex}
      onClick={() => setFilter((original) => ({
        ...original,
        markingSleepdex: !original.markingSleepdex,
      } satisfies MapPageFilter))}
      className={clsx('group', textFilterButtonStyle)}
    >
      <Flex direction="row" center noFullWidth className="gap-1">
        <BookmarkIcon className="h-5 w-5"/>
        <div>
          {t('SleepdexRegisterMode')}
        </div>
      </Flex>
    </ToggleButton>
  );
};
