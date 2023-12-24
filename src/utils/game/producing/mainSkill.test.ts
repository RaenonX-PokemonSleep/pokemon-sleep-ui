import {describe, expect, it} from '@jest/globals';

import {durationOfDay} from '@/const/common';
import {testBonus} from '@/tests/data/game/bonus';
import {testMainSkillMap} from '@/tests/data/game/mainSkill';
import {testPokemonData} from '@/tests/data/game/pokemon';
import {testDefaultCalculatedUserSettings} from '@/tests/data/user/settings';
import {getMainSkillProducingRate} from '@/utils/game/producing/mainSkill';
import {getEnergyMultiplier} from '@/utils/game/producing/multiplier';


describe('Pokemon Skill Production', () => {
  it('is correct when skill freq < TTFP < sleep duration', () => {
    const bonus = testBonus['1'];
    const rate = getMainSkillProducingRate({
      pokemon: testPokemonData.ampharos,
      frequency: 3168,
      calculatedSettings: {
        ...testDefaultCalculatedUserSettings,
        bonus,
        sleepDurationInfo: {
          durations: [28800],
          total: 28800,
        },
      },
      energyMultiplier: getEnergyMultiplier({bonus}),
      subSkillBonus: {},
      skillRatePercent: 10,
      natureId: null,
      skillLevel: 2,
      skillData: testMainSkillMap['2'],
      timeToFullPack: 21600,
    });

    // Skill freq = 14400
    const awakeFreq = 3168 / bonus.stamina.awake;
    const energyMultiplier = getEnergyMultiplier({bonus});

    expect(rate.id).toBe(2);
    expect(rate.awake.id).toBe(2);
    expect(rate.awake.frequency).toBeCloseTo(awakeFreq * 10);
    expect(rate.awake.quantity).toBeCloseTo(durationOfDay / awakeFreq / 10);
    expect(rate.awake.energy).toBeCloseTo(durationOfDay / awakeFreq / 10 * energyMultiplier * 1251);
    expect(rate.sleep.id).toBe(2);
    expect(rate.sleep.frequency).toBeCloseTo(21600);
    expect(rate.sleep.quantity).toBeCloseTo(4);
    expect(rate.sleep.energy).toBeCloseTo(4 * energyMultiplier * 1251);
  });

  it('is correct when skill freq < sleep duration < TTFP', () => {
    const bonus = testBonus['1'];
    const rate = getMainSkillProducingRate({
      pokemon: testPokemonData.ampharos,
      frequency: 3168,
      calculatedSettings: {
        ...testDefaultCalculatedUserSettings,
        bonus,
        sleepDurationInfo: {
          durations: [21600],
          total: 21600,
        },
      },
      energyMultiplier: getEnergyMultiplier({bonus}),
      subSkillBonus: {},
      skillRatePercent: 10,
      natureId: null,
      skillLevel: 2,
      skillData: testMainSkillMap['2'],
      timeToFullPack: 28800,
    });

    // Skill freq = 14400
    const awakeFreq = 3168 / bonus.stamina.awake;
    const energyMultiplier = getEnergyMultiplier({bonus});

    expect(rate.id).toBe(2);
    expect(rate.awake.id).toBe(2);
    expect(rate.awake.frequency).toBeCloseTo(awakeFreq * 10);
    expect(rate.awake.quantity).toBeCloseTo(durationOfDay / awakeFreq / 10);
    expect(rate.awake.energy).toBeCloseTo(durationOfDay / awakeFreq / 10 * energyMultiplier * 1251);
    expect(rate.sleep.id).toBe(2);
    expect(rate.sleep.frequency).toBeCloseTo(21600);
    expect(rate.sleep.quantity).toBeCloseTo(4);
    expect(rate.sleep.energy).toBeCloseTo(4 * energyMultiplier * 1251);
  });

  it('is correct when TTFP < skill freq < sleep duration', () => {
    const bonus = testBonus['1'];
    const rate = getMainSkillProducingRate({
      pokemon: testPokemonData.ampharos,
      frequency: 4752,
      calculatedSettings: {
        ...testDefaultCalculatedUserSettings,
        bonus,
        sleepDurationInfo: {
          durations: [28800],
          total: 28800,
        },
      },
      energyMultiplier: getEnergyMultiplier({bonus}),
      subSkillBonus: {},
      skillRatePercent: 10,
      natureId: null,
      skillLevel: 2,
      skillData: testMainSkillMap['2'],
      timeToFullPack: 14400,
    });

    // Skill freq = 21600
    const awakeFreq = 4752 / bonus.stamina.awake;
    const energyMultiplier = getEnergyMultiplier({bonus});

    expect(rate.id).toBe(2);
    expect(rate.awake.id).toBe(2);
    expect(rate.awake.frequency).toBeCloseTo(awakeFreq * 10);
    expect(rate.awake.quantity).toBeCloseTo(durationOfDay / awakeFreq / 10);
    expect(rate.awake.energy).toBeCloseTo(durationOfDay / awakeFreq / 10 * energyMultiplier * 1251);
    expect(rate.sleep.id).toBe(2);
    expect(rate.sleep.frequency).toBeCloseTo(21600);
    expect(rate.sleep.quantity).toBeCloseTo(4);
    expect(rate.sleep.energy).toBeCloseTo(4 * energyMultiplier * 1251);
  });

  it('is correct when sleep duration < skill freq < TTFP', () => {
    const bonus = testBonus['1'];
    const rate = getMainSkillProducingRate({
      pokemon: testPokemonData.ampharos,
      frequency: 4752,
      calculatedSettings: {
        ...testDefaultCalculatedUserSettings,
        bonus,
        sleepDurationInfo: {
          durations: [14400],
          total: 14400,
        },
      },
      energyMultiplier: getEnergyMultiplier({bonus}),
      subSkillBonus: {},
      skillRatePercent: 10,
      natureId: null,
      skillLevel: 2,
      skillData: testMainSkillMap['2'],
      timeToFullPack: 28800,
    });

    // Skill freq = 21600
    const awakeFreq = 4752 / bonus.stamina.awake;
    const energyMultiplier = getEnergyMultiplier({bonus});

    expect(rate.id).toBe(2);
    expect(rate.awake.id).toBe(2);
    expect(rate.awake.frequency).toBeCloseTo(awakeFreq * 10);
    expect(rate.awake.quantity).toBeCloseTo(durationOfDay / awakeFreq / 10);
    expect(rate.awake.energy).toBeCloseTo(durationOfDay / awakeFreq / 10 * energyMultiplier * 1251);
    expect(rate.sleep.id).toBe(2);
    expect(rate.sleep.frequency).toBeCloseTo(21600);
    expect(rate.sleep.quantity).toBeCloseTo(4);
    expect(rate.sleep.energy).toBeCloseTo(4 * energyMultiplier * 1251);
  });

  it('is correct when TTFP < sleep duration < skill freq', () => {
    const bonus = testBonus['1'];
    const rate = getMainSkillProducingRate({
      pokemon: testPokemonData.ampharos,
      frequency: 6336,
      calculatedSettings: {
        ...testDefaultCalculatedUserSettings,
        bonus,
        sleepDurationInfo: {
          durations: [21600],
          total: 21600,
        },
      },
      energyMultiplier: getEnergyMultiplier({bonus}),
      subSkillBonus: {},
      skillRatePercent: 10,
      natureId: null,
      skillLevel: 2,
      skillData: testMainSkillMap['2'],
      timeToFullPack: 14400,
    });

    // Skill freq = 28800
    const awakeFreq = 6336 / bonus.stamina.awake;
    const energyMultiplier = getEnergyMultiplier({bonus});

    expect(rate.id).toBe(2);
    expect(rate.awake.id).toBe(2);
    expect(rate.awake.frequency).toBeCloseTo(awakeFreq * 10);
    expect(rate.awake.quantity).toBeCloseTo(durationOfDay / awakeFreq / 10);
    expect(rate.awake.energy).toBeCloseTo(durationOfDay / awakeFreq / 10 * energyMultiplier * 1251);
    expect(rate.sleep.id).toBe(2);
    expect(rate.sleep.frequency).toBeCloseTo(28800);
    expect(rate.sleep.quantity).toBeCloseTo(3);
    expect(rate.sleep.energy).toBeCloseTo(3 * energyMultiplier * 1251);
  });

  it('is correct when sleep duration < TTFP < skill freq', () => {
    const bonus = testBonus['1'];
    const rate = getMainSkillProducingRate({
      pokemon: testPokemonData.ampharos,
      frequency: 6336,
      calculatedSettings: {
        ...testDefaultCalculatedUserSettings,
        bonus,
        sleepDurationInfo: {
          durations: [14400],
          total: 14400,
        },
      },
      energyMultiplier: getEnergyMultiplier({bonus}),
      subSkillBonus: {},
      skillRatePercent: 10,
      natureId: null,
      skillLevel: 2,
      skillData: testMainSkillMap['2'],
      timeToFullPack: 21600,
    });

    // Skill freq = 28800
    const awakeFreq = 6336 / bonus.stamina.awake;
    const energyMultiplier = getEnergyMultiplier({bonus});

    expect(rate.id).toBe(2);
    expect(rate.awake.id).toBe(2);
    expect(rate.awake.frequency).toBeCloseTo(awakeFreq * 10);
    expect(rate.awake.quantity).toBeCloseTo(durationOfDay / awakeFreq / 10);
    expect(rate.awake.energy).toBeCloseTo(durationOfDay / awakeFreq / 10 * energyMultiplier * 1251);
    expect(rate.sleep.id).toBe(2);
    expect(rate.sleep.frequency).toBeCloseTo(28800);
    expect(rate.sleep.quantity).toBeCloseTo(3);
    expect(rate.sleep.energy).toBeCloseTo(3 * energyMultiplier * 1251);
  });
});
