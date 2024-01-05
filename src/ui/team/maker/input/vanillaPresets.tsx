import React from 'react';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {PokemonIndividualParamsPicker} from '@/components/shared/pokemon/predefined/individual/main';
import {TeamMakerInputCommonProps} from '@/ui/team/maker/input/type';


export const TeamMakerInputVanillaPresets = ({
  subSkillMap,
  pokemonMaxLevel,
  input,
  setInput,
}: TeamMakerInputCommonProps) => {
  const {
    source,
    vanillaPresets,
  } = input;

  return (
    <AnimatedCollapse show={source === 'vanilla'}>
      <PokemonIndividualParamsPicker
        filter={vanillaPresets}
        setFilter={(getUpdated) => setInput(({vanillaPresets, ...original}) => ({
          ...original,
          vanillaPresets: getUpdated(vanillaPresets),
        }))}
        isPremium
        subSkillMap={subSkillMap}
        maxLevel={pokemonMaxLevel}
        className="bg-plate"
        noSameLine={false}
      />
    </AnimatedCollapse>
  );
};
