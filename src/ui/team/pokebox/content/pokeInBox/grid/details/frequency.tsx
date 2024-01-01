import React from 'react';

import {PokemonFrequencyFromProducingRate} from '@/components/shared/pokemon/frequency/fromRate';
import {PokeInBoxGridDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/grid/details/type';
import {getRateOfPokemon} from '@/ui/team/pokebox/content/pokeInBox/utils';


export const PokeInBoxGridFrequency = (props: PokeInBoxGridDetailsProps) => {
  const pokemonRate = getRateOfPokemon(props);

  return <PokemonFrequencyFromProducingRate pokemonRate={pokemonRate} normalText/>;
};
