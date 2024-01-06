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

  const siteName = `${t(key, values)} | ${t('Site.Name')}`;
  return {
    applicationName: siteName,
    title: siteName,
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
      title: siteName,
      statusBarStyle: 'default',
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
      {rel: 'icon', url: '/favicon.ico', type: 'image/x-icon'},
    ],
    formatDetection: {
      url: true,
      date: true,
      email: true,
      address: false,
      telephone: false,
    },
    other: {
      'mobile-web-app-capable': 'yes',
      'msapplication-TileColor': '#ffffff',
      'msapplication-tap-highlight': 'no',
      'msapplication-TileImage': '/icons/icon-150x150.png',
    },
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
