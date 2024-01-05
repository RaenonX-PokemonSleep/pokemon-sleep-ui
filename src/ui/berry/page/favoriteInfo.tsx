import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {MapLink} from '@/components/shared/map/link';
import {BerryFavoriteInMapType} from '@/components/shared/pokemon/berry/favoriteType';
import {BerryFavoriteInfo} from '@/types/game/mapMeta';


type Props = {
  favoriteInfo: BerryFavoriteInfo,
};

export const BerryFavoriteInfoUi = ({favoriteInfo}: Props) => {
  const t = useTranslations('Game.Field');

  return (
    <Flex center className="info-section">
      <Flex direction="row" center wrap className="gap-1.5">
        {Object.entries(favoriteInfo).map(([mapId, type]) => {
          if (!type) {
            return null;
          }

          return (
            <MapLink key={mapId} mapId={mapId} className="h-24 w-64">
              <div className="text-xl">
                {t(mapId)}
              </div>
              <div className="h-10 w-10 self-center">
                <BerryFavoriteInMapType type={type}/>
              </div>
            </MapLink>
          );
        })}
      </Flex>
    </Flex>
  );
};
