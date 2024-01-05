import {durationOfDay} from '@/const/common';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ProduceSplit, ProducingSleepStateSplit} from '@/types/game/producing/split';
import {toSum} from '@/utils/array';
import {getNatureMultiplier} from '@/utils/game/nature';
import {getSubSkillBonusValue} from '@/utils/game/subSkill/effect';


export type GetProduceSplitOpts = {
  pokemonProducingParams: PokemonProducingParams,
  natureId: NatureId | null,
  subSkillBonus: GroupedSubSkillBonus | null,
  isFullPack: boolean,
};

export const getProduceSplit = ({
  pokemonProducingParams,
  natureId,
  subSkillBonus,
  isFullPack,
}: GetProduceSplitOpts): ProduceSplit => {
  if (isFullPack) {
    return {
      berry: 1,
      ingredient: 0,
      skill: 0,
    };
  }

  let ingredientSplit = pokemonProducingParams.ingredientSplit;

  ingredientSplit *= (1 + toSum(getSubSkillBonusValue(subSkillBonus, 'ingredientProbability')) / 100);
  ingredientSplit *= getNatureMultiplier({id: natureId, effect: 'rateOfIngredient'});

  return {
    berry: 1 - ingredientSplit,
    ingredient: ingredientSplit,
    skill: 1,
  };
};

type GetProducingSleepStateSplitOpts = {
  sleepDurationTotal: number,
  fullPackRatioInSleep: number,
};

export const getProducingSleepStateSplit = ({
  sleepDurationTotal,
  fullPackRatioInSleep,
}: GetProducingSleepStateSplitOpts): ProducingSleepStateSplit => {
  const sleep = sleepDurationTotal / durationOfDay;

  return {
    awake: 1 - sleep,
    sleepVacant: sleep * (1 - fullPackRatioInSleep),
    sleepFilled: sleep * fullPackRatioInSleep,
  };
};
