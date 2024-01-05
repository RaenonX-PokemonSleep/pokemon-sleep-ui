import {v4} from 'uuid';

import {defaultCommonConstPokeInBox} from '@/const/user/pokebox';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {PokeInBox} from '@/types/userData/pokebox/main';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon/evolution';
import {generateDefaultIngredientProductionAtLevels} from '@/utils/game/producing/ingredient/chain';


type GenerateNewPokeInBoxOpts = {
  pokemon: PokemonInfo,
  ingredientChainMap: IngredientChainMap,
};

export const generateNewPokeInBox = ({pokemon, ingredientChainMap}: GenerateNewPokeInBoxOpts): PokeInBox => {
  const {id, ingredientChain} = pokemon;
  const chain = ingredientChainMap[ingredientChain];

  return {
    ...defaultCommonConstPokeInBox,
    uuid: v4(),
    dateAdded: Date.now(),
    pokemon: id,
    name: null,
    level: 1,
    ingredients: generateDefaultIngredientProductionAtLevels(chain),
    evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
    subSkill: {},
    nature: null,
  };
};
