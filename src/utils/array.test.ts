import {describe, expect, it} from '@jest/globals';

import {generateSegments} from '@/utils/array';


describe('Array / Generate Segments', () => {
  it('is correct when segment size < array size', () => {
    const result = [...generateSegments(2, [1, 2, 3, 4])];

    expect(result[0]).toStrictEqual([1, 2]);
    expect(result[1]).toStrictEqual([2, 3]);
    expect(result[2]).toStrictEqual([3, 4]);
  });

  it('is correct when segment size = array size', () => {
    const result = [...generateSegments(4, [1, 2, 3, 4])];

    expect(result[0]).toStrictEqual([1, 2, 3, 4]);
  });

  it('is correct when segment size > array size', () => {
    const result = [...generateSegments(4, [1, 2])];

    expect(result[0]).toStrictEqual([1, 2]);
  });

  it('is correct when the target array is empty', () => {
    const result = [...generateSegments(2, [])];

    expect(result[0]).toStrictEqual([]);
  });
});
