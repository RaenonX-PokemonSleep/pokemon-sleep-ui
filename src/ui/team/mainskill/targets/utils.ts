import {defaultSeedUsage} from '@/const/game/seed';
import {PokeInBox} from '@/types/game/pokebox/main';
import {SkillTriggerAnalysisUnit} from '@/ui/team/mainskill/type';


export const toSkillTriggerAnalysisUnitFromPokeInBox = (pokeInBox: PokeInBox): SkillTriggerAnalysisUnit => {
  const {pokemon, seeds} = pokeInBox;

  return {
    ...pokeInBox,
    pokemonId: pokemon,
    seeds: seeds ?? defaultSeedUsage,
    show: true,
  };
};
