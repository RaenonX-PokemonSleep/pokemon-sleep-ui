import React from 'react';

import {clsx} from 'clsx';

import {PokemonNameSmall} from '@/components/shared/pokemon/name/small';
import {pokeInBoxFavoriteStyle} from '@/styles/game/pokebox';
import {PokeInBox} from '@/types/game/pokebox/main';
import {PokemonInfo} from '@/types/game/pokemon';


type Props = {
  pokeInBox: PokeInBox,
  pokemon: PokemonInfo,
};

export const PokeInBoxMeta = ({pokemon, pokeInBox}: Props) => {
  const {isFavorite} = pokeInBox;

  return (
    <PokemonNameSmall
      pokemon={pokemon}
      override={pokeInBox.name}
      className={clsx(isFavorite && pokeInBoxFavoriteStyle)}
    />
  );
};
