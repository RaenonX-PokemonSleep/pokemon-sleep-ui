import {ObjectId} from 'bson';

import {getUserActivationList} from '@/controller/user/activation/data';


const adminUid = process.env.NEXTAUTH_ADMIN_UID ? new ObjectId(process.env.NEXTAUTH_ADMIN_UID) : null;

export const isAdmin = (userId: string | undefined): boolean => {
  if (!userId) {
    return false;
  }

  return adminUid?.equals(new ObjectId(userId)) ?? false;
};

export const throwIfNotAdmin = (userId: string | undefined) => {
  if (!isAdmin(userId)) {
    throw new Error(`User ID ${userId} does not have admin privilege!`);
  }
};

export const isCmsMod = async (userId: string | undefined): Promise<boolean> => {
  if (!userId) {
    return false;
  }

  return (await getUserActivationList(userId)).some(({isCmsMod}) => isCmsMod);
};

export const throwIfNotCmsMod = async (userId: string | undefined) => {
  if (!await isCmsMod(userId)) {
    throw new Error(`User ID ${userId} does not have CMS Moderator privilege!`);
  }
};
