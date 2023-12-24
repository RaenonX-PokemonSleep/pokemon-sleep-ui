import {PokemonBerryStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/type';
import {BerryData} from '@/types/game/berry';
import {BerryFavoriteInfo} from '@/types/game/mapMeta';
import {CookingUserSettingsRequiredData, UserSettingsBundle} from '@/types/userData/settings';


export type BerryPageDataProps =
  CookingUserSettingsRequiredData &
  Omit<PokemonBerryStatsCommonProps, 'translatedSettings'> & {
    berryData: BerryData,
    favoriteInfo: BerryFavoriteInfo,
    preloaded: UserSettingsBundle,
  };
