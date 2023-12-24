import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {useRatingPopup} from '@/components/shared/pokemon/rating/hook';
import {RatingResultPopup} from '@/components/shared/pokemon/rating/popup';
import {PokemonInfoWithSortingPayload, SortedPokemonInfo} from '@/components/shared/pokemon/sorter/type';
import {PokeInBox} from '@/types/game/pokebox/main';
import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {PokeInBoxView} from '@/ui/team/pokebox/content/pokeInBox/main';
import {PokeInBoxViewCommonProps} from '@/ui/team/pokebox/content/pokeInBox/type';
import {PokeboxViewStatus} from '@/ui/team/pokebox/content/status';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';
import {getPokemonProducingParams} from '@/utils/game/producing/params';


type Props = PokeboxCommonProps & PokeInBoxViewCommonProps & {
  filter: PokeboxViewerFilter,
  setFilter: ReactStateUpdaterFromOriginal<PokeboxViewerFilter>,
  loading: boolean,
  totalPokeInBox: number,
  processedPokebox: SortedPokemonInfo<PokeInBox, PokemonInfoWithSortingPayload<PokeInBox>>[],
};

export const PokeboxContent = (props: Props) => {
  const {
    filter,
    setFilter,
    loading,
    totalPokeInBox,
    processedPokebox,
    pokemonProducingParamsMap,
  } = props;

  const {state, setState, showPokemon} = usePokemonLinkPopup();
  const ratingControl = useRatingPopup();

  return (
    <Flex className="gap-1.5">
      <PokemonLinkPopup state={state} setState={setState}/>
      {
        ratingControl.state.request &&
        <RatingResultPopup
          pokemon={ratingControl.state.request.setup.pokemon}
          pokemonProducingParams={getPokemonProducingParams({
            pokemonId: ratingControl.state.request.setup.pokemon.id,
            pokemonProducingParamsMap,
          })}
          ratingControl={ratingControl}
          {...props}
        />
      }
      <PokeboxViewStatus
        filter={filter}
        setFilter={setFilter}
        loading={loading}
        countToShow={processedPokebox.length}
        total={totalPokeInBox}
      />
      <LazyLoad loading={loading} className="gap-1.5">
        <PokeInBoxView
          {...props}
          showPokemon={showPokemon}
          setRatingPopupControl={ratingControl.sendRequest}
          isLevelPreview={filter.previewLevel !== null}
        />
      </LazyLoad>
    </Flex>
  );
};
