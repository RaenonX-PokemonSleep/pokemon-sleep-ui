import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonProbabilityOfNoSkill} from '@/components/shared/pokemon/production/noSkill';
import {PokemonSkillProduction} from '@/components/shared/pokemon/production/skill';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {PokeInBoxGridDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/grid/details/type';
import {getRateOfPokemon} from '@/ui/team/pokebox/content/pokeInBox/utils';
import {toProducingRateOfState} from '@/utils/game/producing/convert';


export const PokeInBoxGridSkills = (props: PokeInBoxGridDetailsProps) => {
  const {
    pokemon,
    pokemonProducingParams,
    pokeInBox,
    subSkillMap,
  } = props;
  const {skill} = pokemon;
  const {level, nature, subSkill} = pokeInBox;

  const rateOfPokemon = getRateOfPokemon(props);

  return (
    <Flex noFullWidth className="gap-1">
      <Flex direction="row" noFullWidth className="gap-1.5">
        <PokemonSkillProduction
          id={skill}
          rate={toProducingRateOfState({rate: rateOfPokemon.skill, state: 'equivalent'})}
          hideStrength
          normalSize
        />
        <PokemonProbabilityOfNoSkill
          rate={rateOfPokemon}
          state="sleepVacant"
          skillPercent={pokemonProducingParams.skillPercent}
          normalSize
        />
      </Flex>
      <Flex direction="row" noFullWidth className="gap-1.5">
        <PokemonNatureIndicator nature={nature} hideName/>
        <PokemonSubSkillIndicator level={level} subSkill={subSkill} subSkillMap={subSkillMap}/>
      </Flex>
    </Flex>
  );
};
