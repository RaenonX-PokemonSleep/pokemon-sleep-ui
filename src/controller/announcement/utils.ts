import {Announcement, AnnouncementClient} from '@/types/mongo/announcement';
import {toIsoTimestampString} from '@/utils/date';


export const toAnnouncementClient = ({expiry, ...announcement}: Announcement): AnnouncementClient => {
  return {
    ...announcement,
    expiry: expiry ? toIsoTimestampString(expiry) : null,
  };
};

export const toAnnouncement = ({expiry, ...announcement}: AnnouncementClient): Announcement => {
  let ret: Announcement = {...announcement};

  if (expiry) {
    // Has to explicitly include because `expiry: undefined` fails the validation
    ret = {...ret, expiry: new Date(`${expiry}Z`)};
  }

  return ret;
};
