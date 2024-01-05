import React from 'react';


import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {RatingResultLoaded} from '@/components/shared/pokemon/rating/loaded';
import {RatingResultProps} from '@/components/shared/pokemon/rating/type';
import {UserDataLazyLoad} from '@/components/shared/userData/lazyLoad/main';
import {defaultRatingConfig} from '@/const/game/rating';


const RatingResultInternal = (props: RatingResultProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <Flex className="gap-1.5">
      <AdsUnit/>
      <UserDataLazyLoad
        options={{type: 'ratingConfig'}}
        loadingText="Rating"
        content={({data}) => {
          const config = data === null ? null : data.ratingConfig;

          return (
            <RatingResultLoaded
              ref={ref}
              initialConfig={config ?? defaultRatingConfig}
              {...props}
            />
          );
        }}
      />
    </Flex>
  );
};

export const RatingResult = React.forwardRef(RatingResultInternal);
