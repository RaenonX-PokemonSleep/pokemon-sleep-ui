import React from 'react';

import {useUserDataActor} from '@/hooks/userData/actor/main';


export const useAdClickDetector = () => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const stateRef = React.useRef({
    hovered: false,
    blurred: false,
  });
  const isBlurredRef = React.useRef(false);
  const {act} = useUserDataActor({statusNoReset: true, statusToast: true});

  React.useEffect(() => {
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
    contentRef.current?.focus();
  }, []);
  const onPointerLeave = React.useCallback(() => {
    stateRef.current = {
      hovered: false,
      blurred: false,
    };
    isBlurredRef.current = false;
  }, []);

  return {
    contentRef,
    onBlur,
    onPointerEnter,
    onPointerLeave,
  };
};
