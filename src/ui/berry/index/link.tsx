import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {FlexLink} from '@/components/layout/flex/link';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonTypeIcon} from '@/components/shared/icon/pokeType';
import {PokemonBerryIconNoLink} from '@/components/shared/pokemon/berry/iconNoLink';
import {BerryData} from '@/types/game/berry';
import {formatInt} from '@/utils/number/format';


type Props = {
  berryData: BerryData,
};

export const BerryLink = ({berryData}: Props) => {
  const {id} = berryData;

  const t = useTranslations('Game.Berry');
  const t2 = useTranslations('UI.Common');

  const berryName = t(id.toString());
  const berryEnergyArray = berryData.energy.map(({energy}) => energy);

  return (
    <FlexLink
      href={`/berry/${id}`}
      direction='col'
      center
      className="button-clickable-bg w-full gap-0.5 p-1"
    >
      <Flex center className="relative">
        <div className="absolute bottom-0 right-1">
          <PokemonTypeIcon type={id} dimension="h-8 w-8"/>
        </div>
        <PokemonBerryIconNoLink id={id} dimension="h-12 w-12"/>
      </Flex>
      <div className="whitespace-nowrap p-1">
        {berryName}
      </div>
      <Flex direction="row" center className="gap-1">
        <ColoredEnergyIcon alt={t2('Strength')}/>
        <div>
          {formatInt(Math.min(...berryEnergyArray))} ~ {formatInt(Math.max(...berryEnergyArray))}
        </div>
      </Flex>
    </FlexLink>
  );
};
