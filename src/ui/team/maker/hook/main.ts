import React from 'react';


import {useWorker} from '@/hooks/worker/main';
import {UseWorkerCommonOpts} from '@/hooks/worker/type';
import {reduceTeamMakerResultComp} from '@/ui/team/maker/calc/utils';
import {teamMakerCalcCompSegmentSize} from '@/ui/team/maker/const';
import {
  regenerateTeamMakerFinalResultWorkerPool,
  teamMakerFinalResultWorkerPool,
} from '@/ui/team/maker/hook/final.workerPool';
import {
  TeamMakerCalcGenerateCompOpts,
  TeamMakerCalcGenerateCompReturn,
  TeamMakerCalcInitOpts,
  TeamMakerCalcInitReturn,
} from '@/ui/team/maker/type/calc';
import {TeamMakerState} from '@/ui/team/maker/type/state';
import {getCombinationCount} from '@/utils/compute';


export const useTeamMaker = () => {
  const [state, setState] = React.useState<TeamMakerState>({
    status: 'standby',
    result: null,
    teamCompsCalculated: null,
    teamCompsTotal: null,
    cancel: false,
  });
  const resultsRef = React.useRef<HTMLButtonElement>(null);

  const workerCommonOpts: Pick<UseWorkerCommonOpts, 'onError' | 'isCanceled'> = {
    onError: () => setState({
      status: 'error',
      result: null,
      teamCompsCalculated: null,
      teamCompsTotal: null,
      cancel: false,
    }),
    isCanceled: state.cancel,
  };

  const {work: workInit} = useWorker<TeamMakerCalcInitOpts, TeamMakerCalcInitReturn>({
    workerName: 'Team Maker (Initial)',
    generateWorker: () => new Worker(new URL('init.worker', import.meta.url)),
    onCompleted: (
      calcGenCompOpts,
    ) => setState(({
      cancel,
      ...original
    }): TeamMakerState => {
      const {candidates, input} = calcGenCompOpts;

      if (state.cancel) {
        return {
          ...original,
          status: 'canceled',
          cancel: false,
        };
      }

      workGenComp(calcGenCompOpts);

      return {
        status: 'generatingTeams',
        result: null,
        teamCompsCalculated: null,
        teamCompsTotal: getCombinationCount(candidates.length, input.memberCount),
        cancel: false,
      };
    }),
    ...workerCommonOpts,
  });

  const {work: workGenComp} = useWorker<TeamMakerCalcGenerateCompOpts, TeamMakerCalcGenerateCompReturn>({
    workerName: 'Team Maker (Generate Comp)',
    generateWorker: () => new Worker(new URL('generateComp.worker', import.meta.url)),
    onCompleted: ({
      allPossibleTeamComps,
      ...calcResultOpts
    }) => setState(({
      cancel,
      ...original
    }): TeamMakerState => {
      const {teamCompsTotal} = original;

      for (let i = 0; i < allPossibleTeamComps.length; i += teamMakerCalcCompSegmentSize) {
        if (state.cancel) {
          return {
            ...original,
            status: 'canceled',
            cancel: false,
          };
        }

        try {
          teamMakerFinalResultWorkerPool.queue(async (workFinal) => {
            const result = await workFinal({
              ...calcResultOpts,
              teamComps: allPossibleTeamComps.slice(i, i + teamMakerCalcCompSegmentSize),
            });

            setState((original): TeamMakerState => {
              const {basis} = result;
              let {teamCompsCalculated, teamCompsTotal} = original;

              if (teamCompsCalculated === null || teamCompsTotal === null) {
                return {
                  status: 'error',
                  result: null,
                  teamCompsCalculated: null,
                  teamCompsTotal: null,
                  cancel: false,
                };
              }

              teamCompsCalculated = Math.min(teamCompsCalculated + teamMakerCalcCompSegmentSize, teamCompsTotal);
              const isCompleted = teamCompsCalculated >= teamCompsTotal;

              if (isCompleted) {
                // A small timeout is needed to allow team comps to complete rendering before scrolling
                setTimeout(() => {
                  resultsRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
                }, 250);
              }

              return {
                status: isCompleted ? 'completed' : 'calculating',
                result: {
                  ...result,
                  comps: reduceTeamMakerResultComp({
                    basis,
                    comps: [...(original.result?.comps ?? []), ...result.comps],
                  }),
                },
                teamCompsCalculated,
                teamCompsTotal,
                cancel: false,
              };
            });
          });
        } catch (e) {
          return {
            status: 'error',
            result: null,
            teamCompsCalculated: null,
            teamCompsTotal: null,
            cancel: false,
          };
        }
      }

      return {
        status: 'calculating',
        result: null,
        teamCompsCalculated: 0,
        teamCompsTotal: teamCompsTotal ?? NaN,
        cancel: false,
      };
    }),
    ...workerCommonOpts,
  });

  const calculateTeam = React.useCallback((opts: TeamMakerCalcInitOpts) => {
    setState({
      status: 'initializing',
      result: null,
      teamCompsCalculated: null,
      teamCompsTotal: null,
      cancel: false,
    });
    workInit(opts);
  }, [workInit, setState]);

  const cancelCalculation = React.useCallback(() => {
    setState((original) => {
      const {status} = original;

      if (status !== 'initializing' && status !== 'generatingTeams' && status !== 'calculating') {
        return original;
      }

      return {...original, cancel: true};
    });

    teamMakerFinalResultWorkerPool.terminate(true).then(() => {
      setState((original) => ({
        ...original,
        status: 'canceled',
        cancel: false,
      }));
      regenerateTeamMakerFinalResultWorkerPool();
    });
  }, [setState]);

  return {state, cancelCalculation, calculateTeam, resultsRef};
};
