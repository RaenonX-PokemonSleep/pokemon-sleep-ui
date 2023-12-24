import {maxSnorlaxRankByTitle} from '@/const/game/rank';
import {SnorlaxRank} from '@/types/game/rank';
import {SnorlaxDataAtRank, SnorlaxDataOfMap} from '@/types/game/snorlax';


type GetSnorlaxRankAtEnergyProps = {
  energy: number,
  data: SnorlaxDataAtRank[],
};

export const getSnorlaxRankAtEnergy = ({
  energy,
  data,
}: GetSnorlaxRankAtEnergyProps): SnorlaxDataAtRank | undefined => {
  const sorted = data.sort((a, b) => b.energy - a.energy);

  return sorted.find((rankData) => rankData.energy < energy) ?? sorted.at(-1);
};

export const isSameRank = (a: SnorlaxRank, b: SnorlaxRank): boolean => a.title === b.title && a.number === b.number;

export const getSnorlaxRankEquivalentNumber = ({title, number}: SnorlaxRank): number => {
  let sum = 0;

  for (const passedTitle of Array(title).keys()) {
    sum += maxSnorlaxRankByTitle[passedTitle] ?? 0;
  }

  return sum + number;
};

type GetSnorlaxDataAtRankOpts = {
  snorlaxData: SnorlaxDataOfMap,
  rank: SnorlaxRank,
};

export const getSnorlaxDataAtRank = ({snorlaxData, rank}: GetSnorlaxDataAtRankOpts): SnorlaxDataAtRank | null => (
  snorlaxData.data.find((data) => isSameRank(data.rank, rank)) ?? null
);

export const sortBySnorlaxRankAsc = (a: SnorlaxRank, b: SnorlaxRank) => {
  if (a.title > b.title) {
    return 1;
  }

  if (a.title < b.title) {
    return -1;
  }

  return a.number - b.number;
};
