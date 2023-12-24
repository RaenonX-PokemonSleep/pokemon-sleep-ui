import {UserBonus} from '@/types/game/bonus';
import {StaminaCalcConfig, StaminaRecoveryRateConfig} from '@/types/game/stamina/config';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {UserCalculationBehavior, UserSettings} from '@/types/userData/settings';
import {userSettingsMigrators} from '@/utils/migrate/userSettings/migrators';


export const defaultMapBonus = 0;

export const defaultUserBonus: UserBonus = {
  overall: 0,
  map: {},
};

export const defaultRecoveryRate: StaminaRecoveryRateConfig = {
  general: 1,
  sleep: 1,
};

export const defaultStaminaCalcConfig: StaminaCalcConfig = {
  sleepSession: {
    primary: {
      start: 82800, // 23:00
      end: 21600, // 06:00 (7 hrs)
    },
    secondary: {
      start: 46800, // 13:00
      end: 52200, // 14:30 (1.5 hrs)
    },
  },
  skillRecovery: {
    strategy: 'optimistic',
  },
  recoveryRate: defaultRecoveryRate,
};

export const defaultStaminaSkillTrigger: StaminaSkillTriggerData = {
  dailyCount: 3,
  amount: 18,
};

export const defaultUserCalculationBehavior: UserCalculationBehavior = {
  alwaysFullPack: 'disable',
  goodCampTicket: false,
  includeMainSkill: true,
};

export const defaultUserSettings: UserSettings = {
  bonus: defaultUserBonus,
  stamina: defaultStaminaCalcConfig,
  staminaSkillTrigger: defaultStaminaSkillTrigger,
  behavior: defaultUserCalculationBehavior,
  currentMap: 1,
  version: userSettingsMigrators.length,
};
