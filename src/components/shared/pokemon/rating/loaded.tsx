import React from 'react';

import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import Cog6ToothIcon from '@heroicons/react/24/solid/Cog6ToothIcon';
import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {FilterTextInput} from '@/components/input/filter/preset/text';
import {Flex} from '@/components/layout/flex/common';
import {RatingConfigPopup} from '@/components/shared/pokemon/rating/config/main';
import {useRatingResult} from '@/components/shared/pokemon/rating/hook';
import {RatingResultChart} from '@/components/shared/pokemon/rating/section/chart/main';
import {RatingDetails} from '@/components/shared/pokemon/rating/section/details/main';
import {RatingResultSummary} from '@/components/shared/pokemon/rating/section/summary';
import {RatingResultProps} from '@/components/shared/pokemon/rating/type';
import {ratingWeightedStatsBasisI18nId} from '@/const/game/rating';
import {useAutoUpload} from '@/hooks/userData/autoUpload';
import {RatingConfig, ratingWeightedStatsBasis} from '@/types/game/pokemon/rating/config';
import {getRatingWeightedStats} from '@/utils/game/rating/result/weighted';


type Props = RatingResultProps & {
  initialConfig: RatingConfig,
};

const RatingResultLoadedInternal = ({
  pokemonMaxLevel,
  initialConfig,
  ...props
}: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
  const {request} = props;

  const t = useTranslations('UI.Rating.WeightedStatsBasis');
  const [show, setShow] = React.useState(false);
  const [config, setConfig] = React.useState(initialConfig);
  const {
    activeKeyLevels,
    resultMap,
    updateResultOfLevel,
  } = useRatingResult({pokemonMaxLevel, request});

  const {weight, basis} = config;
  const weightedRating = getRatingWeightedStats({
    activeKeyLevels,
    resultMap,
    weight,
  });

  useAutoUpload({
    opts: {
      type: 'rating',
      data: config,
    },
    triggerDeps: [config],
  });

  return (
    <>
      <RatingConfigPopup
        initial={config}
        activeKeyLevels={activeKeyLevels}
        show={show}
        setShow={setShow}
        onClose={setConfig}
      />
      <Flex ref={ref} className="items-end">
        <button className="button-clickable-bg h-8 w-8 rounded-full p-1" onClick={() => setShow(true)}>
          <Cog6ToothIcon/>
        </button>
      </Flex>
      <FilterTextInput
        title={
          <Flex center>
            <ChartBarIcon className="h-6 w-6"/>
          </Flex>
        }
        onClick={(basis) => setConfig((original) => ({
          ...original,
          basis,
        }))}
        isActive={(current) => current === basis}
        ids={[...ratingWeightedStatsBasis]}
        idToText={(basis) => t(ratingWeightedStatsBasisI18nId[basis])}
      />
      <RatingResultSummary
        rating={weightedRating}
        basis={basis}
        pokemonMaxLevel={pokemonMaxLevel}
        {...props}
      />
      <RatingResultChart
        activeKeyLevels={activeKeyLevels}
        resultMap={resultMap}
        basis={basis}
      />
      <AdsUnit/>
      <RatingDetails
        activeKeyLevels={activeKeyLevels}
        resultMap={resultMap}
        onRated={updateResultOfLevel}
        {...props}
      />
    </>
  );
};

export const RatingResultLoaded = React.forwardRef(RatingResultLoadedInternal);
