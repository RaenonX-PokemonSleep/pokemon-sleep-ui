import React from 'react';

import {NextLink} from '@/components/shared/common/link/main';
import {PokemonBerryIconNoLink} from '@/components/shared/pokemon/berry/iconNoLink';
import {BerryIconCommonProps} from '@/components/shared/pokemon/berry/type';


export const PokemonBerryIcon = (props: BerryIconCommonProps) => {
  const {id} = props;

  return (
    <NextLink href={`/berry/${id}`} className="button-clickable">
      <PokemonBerryIconNoLink {...props}/>
    </NextLink>
  );
};
