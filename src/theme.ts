import { MD3DarkTheme } from 'react-native-paper';

import { TarotTheme } from './types';

// Design tokens จาก PROJECT_BRIEF.md ข้อ 6 (UI Mockup)
export const colors = {
  bgPage: '#0B1120',    // พื้นหลังนอกสุด
  bgPhone: '#0E1526',   // พื้นหลังจอ
  bgCard: '#151E33',    // การ์ด/พื้นผิวหลัก
  bgCard2: '#1B2740',   // พื้นผิวรอง เช่น banner, chip
  gold: '#C9A24B',      // สี accent หลัก (ปุ่ม, ไอคอน, ขอบ)
  goldDim: '#8A733A',   // ขอบ/เส้นรอง
  parchment: '#EDE3C8', // ข้อความหลัก (สีขาวนวล)
  ink: '#B9C0D4',       // ข้อความรอง
  inkDim: '#7C859E',    // ข้อความ hint/caption
  purple: '#6E5CC7',    // accent ที่สอง — badge "ใหม่"/notification dot
  border: '#2A3550',
} as const;

export const fonts = {
  display: 'Cinzel',      // หัวเรื่อง/ชื่อไพ่
  body: 'Noto Sans Thai', // เนื้อหา
} as const;

// ธีมเริ่มต้นตามโครงสร้าง TarotTheme — ThemeContext จะอ่านค่านี้แล้วส่งต่อให้ทุกหน้าจอ
export const defaultTarotTheme: TarotTheme = {
  id: 'default',
  name: 'Major Arcana',
  colors: {
    background: colors.bgPhone,
    cardBg: colors.bgCard,
    gold: colors.gold,
    parchment: colors.parchment,
  },
  cardBackImage: 'assets/card-back.png',
  fontDisplay: fonts.display,
};

// ธีมของ react-native-paper — คอมโพเนนต์ Paper (Appbar, Banner, Badge,
// Avatar, ActivityIndicator) ดึงสีจากที่นี่แทนการ hardcode
export const paperTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.gold,
    onPrimary: colors.bgPage,
    secondary: colors.purple,
    onSecondary: colors.parchment,
    background: colors.bgPhone,
    onBackground: colors.parchment,
    surface: colors.bgCard,
    onSurface: colors.parchment,
    surfaceVariant: colors.bgCard2,
    onSurfaceVariant: colors.ink,
    outline: colors.border,
    outlineVariant: colors.goldDim,
    error: '#CF6679',
    elevation: {
      ...MD3DarkTheme.colors.elevation,
      level0: 'transparent',
      level1: colors.bgCard,
      level2: colors.bgCard2,
      level3: colors.bgCard2,
      level4: colors.bgCard2,
      level5: colors.bgCard2,
    },
  },
};

export type AppTheme = typeof paperTheme;
