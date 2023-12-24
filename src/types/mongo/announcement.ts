import {IsoTimestampString} from '@/types/date';
import {Locale} from '@/types/next/locale';


export const announcementLevels = [
  'info',
  'ok',
  'warning',
  'alert',
] as const;

export type AnnouncementLevel = typeof announcementLevels[number];

// Check `addAnnouncementDataValidation()` for data validation
export type Announcement = {
  uuid: string,
  message: string,
  locale: Locale[],
  level: AnnouncementLevel,
  expiry?: Date,
  order?: number,
};

export type AnnouncementClient = Omit<Announcement, 'expiry'> & {
  expiry: IsoTimestampString | null,
};

export type AnnouncementClientMap = {[uuid in string]?: AnnouncementClient};
