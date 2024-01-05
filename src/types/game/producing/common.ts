export const produceTypes = [
  'berry',
  'ingredient',
  'skill',
] as const;

export type ProduceType = typeof produceTypes[number];
