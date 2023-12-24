import {defaultProductionPeriod} from '@/const/game/production';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
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
import {getEnergyMultiplier} from '@/utils/game/producing/multiplier';
import {getProducingRateOfStates} from '@/utils/game/producing/rateReducer';
import {getProduceSplit, getProducingSleepStateSplit} from '@/utils/game/producing/split';
import {GetProducingRateSharedOpts} from '@/utils/game/producing/type';


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
    helperCount: number,
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
    helperCount,
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
    helperCount,
  });
  const carryLimitInfo = getCarryLimitInfo({
    pokemon,
    evolutionCount,
    subSkillBonus,
    behavior,
  });

  const energyMultiplier = getEnergyMultiplier({bonus});

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
    specialty: pokemon.specialty,
    behavior,
    ...opts,
  });
  const fullPackStats = getFullPackStats({
    carryLimit: carryLimitInfo.final,
    dailyCount: getTheoreticalDailyQuantityInSleep({
      rate: {berry, ingredient},
      produceSplit,
    }),
    sleepDurationInfo,
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
      specialty: pokemon.specialty,
      period,
      rate: berry,
      produceType: 'berry',
      produceSplit,
      sleepStateSplit,
      behavior,
      ...opts,
    }),
    ingredient: Object.fromEntries(Object.values(ingredient).map((rate) => [
      rate.id,
      getProducingRateOfStates({
        specialty: pokemon.specialty,
        period,
        rate,
        produceType: 'ingredient',
        produceSplit,
        sleepStateSplit,
        behavior,
        ...opts,
      }),
    ])),
    skill: getProducingRateOfStates({
      specialty: pokemon.specialty,
      period,
      rate: skill,
      produceType: 'skill',
      produceSplit,
      sleepStateSplit,
      behavior,
      ...opts,
    }),
  };
};

