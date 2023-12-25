import React from 'react';

import {MongoClient} from 'mongodb';


declare global {
  const _mongoClientPromise: Promise<MongoClient>;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';

      MONGODB_URI: string;
      API_TOKEN_INBOUND: string;
      API_TOKEN_OUTBOUND: string;

      REACT_APP_DEV_TOOLS?: string;

      // `next-auth` URLs
      NEXTAUTH_URL: string;
      NEXTAUTH_COOKIE_DOMAIN: string;
      NEXTAUTH_SECRET: string;
      NEXTAUTH_EMAIL_SERVER: string;
      NEXTAUTH_EMAIL_FROM: string;
      NEXTAUTH_GOOGLE_CLIENT_ID: string;
      NEXTAUTH_GOOGLE_CLIENT_SECRET: string;

      NEXTAUTH_ADMIN_UID: string;

      // External services - Patreon
      EXTERNAL_PATREON_CAMPAIGN_ID: string;
      EXTERNAL_PATREON_WEBHOOK_SECRET: string;
      EXTERNAL_PATREON_OAUTH_ACCESS_TOKEN: string;

      // External services - GitHub
      EXTERNAL_GITHUB_WEBHOOK_SECRET: string;
      EXTERNAL_GITHUB_PAT: string;

      // Subscription related
      SUBSCRIPTION_DISCORD_SOURCE_URL: string;
      SUBSCRIPTION_DISCORD_SEND_ACTIVATION_URL: string;
      SUBSCRIPTION_EMAIL_SERVER: string;
      SUBSCRIPTION_EMAIL_FROM: string;

      // Public env vars
      NEXT_PUBLIC_BUILD_ID: string;
    }
  }
}

declare module 'react' {
  // Has to redeclare for generic of `forwardRef()` to work
  // https://fettblog.eu/typescript-react-generic-forward-refs/
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
  ): (props: P & React.RefAttributes<T>) => React.ReactNode | null;
}
