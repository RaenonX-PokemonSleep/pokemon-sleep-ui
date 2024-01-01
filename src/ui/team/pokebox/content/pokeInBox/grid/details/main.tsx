import React from 'react';

import {PokeInBoxGridFrequency} from '@/ui/team/pokebox/content/pokeInBox/grid/details/frequency';
import {PokeInBoxGridInfo} from '@/ui/team/pokebox/content/pokeInBox/grid/details/info';
import {PokeInBoxGridMaxCarry} from '@/ui/team/pokebox/content/pokeInBox/grid/details/maxCarry';
import {PokeInBoxGridPokemon} from '@/ui/team/pokebox/content/pokeInBox/grid/details/pokemon';
import {PokeInBoxGridProductionBerry} from '@/ui/team/pokebox/content/pokeInBox/grid/details/productionBerry';
import {
  PokeInBoxGridProductionIngredient,
} from '@/ui/team/pokebox/content/pokeInBox/grid/details/productionIngredient';
import {PokeInBoxGridProductionTotal} from '@/ui/team/pokebox/content/pokeInBox/grid/details/productionTotal';
import {PokeInBoxGridRating} from '@/ui/team/pokebox/content/pokeInBox/grid/details/rating';
import {PokeInBoxGridSkills} from '@/ui/team/pokebox/content/pokeInBox/grid/details/skills';
import {PokeInBoxGridDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/grid/details/type';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';
import {getPokemonProducingParams} from '@/utils/game/producing/params';


type Props = PokeInBoxCommonProps & {
  displayType: PokeboxViewerDisplay['displayOfGrid'],
};

export const PokeInBoxDetails = ({displayType, ...props}: Props) => {
  const {
    pokemon,
    pokemonProducingParamsMap,
  } = props;

  const detailProps: PokeInBoxGridDetailsProps = {
    ...props,
    pokemonProducingParams: getPokemonProducingParams({
      pokemonId: pokemon.id,
      pokemonProducingParamsMap,
    }),
  };

  if (displayType === 'productionTotal') {
    return <PokeInBoxGridProductionTotal {...detailProps}/>;
  }

  if (displayType === 'productionBerry') {
    return <PokeInBoxGridProductionBerry {...detailProps}/>;
  }

  if (displayType === 'productionIngredient') {
    return <PokeInBoxGridProductionIngredient {...detailProps}/>;
  }

  if (displayType === 'rating') {
    return <PokeInBoxGridRating {...detailProps}/>;
  }

  if (displayType === 'skills') {
    return <PokeInBoxGridSkills {...detailProps}/>;
  }

  if (displayType === 'frequency') {
    return <PokeInBoxGridFrequency {...detailProps}/>;
  }

  if (displayType === 'maxCarry') {
    return <PokeInBoxGridMaxCarry {...detailProps}/>;
  }

  if (displayType === 'info') {
    return <PokeInBoxGridInfo {...detailProps}/>;
  }

  if (displayType === 'pokemon') {
    return <PokeInBoxGridPokemon {...detailProps}/>;
  }

  console.error(`Unhandled Pokebox poke-in-box details display type: ${displayType satisfies never}`);
};
