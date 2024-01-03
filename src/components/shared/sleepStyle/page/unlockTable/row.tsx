import React from 'react';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex/common';
import {MapUnlockTablePokemonIcons} from '@/components/shared/sleepStyle/page/unlockTable/pokemonIcons';
import {MapUnlockTableRankMeta} from '@/components/shared/sleepStyle/page/unlockTable/rankMeta';
import {MapUnlockTableSleepdexStats} from '@/components/shared/sleepStyle/page/unlockTable/sleepdexStats';
import {MapUnlockTableRowProps} from '@/components/shared/sleepStyle/page/unlockTable/type';


type Props = MapUnlockTableRowProps & {
  show: boolean,
};

export const MapUnlockTableRow = ({show, ...props}: Props) => {
  const {isLoggedIn, sleepStyleData} = props;

  return (
    <AnimatedCollapse show={show && sleepStyleData.some(({show}) => show)}>
      <Flex className="bg-plate gap-1 xl:flex-row">
        <MapUnlockTableRankMeta {...props}/>
        <Flex className="h-auto justify-end gap-1">
          <MapUnlockTablePokemonIcons {...props}/>
          {isLoggedIn && <MapUnlockTableSleepdexStats {...props}/>}
        </Flex>
      </Flex>
    </AnimatedCollapse>
  );
};
