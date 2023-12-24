import {RatingCombination} from '@/types/game/pokemon/rating';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getRatingBasisValue} from '@/utils/game/rating/basis';
import {ratingCalculationNoCap} from '@/utils/game/rating/const';
import {GetRatingValueOfSimulationOpts} from '@/utils/game/rating/type';
import {getSimulateHelperBonusOnSelf} from '@/utils/game/rating/utils';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {toTranslatedSettings} from '@/utils/user/settings/translated';


type GetRatingValueSingleOpts = Omit<
  GetRatingValueOfSimulationOpts,
  'ingredients' | 'subSkill' | 'nature'
> & {
  combination: RatingCombination,
};

export const getRatingValueOfPossibility = ({combination, ...opts}: GetRatingValueSingleOpts) => {
  const {
    level,
    basis,
    subSkillMap,
    mealMap,
    bundle,
  } = opts;
  const {nature, subSkill, ingredients} = combination;

  const singleParams = getProducingRateSingleParams({
    level,
    subSkill,
    nature,
    subSkillMap,
  });

  return getRatingBasisValue({
    ...opts,
    rate: getPokemonProducingRateSingle({
      ...opts,
      ingredients,
      ...singleParams,
      ...toTranslatedSettings({
        ...bundle,
        mealMap,
        recoveryRate: toRecoveryRate(singleParams),
      }),
      noCap: ratingCalculationNoCap,
      calcBehavior: {
        simulateHelperBonusOnSelf: getSimulateHelperBonusOnSelf(basis),
      },
    }).atStage.final,
    singleParams,
  });
};
