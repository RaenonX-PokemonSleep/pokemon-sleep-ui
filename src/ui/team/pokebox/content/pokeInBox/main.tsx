import React from 'react';

import isEqual from 'lodash/isEqual';

import {PokeInBoxGrid} from '@/ui/team/pokebox/content/pokeInBox/grid/main';
import {PokeInBoxTable} from '@/ui/team/pokebox/content/pokeInBox/table/main';
import {PokeInBoxRefreshDependency, PokeInBoxViewProps} from '@/ui/team/pokebox/content/pokeInBox/type';


export const PokeInBoxView = React.memo((props: PokeInBoxViewProps) => {
  const {filter} = props;

  if (filter.viewType === 'table') {
    return <PokeInBoxTable {...props}/>;
  }

  if (filter.viewType === 'grid') {
    return <PokeInBoxGrid {...props}/>;
  }

  console.error(`Unhandled view type of Pokebox view: ${filter.viewType satisfies never}`);
}, (prev, next) => {
  // Caching this so rerender won't be triggered if the edit popup shows (without things actually change)
  const a: PokeInBoxRefreshDependency = {
    filter: prev.filter,
    processedPokebox: prev.processedPokebox,
  };
  const b: PokeInBoxRefreshDependency = {
    filter: next.filter,
    processedPokebox: next.processedPokebox,
  };

  return isEqual(a, b);
});
PokeInBoxView.displayName = 'PokeInBoxView';
