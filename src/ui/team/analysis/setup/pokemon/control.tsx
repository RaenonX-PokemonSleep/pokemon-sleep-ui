import React from 'react';

import ArrowTopRightOnSquareIcon from '@heroicons/react/24/outline/ArrowTopRightOnSquareIcon';
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon';
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import PencilIcon from '@heroicons/react/24/outline/PencilIcon';
import PresentationChartLineIcon from '@heroicons/react/24/outline/PresentationChartLineIcon';
import ShareIcon from '@heroicons/react/24/outline/ShareIcon';

import {Copyable} from '@/components/layout/copyable/main';
import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {RatingPopupControl} from '@/components/shared/pokemon/rating/type';
import {UserActionStatusIcon} from '@/components/shared/userData/statusIcon';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {TeamAnalysisPokemonProps} from '@/ui/team/analysis/setup/pokemon/type';
import {toPokeInBox, toRatingSetup} from '@/ui/team/analysis/setup/pokemon/utils';
import {getTeamMemberId} from '@/utils/user/teamAnalysis';


type Props = TeamAnalysisPokemonProps & {
  ratingControl: RatingPopupControl,
  onEditClick: () => void,
  onChartClick: () => void,
  onDetailsClick: () => void,
};

export const TeamAnalysisPokemonControl = (props: Props) => {
  const {
    member,
    currentTeam,
    slotName,
    pokemon,
    snorlaxFavorite,
    ratingControl,
    bundle,
    onEditClick,
    onChartClick,
    onDetailsClick,
  } = props;

  const [showId, setShowId] = React.useState(false);
  const {act, status} = useUserDataActor();

  const commonButtonStyle = 'button-clickable-bg h-7 w-7 p-1';

  return (
    <Flex direction="row" wrap className="items-center justify-between gap-1">
      <PopupCommon show={showId} setShow={setShowId}>
        <Copyable content={getTeamMemberId({uuid: currentTeam.uuid, slotName})}/>
      </PopupCommon>
      <Flex direction="row" noFullWidth className="gap-1">
        <button className={commonButtonStyle} onClick={() => {
          if (!act) {
            return;
          }

          act({
            action: 'upload',
            options: {
              type: 'pokebox.create',
              data: toPokeInBox(member),
            },
          });
        }}>
          <UserActionStatusIcon status={status} onWaitingOverride={<ArrowTopRightOnSquareIcon/>}/>
        </button>
        <button className={commonButtonStyle} onClick={() => setShowId(true)}>
          <ShareIcon/>
        </button>
      </Flex>
      <Flex direction="row" noFullWidth className="gap-1">
        <button className={commonButtonStyle} onClick={() => ratingControl.sendRequest(toRatingSetup({
          member,
          pokemon,
          snorlaxFavorite,
          specialtyId: pokemon.specialty,
          bundle,
        }))}>
          <MagnifyingGlassIcon/>
        </button>
        <button className={commonButtonStyle} onClick={onDetailsClick}>
          <ChartBarIcon/>
        </button>
        <button className={commonButtonStyle} onClick={onChartClick}>
          <PresentationChartLineIcon/>
        </button>
        <button className={commonButtonStyle} onClick={onEditClick}>
          <PencilIcon/>
        </button>
      </Flex>
    </Flex>
  );
};
