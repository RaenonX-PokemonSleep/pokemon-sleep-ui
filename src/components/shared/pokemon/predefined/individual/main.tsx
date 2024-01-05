import React from 'react';

import {clsx} from 'clsx';

import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex/common';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonIndividualSelectorButtonProps} from '@/components/shared/pokemon/selector/type';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';


type Props<TFilter extends PokemonIndividualParams> = FilterWithUpdaterProps<TFilter> & {
  isPremium: boolean,
  subSkillMap: SubSkillMap,
  maxLevel: number,
  className?: string,
  noSameLine?: boolean,
};

export const PokemonIndividualParamsPicker = <TFilter extends PokemonIndividualParams>({
  filter,
  setFilter,
  isPremium,
  subSkillMap,
  maxLevel,
  className,
  noSameLine,
}: Props<TFilter>) => {
  const selectorProps: PokemonIndividualSelectorButtonProps = {
    classNameForHeight: 'h-8',
    isPremium,
    requirePremium: true,
  };

  return (
    <Flex className={clsx('gap-1.5', className)}>
      <PokemonLevelSlider
        value={filter.level}
        setValue={(level) => setFilter((original): TFilter => ({
          ...original,
          level,
        }))}
        max={maxLevel}
        noSameLine={
          noSameLine}
      />
      <Flex className="gap-1.5 sm:flex-row">
        <PokemonSubSkillSelector
          subSkill={filter.subSkill}
          setSubSkill={(subSkill) => setFilter((original): TFilter => ({
            ...original,
            subSkill,
          }))}
          subSkillMap={subSkillMap}
          {...selectorProps}
        />
        <PokemonNatureSelector
          nature={filter.nature}
          setNature={(nature) => setFilter((original): TFilter => ({
            ...original,
            nature,
          }))}
          {...selectorProps}
        />
      </Flex>
    </Flex>
  );
};
