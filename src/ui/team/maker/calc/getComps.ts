import {productionMultiplierByPeriod} from '@/const/game/production';
import {teamMakerProductionPeriod} from '@/ui/team/maker/calc/const';
import {getTeamMakerIngredientStats} from '@/ui/team/maker/calc/ingredient';
import {reduceTeamMakerResultComp} from '@/ui/team/maker/calc/utils';
import {TeamMakerDataProps} from '@/ui/team/maker/type';
import {TeamMakerCalcResultsOpts} from '@/ui/team/maker/type/calc';
import {TeamMakerResultComp} from '@/ui/team/maker/type/result';
import {toSum} from '@/utils/array';
import {getMealCoverage} from '@/utils/game/cooking';
import {getMealIngredientInfoFromTargetMeals} from '@/utils/game/meal/ingredient';
import {getPokemonProducingRateMulti} from '@/utils/game/producing/main/multi';
import {getTotalOfGroupedProducingRate} from '@/utils/game/producing/rateReducer';
import {getSnorlaxRankFinalEstimate} from '@/utils/game/rank';
import {isNotNullish} from '@/utils/type';


type GetTeamMakerCompsOpts = TeamMakerDataProps & Omit<TeamMakerCalcResultsOpts, 'settings' | 'calculatedSettings'>;

export const getTeamMakerComps = ({
  snorlaxData,
  input,
  cookingSettings,
  teamComps,
}: GetTeamMakerCompsOpts): TeamMakerResultComp[] => {
  const {
    snorlaxFavorite,
    ingredientCount,
    showInsufficientIngredients,
  } = input;

  const comps: TeamMakerResultComp[] = [];
  for (const teamComp of teamComps) {
    const rates = getPokemonProducingRateMulti({
      rateOpts: teamComp.map(({calcOpts, pokeInBox}) => ({
        opts: calcOpts,
        payload: pokeInBox,
      })),
      sharedOpts: {
        snorlaxFavorite,
        period: teamMakerProductionPeriod,
        noCap: false,
      },
      groupingState: 'equivalent',
      cookingSettings,
    });
    const strengthByType = {
      berry: getTotalOfGroupedProducingRate({rate: rates.grouped.berry, key: 'energy'}),
      ingredient: getTotalOfGroupedProducingRate({rate: rates.grouped.ingredient, key: 'energy'}),
      skill: getTotalOfGroupedProducingRate({rate: rates.grouped.skill, key: 'energy'}),
    };
    const strengthTotal = toSum(Object.values(strengthByType));
    const ingredientStats = getTeamMakerIngredientStats({
      required: getMealIngredientInfoFromTargetMeals({
        targetMeals: cookingSettings.targetMeals,
        days: productionMultiplierByPeriod[teamMakerProductionPeriod],
      }).ingredientsRequired,
      inventory: ingredientCount,
      production: rates.grouped.ingredient,
    });

    if (
      !showInsufficientIngredients &&
      Object.keys(ingredientStats.shortage).length > 0 &&
      Object.values(ingredientStats.shortage).filter(isNotNullish).some((count) => count > 0)
    ) {
      continue;
    }

    comps.push({
      rates,
      strengthByType,
      basisValue: {
        mealCoverage: getMealCoverage({
          meals: cookingSettings.targetMeals,
          ingredientProduction: Object.fromEntries(
            Object.entries(rates.grouped.ingredient)
              .map(([id, rate]) => [
                id,
                rate?.quantity,
              ])
              .filter(isNotNullish),
          ),
          period: teamMakerProductionPeriod,
        }),
        strength: strengthTotal,
      },
      ingredientStats,
      finalEstimates: getSnorlaxRankFinalEstimate({
        energy: strengthTotal,
        snorlaxData,
      }),
    });
  }

  return reduceTeamMakerResultComp({comps, basis: input.basis});
};
