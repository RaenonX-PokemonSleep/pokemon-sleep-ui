import {defaultProductionPeriod} from '@/const/game/production';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {HelpingBonusEffect} from '@/types/game/producing/helpingBonus';
import {
  PokemonProducingRate,
  ProducingRateImplicitParams,
  ProducingRateSingleParams,
} from '@/types/game/producing/rate';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {getMainSkillLevel} from '@/utils/game/mainSkill/level';
import {getBerryProducingRate, GetBerryProducingRateOpts} from '@/utils/game/producing/berry';
import {
  getCarryLimitInfo,
  getFullPackStats,
  getTheoreticalDailyQuantityInSleep,
} from '@/utils/game/producing/carryLimit';
import {getBaseFrequencyFromPokemon} from '@/utils/game/producing/frequency';
import {getIngredientProducingRates, GetIngredientProducingRatesOpts} from '@/utils/game/producing/ingredient/multi';
import {getMainSkillProducingRate, GetMainSkillProducingRateOpts} from '@/utils/game/producing/mainSkill';
import {getCommonEnergyMultiplier} from '@/utils/game/producing/multiplier';
import {getProducingRateOfStates} from '@/utils/game/producing/rateReducer';
import {getProduceSplit, getProducingSleepStateSplit} from '@/utils/game/producing/split';
import {GetProducingRateSharedOpts} from '@/utils/game/producing/type';
import {isFullPackEffective} from '@/utils/user/settings/utils';


export type GetPokemonProducingRateBaseOpts =
  Omit<
    GetBerryProducingRateOpts & GetIngredientProducingRatesOpts & GetMainSkillProducingRateOpts,
    'frequency' | 'energyMultiplier' | 'skillRatePercent' | 'skillLevel' | 'timeToFullPack'
  > &
  ProducingRateSingleParams &
  ProducingRateImplicitParams &
  GetProducingRateSharedOpts & {
    calculatedSettings: CalculatedUserSettings,
    pokemonProducingParams: PokemonProducingParams,
    helpingBonusEffect: HelpingBonusEffect,
  };

export const getPokemonProducingRateBase = ({
  seeds,
  evolutionCount,
  ...opts
}: GetPokemonProducingRateBaseOpts): PokemonProducingRate => {
  const {
    pokemon,
    calculatedSettings,
    pokemonProducingParams,
  } = opts;
  const {
    behavior,
    bonus,
    sleepDurationInfo,
  } = calculatedSettings;

  const period = opts.period ?? defaultProductionPeriod;
  const subSkillBonus = opts.subSkillBonus ?? {};

  const frequency = getBaseFrequencyFromPokemon({
    ...opts,
    behavior,
    subSkillBonus,
  });
  const carryLimitInfo = getCarryLimitInfo({
    pokemon,
    evolutionCount,
    subSkillBonus,
    behavior,
  });

  const energyMultiplier = getCommonEnergyMultiplier({bonus});
  const isFullPack = isFullPackEffective({
    fullPackBehavior: behavior.alwaysFullPack,
    specialty: pokemon.specialty,
  });

  const berry = getBerryProducingRate({
    frequency,
    energyMultiplier,
    ...opts,
  });
  const ingredient = getIngredientProducingRates({
    frequency,
    energyMultiplier,
    ...opts,
  });

  const produceSplit = getProduceSplit({
    isFullPack,
    ...opts,
  });
  const fullPackStats = getFullPackStats({
    carryLimit: carryLimitInfo.final,
    dailyCount: getTheoreticalDailyQuantityInSleep({
      rate: {berry, ingredient},
      produceSplit,
    }),
    sleepDurationInfo,
    isFullPack,
  });
  const sleepStateSplit = getProducingSleepStateSplit({
    sleepDurationTotal: sleepDurationInfo.total,
    fullPackRatioInSleep: fullPackStats.ratio,
  });
  // `skill` depends on `fullPackStats.secondsToFull`
  const skill = getMainSkillProducingRate({
    frequency,
    energyMultiplier,
    timeToFullPack: fullPackStats.secondsToFull,
    skillLevel: getMainSkillLevel({
      seedsUsed: seeds.gold,
      evolutionCount,
      subSkillBonus,
    }),
    skillRatePercent: behavior.includeMainSkill ? pokemonProducingParams.skillPercent : 0,
    ...opts,
  });

  return {
    period,
    fullPackStats,
    sleepStateSplit,
    carryLimitInfo,
    berry: getProducingRateOfStates({
      period,
      rate: berry,
      produceType: 'berry',
      produceSplit,
      sleepStateSplit,
      isFullPack,
      ...opts,
    }),
    ingredient: Object.fromEntries(Object.values(ingredient).map((rate) => [
      rate.id,
      getProducingRateOfStates({
        period,
        rate,
        produceType: 'ingredient',
        produceSplit,
        sleepStateSplit,
        isFullPack,
        ...opts,
      }),
    ])),
    skill: getProducingRateOfStates({
      period,
      rate: skill,
      produceType: 'skill',
      produceSplit,
      sleepStateSplit,
      isFullPack,
      ...opts,
    }),
  };
};

