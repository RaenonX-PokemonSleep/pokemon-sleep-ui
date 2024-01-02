import React from 'react';

import {adsCheckInitialTimeoutMs, adsCheckIntervalMs} from '@/components/ads/const';
import {AdBlockState} from '@/components/ads/type';
import {useTimedTick} from '@/hooks/timedTick';


type UseAdBlockDetectorOpts = {
  setAdblockState: React.Dispatch<React.SetStateAction<AdBlockState>>,
  recheckDeps: React.DependencyList,
};

export const useAdBlockDetector = ({setAdblockState, recheckDeps}: UseAdBlockDetectorOpts) => {
  const adsRef = React.useRef<HTMLDivElement>(null);
  // For triggering ads check
  // https://github.com/gorhill/uBlock/wiki/Resources-Library#nosiifjs-
  // https://github.com/gorhill/uBlock/wiki/Resources-Library#no-setinterval-ifjs-
  // https://github.com/gorhill/uBlock/wiki/Resources-Library#no-settimeout-ifjs-
  useTimedTick({
    onTick: (counter) => {
      // Ignore the first tick
      if (!counter) {
        return;
      }

      setAdblockState((original) => ({
        ...original,
        isBlocked: !original.found && !adsRef.current?.querySelector('ins.adsbygoogle > div'),
      } satisfies AdBlockState));
    },
    intervalMs: adsCheckIntervalMs,
    rescheduleDeps: recheckDeps,
    onLoadTriggerTimeoutMs: adsCheckInitialTimeoutMs,
  });

  const observer = new MutationObserver((mutations) => {
    setAdblockState({
      found: mutations.every(({addedNodes, removedNodes}) => !!addedNodes.length && !removedNodes.length),
      isBlocked: false,
    });
  });

  React.useEffect(() => {
    if (!adsRef.current) {
      return;
    }

    observer.observe(adsRef.current, {childList: true, subtree: true});

    return () => observer.disconnect();
  }, [adsRef.current]);

  return adsRef;
};
