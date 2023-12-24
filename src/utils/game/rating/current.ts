import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getRatingBasisValue} from '@/utils/game/rating/basis';
import {ratingCalculationNoCap} from '@/utils/game/rating/const';
import {GetRatingValueOfSimulationOpts} from '@/utils/game/rating/type';
import {getSimulateHelperBonusOnSelf} from '@/utils/game/rating/utils';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {toTranslatedSettings} from '@/utils/user/settings/translated';


export const getRatingValueOfCurrent = (opts: GetRatingValueOfSimulationOpts) => {
  const {
    basis,
    mealMap,
    bundle,
  } = opts;

  const singleParams = getProducingRateSingleParams(opts);

  return getRatingBasisValue({
    ...opts,
    rate: getPokemonProducingRateSingle({
      ...opts,
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
