import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {FlexLink} from '@/components/layout/flex/link';
import {PokemonGallery} from '@/components/shared/pokemon/gallery/main';
import {MainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/main';
import {PokemonNameBig} from '@/components/shared/pokemon/name/big';
import {PokemonIngredientRate} from '@/components/shared/pokemon/production/params/ingredient';
import {PokemonMainSkillTriggerRate} from '@/components/shared/pokemon/production/params/skillRate';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType/main';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty/main';
import {specialtyIdMap} from '@/const/game/pokemon';
import {specialtyTextClassDefault} from '@/styles/game/specialty';
import {PokemonMetaSection} from '@/ui/pokedex/page/meta/section';
import {PokemonStats} from '@/ui/pokedex/page/meta/stats';
import {metaTitleClass} from '@/ui/pokedex/page/style';
import {PokemonDataProps} from '@/ui/pokedex/page/type';
import {isPokemonEventOnly} from '@/utils/game/pokemon/event';


export const PokemonMeta = (props: PokemonDataProps) => {
  const {pokemon, pokemonProducingParams} = props;
  const {specialty, sleepType, skill} = pokemon;

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex');

  return (
    <Flex center className="info-section lg:flex-row">
      <Flex className="gap-2 md:p-5 lg:p-8">
        {
          isPokemonEventOnly(pokemon) &&
          <div className={clsx(
            'text-event-pokemon rounded-lg p-1 shadow-border shadow-fuchsia-700 dark:shadow-fuchsia-500',
          )}>
            {t2('Stats.EventOnly')}
          </div>
        }
        <PokemonNameBig pokemon={pokemon}/>
        <PokemonGallery {...props}/>
      </Flex>
      <AdsUnit className="my-2 lg:hidden"/>
      <Flex className="gap-y-3 md:p-5 lg:p-8">
        <PokemonMetaSection title={t2('Info.SleepType')} contentClassName="text-lg">
          <PokemonSleepType sleepType={sleepType} dimension="h-7 w-7"/>
        </PokemonMetaSection>
        <PokemonMetaSection
          title={t2('Info.Specialty')}
          contentClassName={clsx('text-lg', specialty && specialtyTextClassDefault[specialty])}
        >
          <PokemonSpecialty specialty={specialty} dimension="h-7 w-7"/>
        </PokemonMetaSection>
        <PokemonMetaSection
          title={t2('Info.MainSkill')}
          titleClassName={clsx(metaTitleClass, specialty === specialtyIdMap.skill && 'bg-blink')}
        >
          <Flex className="gap-1" noFullWidth>
            <FlexLink href={`/info/mainskill/${skill}`} center className={clsx(
              'button-clickable-bg group gap-2 p-1 px-2 text-lg',
            )}>
              <MainSkillIcon id={skill} dimension="h-6 w-6"/>
              <div>{t(`MainSkill.Name.${skill}`)}</div>
            </FlexLink>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {t(`MainSkill.Description.${skill}`)}
            </div>
          </Flex>
        </PokemonMetaSection>
        <PokemonMetaSection
          title={t2('Sort.IngredientRate')}
          contentClassName="flex justify-center"
        >
          <FlexLink href="/info/production" center className={clsx(
            'button-clickable-bg group gap-2 p-1 px-2 text-lg',
          )}>
            <PokemonIngredientRate params={pokemonProducingParams} noIcon dimension="h-6 w-6"/>
          </FlexLink>
        </PokemonMetaSection>
        <PokemonMetaSection
          title={t2('Stats.MainSkillTriggerRate')}
          contentClassName="flex justify-center"
        >
          <FlexLink href="/info/production" center className={clsx(
            'button-clickable-bg group gap-2 p-1 px-2 text-lg',
          )}>
            <PokemonMainSkillTriggerRate params={pokemonProducingParams} noIcon dimension="h-6 w-6"/>
          </FlexLink>
        </PokemonMetaSection>
        <PokemonMetaSection
          title={t2('Info.Stats')}
          contentClassName="flex justify-center"
        >
          <PokemonStats {...props}/>
        </PokemonMetaSection>
      </Flex>
    </Flex>
  );
};
