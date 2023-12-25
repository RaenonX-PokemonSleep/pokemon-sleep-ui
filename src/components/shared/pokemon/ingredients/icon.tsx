import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';

import {NextLink} from '@/components/shared/common/link/main';
import {PokemonIngredientIconContent} from '@/components/shared/pokemon/ingredients/iconContent';
import {IngredientIconCommonProps} from '@/components/shared/pokemon/ingredients/type';


type Props = IngredientIconCommonProps & {
  id: number | null,
};

export const PokemonIngredientIcon = (props: Props) => {
  const {dimension, noLink, id} = props;

  if (id === null) {
    return <XCircleIcon className={dimension ?? 'h-5 w-5'}/>;
  }

  if (noLink) {
    return <PokemonIngredientIconContent {...props} id={id}/>;
  }

  return (
    // `tabIndex` -1 to avoid tab selecting
    <NextLink href={`/ingredient/${id}`} tabIndex={-1} target="_blank">
      <PokemonIngredientIconContent {...props} id={id} clickableStyle/>
    </NextLink>
  );
};
