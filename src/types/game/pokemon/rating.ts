import {PokemonOnDeskState} from '@/components/shared/pokemon/predefined/lab/onDesk/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap, IngredientProduction} from '@/types/game/pokemon/ingredient';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {FriendshipLevelOfGoldLock, PokemonSubSkill, SubSkillMap} from '@/types/game/pokemon/subSkill';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {CookingUserSettingsRequiredData, UserSettingsBundle} from '@/types/userData/settings';


export const ratingBasis = [
  'totalProduction',
  'ingredientCount',
  'ingredientProduction',
  'skillTriggerValue',
] as const;

export type RatingBasis = typeof ratingBasis[number];

export type RatingCombination = {
  ingredients: IngredientProduction[],
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
};

export type RatingDataPoint = {
  value: number,
  combination: RatingCombination,
};

export type RatingResultOfLevel = {
  level: number,
  samples: number,
  rank: number,
  percentage: number,
  percentile: number,
  baseDiffPercent: number,
  points: {
    min: RatingDataPoint | null,
    current: RatingDataPoint | null,
    max: RatingDataPoint | null,
  },
};

export type RatingOnDeskState = PokemonOnDeskState & {
  snorlaxFavorite: SnorlaxFavorite,
  basis: RatingBasis,
  friendshipLevel: FriendshipLevelOfGoldLock,
};

export type RatingSetupData = Omit<RatingOnDeskState, 'origin'> & {
  bundle: UserSettingsBundle,
};

export type RatingRequest = {
  setup: RatingSetupData,
  timestamp: number,
};

export type RatingOpts = CookingUserSettingsRequiredData & {
  level: number,
  pokemon: PokemonInfo | undefined,
  pokemonProducingParams: PokemonProducingParams,
  ingredientChainMap: IngredientChainMap,
  ingredientMap: IngredientMap,
  berryDataMap: BerryDataMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  useNestedWorker: boolean,
};

export type RatingWorkerOpts = RatingSetupData & Omit<RatingOpts, 'pokemon'>;
