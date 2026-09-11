# Major Arcana: 22 เส้นทาง

แอปมือถือสาธิตการใช้งาน UI Component จาก React Native Paper
(`ActivityIndicator`, `Appbar`, `Avatar`, `Badge`, `Banner`)
สเปกทั้งหมดอยู่ใน [PROJECT_BRIEF.md](./PROJECT_BRIEF.md)

## เริ่มใช้งาน

```bash
npm install
npm start      # หรือ npm run android / npm run ios / npm run web
```

## Stack

| แพ็กเกจ | เวอร์ชัน | หมายเหตุ |
|---|---|---|
| Expo | ~57.0.21 | template `blank-typescript` |
| React Native | 0.86.3 | |
| react-native-paper | ^5.15.3 | ไอคอนใช้ `@expo/vector-icons` (MaterialCommunityIcons) |
| @react-navigation/native + native-stack + bottom-tabs | ^7 | พร้อม `react-native-screens`, `react-native-safe-area-context` |

## โครงสร้างโปรเจกต์

ตาม PROJECT_BRIEF.md ข้อ 8

```
App.tsx                 # PaperProvider + SafeAreaProvider + AppNavigator
src/
  types.ts              # TarotCard, CharacterArc, UserCardProgress, TarotTheme, TarotDeck
  theme.ts              # design tokens (ข้อ 6) + paperTheme + defaultTarotTheme
  data/
    cards.ts            # ข้อมูลไพ่ 22 ใบ (0-21)
    characters.ts       # ตัวละคร 4 ตัว
  context/              # ThemeContext.tsx, CollectionContext.tsx
  screens/              # HomeScreen, LoadingScreen, CardDetailScreen, CollectionScreen
  components/           # CardGridItem, CardModal, InfoRow
  navigation/
    AppNavigator.tsx
  assets/
    cards/              # 00-the-fool.png ... 21-the-world.png
    characters/         # boy.png, witch.png, reaper.png, alchemist.png
assets/                 # ไอคอน/splash ของแอป (Expo ต้องการที่ root ตาม app.json)
```

## สถานะ

- [x] 1. ติดตั้งโปรเจกต์ Expo + react-native-paper + React Navigation
- [x] 2. `types.ts` + ข้อมูลไพ่ 22 ใบ + ตัวละคร 4 ตัว
- [ ] 3. Home Screen · 4. Loading (สับไพ่) · 5. Card Detail · 6. Collection
- [ ] 7. ใส่ assets จริง · 8. Capture หน้าจอ + รายงาน PDF

`src/navigation/AppNavigator.tsx` ตอนนี้มีหน้าจอชั่วคราวไว้ตรวจว่าติดตั้งครบ
จะถูกแทนที่ด้วย Bottom tab (Home / Collection / Profile) ในขั้นตอนที่ 3
