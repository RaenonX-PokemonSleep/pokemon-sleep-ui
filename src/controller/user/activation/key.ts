import crypto from 'crypto';

import {Collection, Filter, UpdateOneModel} from 'mongodb';

import {getDataAsArray, getSingleData} from '@/controller/common';
import {throwIfNotAdmin} from '@/controller/user/account/common';
import {ControllerRequireUserIdOpts} from '@/controller/user/account/type';
import {addActivationKeyIndex} from '@/controller/user/activation/index';
import mongoPromise from '@/lib/mongodb';
import {ActivationKey, ActivationKeyAtClient, ActivationProperties} from '@/types/mongo/activation';
import {toActivationKeyAtClient} from '@/utils/user/activation/utils';


const getCollection = async (): Promise<Collection<ActivationKey>> => {
  const client = await mongoPromise;

  return client
    .db('auth')
    .collection<ActivationKey>('activationKey');
};

type GenerateActivationKeyOpts = ControllerRequireUserIdOpts & ActivationProperties;

export const generateActivationKey = async ({
  executorUserId,
  ...opts
}: GenerateActivationKeyOpts): Promise<string | null> => {
  throwIfNotAdmin(executorUserId);

  const collection = await getCollection();

  const key = crypto.randomBytes(24).toString('hex');
  await collection.insertOne({
    ...opts,
    key,
    generatedAt: new Date(),
  });

  return `${process.env.NEXTAUTH_URL}/account/activate?key=${key}`;
};

type GetActivationKeyByFilterOpts = ControllerRequireUserIdOpts & {
  filter: Filter<ActivationKey>,
};

type GetAllActivationKeysOpts = ControllerRequireUserIdOpts & {
  filter: Filter<ActivationKey>,
};

export const getAllActivationKeys = ({executorUserId, filter}: GetAllActivationKeysOpts) => {
  throwIfNotAdmin(executorUserId);

  return getDataAsArray(getCollection(), filter);
};

export const getAllActivationKeyAsClient = async (): Promise<ActivationKeyAtClient[]> => {
  return (await getAllActivationKeys({executorUserId: process.env.NEXTAUTH_ADMIN_UID, filter: {}}))
    .map(toActivationKeyAtClient);
};

export const getActivationKeyByFilter = ({executorUserId, filter}: GetActivationKeyByFilterOpts) => {
  throwIfNotAdmin(executorUserId);

  return getSingleData(getCollection(), filter);
};

export const getActivationKey = async (key: string) => (
  getSingleData(getCollection(), {key})
);

type UpdateActivationPropertiesOfKeyOpts = ControllerRequireUserIdOpts & {
  filter: Filter<ActivationKey>,
  update: ActivationProperties,
};

export const updateActivationKeyPropertiesSingle = async ({
  executorUserId,
  filter,
  update,
}: UpdateActivationPropertiesOfKeyOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).updateOne(filter, {$set: update});
};

type UpdateActivationKeyPropertiesBatchOpts = ControllerRequireUserIdOpts & {
  updates: UpdateOneModel<ActivationKey>[]
};

export const updateActivationKeyPropertiesBatch = async ({
  executorUserId,
  updates,
}: UpdateActivationKeyPropertiesBatchOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).bulkWrite(
    updates.map((updateOne) => ({updateOne})),
    {ordered: false},
  );
};

type UpdateActivationKeyByKeyOpts = ControllerRequireUserIdOpts & ActivationProperties & {
  key: ActivationKey['key'],
};

export const updateActivationKeyByKey = async ({
  executorUserId,
  key,
  activation,
  expiry,
  source,
  contact,
  isCmsMod,
  isActivationLocked,
  isFrozen,
  note,
}: UpdateActivationKeyByKeyOpts) => updateActivationKeyPropertiesSingle({
  executorUserId,
  filter: {key},
  // Explicit to avoid properties accidentally passed in, overwriting the data
  update: {
    activation,
    expiry,
    source,
    contact,
    isCmsMod: isCmsMod ?? false,
    isActivationLocked: isActivationLocked ?? false,
    isFrozen: isFrozen ?? false,
    note,
  } satisfies Required<ActivationProperties>,
});

type RemoveActivationKeyOpts = ControllerRequireUserIdOpts & {
  filter: Filter<ActivationKey>,
};

export const removeActivationKeySingle = async ({executorUserId, filter}: RemoveActivationKeyOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).deleteOne(filter);
};

export const removeActivationKeyBatch = async ({executorUserId, filter}: RemoveActivationKeyOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).deleteMany(filter);
};

export const removeActivationKeyByKey = async (key: string) => (
  removeActivationKeySingle({executorUserId: process.env.NEXTAUTH_ADMIN_UID, filter: {key}})
);

addActivationKeyIndex(getCollection)
  .catch((e) => console.error('MongoDB failed to initialize user activation key index', e));
