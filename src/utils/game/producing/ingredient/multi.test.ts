import {describe, expect, it} from '@jest/globals';

import {durationOfDay} from '@/const/common';
import {testBonus} from '@/tests/data/game/bonus';
import {testIngredientMap} from '@/tests/data/game/ingredient/data';
import {testIngredientProductions} from '@/tests/data/game/ingredient/production';
import {testPokemonData} from '@/tests/data/game/pokemon';
import {testDefaultCalculatedUserSettings} from '@/tests/data/user/settings';
import {getIngredientProducingRates} from '@/utils/game/producing/ingredient/multi';
import {getEnergyMultiplier} from '@/utils/game/producing/multiplier';


describe('Ingredient Production / Multiple', () => {
  it('is correct using general test data', () => {
    const bonus = testBonus['1'];
    const rate = getIngredientProducingRates({
      level: 30,
      pokemon: testPokemonData.absol,
      frequency: 2920.2,
      calculatedSettings: {
        ...testDefaultCalculatedUserSettings,
        bonus,
      },
      energyMultiplier: getEnergyMultiplier({bonus}),
      ingredients: testIngredientProductions.general,
      ingredientMap: testIngredientMap,
    });

    const awakeFreq = 2920.2 / bonus.stamina.awake;
    const sleepFreq = 2920.2 / bonus.stamina.sleep;
    const energyMultiplier = getEnergyMultiplier({bonus});

    expect(rate[0].id).toBe(5);
    expect(rate[0].awake.id).toBe(5);
    expect(rate[0].awake.frequency).toBeCloseTo(awakeFreq * 2);
    expect(rate[0].awake.quantity).toBeCloseTo(durationOfDay / (awakeFreq * 2) * 8);
    expect(rate[0].awake.energy).toBeCloseTo(durationOfDay / (awakeFreq * 2) * 8 * 90 * energyMultiplier);
    expect(rate[0].sleep.id).toBe(5);
    expect(rate[0].sleep.frequency).toBeCloseTo(sleepFreq * 2);
    expect(rate[0].sleep.quantity).toBeCloseTo(durationOfDay / (sleepFreq * 2) * 8);
    expect(rate[0].sleep.energy).toBeCloseTo(durationOfDay / (sleepFreq * 2) * 8 * 90 * energyMultiplier);
    expect(rate[1].id).toBe(13);
    expect(rate[1].awake.id).toBe(13);
    expect(rate[1].awake.frequency).toBeCloseTo(awakeFreq * 2);
    expect(rate[1].awake.quantity).toBeCloseTo(durationOfDay / (awakeFreq * 2) * 2);
    expect(rate[1].awake.energy).toBeCloseTo(durationOfDay / (awakeFreq * 2) * 2 * 151 * energyMultiplier);
    expect(rate[1].sleep.id).toBe(13);
    expect(rate[1].sleep.frequency).toBeCloseTo(sleepFreq * 2);
    expect(rate[1].sleep.quantity).toBeCloseTo(durationOfDay / (sleepFreq * 2) * 2);
    expect(rate[1].sleep.energy).toBeCloseTo(durationOfDay / (sleepFreq * 2) * 2 * 151 * energyMultiplier);
  });

  it('has correct frequency for Absol of (A1) Cocoa x 2', () => {
    const bonus = testBonus['1'];
    const rate = getIngredientProducingRates({
      level: 1,
      pokemon: testPokemonData.absol,
      frequency: 2920.2,
      calculatedSettings: {
        ...testDefaultCalculatedUserSettings,
        bonus,
      },
      energyMultiplier: getEnergyMultiplier({bonus}),
      ingredients: testIngredientProductions.a1,
      ingredientMap: testIngredientMap,
    });

    const awakeFreq = 2920.2 / bonus.stamina.awake;
    const sleepFreq = 2920.2 / bonus.stamina.sleep;

    expect(rate[0].id).toBe(13);
    expect(rate[0].awake.id).toBe(13);
    expect(rate[0].awake.frequency).toBeCloseTo(awakeFreq);
    expect(rate[0].awake.quantity).toBeCloseTo(durationOfDay / awakeFreq * 2);
    expect(rate[0].sleep.id).toBe(13);
    expect(rate[0].sleep.frequency).toBeCloseTo(sleepFreq);
    expect(rate[0].sleep.quantity).toBeCloseTo(durationOfDay / sleepFreq * 2);
  });

  it('has correct frequency for Absol of (A2) Cocoa x 2; Cocoa x 5', () => {
    const bonus = testBonus['1'];
    const rate = getIngredientProducingRates({
      level: 30,
      pokemon: testPokemonData.absol,
      frequency: 2920.2,
      calculatedSettings: {
        ...testDefaultCalculatedUserSettings,
        bonus,
      },
      energyMultiplier: getEnergyMultiplier({bonus}),
      ingredients: testIngredientProductions.a2,
      ingredientMap: testIngredientMap,
    });

    const awakeFreq = 2920.2 / bonus.stamina.awake;
    const sleepFreq = 2920.2 / bonus.stamina.sleep;

    expect(rate[0].id).toBe(13);
    expect(rate[0].awake.id).toBe(13);
    expect(rate[0].awake.frequency).toBeCloseTo(awakeFreq);
    expect(rate[0].awake.quantity).toBeCloseTo(durationOfDay / (awakeFreq * 2) * 7);
    expect(rate[0].sleep.id).toBe(13);
    expect(rate[0].sleep.frequency).toBeCloseTo(sleepFreq);
    expect(rate[0].sleep.quantity).toBeCloseTo(durationOfDay / (sleepFreq * 2) * 7);
  });

  it('has correct frequency for Absol of (A1B1) Cocoa x 2; Apple x 8', () => {
    const bonus = testBonus['1'];
    const rate = getIngredientProducingRates({
      level: 30,
      pokemon: testPokemonData.absol,
      frequency: 2920.2,
      calculatedSettings: {
        ...testDefaultCalculatedUserSettings,
        bonus,
      },
      energyMultiplier: getEnergyMultiplier({bonus}),
      ingredients: testIngredientProductions.a1b1,
      ingredientMap: testIngredientMap,
    });

    const awakeFreq = 2920.2 / bonus.stamina.awake;
    const sleepFreq = 2920.2 / bonus.stamina.sleep;

    expect(rate[0].id).toBe(5);
    expect(rate[0].awake.id).toBe(5);
    expect(rate[0].awake.frequency).toBeCloseTo(awakeFreq * 2);
    expect(rate[0].awake.quantity).toBeCloseTo(durationOfDay / (awakeFreq * 2) * 8);
    expect(rate[0].sleep.id).toBe(5);
    expect(rate[0].sleep.frequency).toBeCloseTo(sleepFreq * 2);
    expect(rate[0].sleep.quantity).toBeCloseTo(durationOfDay / (sleepFreq * 2) * 8);
    expect(rate[1].id).toBe(13);
    expect(rate[1].awake.id).toBe(13);
    expect(rate[1].awake.frequency).toBeCloseTo(awakeFreq * 2);
    expect(rate[1].awake.quantity).toBeCloseTo(durationOfDay / (awakeFreq * 2) * 2);
    expect(rate[1].sleep.id).toBe(13);
    expect(rate[1].sleep.frequency).toBeCloseTo(sleepFreq * 2);
    expect(rate[1].sleep.quantity).toBeCloseTo(durationOfDay / (sleepFreq * 2) * 2);
  });

  it('has correct frequency for Absol of (A3) Cocoa x 2; Cocoa x 5; Cocoa x 7', () => {
    const bonus = testBonus['1'];
    const rate = getIngredientProducingRates({
      level: 30,
      pokemon: testPokemonData.absol,
      frequency: 2920.2,
      calculatedSettings: {
        ...testDefaultCalculatedUserSettings,
        bonus,
      },
      energyMultiplier: getEnergyMultiplier({bonus}),
      ingredients: testIngredientProductions.a3,
      ingredientMap: testIngredientMap,
    });

    const awakeFreq = 2920.2 / bonus.stamina.awake;
    const sleepFreq = 2920.2 / bonus.stamina.sleep;

    expect(rate[0].id).toBe(13);
    expect(rate[0].awake.id).toBe(13);
    expect(rate[0].awake.frequency).toBeCloseTo(awakeFreq);
    expect(rate[0].awake.quantity).toBeCloseTo(durationOfDay / (awakeFreq * 3) * 14);
    expect(rate[0].sleep.id).toBe(13);
    expect(rate[0].sleep.frequency).toBeCloseTo(sleepFreq);
    expect(rate[0].sleep.quantity).toBeCloseTo(durationOfDay / (sleepFreq * 3) * 14);
  });

  it('has correct frequency for Absol of (A2B1) Cocoa x 2; Cocoa x 5; Apple x 12', () => {
    const bonus = testBonus['1'];
    const rate = getIngredientProducingRates({
      level: 30,
      pokemon: testPokemonData.absol,
      frequency: 2920.2,
      calculatedSettings: {
        ...testDefaultCalculatedUserSettings,
        bonus,
      },
      energyMultiplier: getEnergyMultiplier({bonus}),
      ingredients: testIngredientProductions.a2b1,
      ingredientMap: testIngredientMap,
    });

    const awakeFreq = 2920.2 / bonus.stamina.awake;
    const sleepFreq = 2920.2 / bonus.stamina.sleep;

    expect(rate[0].id).toBe(5);
    expect(rate[0].awake.id).toBe(5);
    expect(rate[0].awake.frequency).toBeCloseTo(awakeFreq * 3);
    expect(rate[0].awake.quantity).toBeCloseTo(durationOfDay / (awakeFreq * 3) * 12);
    expect(rate[0].sleep.id).toBe(5);
    expect(rate[0].sleep.frequency).toBeCloseTo(sleepFreq * 3);
    expect(rate[0].sleep.quantity).toBeCloseTo(durationOfDay / (sleepFreq * 3) * 12);
    expect(rate[1].id).toBe(13);
    expect(rate[1].awake.id).toBe(13);
    expect(rate[1].awake.frequency).toBeCloseTo(awakeFreq * (3 / 2));
    expect(rate[1].awake.quantity).toBeCloseTo(durationOfDay / (awakeFreq * 3) * 7);
    expect(rate[1].sleep.id).toBe(13);
    expect(rate[1].sleep.frequency).toBeCloseTo(sleepFreq * (3 / 2));
    expect(rate[1].sleep.quantity).toBeCloseTo(durationOfDay / (sleepFreq * 3) * 7);
  });

  it('has correct frequency for Absol of (A1B1C1) Cocoa x 2; Apple x 8; Mushroom x 7', () => {
    const bonus = testBonus['1'];
    const rate = getIngredientProducingRates({
      level: 30,
      pokemon: testPokemonData.absol,
      frequency: 2920.2,
      calculatedSettings: {
        ...testDefaultCalculatedUserSettings,
        bonus,
      },
      energyMultiplier: getEnergyMultiplier({bonus}),
      ingredients: testIngredientProductions.a1b1c1,
      ingredientMap: testIngredientMap,
    });

    const awakeFreq = 2920.2 / bonus.stamina.awake;
    const sleepFreq = 2920.2 / bonus.stamina.sleep;

    expect(rate[0].id).toBe(2);
    expect(rate[0].awake.id).toBe(2);
    expect(rate[0].awake.frequency).toBeCloseTo(awakeFreq * 3);
    expect(rate[0].awake.quantity).toBeCloseTo(durationOfDay / (awakeFreq * 3) * 7);
    expect(rate[0].sleep.id).toBe(2);
    expect(rate[0].sleep.frequency).toBeCloseTo(sleepFreq * 3);
    expect(rate[0].sleep.quantity).toBeCloseTo(durationOfDay / (sleepFreq * 3) * 7);
    expect(rate[1].id).toBe(5);
    expect(rate[1].awake.id).toBe(5);
    expect(rate[1].awake.frequency).toBeCloseTo(awakeFreq * 3);
    expect(rate[1].awake.quantity).toBeCloseTo(durationOfDay / (awakeFreq * 3) * 8);
    expect(rate[1].sleep.id).toBe(5);
    expect(rate[1].sleep.frequency).toBeCloseTo(sleepFreq * 3);
    expect(rate[1].sleep.quantity).toBeCloseTo(durationOfDay / (sleepFreq * 3) * 8);
    expect(rate[2].id).toBe(13);
    expect(rate[2].awake.id).toBe(13);
    expect(rate[2].awake.frequency).toBeCloseTo(awakeFreq * 3);
    expect(rate[2].awake.quantity).toBeCloseTo(durationOfDay / (awakeFreq * 3) * 2);
    expect(rate[2].sleep.id).toBe(13);
    expect(rate[2].sleep.frequency).toBeCloseTo(sleepFreq * 3);
    expect(rate[2].sleep.quantity).toBeCloseTo(durationOfDay / (sleepFreq * 3) * 2);
  });
});
