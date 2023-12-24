import {v4} from 'uuid';

import {PokeInBox} from '@/types/game/pokebox/main';
import {PokemonInfo, PokemonSpecialtyId} from '@/types/game/pokemon';
import {RatingSetupData} from '@/types/game/pokemon/rating';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamAnalysisMember} from '@/types/teamAnalysis';
import {UserSettingsBundle} from '@/types/userData/settings';
import {getDefaultRatingBasis} from '@/utils/game/rating/utils';


type ToRatingRequestOpts = {
  member: TeamAnalysisMember,
  pokemon: PokemonInfo,
  snorlaxFavorite: SnorlaxFavorite,
  specialtyId: PokemonSpecialtyId | null,
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
    ...member,
    uuid: v4(),
    dateAdded: Date.now(),
    name: name ?? null,
    pokemon: pokemonId,
  };
};
