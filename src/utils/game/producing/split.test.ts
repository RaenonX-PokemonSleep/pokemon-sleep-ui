import {describe, expect, it} from '@jest/globals';

import {defaultProducingParams} from '@/const/game/production';
import {getProduceSplit, getProducingSleepStateSplit} from '@/utils/game/producing/split';


describe('Pokemon Producing Split', () => {
  it('is correct in non-full pack', () => {
    const split = getProduceSplit({
      pokemonProducingParams: {
        ...defaultProducingParams,
        pokemonId: 1,
        ingredientSplit: 0.25631,
      },
      natureId: null,
      subSkillBonus: {},
      isFullPack: false,
    });

    expect(split.berry).toBeCloseTo(0.74369);
    expect(split.ingredient).toBeCloseTo(0.25631);
  });

  it('is correct full pack', () => {
    const split = getProduceSplit({
      pokemonProducingParams: {
        ...defaultProducingParams,
        pokemonId: 1,
        ingredientSplit: 0.25631,
      },
      natureId: null,
      subSkillBonus: {},
      isFullPack: true,
    });

    expect(split.berry).toBeCloseTo(1);
    expect(split.ingredient).toBeCloseTo(0);
  });
});

describe('Pokemon Producing Sleep State Split', () => {
  it('is correct', () => {
    const split = getProducingSleepStateSplit({
      sleepDurationTotal: 8 * 3600,
      fullPackRatioInSleep: 1 / 4,
    });

    expect(split.awake).toBeCloseTo(16 / 24);
    expect(split.sleepVacant).toBeCloseTo(6 / 24);
    expect(split.sleepFilled).toBeCloseTo(2 / 24);
  });
});
