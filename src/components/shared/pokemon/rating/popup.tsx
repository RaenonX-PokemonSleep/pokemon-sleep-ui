import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {RatingResult} from '@/components/shared/pokemon/rating/main';
import {RatingPopupControl, RatingResultProps} from '@/components/shared/pokemon/rating/type';


type Props = Omit<RatingResultProps, 'request'> & {
  ratingControl: RatingPopupControl,
};

export const RatingResultPopup = ({ratingControl, pokemon, pokemonProducingParams, ...props}: Props) => {
  const {state, setState} = ratingControl;

  return (
    <PopupCommon show={state.show} setShow={(show) => setState((original) => ({...original, show}))}>
      <Flex noFullWidth className="sm:w-[90vw]">
        <RatingResult
          request={state.request}
          setRequest={(request) => setState((original) => ({...original, request}))}
          pokemon={pokemon}
          pokemonProducingParams={pokemonProducingParams}
          {...props}
        />
      </Flex>
    </PopupCommon>
  );
};
