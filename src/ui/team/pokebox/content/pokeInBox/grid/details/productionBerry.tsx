import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {specialtyIdMap} from '@/const/game/pokemon';
import {stateOfRateToShow} from '@/ui/team/pokebox/content/pokeInBox/const';
import {PokeInBoxGridDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/grid/details/type';
import {getRateOfPokemon} from '@/ui/team/pokebox/content/pokeInBox/utils';
import {formatFloat} from '@/utils/number/format';


export const PokeInBoxGridProductionBerry = (props: PokeInBoxGridDetailsProps) => {
  const {pokemon} = props;
  const t = useTranslations('UI.InPage.Pokedex');

  const {berry} = getRateOfPokemon(props);

  return (
    <Flex direction="row" noFullWidth className={clsx(
      'w-fit items-center gap-1 p-0 pr-1.5',
      pokemon.specialty === specialtyIdMap.berry && 'info-highlight',
    )}>
      <PokemonBerryIcon id={pokemon.berry.id}/>
      <div>
        x{formatFloat(berry.quantity[stateOfRateToShow])}
      </div>
      <ColoredEnergyIcon alt={t('Stats.Energy.Name')}/>
      <div>
        {formatFloat(berry.energy[stateOfRateToShow])}
      </div>
    </Flex>
  );
};
