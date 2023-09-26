import {durationOfDay} from '@/const/common';


export const rotateTime = (time: number): number => {
  return (time + durationOfDay) % durationOfDay;
};

export const toTimeString = (seconds: number): string => {
  return new Date(rotateTime(seconds) * 1000).toISOString().substring(11, 16);
};

export const toSeconds = (time: string): number => {
  if (!time) {
    return 0;
  }

  const [h, m] = time.split(':');

  return (+h) * 3600 + (+m) * 60;
};

export const toHoursMinutesSeconds = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);

  return (
    // hours
    h + ':' +
    // minutes
    (m < 10 ? '0' + m : m) + ':' +
    // seconds
    (s < 10 ? '0' + s : s)
  );
};
