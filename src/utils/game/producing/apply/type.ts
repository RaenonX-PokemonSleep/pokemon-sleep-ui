import {EffectiveBonus} from '@/types/game/bonus';
import {ProducingRateOfItem} from '@/types/game/producing/rate';
import {ProducingState} from '@/types/game/producing/state';


export type ApplyBonusCommonOpts<T extends ProducingRateOfItem | null> = {
  bonus: EffectiveBonus,
  energyMultiplier: number,
  producingState: ProducingState,
  data: T,
};
