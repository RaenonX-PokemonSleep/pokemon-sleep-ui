import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {FlexLink} from '@/components/layout/flex/link';
import {MainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/main';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonProbabilityOfNoSkill} from '@/components/shared/pokemon/production/noSkill';
import {PokemonSkillProduction} from '@/components/shared/pokemon/production/skill';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';
import {toProducingRateOfState} from '@/utils/game/producing/convert';


export const PokeInBoxTableSkills = ({
  pokeInBox,
  pokemon,
  subSkillMap,
  rateOfPokemon,
  pokemonProducingParams,
}: PokeInBoxTableDetailsProps) => {
  const {
    skill,
    specialty,
  } = pokemon;
  const {
    level,
    nature,
    subSkill,
  } = pokeInBox;

  const t = useTranslations('Game');

  return (
    <>
      <Flex direction="row" center noFullWidth className="w-56">
        <PokemonNatureIndicator nature={nature}/>
      </Flex>
      <Flex direction="row" center noFullWidth className="w-36">
        <PokemonSubSkillIndicator level={level} subSkill={subSkill} subSkillMap={subSkillMap}/>
      </Flex>
      <FlexLink direction="row" center href={`/info/mainskill/${skill}`} className={clsx(
        'w-64 gap-1 whitespace-nowrap p-1 text-sm',
        specialty === specialtyIdMap.skill && 'info-highlight',
      )}>
        <MainSkillIcon id={skill} dimension="h-6 w-6"/>
        <div>{t(`MainSkill.Name.${skill}`)}</div>
      </FlexLink>
      <Flex center noFullWidth className="w-14">
        <PokemonSkillProduction
          id={skill}
          rate={toProducingRateOfState({rate: rateOfPokemon.skill, state: 'equivalent'})}
          hideStrength
          normalSize
        />
      </Flex>
      <Flex center noFullWidth className="w-20">
        <PokemonProbabilityOfNoSkill
          rate={rateOfPokemon}
          state="sleepVacant"
          skillPercent={pokemonProducingParams.skillPercent}
          normalSize
        />
      </Flex>
    </>
  );
};
