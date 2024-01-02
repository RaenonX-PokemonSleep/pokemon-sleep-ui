import React from 'react';

import {useUserDataActor} from '@/hooks/userData/actor/main';


export const useAdClickDetector = () => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const stateRef = React.useRef({
    hovered: false,
    blurred: false,
  });
  const isInvalidBlur = React.useRef(false);
  const {act} = useUserDataActor({statusNoReset: true, statusToast: true});

  // Expected state change behavior (*H* for hovered; *B* for blurred)
  // (O) PointerEnter -> Focus Element -> Click on Ads -> Element Blurred -> Doc Visible -> Grant Ads-Free
  // (X) PointerEnter -> Focus Element -> PointerLeave -> (Reset State)

  React.useLayoutEffect(() => {
    const onVisibilityChange = () => {
      if (!act || !stateRef.current.blurred || !stateRef.current.hovered || document.visibilityState !== 'visible') {
        return;
      }

      act({
        action: 'upload',
        options: {
          type: 'admin.activation.adClick',
        },
      });
      window.gtag('event', 'ad_click');
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);


  const onBlur = React.useCallback(() => {
    if (isInvalidBlur.current) {
      return;
    }

    stateRef.current = {
      hovered: true,
      blurred: true,
    };
  }, []);
  const onPointerEnter = React.useCallback(() => {
    stateRef.current = {
      hovered: true,
      blurred: false,
    };

    isInvalidBlur.current = false;
    contentRef.current?.focus();
  }, []);
  const onPointerLeave = React.useCallback(() => {
    stateRef.current = {
      hovered: false,
      blurred: false,
    };

    isInvalidBlur.current = true;
    contentRef.current?.blur();
  }, []);

  return {
    contentRef,
    onBlur,
    onPointerEnter,
    onPointerLeave,
  };
};
