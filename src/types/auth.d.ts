import {ObjectId} from 'bson';
import {DefaultSession} from 'next-auth';

import {ActivationStatus} from '@/types/mongo/activation';
import {UserLazyLoadedData, UserPreloadedData} from '@/types/userData/main';


export type NextAuthUserInDatabase = Required<DefaultSession['user']> & {
  _id: ObjectId,
};

export type NextAuthSessionUser = DefaultSession['user'] & {
  id: string,
  errorOnUpdate: boolean,
  preloaded: UserPreloadedData,
  lazyLoaded: UserLazyLoadedData,
  activation: ActivationStatus,
  build: string,
};

declare module 'next-auth' {
  interface Session {
    user: NextAuthSessionUser;
  }
}
