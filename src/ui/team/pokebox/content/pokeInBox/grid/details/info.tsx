import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokeInBoxGridDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/grid/details/type';


export const PokeInBoxGridInfo = ({pokemon, pokeInBox}: PokeInBoxGridDetailsProps) => {
  const {ingredients} = pokeInBox;
  const {specialty} = pokemon;

  return (
    <Flex noFullWidth className={clsx(
      'w-fit px-1.5',
      specialty === specialtyIdMap.ingredient && 'info-highlight',
    )}>
      <PokemonIngredientIcons ingredients={[Object.values(ingredients)]} noLink/>
    </Flex>
  );
};
