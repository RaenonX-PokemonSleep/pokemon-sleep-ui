import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {NextLink} from '@/components/shared/common/link/main';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {imageIconSizes} from '@/styles/image';
import {AnalysisStatsLinkedData} from '@/ui/analysis/page/calc/type';


type Props<TData> = {
  linked: AnalysisStatsLinkedData<TData>,
  renderData?: (data: AnalysisStatsLinkedData<TData>) => React.ReactNode,
};

export const AnalysisPokemonIcon = <TData, >({linked, renderData}: Props<TData>) => {
  const {pokemonId} = linked;

  const t = useTranslations('Game.PokemonName');
  const t2 = useTranslations('UI.Metadata');

  const name = t(pokemonId.toString());

  return (
    <Flex center noFullWidth className={clsx(
      'button-bg relative w-24 gap-1.5 rounded-lg p-1',
    )}>
      <div className="relative h-14 w-14">
        <NextImage src={`/images/pokemon/icons/${pokemonId}.png`} alt={name} sizes={imageIconSizes}/>
      </div>
      {
        renderData &&
        <Flex>
          {renderData(linked)}
        </Flex>
      }
      <Flex direction="row" className="gap-2">
        <Flex center>
          <NextLink href={`/pokedex/${pokemonId}`} className="button-clickable group relative h-6 w-6">
            <GenericPokeballIcon alt={t2('Pokedex.Page.Title', {name})} noWrap/>
          </NextLink>
        </Flex>
        <Flex center>
          <NextLink href={`/analysis/${pokemonId}`} className="button-clickable group relative h-6 w-6">
            <NextImage
              src="/images/generic/analysis.png" alt={t2('Analysis.Title', {name})}
              sizes={imageIconSizes} className="invert-hoverable"
            />
          </NextLink>
        </Flex>
      </Flex>
    </Flex>
  );
};
