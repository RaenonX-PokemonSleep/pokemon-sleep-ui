import {v4} from 'uuid';

import {PokemonOnDeskState} from '@/components/shared/pokemon/predefined/lab/onDesk/type';
import {PokeInBox} from '@/types/game/pokebox/main';
import {PokemonInfo} from '@/types/game/pokemon';


type ToPokeInBoxOpts = {
  pokemon: PokemonInfo,
  name: string | null,
  level: number,
  setup: PokemonOnDeskState,
};

export const toPokeInBox = ({pokemon, name, level, setup}: ToPokeInBoxOpts): PokeInBox => {
  const {id} = pokemon;
  const {
    ingredients,
    nature,
    subSkill,
    evolutionCount,
  } = setup;

  // Explicit assignments to avoid extra unwanted properties
  return {
    uuid: v4(),
    dateAdded: Date.now(),
    pokemon: id,
    name,
    level,
    ingredients,
    evolutionCount,
    subSkill,
    nature,
  };
};
