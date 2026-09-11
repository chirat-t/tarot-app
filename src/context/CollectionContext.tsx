import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import cards from '../data/cards';
import { TarotCard, UserCardProgress } from '../types';

// สถานะผู้ใช้ (UserCardProgress) เก็บแยกจากข้อมูลไพ่แบบ static ตาม PROJECT_BRIEF.md ข้อ 10
type CollectionContextValue = {
  cards: TarotCard[];
  isLoading: boolean;
  progress: Record<string, UserCardProgress>;
  viewedCount: number;
  unviewedCount: number;
  totalCount: number;
  isViewed: (cardId: string) => boolean;
  markViewed: (cardId: string) => void;
};

const CollectionContext = createContext<CollectionContextValue | undefined>(undefined);

export function CollectionProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState<Record<string, UserCardProgress>>({});

  // โหลดสถานะไพ่ที่เคยเปิด — ตอนนี้เก็บในหน่วยความจำ (หายเมื่อปิดแอป)
  // ขั้นตอนถัดไปเปลี่ยนมาอ่าน/เขียน AsyncStorage ตรงนี้ที่เดียว
  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      if (active) setIsLoading(false);
    }, 600);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  const markViewed = useCallback((cardId: string) => {
    setProgress((prev) => {
      if (prev[cardId]?.isViewed) return prev;
      return {
        ...prev,
        [cardId]: { cardId, isViewed: true, viewedAt: new Date().toISOString() },
      };
    });
  }, []);

  const isViewed = useCallback((cardId: string) => Boolean(progress[cardId]?.isViewed), [progress]);

  const viewedCount = useMemo(
    () => Object.values(progress).filter((p) => p.isViewed).length,
    [progress]
  );

  const value = useMemo<CollectionContextValue>(
    () => ({
      cards,
      isLoading,
      progress,
      viewedCount,
      unviewedCount: cards.length - viewedCount,
      totalCount: cards.length,
      isViewed,
      markViewed,
    }),
    [isLoading, progress, viewedCount, isViewed, markViewed]
  );

  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
}

export function useCollection() {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollection ต้องใช้ภายใน <CollectionProvider>');
  }
  return context;
}
