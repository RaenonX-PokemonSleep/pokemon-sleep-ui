import {CookingUserSettings} from '@/types/userData/settings';
import {getTeamMakerCandidates} from '@/ui/team/maker/calc/getCandidates';
import {getTeamMakerCalcIntermediate} from '@/ui/team/maker/calc/getIntermediate';
import {TeamMakerCalcGenerateCompOpts, TeamMakerCalcInitOpts} from '@/ui/team/maker/type/calc';
import {toTargetMeals} from '@/utils/user/settings/utils';


export const getTeamMakerCalcGenerateCompOpts = (opts: TeamMakerCalcInitOpts): TeamMakerCalcGenerateCompOpts => {
  const {
    input,
    mealMap,
  } = opts;

  const cookingSettings: CookingUserSettings = {
    recipeLevel: input.recipeLevel,
    targetMeals: toTargetMeals({
      mealType: input.mealType,
      target: input.target,
      mealMap,
    }),
  };

  const intermediateRates = getTeamMakerCalcIntermediate({
    cookingSettings,
    ...opts,
  });
  const candidates = getTeamMakerCandidates({
    input,
    cookingSettings,
    rates: intermediateRates,
  });

  return {
    cookingSettings,
    candidates,
    ...opts,
  };
};
