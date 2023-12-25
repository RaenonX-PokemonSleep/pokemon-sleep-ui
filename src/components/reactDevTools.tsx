import React from 'react';

import Script from 'next/script';

import {isProduction} from '@/utils/environment';


export const ReactDevTools = () => {
  if (isProduction() || !process.env.REACT_APP_DEV_TOOLS) {
    return null;
  }

  return <Script src="http://localhost:8097"/>;
};
