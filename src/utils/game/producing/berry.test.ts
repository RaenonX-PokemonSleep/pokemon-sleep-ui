import {describe, expect, it} from '@jest/globals';

import {durationOfDay} from '@/const/common';
import {testBerryDataMap} from '@/tests/data/game/berry';
import {testBonus} from '@/tests/data/game/bonus';
import {testPokemonData} from '@/tests/data/game/pokemon';
import {testDefaultCalculatedUserSettings} from '@/tests/data/user/settings';
import {getBerryProducingRate} from '@/utils/game/producing/berry';
import {getEnergyMultiplier} from '@/utils/game/producing/multiplier';


describe('Pokemon Berry Production', () => {
  it('is correct for clean Absol', () => {
    const bonus = testBonus['1'];
    const rate = getBerryProducingRate({
      level: 30,
      pokemon: testPokemonData.absol,
      frequency: 2920.2,
      subSkillBonus: {},
      calculatedSettings: {
        ...testDefaultCalculatedUserSettings,
        bonus,
      },
      energyMultiplier: getEnergyMultiplier({bonus}),
      snorlaxFavorite: {},
      berryData: testBerryDataMap['16'],
    });

    const awakeFreq = 2920.2 / bonus.stamina.awake;
    const sleepFreq = 2920.2 / bonus.stamina.sleep;
    const berryEnergy = 63;
    const energyMultiplier = getEnergyMultiplier({bonus});

    expect(rate.id).toBe(testPokemonData.absol.berry.id);
    expect(rate.awake.id).toBe(testPokemonData.absol.berry.id);
    expect(rate.awake.frequency).toBeCloseTo(awakeFreq);
    expect(rate.awake.quantity).toBeCloseTo(durationOfDay / awakeFreq);
    expect(rate.awake.energy).toBeCloseTo(durationOfDay / awakeFreq * berryEnergy * energyMultiplier);
    expect(rate.sleep.id).toBe(testPokemonData.absol.berry.id);
    expect(rate.sleep.frequency).toBeCloseTo(sleepFreq);
    expect(rate.sleep.quantity).toBeCloseTo(durationOfDay / sleepFreq);
    expect(rate.sleep.energy).toBeCloseTo(durationOfDay / sleepFreq * berryEnergy * energyMultiplier);
  });
});
