import {defaultSeedUsage} from '@/const/game/seed';
import {PokeInBox} from '@/types/game/pokebox/main';
import {TeamAnalysisMember} from '@/types/teamAnalysis';
import {Nullable} from '@/utils/type';


export const toTeamAnalysisMember = ({
  name,
  level,
  pokemon,
  nature,
  subSkill,
  ingredients,
  evolutionCount,
  seeds,
}: PokeInBox): TeamAnalysisMember => {
  return {
    name,
    level,
    pokemonId: pokemon,
    nature,
    subSkill,
    ingredients,
    evolutionCount,
    seeds: seeds ?? defaultSeedUsage,
  };
};

export const toTeamAnalysisMemberNullable = (pokeInBox: Nullable<PokeInBox>): TeamAnalysisMember | null => {
  if (!pokeInBox) {
    return null;
  }

  return toTeamAnalysisMember(pokeInBox);
};
