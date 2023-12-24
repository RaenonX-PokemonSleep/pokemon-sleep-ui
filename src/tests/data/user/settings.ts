import {defaultUserSettings} from '@/const/user/settings';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {toCalculatedUserSettings} from '@/utils/user/settings/calculated';


export const testDefaultCalculatedUserSettings: CalculatedUserSettings = toCalculatedUserSettings({
  settings: defaultUserSettings,
});
