import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {GenerateMetadata, GeneratePageMetaValues} from '@/types/next/metadata';
import {getI18nTranslator} from '@/utils/i18n';


type GeneratePageMetaOpts = {
  key: I18nMessageKeysOfNamespace<'UI.Metadata'>,
  values?: GeneratePageMetaValues,
};

export const generatePageMeta = ({key, values}: GeneratePageMetaOpts): GenerateMetadata => async ({params}) => {
  const {locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'UI.Metadata'});

  return {
    title: `${t(key, values)} | ${t('Site.Name')}`,
    description: t('Site.Description'),
    authors: [
      {
        name: 'RaenonX',
        url: 'https://github.com/RaenonX',
      },
      {
        name: 'John Mitchell-Grant',
        url: 'https://github.com/johnmgrant',
      },
    ],
    creator: 'RaenonX',
    appleWebApp: {
      capable: true,
    },
    generator: 'Next.js',
    manifest: '/manifest.json',
    keywords: [
      // Game name
      '寶可夢睡覺',
      'Pokemon Sleep',
      'ポケスリ',
      '포슬립',
      // General
      '寶可夢',
      'Pokemon',
      'ポケスリ',
      '포켓몬',
      // Language-specific
      '攻略',
    ],
    icons: [
      {rel: 'apple-touch-icon', url: '/icons/icon-180x180.png'},
      {rel: 'icon', url: '/icon.svg', sizes: 'any', type: 'image/svg+xml'},
      {
        rel: 'icon',
        url: '/favicon.ico',
        sizes: '72x72 76x76 80x80 87x87 96x96 100x100 114x114 120x120 128x128 144x144 152x152 167x167 180x180',
        type: 'image/x-icon',
      },
    ],
  };
};

type generatePageMetaFromStringOpts = {
  t: (key: I18nMessageKeysOfNamespace<'UI.Metadata'>) => string,
  title: string,
};

export const generatePageMetaFromString = ({t, title}: generatePageMetaFromStringOpts) => {
  return {
    title: `${title} | ${t('Site.Name')}`,
    description: t('Site.Description'),
  };
};
