import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {MapInputWithDataProps} from '@/components/shared/sleepStyle/page/input/type';
import {MapPageFilter} from '@/components/shared/sleepStyle/page/type';
import {textFilterButtonStyle} from '@/styles/input';


export const MapInputLockedOnlyToggle = ({filter, setFilter, isLoggedIn}: MapInputWithDataProps) => {
  const {showLockedOnly} = filter;

  const t = useTranslations('UI.InPage.Map.Toggle');

  if (!isLoggedIn) {
    return null;
  }

  return (
    <ToggleButton
      active={showLockedOnly}
      onClick={() => setFilter((original) => ({
        ...original,
        showLockedOnly: !original.showLockedOnly,
      } satisfies MapPageFilter))}
      className={clsx('group', textFilterButtonStyle)}
    >
      <Flex direction="row" center noFullWidth className="gap-1">
        <div className="h-5 w-5">
          {showLockedOnly ? <EyeIcon/> : <EyeSlashIcon/>}
        </div>
        <div>
          {t('Registered')}
        </div>
      </Flex>
    </ToggleButton>
  );
};
