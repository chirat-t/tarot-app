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
  screens/              # Home, Loading, CardDetail, Collection, Profile
  components/           # CardBack, CardGridItem, CharacterAvatar, InfoRow (CardModal รอข้อ 6)
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
- [x] 3. Home Screen (Appbar + Badge, Banner, Grid 22 ใบ, Bottom tab)
- [x] 4. Loading Screen (สับไพ่ ~1 วิ + ActivityIndicator ซ้อนหลังไพ่)
- [x] 5. Card Detail (Appbar.BackAction + Avatar + คำโปรย + InfoRow + สุ่มไพ่ใหม่)
- [ ] 6. Collection
- [ ] 7. ใส่ assets จริง · 8. Capture หน้าจอ + รายงาน PDF

หมายเหตุขั้นตอนที่ 3:

- สถานะไพ่ที่เปิดแล้วและรายการที่บันทึกไว้ persist ด้วย AsyncStorage
  (`@major-arcana/progress`, `@major-arcana/favorites`) อ่าน/เขียนที่
  `CollectionContext` ที่เดียว
- Flow: แตะไพ่ → `Loading` (สับไพ่ ~1 วิ) → `replace` ไป `CardDetail`
  ปุ่มย้อนกลับจึงกลับ Home ไม่ย้อนไปหน้าสับไพ่
- หลังไพ่วาดด้วย style ไปก่อน อยู่ที่ `components/CardBack.tsx` ที่เดียว
  ขั้นตอนที่ 7 เปลี่ยนเป็น `assets/card-back.png` จุดเดียวจบ
- Avatar ใช้ `Avatar.Icon` แมป CharacterId → ไอคอน ที่
  `components/CharacterAvatar.tsx` ขั้นตอนที่ 7 เปลี่ยนเป็น `Avatar.Image`
- `CollectionScreen` / `ProfileScreen` เป็นโครงรอขั้นตอนที่ 6
