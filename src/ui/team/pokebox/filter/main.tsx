import React from 'react';

import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import {clsx} from 'clsx';

import {FlexButton} from '@/components/layout/flex/button';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonVanillaPopup} from '@/components/shared/pokemon/vanillaPopup/main';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';


type Props = PokeboxCommonProps & {
  pokemonList: PokemonInfo[],
  onClick: (pokemonId: PokemonId) => void,
};

export const PokeboxPickerInput = ({pokemonList, onClick, ...props}: Props) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <PokemonVanillaPopup
        show={show}
        setShow={setShow}
        pokemonList={pokemonList}
        onPokemonSelected={({id}) => onClick(id)}
        {...props}
      />
      <FlexButton direction="row" center onClick={() => setShow(true)} className={clsx(
        'button-clickable-bg group gap-0.5 p-1',
      )}>
        <GenericPokeballIcon alt="Pokemon" dimension="h-6 w-6"/>
        <PlusCircleIcon className="h-6 w-6"/>
      </FlexButton>
    </>
  );
};
