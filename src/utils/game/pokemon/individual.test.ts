import {describe, expect, it} from '@jest/globals';

import {mergeIndividualParams} from '@/utils/game/pokemon/individual';


describe('Pokemon / Individual Params Merging', () => {
  it('does not override base subskill with `undefined` subskill in `override`', () => {
    const result = mergeIndividualParams({
      base: {level: 1, nature: null, subSkill: {25: 7}},
      override: {level: 30, nature: 7, subSkill: {10: 1, 25: undefined}},
    });

    expect(result.level).toBe(30);
    expect(result.nature).toBe(7);
    expect(result.subSkill).toMatchObject({10: 1, 25: 7});
  });

  it('overrides `undefined` subskill in `base`', () => {
    const result = mergeIndividualParams({
      base: {level: 1, nature: null, subSkill: {10: undefined}},
      override: {level: 30, nature: 7, subSkill: {10: 1, 25: undefined}},
    });

    expect(result.level).toBe(30);
    expect(result.nature).toBe(7);
    expect(result.subSkill).toMatchObject({10: 1});
  });

  it('does not override nature if `override` nature is `null`', () => {
    const result = mergeIndividualParams({
      base: {level: 1, nature: 7, subSkill: {10: undefined}},
      override: {level: 30, nature: null, subSkill: {10: 1, 25: undefined}},
    });

    expect(result.level).toBe(30);
    expect(result.nature).toBe(7);
    expect(result.subSkill).toMatchObject({10: 1});
  });

  it('overrides `null` nature in `base`', () => {
    const result = mergeIndividualParams({
      base: {level: 1, nature: null, subSkill: {}},
      override: {level: 30, nature: 7, subSkill: {10: 1}},
    });

    expect(result.level).toBe(30);
    expect(result.nature).toBe(7);
    expect(result.subSkill).toMatchObject({10: 1});
  });
});
