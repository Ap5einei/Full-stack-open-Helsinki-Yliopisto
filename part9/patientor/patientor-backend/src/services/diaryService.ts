import diaryEntries from '../../data/entries';
import { DiaryEntry } from '../types';

const getEntries = (): DiaryEntry[] => {
  return diaryEntries;
};

export default {
  getEntries
};
