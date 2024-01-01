import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {PokemonSubSkillIcon} from '@/components/shared/pokemon/subSkill/icon';
import {PokemonSubSkill, pokemonSubSkillLevel, SubSkillMap} from '@/types/game/pokemon/subSkill';
import {Dimension} from '@/types/style';


type Props = {
  subSkill: PokemonSubSkill,
  subSkillMap: SubSkillMap,
  level?: number,
  dimension?: Dimension,
  className?: string,
};

export const PokemonSubSkillIndicator = ({subSkill, subSkillMap, level, dimension, className}: Props) => {
  const t = useTranslations('UI.InPage.Team');

  return (
    <Flex direction="row" noFullWidth className={clsx('items-center gap-1 p-0.5', className)}>
      <GenericIcon
        alt={t('SubSkill')}
        src="/images/generic/subSkill.png"
        className="invert-hoverable relative"
        dimension={dimension}
      />
      <Flex direction="row" noFullWidth className="items-center">
        {pokemonSubSkillLevel.map((subSkillLevel) => {
          const subSkillId = subSkill[subSkillLevel];

          return (
            <PokemonSubSkillIcon
              key={subSkillLevel}
              subSkill={subSkillId ? subSkillMap[subSkillId] : undefined}
              isInactive={!!level && subSkillLevel > level}
              dimension={dimension}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};
