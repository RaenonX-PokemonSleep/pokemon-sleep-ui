import React from 'react';

import ArrowTopRightOnSquareIcon from '@heroicons/react/24/outline/ArrowTopRightOnSquareIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/outline/EllipsisVerticalIcon';
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import PencilIcon from '@heroicons/react/24/outline/PencilIcon';
import PresentationChartLineIcon from '@heroicons/react/24/outline/PresentationChartLineIcon';
import ShareIcon from '@heroicons/react/24/outline/ShareIcon';
import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import {useTranslations} from 'next-intl';

import {DropDown} from '@/components/dropdown/main';
import {FlexButton} from '@/components/layout/flex/button';
import {RatingPopupControl} from '@/components/shared/pokemon/rating/type';
import {UserActionStatusIcon} from '@/components/shared/userData/statusIcon';
import {PremiumIcon} from '@/components/static/premium/icon';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {
  teamAnalysisPokemonControlButtonStyle,
  teamAnalysisPokemonIconStyle,
} from '@/ui/team/analysis/setup/pokemon/control/const';
import {TeamAnalysisPokemonPopupType, TeamAnalysisPokemonProps} from '@/ui/team/analysis/setup/pokemon/type';
import {toPokeInBox, toRatingSetup} from '@/ui/team/analysis/setup/pokemon/utils';


type Props = TeamAnalysisPokemonProps & {
  ratingControl: RatingPopupControl,
  onPopupButtonClick: (type: TeamAnalysisPokemonPopupType, requirePremium: boolean) => void,
  isPremium: boolean,
};

export const TeamAnalysisPokemonControl = ({
  ratingControl,
  onPopupButtonClick,
  isPremium,
  ...props
}: Props) => {
  const {
    member,
    pokemon,
    snorlaxFavorite,
    bundle,
  } = props;

  const {act, status} = useUserDataActor({statusToast: true});
  const t = useTranslations('UI.InPage.Team.Analysis');

  return (
    <DropDown
      button={
        <button className="button-clickable-bg h-7 w-7 !rounded-full p-1" disabled={status === 'processing'}>
          <UserActionStatusIcon status={status} onWaitingOverride={<EllipsisVerticalIcon/>}/>
        </button>
      }
      itemList={[
        [
          () => (
            <FlexButton className={teamAnalysisPokemonControlButtonStyle} onClick={() => {
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
              <div className={teamAnalysisPokemonIconStyle}>
                <UserActionStatusIcon status={status} onWaitingOverride={<ArrowTopRightOnSquareIcon/>}/>
              </div>
              <div>{t('Control.ExportToPokebox')}</div>
            </FlexButton>
          ),
          () => (
            <FlexButton className={teamAnalysisPokemonControlButtonStyle} onClick={() => onPopupButtonClick(
              'sharableLink', false,
            )}>
              <ShareIcon className={teamAnalysisPokemonIconStyle}/>
              <div>{t('Control.ShareableLink')}</div>
            </FlexButton>
          ),
        ],
        [
          () => (
            <FlexButton className={teamAnalysisPokemonControlButtonStyle}
              onClick={() => ratingControl.sendRequest(toRatingSetup({
                member,
                pokemon,
                snorlaxFavorite,
                specialtyId: pokemon.specialty,
                bundle,
              }))}>
              <MagnifyingGlassIcon className={teamAnalysisPokemonIconStyle}/>
              <div>{t('Control.Rating')}</div>
            </FlexButton>
          ),
          () => (
            <FlexButton className={teamAnalysisPokemonControlButtonStyle} onClick={() => onPopupButtonClick(
              'detailedStats', true,
            )}>
              <ChartBarIcon className={teamAnalysisPokemonIconStyle}/>
              <div>{t('Control.DetailedStats')}</div>
            </FlexButton>
          ),
          () => (
            <FlexButton className={teamAnalysisPokemonControlButtonStyle} onClick={() => onPopupButtonClick(
              'growthChart', true,
            )}>
              <PresentationChartLineIcon className={teamAnalysisPokemonIconStyle}/>
              {!isPremium && <PremiumIcon/>}
              <div>{t('Control.StrengthGrowth')}</div>
            </FlexButton>
          ),
        ],
        [
          () => (
            <FlexButton className={teamAnalysisPokemonControlButtonStyle} onClick={() => onPopupButtonClick(
              'memberConfig', false,
            )}>
              <PencilIcon className={teamAnalysisPokemonIconStyle}/>
              <div>{t('Control.Edit')}</div>
            </FlexButton>
          ),
        ],
      ]}
      origin="topRight"
    />
  );
};
