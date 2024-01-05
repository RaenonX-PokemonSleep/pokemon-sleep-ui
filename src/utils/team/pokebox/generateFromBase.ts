import {v4} from 'uuid';

import {defaultCommonConstPokeInBox} from '@/const/user/pokebox';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {PokeInBox} from '@/types/userData/pokebox/main';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon/evolution';
import {generatePossibleIngredientProductionAtLevels} from '@/utils/game/producing/ingredient/chain';


export type GeneratePokeboxFromBaseOpts = {
  ingredientChainMap: IngredientChainMap,
  pokemonList: PokemonInfo[],
  generateIndividualParams: (pokemon: PokemonInfo) => PokemonIndividualParams,
};

export const generatePokeboxFromBase = ({
  ingredientChainMap,
  pokemonList,
  generateIndividualParams,
}: GeneratePokeboxFromBaseOpts): PokeInBox[] => {
  const pokeboxList: PokeInBox[] = [];

  for (const pokemonInfo of pokemonList) {
    const individualParams = generateIndividualParams(pokemonInfo);

    for (const ingredients of generatePossibleIngredientProductionAtLevels({
      level: individualParams.level,
      chain: ingredientChainMap[pokemonInfo.ingredientChain],
    })) {
      pokeboxList.push({
        uuid: v4(),
        dateAdded: Date.now(),
        pokemon: pokemonInfo.id,
        name: null,
        ingredients,
        evolutionCount: getEvolutionCountFromPokemonInfo({pokemon: pokemonInfo}),
        ...individualParams,
        ...defaultCommonConstPokeInBox,
      });
    }
  }

  return pokeboxList;
};
