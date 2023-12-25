import React from 'react';

import EnvelopeIcon from '@heroicons/react/24/outline/EnvelopeIcon';
import {redirect} from 'next/navigation';
import {getServerSession} from 'next-auth';

import {Flex} from '@/components/layout/flex/common';
import {NextLink} from '@/components/shared/common/link/main';
import {authOptions} from '@/const/auth';
import {DefaultPageProps} from '@/types/next/page/common';
import {AuthLayout} from '@/ui/auth/common/layout';
import {AuthSignInExternal} from '@/ui/auth/signIn/external';


export const AuthSignIn = async ({params, searchParams}: DefaultPageProps) => {
  const {locale} = params;
  const session = await getServerSession(authOptions);

  if (session) {
    const callbackUrl = searchParams?.callbackUrl;

    // Redirection here will be a complete URL,
    // therefore the `redirect` usage should be directly from `next` instead
    if (typeof callbackUrl !== 'string') {
      redirect('/');
    }

    redirect(callbackUrl);
  }

  return (
    <AuthLayout locale={locale}>
      <AuthSignInExternal/>
      <Flex className="items-end">
        <NextLink href={'/auth/sign-in/email'} className="border-link w-fit">
          <Flex direction="row" noFullWidth center className="gap-1.5">
            <EnvelopeIcon className="h-6 w-6"/>
            <div>Email</div>
          </Flex>
        </NextLink>
      </Flex>
    </AuthLayout>
  );
};
