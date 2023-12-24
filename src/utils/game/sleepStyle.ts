import {spoToDrowsyScoreMultiplier} from '@/const/game/sleepStyle';
import {SleepStyleSpoRequirement} from '@/types/game/sleepStyle';


type GetSpoRequirementOpts = {
  spo: number,
  drowsyPowerMultiplier: number,
};

export const getSpoRequirement = ({spo, drowsyPowerMultiplier}: GetSpoRequirementOpts): SleepStyleSpoRequirement => {
  const drowsyScore = spo * spoToDrowsyScoreMultiplier;

  return {
    snorlaxStrength: drowsyScore / drowsyPowerMultiplier,
    drowsyScore,
  };
};
