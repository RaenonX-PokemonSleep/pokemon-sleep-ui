import React from 'react';

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex/common';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonFilter} from '@/components/shared/pokemon/filter/main';
import {PokemonNatureEffectInput} from '@/components/shared/pokemon/nature/input/effect';
import {PokemonSubSkillFilter} from '@/components/shared/pokemon/subSkill/input';
import {inputSectionHeight, pokeboxInputDimension} from '@/ui/team/pokebox/const';
import {PokeboxViewerInputCommonProps} from '@/ui/team/pokebox/viewer/type';


export const PokeboxViewerFilterUI = (props: PokeboxViewerInputCommonProps) => {
  const {
    filter,
    setFilter,
  } = props;

  const filterCollapsible = useCollapsible();
  const t = useTranslations('UI.InPage.Pokedex');

  return (
    <Collapsible state={filterCollapsible} classNameForHeight={inputSectionHeight} button={
      <Flex direction="row" center className="gap-0.5">
        <GenericPokeballIcon alt="Pokemon" dimension={pokeboxInputDimension}/>
        <EyeIcon className={pokeboxInputDimension}/>
        <FunnelIcon className={pokeboxInputDimension}/>
      </Flex>
    }>
      <Flex className="gap-1 pr-1">
        <InputRowWithTitle title={t('Info.Name')}>
          <InputBox type="text" value={filter.name} onChange={({target}) => setFilter((original) => ({
            ...original,
            name: target.value,
          }))}/>
        </InputRowWithTitle>
        <PokemonFilter
          {...props}
        />
        <PokemonSubSkillFilter {...props} filterKey="subSkill"/>
        <PokemonNatureEffectInput {...props} direction="buff" filterKey="natureBuff"/>
        <PokemonNatureEffectInput {...props} direction="nerf" filterKey="natureNerf"/>
      </Flex>
    </Collapsible>
  );
};
