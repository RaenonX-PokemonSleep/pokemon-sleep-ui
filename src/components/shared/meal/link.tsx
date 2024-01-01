import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {FlexLink} from '@/components/layout/flex/link';
import {MealImage} from '@/components/shared/meal/image';
import {MealLinkDetail} from '@/components/shared/meal/linkDetail';
import {MealLinkProps} from '@/components/shared/meal/type';
import {mealTypeBackgroundStyle} from '@/styles/game/mealType';


export const MealLink = (props: MealLinkProps) => {
  const {meal} = props;
  const {id, type} = meal;

  const t = useTranslations('Game.Food');

  const mealName = t(id.toString());

  return (
    <FlexLink
      href={`/meal/${id}`}
      direction='col'
      center
      className={clsx(
        'relative h-20 w-full items-end rounded-lg',
        mealTypeBackgroundStyle[type],
      )}
    >
      <MealImage mealId={id} dimension="h-20 w-20" className="opacity-40"/>
      <Flex className="absolute left-0 top-0 z-10 h-full justify-between p-1.5">
        <div className="text-shadow-preset truncate text-left">
          {mealName}
        </div>
        <Flex noFullWidth>
          <MealLinkDetail {...props}/>
        </Flex>
      </Flex>
    </FlexLink>
  );
};
