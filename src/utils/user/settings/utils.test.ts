import {describe, expect, it} from '@jest/globals';

import {specialtyIdMap} from '@/const/game/pokemon';
import {isFullPackEffective} from '@/utils/user/settings/utils';


describe('Settings / Is Full Pack Effective', () => {
  it('is correct for berry specialists', () => {
    expect(isFullPackEffective({
      fullPackBehavior: 'always',
      specialty: specialtyIdMap.berry,
    })).toBeTruthy();
    expect(isFullPackEffective({
      fullPackBehavior: 'berryOnly',
      specialty: specialtyIdMap.berry,
    })).toBeTruthy();
    expect(isFullPackEffective({
      fullPackBehavior: 'disable',
      specialty: specialtyIdMap.berry,
    })).toBeFalsy();
  });

  it('is correct for ingredient specialists', () => {
    expect(isFullPackEffective({
      fullPackBehavior: 'always',
      specialty: specialtyIdMap.ingredient,
    })).toBeTruthy();
    expect(isFullPackEffective({
      fullPackBehavior: 'berryOnly',
      specialty: specialtyIdMap.ingredient,
    })).toBeFalsy();
    expect(isFullPackEffective({
      fullPackBehavior: 'disable',
      specialty: specialtyIdMap.ingredient,
    })).toBeFalsy();
  });

  it('is correct for skill specialists', () => {
    expect(isFullPackEffective({
      fullPackBehavior: 'always',
      specialty: specialtyIdMap.skill,
    })).toBeTruthy();
    expect(isFullPackEffective({
      fullPackBehavior: 'berryOnly',
      specialty: specialtyIdMap.skill,
    })).toBeFalsy();
    expect(isFullPackEffective({
      fullPackBehavior: 'disable',
      specialty: specialtyIdMap.skill,
    })).toBeFalsy();
  });
});
