import React from 'react';

import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonBranchData} from '@/types/game/pokemon/branch';
import {SnorlaxRank} from '@/types/game/rank';
import {SleepdexMap} from '@/types/game/sleepdex';
import {SnorlaxDataOfMap} from '@/types/game/snorlax';


export type PokemonSleepStyleProps = {
  pokemon: PokemonInfo,
  pokemonBranch: PokemonBranchData | null,
  sleepdex: SleepdexMap,
  setSleepdex: React.Dispatch<React.SetStateAction<SleepdexMap>>,
  drowsyPowerMultiplier: number,
  snorlaxData?: SnorlaxDataOfMap,
  sleepStyleUnlockRank?: SnorlaxRank,
};
