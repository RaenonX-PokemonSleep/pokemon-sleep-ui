import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';
import {Session} from 'next-auth';
import {useTranslations} from 'next-intl';

import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Flex} from '@/components/layout/flex/common';
import {userActivationI18nId} from '@/const/user/activation';
import {activationType} from '@/types/mongo/activation';


type Props = {
  session: Session,
};

export const UserSettingsAccountInfo = ({session}: Props) => {
  const [show, setShow] = React.useState(false);
  const t = useTranslations('UI.Subscription.Activation');

  return (
    <Flex className="gap-1 rounded-lg p-2 shadow-border-inner shadow-slate-500 md:flex-row">
      <button className="button-clickable-bg h-8 w-8 shrink-0 self-center p-1" onClick={() => setShow(!show)}>
        {show ? <EyeSlashIcon/> : <EyeIcon/>}
      </button>
      <Flex className="gap-1">
        <Flex direction="row" center wrap className="items-center gap-1.5">
          {activationType.map((type) => (
            <div key={type} className={clsx(
              'whitespace-nowrap rounded-lg px-1.5 py-1 shadow-border',
              session.user.activation[type] ?
                'text-green-700 shadow-green-700 dark:text-green-300 dark:shadow-green-300' :
                'text-slate-400 shadow-slate-400 dark:text-slate-600 dark:shadow-slate-600',
            )}>
              {t(userActivationI18nId[type])}
            </div>
          ))}
        </Flex>
        <AnimatedCollapseQuick show={show}>
          <div>{session.user.email}</div>
          <code className="text-fuchsia-700 dark:text-fuchsia-400">{session.user.id}</code>
        </AnimatedCollapseQuick>
      </Flex>
    </Flex>
  );
};
