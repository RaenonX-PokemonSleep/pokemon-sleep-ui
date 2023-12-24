import {PokemonIndividualParamsInput} from '@/components/shared/pokemon/predefined/individual/type';
import {defaultNeutralOpts, defaultProducingParams} from '@/const/game/production';
import {defaultSeedUsage} from '@/const/game/seed';
import {PokeInBox} from '@/types/game/pokebox/main';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonProducingParams, PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {GroupedSubSkillBonus, PokemonSubSkill, SubSkillMap} from '@/types/game/pokemon/subSkill';
import {
  ProducingRateImplicitParams,
  ProducingRateIndividualParams,
  ProducingRateSingleParams,
} from '@/types/game/producing/rate';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon';
import {getSubSkillBonus, getSubSkillBonusValue} from '@/utils/game/subSkill/effect';


type GetHelpingBonusStackOpts = {
  subSkillBonus: GroupedSubSkillBonus,
};

export const getHelpingBonusStack = ({
  subSkillBonus,
}: GetHelpingBonusStackOpts) => {
  const helperBonusCount = getSubSkillBonusValue(subSkillBonus, 'helper').length;

  if (!helperBonusCount) {
    return 0;
  }

  return helperBonusCount;
};

export type GetProducingRateSingleParamsOpts = {
  level: number,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
  subSkillMap: SubSkillMap,
};

export const getProducingRateSingleParams = ({
  level,
  subSkill,
  nature,
  subSkillMap,
}: GetProducingRateSingleParamsOpts): ProducingRateSingleParams => {
  const subSkillBonus = getSubSkillBonus({level, pokemonSubSkill: subSkill, subSkillMap});

  return {
    subSkillBonus,
    natureId: nature,
  };
};

type GetProducingRateNeutralParamsOpts = {
  pokemon: PokemonInfo,
};

export const getProducingRateNeutralParams = ({
  pokemon,
}: GetProducingRateNeutralParamsOpts): ProducingRateSingleParams & ProducingRateImplicitParams => {
  return {
    ...defaultNeutralOpts,
    seeds: defaultSeedUsage,
    evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
  };
};

type GetProducingRateIndividualParamsOpts = {
  input: PokemonIndividualParamsInput,
  pokemon: PokemonInfo,
  subSkillMap: SubSkillMap,
};

export const getProducingRateIndividualParams = ({
  input,
  pokemon,
  subSkillMap,
}: GetProducingRateIndividualParamsOpts): ProducingRateIndividualParams => {
  return {
    level: input.level,
    seeds: defaultSeedUsage,
    evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
    ...getProducingRateSingleParams({
      ...input,
      subSkillMap,
    }),
  };
};

type GetProducingRateImplicitParamsFromPokeboxOpts = {
  pokeInBox: PokeInBox,
};

export const getProducingRateImplicitParamsFromPokeInbox = ({
  pokeInBox,
}: GetProducingRateImplicitParamsFromPokeboxOpts): ProducingRateImplicitParams => {
  const {seeds, evolutionCount} = pokeInBox;

  return {
    seeds: seeds ?? defaultSeedUsage,
    evolutionCount,
  };
};

type GetPokemonProducingParamsOpts = {
  pokemonId: PokemonId,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
};

export const getPokemonProducingParams = ({
  pokemonId,
  pokemonProducingParamsMap,
}: GetPokemonProducingParamsOpts): PokemonProducingParams => {
  return pokemonProducingParamsMap[pokemonId] ?? {pokemonId, ...defaultProducingParams};
};
