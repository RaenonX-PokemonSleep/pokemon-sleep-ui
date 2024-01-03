import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {FlexLink} from '@/components/layout/flex/link';
import {NextImage} from '@/components/shared/common/image/main';
import {MealMeta} from '@/components/shared/meal/meta';
import {imageIconSizes} from '@/styles/image';
import {MealExp} from '@/ui/meal/page/exp';
import {MealCommonProps} from '@/ui/meal/page/type';


export const MealInfo = (props: MealCommonProps) => {
  const {meal} = props;

  const t = useTranslations('Game.Food');

  return (
    <Flex center className="info-section md:flex-row md:gap-4">
      <MealMeta meal={meal}/>
      <Flex className="gap-2 lg:w-2/3">
        <MealExp {...props}/>
        <Flex direction="row" center className="gap-1.5">
          {meal.ingredients.map(({id, quantity}) => (
            <FlexLink
              href={`/ingredient/${id}`}
              direction="col"
              key={id}
              center
              className="button-clickable-bg p-1.5"
            >
              <div className="relative h-12 w-12">
                <NextImage src={`/images/ingredient/${id}.png`} alt={t(id.toString())} sizes={imageIconSizes}/>
              </div>
              <div>
                {quantity}
              </div>
            </FlexLink>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
