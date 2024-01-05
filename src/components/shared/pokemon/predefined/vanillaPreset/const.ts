import {PokemonVanillaPresetMode} from '@/types/game/pokemon/params';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const pokemonVanillaPresetModeI18nId: {
  [mode in PokemonVanillaPresetMode]: I18nMessageKeysOfNamespace<'UI.Producing.VanillaPreset'>
} = {
  shared: 'Shared',
  bySpecialty: 'BySpecialty',
};
