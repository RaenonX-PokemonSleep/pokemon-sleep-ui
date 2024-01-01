import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {PokemonTimeToFullPack} from '@/components/shared/pokemon/fullPack/main';
import {PokeInBoxGridDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/grid/details/type';
import {getRateOfPokemon} from '@/ui/team/pokebox/content/pokeInBox/utils';


export const PokeInBoxGridMaxCarry = (props: PokeInBoxGridDetailsProps) => {
  const t = useTranslations('UI.Common');

  const {fullPackStats, carryLimitInfo} = getRateOfPokemon(props);

  return (
    <Flex noFullWidth className="gap-1">
      <Flex direction="row" noFullWidth className="gap-0.5">
        <GenericIconLarger src="/images/generic/bag.png" alt={t('MaxCarry')}/>
        <div>{carryLimitInfo.final}</div>
      </Flex>
      <PokemonTimeToFullPack timeToFullPack={fullPackStats.secondsToFull} normalText/>
    </Flex>
  );
};
