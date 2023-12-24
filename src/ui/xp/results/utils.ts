import {candyExpEquivalent} from '@/const/game/xp';
import {PokemonExpValueData, PokemonShardConsumptionData} from '@/types/game/pokemon/xp';
import {PokemonLevelUpRequirements} from '@/ui/xp/results/type';
import {PokemonExpCalculatorParams} from '@/ui/xp/type';


type GetLevelUpRequirementsOfEachLevelOpts = PokemonExpCalculatorParams & {
  xpData: PokemonExpValueData['data'],
  xpShardConsumption: PokemonShardConsumptionData,
  multiplier: number,
};

export const getLevelUpRequirementsOfEachLevel = ({
  xpToNext,
  currentLv,
  ownedCandies,
  rate,
  xpData,
  xpShardConsumption,
  multiplier,
}: GetLevelUpRequirementsOfEachLevelOpts): PokemonLevelUpRequirements[] => {
  // `currentLv` could be `0` if current level is deleted
  if (!currentLv) {
    return [];
  }

  // Data unavailable, or there's no next level (the max level is hit)
  const expDataCurrentLevel = xpData.at(currentLv - 1);
  if (!expDataCurrentLevel || !expDataCurrentLevel.toNext) {
    return [];
  }

  const expToNextCurrent = expDataCurrentLevel.toNext - xpToNext;
  const expDataInRange: PokemonExpValueData['data'] = [
    {
      lv: currentLv,
      toNext: xpToNext,
      totalGained: expDataCurrentLevel.totalGained + (expDataCurrentLevel.toNext - expToNextCurrent),
    },
    ...xpData.slice(currentLv),
  ];

  const actualCandyExpEquivalent = Math.ceil(candyExpEquivalent * multiplier) * rate.candyExpBoost;
  const itemsRequired: PokemonLevelUpRequirements[] = [];

  let overfeedExp = 0;
  for (const {lv, toNext} of expDataInRange) {
    // Max level reached
    if (!toNext) {
      break;
    }

    const expToNextActual = toNext - overfeedExp;
    const candyActual = Math.ceil(expToNextActual / actualCandyExpEquivalent);

    const candyDeductible = Math.min(candyActual, ownedCandies);
    ownedCandies = Math.max(0, ownedCandies - candyDeductible);

    const candySpent = candyActual - candyDeductible;

    itemsRequired.push({
      lv: lv + 1,
      xp: toNext,
      candy: candySpent,
      shard: candyActual * (xpShardConsumption.data[lv] ?? NaN) * rate.dreamShardDepletion,
    });

    overfeedExp = candyActual * actualCandyExpEquivalent - expToNextActual;
  }

  return itemsRequired;
};

export const getLevelUpRequirementsAccumulated = (
  requirementsOfLevel: PokemonLevelUpRequirements[],
): PokemonLevelUpRequirements[] => {
  const ret: PokemonLevelUpRequirements[] = [];

  for (const requirements of requirementsOfLevel) {
    const last = ret.at(-1);

    if (!last) {
      ret.push(requirements);
      continue;
    }

    ret.push({
      lv: requirements.lv,
      xp: last.xp + requirements.xp,
      candy: last.candy + requirements.candy,
      shard: last.shard + requirements.shard,
    });
  }

  return ret;
};
