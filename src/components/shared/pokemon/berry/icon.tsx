import React from 'react';

import {Link} from '@/components/i18n/exports';
import {PokemonBerryIconNoLink} from '@/components/shared/pokemon/berry/iconNoLink';
import {BerryIconCommonProps} from '@/components/shared/pokemon/berry/type';


export const PokemonBerryIcon = (props: BerryIconCommonProps) => {
  const {id} = props;

  return (
    <Link scroll={false} prefetch={false} href={`/berry/${id}`} className="button-clickable">
      <PokemonBerryIconNoLink {...props}/>
    </Link>
  );
};
