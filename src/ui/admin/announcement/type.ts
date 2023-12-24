import {AnnouncementClient, AnnouncementClientMap} from '@/types/mongo/announcement';


export type AdminAnnouncementServerDataProps = {
  preloaded: AnnouncementClientMap,
};

export type AdminAnnouncementModifyProps = {
  onUpdate: (uuid: string, update: Partial<AnnouncementClient>) => void,
  onDelete: (uuid: string) => void,
};
