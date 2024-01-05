import {v4} from 'uuid';

import {defaultCommonConstPokeInBox} from '@/const/user/pokebox';
import {PokemonInfo, PokemonSpecialtyId} from '@/types/game/pokemon';
import {RatingSetupData} from '@/types/game/pokemon/rating/request';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamAnalysisMember} from '@/types/teamAnalysis';
import {PokeInBox} from '@/types/userData/pokebox/main';
import {UserSettingsBundle} from '@/types/userData/settings';
import {getDefaultRatingBasis} from '@/utils/game/rating/utils';


type ToRatingRequestOpts = {
  member: TeamAnalysisMember,
  pokemon: PokemonInfo,
  snorlaxFavorite: SnorlaxFavorite,
  specialtyId: PokemonSpecialtyId,
  bundle: UserSettingsBundle,
};

export const toRatingSetup = ({member, specialtyId, ...opts}: ToRatingRequestOpts): RatingSetupData => ({
  ...member,
  ...opts,
  basis: getDefaultRatingBasis(specialtyId),
  friendshipLevel: 0,
});

export const toPokeInBox = ({pokemonId, name, ...member}: TeamAnalysisMember): PokeInBox => {
  return {
    ...defaultCommonConstPokeInBox,
    ...member,
    uuid: v4(),
    dateAdded: Date.now(),
    name: name ?? null,
    pokemon: pokemonId,
  };
};
