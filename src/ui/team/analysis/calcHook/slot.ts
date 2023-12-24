import {TeamAnalysisSlotName} from '@/types/teamAnalysis';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {UseTeamProducingStatsOpts} from '@/ui/team/analysis/calcHook/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredient/multi';
import {GetPokemonProducingRateOpts} from '@/utils/game/producing/main/type';
import {getPokemonProducingParams, getProducingRateSingleParams} from '@/utils/game/producing/params';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {toCalculatedUserSettings} from '@/utils/user/settings/calculated';


type GetTeamProducingStatsSlotOpts = UseTeamProducingStatsOpts & {
  slotName: TeamAnalysisSlotName,
  helperCount: number,
};

type GetProducingStatsOptsSlotReturn = {
  rateOpts: GetPokemonProducingRateOpts,
  calculatedSettings: CalculatedUserSettings,
};

export const getTeamProducingStatsSlot = ({
  setup,
  bundle,
  slotName,
  pokedexMap,
  pokemonProducingParamsMap,
  berryDataMap,
  ingredientMap,
  mainSkillMap,
  subSkillMap,
}: GetTeamProducingStatsSlotOpts): GetProducingStatsOptsSlotReturn | null => {
  const {
    members,
  } = getCurrentTeam({setup});

  // return React.useMemo(() => {
  const member = members[slotName];
  if (!member) {
    return null;
  }

  const {
    level,
    pokemonId,
    ingredients,
    evolutionCount,
    subSkill,
    nature,
    seeds,
    alwaysFullPack,
  } = member;

  const pokemon = pokedexMap[pokemonId];
  if (!pokemon) {
    return null;
  }

  const singleParams = getProducingRateSingleParams({
    level,
    subSkill,
    nature,
    subSkillMap,
  });
  const calculatedSettings = toCalculatedUserSettings({
    ...bundle,
    recoveryRate: toRecoveryRate(singleParams),
    behaviorOverride: alwaysFullPack != null ? {alwaysFullPack: alwaysFullPack ? 'always' : 'disable'} : {},
  });

  return {
    rateOpts: {
      ...singleParams,
      calculatedSettings,
      level,
      pokemon,
      pokemonProducingParams: getPokemonProducingParams({
        pokemonId: pokemon.id,
        pokemonProducingParamsMap,
      }),
      berryData: berryDataMap[pokemon.berry.id],
      ingredients: getEffectiveIngredientProductions({level, ingredients}),
      ingredientMap,
      skillData: mainSkillMap[pokemon.skill],
      evolutionCount,
      seeds,
    },
    calculatedSettings,
  };
};
