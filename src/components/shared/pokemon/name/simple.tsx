import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PokemonNameIcons} from '@/components/shared/pokemon/name/icons';
import {PokemonNameProps} from '@/components/shared/pokemon/name/type';


export const PokemonNameSimple = ({pokemon, override}: PokemonNameProps) => {
  const {id} = pokemon;

  const t = useTranslations('Game');

  return (
    <Flex direction="row" center className="gap-0.5">
      <PokemonNameIcons pokemon={pokemon} dimension="h-5 w-5"/>
      <div className="truncate">
        {override ?? t(`PokemonName.${id}`)}
      </div>
      <div className="self-end text-sm text-slate-500">
        #{id}
      </div>
    </Flex>
  );
};
