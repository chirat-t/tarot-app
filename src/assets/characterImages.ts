import type { ImageSourcePropType } from 'react-native';

import { CharacterId } from '../types';

// มีรูปจริงเฉพาะตัวละครหลัก 4 ตัว — สัตว์คู่หู (dog/cat/crow) ยังไม่มี asset
// ตาม PROJECT_BRIEF.md ข้อ 7 จึงไม่ครอบคลุมทุก CharacterId โดยตั้งใจ
export const characterImages: Partial<Record<CharacterId, ImageSourcePropType>> = {
  boy: require('./characters/boy.jpg'),
  witch: require('./characters/witch.jpg'),
  reaper: require('./characters/reaper.jpg'),
  alchemist: require('./characters/alchemist.jpg'),
};
