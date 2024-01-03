import React from 'react';


export const useScrollToAnchorOnLoad = () => {
  React.useEffect(() => {
    const hash = window.location.hash;

    if (!!hash) {
      window.location.hash = '';
      window.location.hash = hash;
    }
  });
};
