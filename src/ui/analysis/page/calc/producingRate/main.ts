import {toAnalysisBerryProducingRate} from '@/ui/analysis/page/calc/producingRate/berry';
import {toAnalysisIngredientProducingStats} from '@/ui/analysis/page/calc/producingRate/ingredient';
import {toAnalysisSkillTriggerProducingStats} from '@/ui/analysis/page/calc/producingRate/skill';
import {toAnalysisTotalProducingStats} from '@/ui/analysis/page/calc/producingRate/total';
import {PokemonAnalysisRateInfo} from '@/ui/analysis/page/calc/producingRate/type';
import {AnalysisStats, GetAnalysisStatsOpts} from '@/ui/analysis/page/calc/type';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredient/chain';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {getPokemonProducingParams, getProducingRateNeutralParams} from '@/utils/game/producing/params';


export const getAnalysisStatsOfProducingRate = (opts: GetAnalysisStatsOpts): AnalysisStats['producingRate'] => {
  const {
    pokemonList,
    pokemon,
    pokemonProducingParamsMap,
    level,
    ingredients,
    berryDataMap,
    ingredientChainMap,
    mainSkillMap,
  } = opts;

  const currentPokemonProducingParams = getPokemonProducingParams({
    pokemonId: pokemon.id,
    pokemonProducingParamsMap,
  });
  const currentRate = getPokemonProducingRateSingle({
    ...opts,
    pokemonProducingParams: currentPokemonProducingParams,
    berryData: berryDataMap[pokemon.berry.id],
    skillData: mainSkillMap[pokemon.skill],
    ...getProducingRateNeutralParams({pokemon}),
  }).atStage.final;

  const rateOfAllPokemon = pokemonList.flatMap((otherPokemon) => [...generatePossibleIngredientProductions({
    level,
    chain: ingredientChainMap[otherPokemon.ingredientChain],
  })].map((otherIngredients): PokemonAnalysisRateInfo => ({
    pokemon: otherPokemon,
    productions: otherIngredients,
    rate: getPokemonProducingRateSingle({
      // `opts` has to be the first because `pokemon`, `berryData`, `ingredients` have to be overridden
      ...opts,
      pokemon: otherPokemon,
      pokemonProducingParams: getPokemonProducingParams({
        pokemonId: otherPokemon.id,
        pokemonProducingParamsMap,
      }),
      berryData: berryDataMap[otherPokemon.berry.id],
      skillData: mainSkillMap[otherPokemon.skill],
      ingredients: otherIngredients,
      ...getProducingRateNeutralParams({pokemon: otherPokemon}),
    }).atStage.final,
  })));

  return {
    berry: toAnalysisBerryProducingRate({
      pokemon,
      currentRate: currentRate.berry,
      itemId: pokemon.berry.id,
      rateOfAllPokemon,
    }),
    ingredient: toAnalysisIngredientProducingStats({
      pokemon,
      ingredients,
      current: currentRate,
      rateOfAllPokemon,
    }),
    skillTrigger: toAnalysisSkillTriggerProducingStats({
      pokemonProducingParamsMap,
      pokemon,
      current: currentRate,
      rateOfAllPokemon,
    }),
    total: toAnalysisTotalProducingStats({
      pokemon,
      current: currentRate,
      rateOfAllPokemon,
    }),
  };
};
