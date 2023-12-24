import {FilterInclusionMap} from '@/components/input/filter/type';
import {BerryId} from '@/types/game/berry';
import {SnorlaxRank} from '@/types/game/rank';
import {SleepMapId} from '@/types/game/sleepStyle';


export type SnorlaxFavorite = FilterInclusionMap<BerryId>;

export type FilterWithSnorlaxFavorite = Record<string, SnorlaxFavorite>;

export type SnorlaxDataAtRank = {
  rank: SnorlaxRank,
  energy: number,
  rewardShard: number,
};

export type SnorlaxDataOfMap = {
  mapId: SleepMapId,
  data: SnorlaxDataAtRank[],
};

export type SnorlaxDataMap = {[mapId in SleepMapId]: SnorlaxDataOfMap};
