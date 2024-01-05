import {specialtyIdToType} from '@/const/game/pokemon';
import {defaultRatingBasisOfSpecialty} from '@/const/game/rating';
import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {RatingBasis} from '@/types/game/pokemon/rating/config';
import {GetProducingRateBehavior} from '@/utils/game/producing/type';


export const getDefaultRatingBasis = (specialtyId: PokemonSpecialtyId): RatingBasis => (
  defaultRatingBasisOfSpecialty[specialtyIdToType[specialtyId]]
);

export const getRatingProducingRateCalcBehavior = (basis: RatingBasis): GetProducingRateBehavior => ({
  asSingle: basis !== 'skillTriggerValue',
});
