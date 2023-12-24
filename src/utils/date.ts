import {formatISO} from 'date-fns';

import {IsoDateString, IsoTimestampString} from '@/types/date';


export const toIsoDateString = (date: Date): IsoDateString => date.toISOString().slice(0, 10) as IsoDateString;

export const toIsoTimestampString = (date: Date): IsoTimestampString => (
  date.toISOString().slice(0, -1) as IsoTimestampString
);

export const toLocalIsoTimestampString = (timestamp: IsoTimestampString | null): IsoTimestampString | null => {
  if (!timestamp) {
    return null;
  }

  return formatISO(new Date(`${timestamp}Z`)).slice(0, 19) as IsoTimestampString;
};

export const toUtcIsoTimestampString = (timestamp: string) => (
  toIsoTimestampString(new Date(timestamp)) as IsoTimestampString
);
