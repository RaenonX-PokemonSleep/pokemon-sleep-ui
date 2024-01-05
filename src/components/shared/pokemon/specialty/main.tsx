import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PokemonSpecialtyIcon} from '@/components/shared/pokemon/specialty/icon';
import {PokemonSpecialtyCommonProps} from '@/components/shared/pokemon/specialty/type';
import {getSpecialtyTextClass} from '@/styles/game/specialty';


type Props = PokemonSpecialtyCommonProps & {
  hideText?: boolean,
};

export const PokemonSpecialty = ({hideText, ...props}: Props) => {
  const {specialty, active} = props;
  const t = useTranslations('Game');

  return (
    <Flex direction="row" noFullWidth className="items-center gap-1">
      <PokemonSpecialtyIcon {...props}/>
      {
        !hideText &&
        <div className={getSpecialtyTextClass(specialty, active ?? false)}>
          {t(`Specialty.${specialty}`)}
        </div>
      }
    </Flex>
  );
};
