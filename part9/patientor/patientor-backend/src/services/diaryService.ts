import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';
import diaryEntries from '../data/entries';

const getEntries = (): DiaryEntry[] => {
  return diaryEntries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaryEntries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility
  }));
};

export default {
  getEntries,
  getNonSensitiveEntries
};
