export type AdsContentProps = {
  className?: string,
  heightOverride?: string,
};

export type AdsUnitProps = AdsContentProps & {
  alwaysSingle?: boolean,
};

export type AdBlockState = {
  isBlocked: boolean,
  found: boolean,
};
