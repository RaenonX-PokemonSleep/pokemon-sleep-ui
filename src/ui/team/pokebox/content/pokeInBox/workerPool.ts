import {Pool as initWorkerPool, spawn, Worker} from 'threads';

import {calculateRatingResultOfLevel} from '@/utils/game/rating/calc/main';


export const pokeboxWorkerPool = initWorkerPool(
  // Can't use `new URL().href` here or the worker loading will fail
  // @ts-ignore
  () => spawn<typeof calculateRatingResultOfLevel>(new Worker(new URL('./worker', import.meta.url))),
  // Fixing concurrency count to avoid OOM
  8,
);
