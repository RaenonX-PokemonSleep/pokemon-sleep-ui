export type PokemonIndividualSelectorButtonProps = {
  classNameForHeight?: string,
} & ({
  isPremium?: never,
  requirePremium?: never,
} | {
  isPremium: boolean,
  requirePremium: true,
});
