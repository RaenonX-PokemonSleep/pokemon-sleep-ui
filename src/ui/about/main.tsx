import React from 'react';

import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon';

import {Flex} from '@/components/layout/flex/common';
import {NextLink} from '@/components/shared/common/link/main';
import {DiscordLink} from '@/components/static/discord/link';
import {discordLink} from '@/const/external';
import {DefaultPageProps} from '@/types/next/page/common';
import {AboutSection} from '@/ui/about/section';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {getI18nTranslator} from '@/utils/i18n';


export const About = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'UI.Metadata'});

  return (
    <PublicPageLayout locale={locale}>
      <Flex center className="info-section !gap-8">
        <Flex className="gap-2">
          <div className="text-2xl">
            {t('Site.Name')}
          </div>
          <AboutSection title="Discord">
            <DiscordLink className="button-clickable-glow h-14 w-14"/>
          </AboutSection>
        </Flex>
        <Flex className="gap-8 md:flex-row">
          <Flex className="gap-3">
            <Flex center>
              <UserCircleIcon className="h-10 w-10"/>
            </Flex>
            <AboutSection title="Discord">
              @raenonx
            </AboutSection>
            <AboutSection title="LINE">
              RaenonX
            </AboutSection>
          </Flex>
          <Flex className="gap-2">
            <Flex center>
              <CurrencyDollarIcon className="h-10 w-10"/>
            </Flex>
            <AboutSection title="Patreon">
              <NextLink href="https://patreon.com/RaenonX" className="border-link">
                https://patreon.com/RaenonX
              </NextLink>
            </AboutSection>
            <AboutSection title="Discord">
              <NextLink href={discordLink} className="border-link">
                {discordLink}
              </NextLink>
            </AboutSection>
          </Flex>
        </Flex>
        <Flex className="md:w-1/2 xl:w-1/3">
          <iframe
            src="https://discord.com/widget?id=1138701819464392744&theme=dark"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            className="h-[40vh] rounded-lg"
          />
        </Flex>
      </Flex>
    </PublicPageLayout>
  );
};
