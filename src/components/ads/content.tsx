import React from 'react';

import {clsx} from 'clsx';

import {
  adsCheckInitialTimeoutMs,
  adsCheckIntervalMs,
  adsHeight,
  adsHeightAdBlockActive,
} from '@/components/ads/const';
import {useAdBlockDetector} from '@/components/ads/hook/adBlockDetect';
import {useAdClickDetector} from '@/components/ads/hook/adClickDetect';
import {AdBlockState, AdsContentProps} from '@/components/ads/type';
import {AdBlockWarning} from '@/components/ads/warning';
import {Flex} from '@/components/layout/flex/common';
import {useTimedTick} from '@/hooks/timedTick';


type Props = AdsContentProps & {
  checkDom: boolean,
  recheckDeps: React.DependencyList,
};

export const AdsContent = ({
  className,
  heightOverride,
  checkDom,
  recheckDeps,
  children,
}: React.PropsWithChildren<Props>) => {
  const [adblockState, setAdblockState] = React.useState<AdBlockState>({
    // Can't contain the word 'ads' here, or it'll get detected
    found: false,
    isBlocked: false,
  });

  const adsRef = useAdBlockDetector({
    setAdblockState,
    recheckDeps,
  });
  const {
    contentRef,
    ...adClickDetectProps
  } = useAdClickDetector();

  // Check if the ads DOM is getting hidden
  const [domHidden, setDomHidden] = React.useState(false);
  useTimedTick({
    onTick: (counter) => {
      if (!counter) {
        // Skipping the first check because `offsetHeight` on load will be 0
        return;
      }

      if (!contentRef.current?.offsetHeight || !adsRef.current?.offsetHeight) {
        setDomHidden(true);
      }
    },
    intervalMs: adsCheckIntervalMs,
    rescheduleDeps: [],
    onLoadTriggerTimeoutMs: adsCheckInitialTimeoutMs,
  });

  if (checkDom && domHidden) {
    return (
      <Flex className={adsHeightAdBlockActive}>
        <AdBlockWarning/>
      </Flex>
    );
  }

  return (
    <div
      ref={contentRef}
      tabIndex={-1}
      {...adClickDetectProps}
      className={clsx(
        'relative w-full overflow-hidden focus:outline-none',
        adblockState.isBlocked ? adsHeightAdBlockActive : (heightOverride ?? adsHeight),
        className,
      )}
    >
      {adblockState.isBlocked && <AdBlockWarning/>}
      <div ref={adsRef} className="absolute left-0 top-0 h-full w-full">
        {children}
      </div>
    </div>
  );
};
