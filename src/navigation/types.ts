import { CharacterId } from '../types';

// Bottom tab (PROJECT_BRIEF.md ข้อ 5.1)
export type RootTabParamList = {
  Home: undefined;
  Collection: undefined;
};

// Stack ครอบ tab ไว้ เพื่อให้ Loading/CardDetail/CharacterDetail เปิดเต็มจอทับ tab bar
export type RootStackParamList = {
  Tabs: undefined;
  Loading: { cardId: string };
  CardDetail: { cardId: string };
  CharacterDetail: { characterId: CharacterId };
};
