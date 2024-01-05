import {ProducingRate} from '@/types/game/producing/rate';
import {TeamAnalysisSlotName, teamAnalysisSlotName} from '@/types/teamAnalysis';
import {getTeamProducingStatsSlot} from '@/ui/team/analysis/calc/slot';
import {TeamCompCalcOpts} from '@/ui/team/analysis/calc/type';
import {TeamProducingStatsBySlot, TeamProducingStatsSingle} from '@/ui/team/analysis/setup/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';
import {getPokemonProducingRateMulti} from '@/utils/game/producing/main/multi';
import {getTotalOfPokemonProducingRate} from '@/utils/game/producing/rateReducer';
import {isNotNullish} from '@/utils/type';


export const getTeamCompCalcResult = ({
  period,
  state,
  snorlaxFavorite,
  ...opts
}: TeamCompCalcOpts) => {
  const {
    setup,
    cookingSettings,
  } = opts;
  const currentTeam = getCurrentTeam({setup});

  const {rates, grouped} = getPokemonProducingRateMulti({
    cookingSettings,
    groupingState: state,
    sharedOpts: {
      snorlaxFavorite,
      period,
    },
    rateOpts: teamAnalysisSlotName
      .map((slotName) => {
        const producingStatsOpts = getTeamProducingStatsSlot({
          slotName,
          ...opts,
        });

        if (!producingStatsOpts) {
          return null;
        }

        const {
          rateOpts,
          calculatedSettings,
        } = producingStatsOpts;

        return {
          opts: rateOpts,
          payload: {
            slotName,
            calculatedSettings,
          },
        };
      })
      .filter(isNotNullish),
  });

  return {
    bySlot: Object.fromEntries(rates.map(({
      payload,
      atStage,
    }): [TeamAnalysisSlotName, TeamProducingStatsSingle] => {
      const {slotName, calculatedSettings} = payload;
      const total: ProducingRate = getTotalOfPokemonProducingRate({rate: atStage.final, state});

      return [
        slotName,
        {
          ...atStage.final,
          calculatedSettings,
          total,
          level: currentTeam.members[slotName]?.level ?? null,
        },
      ];
    })) as TeamProducingStatsBySlot,
    grouped,
  };
};
