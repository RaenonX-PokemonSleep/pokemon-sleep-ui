import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export type PokeInBoxGridDetailsProps = PokeInBoxCommonProps & {
  pokemonProducingParams: PokemonProducingParams,
};
