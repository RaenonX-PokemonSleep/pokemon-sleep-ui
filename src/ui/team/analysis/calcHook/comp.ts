import React from 'react';

import {ProducingRate} from '@/types/game/producing/rate';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamAnalysisSlotName, teamAnalysisSlotName} from '@/types/teamAnalysis';
import {CookingUserSettings} from '@/types/userData/settings';
import {getTeamProducingStatsSlot} from '@/ui/team/analysis/calcHook/slot';
import {
  UseTeamCompStatsReturn,
  UseTeamProducingStatsCommonOpts,
  UseTeamProducingStatsOpts,
} from '@/ui/team/analysis/calcHook/type';
import {TeamProducingStatsBySlot, TeamProducingStatsSingle} from '@/ui/team/analysis/setup/type';
import {getPokemonProducingRateMulti} from '@/utils/game/producing/main/multi';
import {getTotalOfPokemonProducingRate} from '@/utils/game/producing/rateReducer';
import {isNotNullish} from '@/utils/type';


type UseTeamProducingStatsCompOpts = UseTeamProducingStatsCommonOpts & UseTeamProducingStatsOpts & {
  cookingSettings: CookingUserSettings,
  snorlaxFavorite: SnorlaxFavorite,
  helperCount: number,
};

export const useTeamProducingStatsComp = ({
  period,
  state,
  deps,
  cookingSettings,
  snorlaxFavorite,
  helperCount,
  ...opts
}: UseTeamProducingStatsCompOpts): UseTeamCompStatsReturn => {
  return React.useMemo(() => {
    const {rates, grouped} = getPokemonProducingRateMulti({
      cookingSettings,
      groupingState: state,
      sharedOpts: {
        snorlaxFavorite,
        period,
      },
      rateOpts: (
        teamAnalysisSlotName
          .map((slotName) => {
            const producingStatsOpts = getTeamProducingStatsSlot({
              slotName,
              helperCount,
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
              payload: {slotName, calculatedSettings},
            };
          })
          .filter(isNotNullish)
      ),
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
          {...atStage.final, calculatedSettings, total},
        ];
      })) as TeamProducingStatsBySlot,
      grouped,
    };
  }, deps);
};
