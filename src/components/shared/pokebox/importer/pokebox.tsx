import React from 'react';

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import BookmarkIcon from '@heroicons/react/24/solid/BookmarkIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InfoIcon} from '@/components/icons/info';
import {InputBox} from '@/components/input/box';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {NextImage} from '@/components/shared/common/image/main';
import {FeatureLinkImage} from '@/components/shared/link/featureImage';
import {usePokeboxImporterFilter} from '@/components/shared/pokebox/importer/filter';
import {PokeboxImporterCommonProps, PokeInBoxForFilter} from '@/components/shared/pokebox/importer/type';
import {PokemonFilter} from '@/components/shared/pokemon/filter/main';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {pokeInBoxFavoriteStyle} from '@/styles/game/pokebox';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {PokeInBox} from '@/types/game/pokebox/main';
import {isNotNullish} from '@/utils/type';


type Props = PokeboxImporterCommonProps & {
  pokebox: PokeInBox[],
};

export const PokeboxImporterView = ({
  pokedexMap,
  subSkillMap,
  onPokeboxPicked,
  pokebox,
  ...props
}: Props) => {
  const t = useTranslations('UI.Metadata.Team');
  const t2 = useTranslations('Game');
  const t3 = useTranslations('UI.Common');
  const t4 = useTranslations('UI.InPage.Pokedex');

  const {
    filter,
    setFilter,
    isIncluded,
  } = usePokeboxImporterFilter({
    ...props,
    data: pokebox
      .map(({pokemon, ...pokeInBox}): PokeInBoxForFilter | null => {
        const pokemonInfo = pokedexMap[pokemon];

        if (!pokemonInfo) {
          return null;
        }

        return {
          ...pokeInBox,
          name: pokeInBox.name ?? t2(`PokemonName.${pokemon}`),
          search: [t2(`PokemonName.${pokemon}`), pokeInBox.name].filter(isNotNullish),
          pokemon: pokemonInfo,
        };
      })
      .filter(isNotNullish),
  });
  const collapsible = useCollapsible();

  if (!pokebox.length) {
    return (
      <FeatureLinkImage
        href="/team/box"
        imageSrc="/images/generic/bag.png"
        text={t('Box.Title')}
      />
    );
  }

  return (
    <Flex className="gap-1.5">
      <Collapsible state={collapsible} classNameForHeight="h-72 md:h-56" button={
        <Flex direction="row" center className="gap-0.5">
          <FunnelIcon className="h-6 w-6"/>
        </Flex>
      }>
        <Flex noFullWidth className="gap-1 pr-1">
          <InputRowWithTitle title={t4('Info.Name')}>
            <InputBox
              type="text"
              value={filter.name}
              onChange={({target}) => setFilter((original) => ({
                ...original,
                name: target.value,
              }))}
            />
          </InputRowWithTitle>
          <PokemonFilter
            pokemonList={Object.values(pokedexMap).filter(isNotNullish)}
            filter={filter}
            setFilter={(getUpdated) => setFilter((original) => getUpdated(original))}
            {...props}
          />
        </Flex>
      </Collapsible>
      <Grid className="grid-cols-1 gap-1.5 lg:grid-cols-2">
        {pokebox.filter(({uuid}) => isIncluded[uuid]).map(({name, isShiny, isFavorite, ...pokeInBox}) => (
          <button
            key={pokeInBox.uuid} className="button-clickable-bg group p-1"
            onClick={() => onPokeboxPicked({name, ...pokeInBox})}
          >
            <Flex direction="row" className="items-center gap-1.5">
              <IconWithInfo
                imageSrc={`/images/pokemon/icons/${pokeInBox.pokemon}.png`}
                imageAlt={t2(`PokemonName.${pokeInBox.pokemon}`)}
                imageDimension="h-12 w-12"
                imageSizes={imageIconSizes}
                info={pokeInBox.level}
                className="shrink-0"
              />
              <Flex>
                <Flex direction="row" center className={clsx('gap-1', isFavorite && pokeInBoxFavoriteStyle)}>
                  {
                    isShiny &&
                    <InfoIcon>
                      <div className="relative h-4 w-4">
                        <NextImage
                          src="/images/generic/flash.png" alt={t3('Shiny')}
                          sizes={imageSmallIconSizes} className="invert-on-light"
                        />
                      </div>
                    </InfoIcon>
                  }
                  {isFavorite && <BookmarkIcon className="h-5 w-5"/>}
                  <div className="truncate">
                    {name}
                  </div>
                </Flex>
                <Flex className="items-end md:flex-row">
                  <PokemonNatureIndicator nature={pokeInBox.nature} hideName/>
                  <div className="ml-auto">
                    <PokemonSubSkillIndicator
                      subSkill={pokeInBox.subSkill}
                      subSkillMap={subSkillMap}
                      level={pokeInBox.level}
                    />
                  </div>
                </Flex>
              </Flex>
            </Flex>
          </button>
        ))}
      </Grid>
    </Flex>
  );
};
