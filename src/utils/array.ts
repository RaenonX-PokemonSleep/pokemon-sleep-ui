export const toUnique = <T>(arr: T[]): T[] => Array.from(new Set(arr));

export const toSum = (arr: number[]): number => arr.reduce((prev, curr) => prev + curr, 0);

export function* generateSegments<T>(size: number, arr: T[]): Generator<T[]> {
  for (let idx = 0; idx <= arr.length; idx++) {
    yield arr.slice(idx, idx + size);
  }
}
