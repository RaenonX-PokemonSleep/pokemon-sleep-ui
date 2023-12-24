import {PokemonIngredientStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/type';
import {CookingUserSettingsRequiredData, UserSettingsBundle} from '@/types/userData/settings';


export type IngredientProductionDataProps =
  Omit<PokemonIngredientStatsCommonProps, 'translatedSettings'> &
  CookingUserSettingsRequiredData & {
    preloaded: UserSettingsBundle,
  };
