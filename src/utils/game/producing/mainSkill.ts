import {NatureId} from '@/types/game/pokemon/nature';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ProducingRateCommonParams, ProducingRateOfItemOfSessions} from '@/types/game/producing/rate';
import {getMainSkillEquivalentStrengthOfSingle} from '@/utils/game/mainSkill/effect/main';
import {GetMainSkillEquivalentStrengthOpts} from '@/utils/game/mainSkill/effect/type';
import {getSkillTriggerRate} from '@/utils/game/mainSkill/utils';
import {applyBonus} from '@/utils/game/producing/apply/bonus';
import {applyBonusWithMainSkillCapping} from '@/utils/game/producing/apply/bonusWithMainSkillCap';
import {getProducingRateBase} from '@/utils/game/producing/rateBase';


export type GetMainSkillProducingRateOpts =
  Omit<ProducingRateCommonParams, 'level'> &
  GetMainSkillEquivalentStrengthOpts & {
    timeToFullPack: number,
    subSkillBonus: GroupedSubSkillBonus | null,
    skillRatePercent: number | null,
    natureId: NatureId | null,
  };

export const getMainSkillProducingRate = ({
  pokemon,
  frequency,
  calculatedSettings,
  energyMultiplier,
  timeToFullPack,
  subSkillBonus,
  skillRatePercent,
  natureId,
  ...opts
}: GetMainSkillProducingRateOpts): ProducingRateOfItemOfSessions => {
  const {bonus, sleepDurationInfo} = calculatedSettings;

  frequency *= (1 / getSkillTriggerRate({skillRatePercent, subSkillBonus, natureId}));

  const id = pokemon.skill;

  const strengthPerSkill = getMainSkillEquivalentStrengthOfSingle(opts);

  return {
    id,
    sleep: applyBonusWithMainSkillCapping({
      bonus,
      energyMultiplier,
      producingState: 'sleep',
      data: {
        id,
        frequency,
        period: 'daily',
        energy: strengthPerSkill,
        quantity: 1,
      },
      timeToFullPack,
      sleepDurationInfo,
    }),
    awake: applyBonus({
      bonus,
      energyMultiplier,
      producingState: 'awake',
      data: {
        id,
        frequency,
        ...getProducingRateBase({
          frequency,
          count: 1,
          picks: 1,
          energyPerCount: strengthPerSkill,
        }),
      },
    }),
  };
};
