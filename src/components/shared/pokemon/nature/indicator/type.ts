import {NatureId} from '@/types/game/pokemon/nature';
import {Dimension} from '@/types/style';


export type PokemonNatureIndicatorCommonProps = {
  nature: NatureId | null,
  hideName?: boolean,
  dimension?: Dimension,
};
