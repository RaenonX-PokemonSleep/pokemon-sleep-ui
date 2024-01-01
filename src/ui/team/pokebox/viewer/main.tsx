import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokeboxViewerConfig} from '@/ui/team/pokebox/viewer/config';
import {PokeboxViewerFilterUI} from '@/ui/team/pokebox/viewer/filter';
import {PokeboxViewerInputCommonProps} from '@/ui/team/pokebox/viewer/type';


export const PokeboxViewerInput = (props: PokeboxViewerInputCommonProps) => {
  return (
    <Flex className="gap-1.5 md:flex-row">
      <PokeboxViewerFilterUI {...props}/>
      <PokeboxViewerConfig {...props}/>
    </Flex>
  );
};
