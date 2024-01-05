import {useTranslations} from 'next-intl';

import {PokemonId} from '@/types/game/pokemon';
import {PokemonBranchData} from '@/types/game/pokemon/branch';
import {SleepStyleId} from '@/types/game/sleepStyle';
import {getPokemonIdForSleepStyle} from '@/utils/game/pokemon/sleepStyle';
import {Nullable} from '@/utils/type';


type UseSleepStyleNameOpts = {
  pokemonId: PokemonId,
  pokemonBranch: Nullable<PokemonBranchData>,
  sleepStyleId: SleepStyleId | null,
};

export const useSleepStyleName = ({pokemonId, pokemonBranch, sleepStyleId}: UseSleepStyleNameOpts) => {
  const pokemonIdForSleepStyle = getPokemonIdForSleepStyle({
    pokemonId,
    pokemonBranch,
  });

  const t = useTranslations(`Game.SleepFace.${pokemonIdForSleepStyle}`);
  const t2 = useTranslations('Game.SleepFace.onSnorlax');

  if (!sleepStyleId) {
    return null;
  }

  if (sleepStyleId === 'onSnorlax') {
    return t2('Default');
  }

  return t(sleepStyleId.toString());
};
