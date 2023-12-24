import {useUserCookingPreset} from '@/hooks/userData/cookingPreset';
import {useUserSettings} from '@/hooks/userData/settings';
import {UseUserDataOpts} from '@/hooks/userData/type';
import {UserSettingsBundle} from '@/types/userData/settings';


type UseTranslatedUserSettingsOpts = {
  bundle: UseUserDataOpts<UserSettingsBundle>,
};

export const useUserSettingsBundle = ({bundle}: UseTranslatedUserSettingsOpts): UserSettingsBundle => {
  const {server, client} = bundle;

  const settings = useUserSettings({
    server: server.settings,
    client: client?.settings,
  });
  const cooking = useUserCookingPreset({
    server: server.cooking,
    client: client?.cooking,
  });

  return {settings, cooking};
};
