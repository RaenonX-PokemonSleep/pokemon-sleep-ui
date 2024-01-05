import {mergeWith} from 'lodash';

import {PokemonIndividualParams} from '@/types/game/pokemon/params';


export type MergeIndividualParamsOpts = {
  base: PokemonIndividualParams,
  override: PokemonIndividualParams,
};

export const mergeIndividualParams = ({
  base,
  override,
}: MergeIndividualParamsOpts): PokemonIndividualParams => {
  return {
    level: override.level,
    subSkill: mergeWith(
      {}, base.subSkill, override.subSkill,
      // Omit `null`
      // https://stackoverflow.com/a/44034059
      (a, b) => b === null ? a : undefined,
    ),
    nature: override.nature ?? base.nature,
  };
};
