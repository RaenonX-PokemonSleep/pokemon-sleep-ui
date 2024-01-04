import {Collection} from 'mongodb';

import {activationContact, ActivationKey} from '@/types/mongo/activation';


export const addActivationKeyIndex = async <TActivation extends ActivationKey>(
  getCollection: () => Promise<Collection<TActivation>>,
) => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({key: 1}, {unique: true}),
    collection.createIndex({expiry: 1}, {expireAfterSeconds: 0}),
    collection.createIndex({source: 1}),
    ...activationContact.map((channel) => (
      collection.createIndex({[`contact.${channel}`]: 1}, {sparse: true})
    )),
  ]);
};
