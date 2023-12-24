import {Filter, UpdateOneModel} from 'mongodb';

import {
  getActivationDataByFilter,
  getAllActivationData,
  removeActivationDataBatch,
  removeActivationDataSingle,
  updateActivationDataPropertiesBatch,
  updateActivationDataPropertiesSingle,
} from '@/controller/user/activation/data';
import {
  getActivationKeyByFilter,
  getAllActivationKeys,
  removeActivationKeyBatch,
  removeActivationKeySingle,
  updateActivationKeyPropertiesBatch,
  updateActivationKeyPropertiesSingle,
} from '@/controller/user/activation/key';
import {ActionSendActivationPayload} from '@/handler/action/activation/type';
import {ActivationKey, ActivationProperties, ActivationSource} from '@/types/mongo/activation';
import {isNotNullish} from '@/utils/type';


type UpdateActivationPropertiesSingleOpts = {
  filter: Filter<ActivationProperties>,
  properties: ActivationProperties,
};

export const updateActivationPropertiesSingle = ({filter, properties}: UpdateActivationPropertiesSingleOpts) => {
  return Promise.all([
    updateActivationDataPropertiesSingle({
      executorUserId: process.env.NEXTAUTH_ADMIN_UID,
      filter,
      update: properties,
    }),
    updateActivationKeyPropertiesSingle({
      executorUserId: process.env.NEXTAUTH_ADMIN_UID,
      filter,
      update: properties,
    }),
  ]);
};

type UpdateActivationPropertiesFromPayloadsOpts = {
  source: ActivationSource,
  payloads: ActionSendActivationPayload[]
};

export const updateActivationPropertiesFromPayloads = ({
  source,
  payloads,
}: UpdateActivationPropertiesFromPayloadsOpts) => {
  const updates: UpdateOneModel<ActivationKey>[] = payloads
    .map(({contact, activationProperties}) => {
      if (!activationProperties || activationProperties.isFrozen) {
        return null;
      }

      return ({
        filter: {[`contact.${source}`]: contact},
        update: {$set: activationProperties},
        upsert: false,
      });
    })
    .filter(isNotNullish);

  if (!updates.length) {
    return;
  }

  return Promise.all([
    updateActivationKeyPropertiesBatch({executorUserId: process.env.NEXTAUTH_ADMIN_UID, updates}),
    updateActivationDataPropertiesBatch({executorUserId: process.env.NEXTAUTH_ADMIN_UID, updates}),
  ]);
};

type RemoveActivationOpts = {
  filter: Filter<ActivationProperties>,
};

export const removeActivationSingle = ({filter}: RemoveActivationOpts) => {
  return Promise.all([
    removeActivationKeySingle({executorUserId: process.env.NEXTAUTH_ADMIN_UID, filter}),
    removeActivationDataSingle({executorUserId: process.env.NEXTAUTH_ADMIN_UID, filter}),
  ]);
};

export const removeActivationBatch = ({filter}: RemoveActivationOpts) => {
  return Promise.all([
    removeActivationKeyBatch({executorUserId: process.env.NEXTAUTH_ADMIN_UID, filter}),
    removeActivationDataBatch({executorUserId: process.env.NEXTAUTH_ADMIN_UID, filter}),
  ]);
};

type GetActivationPropertiesByContactOpts = {
  source: ActivationSource,
  contact: string,
};

export const getActivationPropertiesByContact = async ({
  source,
  contact,
}: GetActivationPropertiesByContactOpts): Promise<ActivationProperties | null> => {
  const filter: Filter<ActivationProperties> = {[`contact.${source}`]: contact};

  const properties = await getActivationDataByFilter({
    executorUserId: process.env.NEXTAUTH_ADMIN_UID,
    filter,
  });
  if (properties) {
    return properties;
  }

  return await getActivationKeyByFilter({executorUserId: process.env.NEXTAUTH_ADMIN_UID, filter});
};

export const getAllActivationsOfSource = async (source: ActivationSource): Promise<ActivationKey[]> => {
  const [
    activationData,
    activationKeys,
  ] = await Promise.all([
    getAllActivationData({
      executorUserId: process.env.NEXTAUTH_ADMIN_UID,
      filter: {source},
    }),
    getAllActivationKeys({
      executorUserId: process.env.NEXTAUTH_ADMIN_UID,
      filter: {source},
    }),
  ]);

  return [...activationData, ...activationKeys];
};
