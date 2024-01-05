import {v4} from 'uuid';

import {defaultCommonConstPokeInBox} from '@/const/user/pokebox';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {PokeInBox} from '@/types/userData/pokebox/main';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon/evolution';
import {generatePossibleIngredientProductionAtLevels} from '@/utils/game/producing/ingredient/chain';


export type GeneratePokeboxFromBaseOpts = PokemonIndividualParams & {
  ingredientChainMap: IngredientChainMap,
  pokemonList: PokemonInfo[],
};

export const generatePokeboxFromBase = ({
  ingredientChainMap,
  pokemonList,
  level,
  subSkill,
  nature,
}: GeneratePokeboxFromBaseOpts): PokeInBox[] => {
  const pokeboxList: PokeInBox[] = [];

  for (const pokemonInfo of pokemonList) {
    for (const ingredients of generatePossibleIngredientProductionAtLevels({
      level,
      chain: ingredientChainMap[pokemonInfo.ingredientChain],
    })) {
      pokeboxList.push({
        uuid: v4(),
        dateAdded: Date.now(),
        pokemon: pokemonInfo.id,
        name: null,
        level,
        ingredients,
        evolutionCount: getEvolutionCountFromPokemonInfo({pokemon: pokemonInfo}),
        subSkill,
        nature,
        ...defaultCommonConstPokeInBox,
      });
    }
  }

  return pokeboxList;
};
