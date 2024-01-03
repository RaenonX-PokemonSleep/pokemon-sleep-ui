import React from 'react';

import {MapCommonProps, MapPageFilter} from '@/components/shared/sleepStyle/page/type';
import {PokemonSleepTypeId} from '@/types/game/pokemon';
import {SnorlaxRank} from '@/types/game/rank';
import {SleepdexMap} from '@/types/game/sleepdex';
import {SleepStyleNormalFlattened} from '@/types/game/sleepStyle';
import {SnorlaxDataAtRank} from '@/types/game/snorlax';


export type MapUnlockAccumulatorOfSleepType = {[sleepType in PokemonSleepTypeId]?: number};

export type MapUnlockAccumulatorEnergy = {
  rank: SnorlaxRank,
  value: number | null,
};

export type MapUnlockAccumulator = {
  unlocked: MapUnlockAccumulatorOfSleepType,
  unlockable: MapUnlockAccumulatorOfSleepType,
  energy: {
    previous: MapUnlockAccumulatorEnergy | null,
    current: MapUnlockAccumulatorEnergy | null,
  },
};

export type MapUnlockTableData = SleepStyleNormalFlattened & {
  show: boolean,
};

export type MapUnlockTableRowProps = Pick<
  MapCommonProps,
  'mapId' | 'pokedexMap' | 'isLoggedIn'
> & {
  filter: MapPageFilter,
  rank: SnorlaxRank,
  sleepStyleData: MapUnlockTableData[],
  accumulator: MapUnlockAccumulator,
  sleepdex: SleepdexMap,
  setSleepdex: React.Dispatch<React.SetStateAction<SleepdexMap>>,
  snorlaxDataAtRank: SnorlaxDataAtRank,
};
