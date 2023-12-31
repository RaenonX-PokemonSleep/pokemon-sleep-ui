import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill} from '@/types/game/pokemon/subSkill';


export type RatingCombination = {
  ingredients: IngredientProduction[],
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
};

export type RatingDataPoint = {
  value: number,
  combination: RatingCombination,
};

export type RatingExtrema = {
  value: number,
  combinations: RatingCombination[],
};

export type RatingResultOfLevel = {
  level: number,
  samples: number,
  rank: number,
  percentage: number,
  percentile: number,
  baseDiffPercent: number,
  extrema: null | {
    min: RatingExtrema,
    current: RatingExtrema,
    max: RatingExtrema,
  },
};
