import {GetSkillTriggerValueCommonOpts} from '@/ui/team/mainskill/calc/type';
import {SkillTriggerAnalysisCalcResult, SkillTriggerAnalysisCalculatedUnit} from '@/ui/team/mainskill/targets/type';
import {SkillTriggerAnalysisUnit} from '@/ui/team/mainskill/type';
import {getSkillTriggerValue} from '@/utils/game/mainSkill/utils';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredient/multi';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {getPokemonProducingParams, getProducingRateSingleParams} from '@/utils/game/producing/params';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {getSubSkillBonus} from '@/utils/game/subSkill/effect';
import {toCalculatedUserSettings} from '@/utils/user/settings/calculated';
import {toCookingUserSettings} from '@/utils/user/settings/cooking';


type GetSkillTriggerValueOfUnitOpts = GetSkillTriggerValueCommonOpts & {
  id: string,
  unit: SkillTriggerAnalysisUnit,
  base: SkillTriggerAnalysisCalcResult<number> | null,
};

export const getSkillTriggerValueOfUnit = ({
  pokedexMap,
  pokemonProducingParamsMap,
  berryDataMap,
  ingredientMap,
  mainSkillMap,
  subSkillMap,
  mealMap,
  bundle,
  id,
  unit,
  base,
} :GetSkillTriggerValueOfUnitOpts): SkillTriggerAnalysisCalculatedUnit | null => {
  const {
    level,
    pokemonId,
    nature,
    subSkill,
    ingredients,
  } = unit;

  const pokemon = pokedexMap[pokemonId];
  if (!pokemon) {
    return null;
  }

  const {berry, skill} = pokemon;

  const pokemonProducingParams = getPokemonProducingParams({
    pokemonId,
    pokemonProducingParamsMap,
  });
  const subSkillBonus = getSubSkillBonus({level, pokemonSubSkill: subSkill, subSkillMap});
  const singleParams = getProducingRateSingleParams({
    level,
    subSkill,
    nature,
    subSkillMap,
  });

  const rate = getPokemonProducingRateSingle({
    // `unit` could have `pokemon` from Poke-in-box, therefore it should always be at the top
    ...unit,
    ...singleParams,
    calculatedSettings: toCalculatedUserSettings({
      ...bundle,
      recoveryRate: toRecoveryRate(singleParams),
    }),
    cookingSettings: toCookingUserSettings({
      ...bundle,
      mealMap,
    }),
    pokemon,
    snorlaxFavorite: {},
    berryData: berryDataMap[berry.id],
    ingredientMap,
    skillData: mainSkillMap[skill],
    pokemonProducingParams,
    ingredients: getEffectiveIngredientProductions({level, ingredients}),
  }).atStage.final;

  const skillTriggerValue = getSkillTriggerValue({
    rate,
    skillValue: pokemonProducingParams.skillValue,
    natureId: nature,
    subSkillBonus,
  });
  const skillTriggerCount = rate.skill.quantity.equivalent;

  return {
    ...unit,
    id,
    skillTriggerValue: {
      actual: skillTriggerValue,
      ratioToBase: base ? skillTriggerValue / base.skillTriggerValue : 1,
    },
    skillTriggerCount: (
      skillTriggerCount ?
        {
          actual: skillTriggerCount,
          ratioToBase: base?.skillTriggerCount ? skillTriggerCount / base.skillTriggerCount : 1,
        } :
        null
    ),
  };
};
