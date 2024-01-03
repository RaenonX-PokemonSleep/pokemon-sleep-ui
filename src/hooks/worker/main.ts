import React from 'react';

import {UseWorkerCommonOpts} from '@/hooks/worker/type';


type UseWorkerOpts<TWorkerResult> = UseWorkerCommonOpts & {
  onCompleted: (message: TWorkerResult) => void,
};

export const useWorker = <TWorkerMessage, TWorkerResult>({
  workerName,
  generateWorker,
  onError,
  onCompleted,
  isCanceled,
}: UseWorkerOpts<TWorkerResult>) => {
  const worker = React.useRef<Worker>();

  React.useEffect(() => {
    if (isCanceled) {
      worker.current?.terminate();
    }

    worker.current = generateWorker();
    worker.current.onmessage = (event: MessageEvent<TWorkerResult>) => onCompleted(event.data);

    worker.current.onerror = (event) => {
      onError(event);
      console.error(`Error event occurred in worker [${workerName}]`, event);

      throw event;
    };

    return () => worker.current?.terminate();
  }, [isCanceled]);

  const work = React.useCallback((message: TWorkerMessage) => {
    const webWorker = worker.current;

    if (!webWorker) {
      throw new Error(`Worker [${workerName}] should be called only when the component is ready`);
    }

    webWorker.postMessage(message);
  }, [worker]);

  return {work};
};
