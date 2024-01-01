import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {PokemonProducingRate} from '@/types/game/producing/rate';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export type PokeInBoxTableDetailsProps = PokeInBoxCommonProps & {
  isLevelPreview: boolean,
  rateOfPokemon: PokemonProducingRate,
  display: PokeboxViewerDisplay,
  pokemonProducingParams: PokemonProducingParams,
};
