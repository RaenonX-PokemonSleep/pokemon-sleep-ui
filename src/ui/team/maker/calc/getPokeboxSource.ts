import {PokeInBox} from '@/types/userData/pokebox/main';
import {TeamMakerCalcInitOpts} from '@/ui/team/maker/type/calc';
import {getEffectivePokemonIndividualParamsFromVanillaPreset} from '@/utils/game/pokemon/individual';
import {generatePokeboxFromBase} from '@/utils/team/pokebox/generateFromBase';
import {isNotNullish} from '@/utils/type';


export const getPokeboxSource = ({
  ingredientChainMap,
  pokedexMap,
  input,
  pokeboxList,
}: TeamMakerCalcInitOpts): PokeInBox[] => {
  const {source, vanillaPresets} = input;

  if (source === 'pokebox') {
    return pokeboxList;
  }

  if (source === 'vanilla') {
    return generatePokeboxFromBase({
      ingredientChainMap,
      pokemonList: Object.values(pokedexMap).filter(isNotNullish),
      generateIndividualParams: ({
        specialty,
      }) => getEffectivePokemonIndividualParamsFromVanillaPreset({
        vanillaPreset: vanillaPresets,
        specialty,
      }),
    });
  }

  throw new Error(`Unhandled Team Maker pokebox source type: ${source satisfies never}`);
};
