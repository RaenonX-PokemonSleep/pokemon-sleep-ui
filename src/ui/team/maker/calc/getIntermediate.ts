import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils';
import {pokemonProducingRateStage} from '@/types/game/producing/rate';
import {PokeInBox} from '@/types/userData/pokebox/main';
import {CookingUserSettings, UserSettings} from '@/types/userData/settings';
import {teamMakerProductionPeriod} from '@/ui/team/maker/calc/const';
import {getTeamMakerBasisValue} from '@/ui/team/maker/calc/getBasisValue';
import {TeamMakerCalcInitOpts} from '@/ui/team/maker/type/calc';
import {TeamMakerBasisValueAtStage, TeamMakerIntermediateRate} from '@/ui/team/maker/type/common';
import {getPokemonFinalEvolutionIds} from '@/utils/game/pokemon/evolution';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredient/multi';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {GetPokemonProducingRateOpts} from '@/utils/game/producing/main/type';
import {
  getPokemonProducingParams,
  getProducingRateImplicitParamsFromPokeInbox,
  getProducingRateSingleParams,
} from '@/utils/game/producing/params';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {getLevelToCalcForPokeInBox} from '@/utils/team/previewLevel';
import {isNotNullish} from '@/utils/type';
import {toCalculatedUserSettings} from '@/utils/user/settings/calculated';


type GetTeamMakerCalcIntermediateOpts = Omit<TeamMakerCalcInitOpts, 'pokeboxList'> & {
  pokeboxSource: PokeInBox[],
  settings: UserSettings,
  cookingSettings: CookingUserSettings,
};

export const getTeamMakerCalcIntermediate = ({
  pokeboxSource,
  pokedexMap,
  pokemonProducingParamsMap,
  berryDataMap,
  ingredientMap,
  ingredientChainMap,
  mainSkillMap,
  subSkillMap,
  input,
  settings,
  cookingSettings,
}: GetTeamMakerCalcIntermediateOpts): TeamMakerIntermediateRate[] => {
  const toTeamMakerFirstPassData = (pokeInBox: PokeInBox): TeamMakerIntermediateRate | null => {
    const pokemon = pokedexMap[pokeInBox.pokemon];

    if (!pokemon || !isPokemonIncludedFromFilter({
      filter: input.pokemon,
      pokemon,
      pokemonLevel: pokeInBox.level,
      ingredientMap,
      ingredientChainMap,
    })) {
      return null;
    }

    const level = getLevelToCalcForPokeInBox({
      actualLevel: pokeInBox.level,
      previewLevel: input.previewLevel,
    });
    const singleParams = getProducingRateSingleParams({
      ...pokeInBox,
      level,
      subSkillMap,
    });
    const calculatedSettings = toCalculatedUserSettings({
      settings,
      recoveryRate: toRecoveryRate(singleParams),
    });

    const calcOpts: GetPokemonProducingRateOpts = {
      berryData: berryDataMap[pokemon.berry.id],
      skillData: mainSkillMap[pokemon.skill],
      pokemonProducingParams: getPokemonProducingParams({
        pokemonId: pokeInBox.pokemon,
        pokemonProducingParamsMap,
      }),
      ingredientMap,
      calculatedSettings,
      ...pokeInBox,
      ...singleParams,
      ...getProducingRateImplicitParamsFromPokeInbox({pokeInBox}),
      // Override `level` because preview level might be active
      level,
      // Override `pokemon` in `pokeInBox`
      pokemon,
      // Override `ingredients` in `pokeInBox`
      ingredients: getEffectiveIngredientProductions(pokeInBox),
    };
    const rate = getPokemonProducingRateSingle({
      snorlaxFavorite: input.snorlaxFavorite,
      period: teamMakerProductionPeriod,
      cookingSettings,
      ...calcOpts,
    });

    return {
      rate,
      refData: {
        pokeInBox,
        levelUsed: level,
      },
      calcOpts,
      basisValueAtStage: Object.fromEntries(pokemonProducingRateStage.map((stage) => [
        stage,
        getTeamMakerBasisValue({
          pokemonRate: rate.atStage[stage],
          targetMeals: cookingSettings.targetMeals,
        }),
      ])) as TeamMakerBasisValueAtStage,
    };
  };

  return pokeboxSource
    .flatMap((pokeInBox): PokeInBox[] => {
      if (!input.previewFinalEvolution) {
        return [pokeInBox];
      }

      return getPokemonFinalEvolutionIds({
        pokemonId: pokeInBox.pokemon,
        pokedex: pokedexMap,
        evolutionCount: pokeInBox.evolutionCount,
      }).map(({id, evolutionCount}): PokeInBox => ({
        ...pokeInBox,
        pokemon: id,
        evolutionCount,
      }));
    })
    .map(toTeamMakerFirstPassData)
    .filter(isNotNullish);
};
