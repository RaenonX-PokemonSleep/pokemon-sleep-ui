import {durationOfDay} from '@/const/common';
import {PokemonInfo} from '@/types/game/pokemon';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {CarryLimitInfo, FullPackStats} from '@/types/game/producing/carryLimit';
import {ProducingRateOfItemOfSessions} from '@/types/game/producing/rate';
import {ProduceSplit} from '@/types/game/producing/split';
import {SleepDurationInfo} from '@/types/game/sleep';
import {UserCalculationBehavior} from '@/types/userData/settings';
import {toSum} from '@/utils/array';
import {toProducingRateOfPeriod} from '@/utils/game/producing/convert';
import {getSubSkillBonusValue} from '@/utils/game/subSkill/effect';


type GetSecondsToFullPackInSleepOpts = {
  dailyCount: number,
  carryLimit: number,
};

export const getSecondsToFullPackInSleep = ({
  dailyCount,
  carryLimit,
}: GetSecondsToFullPackInSleepOpts): number => {
  return carryLimit / dailyCount * durationOfDay;
};

type GetCarryLimitInfoOpts = {
  pokemon: PokemonInfo,
  evolutionCount: number,
  subSkillBonus: GroupedSubSkillBonus,
  behavior: UserCalculationBehavior,
};

export const getCarryLimitInfo = ({
  pokemon,
  evolutionCount,
  subSkillBonus,
  behavior,
}: GetCarryLimitInfoOpts): CarryLimitInfo => {
  const {stats} = pokemon;

  const base = stats.maxCarry + evolutionCount * 5;
  let final = base + toSum(getSubSkillBonusValue(subSkillBonus, 'inventory'));

  if (behavior.goodCampTicket) {
    final = Math.ceil(final * 1.2);
  }

  return {base, final};
};

type GetFullPackRatioInSleepOpts = {
  dailyCount: number,
  carryLimit: number,
  sleepDurationInfo: SleepDurationInfo,
  isFullPack: boolean,
};

export const getFullPackStats = ({
  dailyCount,
  carryLimit,
  sleepDurationInfo,
  isFullPack,
}: GetFullPackRatioInSleepOpts): FullPackStats => {
  if (isFullPack) {
    return {
      secondsToFull: 0,
      ratio: 1,
    };
  }

  const secondsToFull = getSecondsToFullPackInSleep({dailyCount, carryLimit});
  const fullPackDuration = toSum(
    sleepDurationInfo.durations.map((duration) => Math.max(duration - secondsToFull, 0)),
  );

  return {
    secondsToFull,
    ratio: fullPackDuration / sleepDurationInfo.total,
  };
};

type GetTheoreticalDailyQuantityInSleepOpts = {
  rate: {
    berry: ProducingRateOfItemOfSessions,
    ingredient: ProducingRateOfItemOfSessions[],
  },
  produceSplit: ProduceSplit,
};

export const getTheoreticalDailyQuantityInSleep = ({
  rate,
  produceSplit,
}: GetTheoreticalDailyQuantityInSleepOpts): number => {
  const {berry, ingredient} = rate;

  const berryDailyQuantity = (
    produceSplit.berry *
    toProducingRateOfPeriod({rate: berry.sleep, period: 'daily'}).quantity
  );
  const ingredientDailyQuantity = (
    produceSplit.ingredient *
    toSum(ingredient.map(({sleep}) => (
      toProducingRateOfPeriod({rate: sleep, period: 'daily'}).quantity
    )))
  );

  return berryDailyQuantity + ingredientDailyQuantity;
};
