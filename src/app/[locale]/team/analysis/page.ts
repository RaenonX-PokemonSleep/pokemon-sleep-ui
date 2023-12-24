import {GenerateMetadata} from '@/types/next/metadata';
import {TeamAnalysis} from '@/ui/team/analysis/main';
import {isProduction} from '@/utils/environment';
import {getI18nTranslator} from '@/utils/i18n';
import {generatePageMetaFromString} from '@/utils/meta';
import {loadTeamAnalysisLogger} from '@/utils/team/utils';


if (! isProduction) {
  loadTeamAnalysisLogger();
}

export const generateMetadata: GenerateMetadata = async ({params}) => {
  const {locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'UI.Metadata'});

  return generatePageMetaFromString({
    t,
    title: `${t('Team.Index.Title')} / ${t('Team.Analysis.Title')}`,
  });
};

export default TeamAnalysis;
