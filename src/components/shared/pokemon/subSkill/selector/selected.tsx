import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PokemonSubSkillIcon} from '@/components/shared/pokemon/subSkill/icon';
import {subSkillRarityDisabled, subSkillRaritySectionBg} from '@/styles/game/subSkill';
import {SubSkillData} from '@/types/game/pokemon/subSkill';


type Props = {
  level: number,
  selected: SubSkillData | undefined,
  onClick: () => void,
};

export const PokemonSubSkillSelected = ({level, selected, onClick}: Props) => {
  const t = useTranslations('Game.SubSkill.Name');

  return (
    <button onClick={onClick} disabled={!selected || !selected?.rarity} className={clsx(
      'enabled:button-clickable rounded-lg p-1.5',
      selected?.rarity ? subSkillRaritySectionBg[selected.rarity] : subSkillRarityDisabled,
    )}>
      <Flex direction="row" className="items-center gap-2 md:flex-col">
        <div className="text-sm">
          {level}
        </div>
        <Flex direction="row" center className="gap-1 text-sm">
          <PokemonSubSkillIcon subSkill={selected}/>
          {selected && <span>{t(selected.id.toString())}</span>}
        </Flex>
      </Flex>
    </button>
  );
};
