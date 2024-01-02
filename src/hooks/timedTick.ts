import React from 'react';


type UseTimedTickOpts = {
  onTick: (counter: number) => void,
  intervalMs: number,
  rescheduleDeps: React.DependencyList,
  onLoadTriggerTimeoutMs?: number,
};

export const useTimedTick = ({
  onTick,
  intervalMs,
  rescheduleDeps,
  onLoadTriggerTimeoutMs,
}: UseTimedTickOpts): number => {
  const [counter, setCounter] = React.useState(0);

  React.useEffect(
    () => onTick(counter),
    [counter],
  );
  React.useEffect(() => {
    if (onLoadTriggerTimeoutMs == null) {
      return;
    }

    setTimeout(
      () => setCounter((original) => original + 1),
      onLoadTriggerTimeoutMs,
    );
  }, []);
  React.useEffect(() => {
    const interval = setInterval(
      () => setCounter((original) => original + 1),
      intervalMs,
    );

    return () => clearInterval(interval);
  }, rescheduleDeps);

  return counter;
};
