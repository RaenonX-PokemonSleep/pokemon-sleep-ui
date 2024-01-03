import {Pool as initWorkerPool, spawn, Worker} from 'threads';

import {getTeamMakerFinalResult} from '@/ui/team/maker/calc/main/final';


const generateTeamMakerFinalResultWorkerPool = () => initWorkerPool(
  // Can't use `new URL().href` here or the worker loading will fail
  // @ts-ignore
  () => spawn<typeof getTeamMakerFinalResult>(new Worker(new URL('./final.worker', import.meta.url))),
  // Fixing concurrency count to avoid OOM
  8,
);

export let teamMakerFinalResultWorkerPool = generateTeamMakerFinalResultWorkerPool();

export const regenerateTeamMakerFinalResultWorkerPool = () => {
  teamMakerFinalResultWorkerPool = generateTeamMakerFinalResultWorkerPool();
};
