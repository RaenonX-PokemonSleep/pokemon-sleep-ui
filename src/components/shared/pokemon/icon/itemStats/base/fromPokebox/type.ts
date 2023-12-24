import {Filter} from 'mongodb';

import {PokemonItemStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/base/type';
import {PokemonProducingStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/type';
import {PokeInBox} from '@/types/game/pokebox/main';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokeInBoxData} from '@/types/mongo/pokebox/main';


export type PokemonItemStatsFromPokeboxFilterOpts = {
  pokeInBox: PokeInBox,
  pokemonInfo: PokemonInfo,
};

export type PokemonItemStatsFromPokeboxCommonProps =
  Omit<PokemonProducingStatsCommonProps, 'pokemonIngredientProduction'> &
  PokemonItemStatsCommonProps & {
    pokeInBoxList: PokeInBox[],
    filter: {
      external: Filter<PokeInBoxData>,
      internal: (opts: PokemonItemStatsFromPokeboxFilterOpts) => boolean,
    },
  };
