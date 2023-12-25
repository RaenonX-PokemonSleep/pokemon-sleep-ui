import React from 'react';


type UseWorkerOpts<TWorkerResult> = {
  workerName: string,
  generateWorker: () => Worker,
  onCompleted: (message: TWorkerResult) => void,
  onError: (event: ErrorEvent) => void,
};

export const useWorker = <TWorkerMessage, TWorkerResult>({
  workerName,
  generateWorker,
  onCompleted,
  onError,
}: UseWorkerOpts<TWorkerResult>) => {
  const worker = React.useRef<Worker>();

  React.useEffect(() => {
    worker.current = generateWorker();
    worker.current.onmessage = (event: MessageEvent<TWorkerResult>) => onCompleted(event.data);

    worker.current.onerror = (event) => {
      onError(event);
      console.error(`Error event occurred in worker [${workerName}]`, event);

      throw event;
    };

    return () => worker.current?.terminate();
  }, []);

  const work = React.useCallback((message: TWorkerMessage) => {
    const webWorker = worker.current;

    if (!webWorker) {
      throw new Error(`Worker [${workerName}] should be called only when the component is ready`);
    }

    webWorker.postMessage(message);
  }, [worker]);

  return {work};
};
