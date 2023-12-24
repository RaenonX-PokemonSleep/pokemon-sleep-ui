import {defaultDrowsyPowerMultiplier} from '@/const/game/event';
import {EventDrowsyPowerMultiplierData} from '@/types/game/event/drowsyPowerMultiplier';


export const getCurrentDrowsyPowerMultiplier = (data: EventDrowsyPowerMultiplierData[]): number => {
  if (!data.length) {
    return defaultDrowsyPowerMultiplier;
  }

  const now = Date.now() / 1000;
  const multiplierFromData = data.find(({startEpoch, endEpoch}) => startEpoch >= now && endEpoch <= now)?.multiplier;

  return multiplierFromData ?? defaultDrowsyPowerMultiplier;
};
