// Bottom tab (PROJECT_BRIEF.md ข้อ 5.1)
export type RootTabParamList = {
  Home: undefined;
  Collection: undefined;
  Profile: undefined;
};

// Stack ครอบ tab ไว้ เพื่อให้ Loading/CardDetail เปิดเต็มจอทับ tab bar
export type RootStackParamList = {
  Tabs: undefined;
  Loading: { cardId: string };
  CardDetail: { cardId: string };
};
