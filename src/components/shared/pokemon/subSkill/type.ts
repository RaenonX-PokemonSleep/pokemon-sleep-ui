import {SubSkillData} from '@/types/game/pokemon/subSkill';
import {Dimension} from '@/types/style';


export type PokemonSubSkillUiProps = {
  subSkill: SubSkillData | undefined,
  isInactive?: boolean,
  dimension?: Dimension,
};
