import { useEffect } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Text } from 'react-native-paper';

import { loadingBackgroundImage } from '../assets/backgroundImages';
import CardBack from '../components/CardBack';
import { colors, fonts } from '../theme';
import type { RootStackParamList } from '../navigation/types';

const SHUFFLE_MS = 1000;
const CARD_WIDTH = 150; // ~150x220 ตาม PROJECT_BRIEF.md ข้อ 5.2

type Props = NativeStackScreenProps<RootStackParamList, 'Loading'>;

// จำลองการสับไพ่ ~1 วินาที ก่อนเปิดผล (ข้อ 5.2)
export default function LoadingScreen({ navigation, route }: Props) {
  const { cardId } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      // replace เพื่อให้ปุ่มย้อนกลับจาก CardDetail ไม่ย้อนมาหน้าสับไพ่อีก
      navigation.replace('CardDetail', { cardId });
    }, SHUFFLE_MS);
    return () => clearTimeout(timer);
  }, [navigation, cardId]);

  return (
    <ImageBackground source={loadingBackgroundImage} resizeMode="cover" style={styles.container}>
      <CardBack width={CARD_WIDTH}>
        <ActivityIndicator animating size="large" color={colors.gold} />
      </CardBack>
      <View style={styles.texts}>
        <Text style={styles.title}>กำลังสับไพ่...</Text>
        <Text style={styles.subtitle}>ตั้งคำถามในใจ แล้วปล่อยให้ไพ่เลือกคุณ</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // backgroundColor เป็น fallback สีทึบระหว่างรอโหลดภาพพื้นหลัง/ถ้าโหลดไม่สำเร็จ
  container: {
    flex: 1,
    backgroundColor: colors.bgPhone,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
    padding: 24,
  },
  texts: { alignItems: 'center', gap: 8 },
  title: { color: colors.parchment, fontFamily: fonts.bodyMedium, fontSize: 18, letterSpacing: 1 },
  subtitle: { color: colors.inkDim, fontFamily: fonts.body, fontSize: 13, textAlign: 'center' },
});
