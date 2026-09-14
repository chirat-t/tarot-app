import { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Cinzel_400Regular,
  Cinzel_600SemiBold,
  Cinzel_700Bold,
} from '@expo-google-fonts/cinzel';
import {
  NotoSansThai_400Regular,
  NotoSansThai_500Medium,
  NotoSansThai_700Bold,
} from '@expo-google-fonts/noto-sans-thai';

import { CollectionProvider } from './src/context/CollectionContext';
import AppNavigator from './src/navigation/AppNavigator';
import { colors, paperTheme } from './src/theme';

// กันหน้าจอกะพริบ (splash) หายไปก่อนฟอนต์โหลดเสร็จ — ซ่อนเองใน onLayout
// ของ root view ด้านล่างเมื่อ fontsLoaded เป็น true แล้วเท่านั้น
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  // key ต้องตรงกับที่ src/theme.ts อ้างอิงไว้ใน `fonts` object ทุกตัวอักษร
  const [fontsLoaded, fontError] = useFonts({
    'Cinzel-Regular': Cinzel_400Regular,
    'Cinzel-SemiBold': Cinzel_600SemiBold,
    'Cinzel-Bold': Cinzel_700Bold,
    'NotoSansThai-Regular': NotoSansThai_400Regular,
    'NotoSansThai-Medium': NotoSansThai_500Medium,
    'NotoSansThai-Bold': NotoSansThai_700Bold,
  });

  useEffect(() => {
    if (fontError) {
      // โหลดฟอนต์ไม่สำเร็จ (เช่น ออฟไลน์ตอนเปิดครั้งแรก) — ซ่อน splash แล้ว
      // ปล่อยให้ระบบ fallback เป็นฟอนต์ default แทนที่จะค้างหน้าจอขาว
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontError]);

  const onRootLayout = useCallback(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgPhone }} onLayout={onRootLayout}>
      <SafeAreaProvider>
        <PaperProvider theme={paperTheme}>
          <CollectionProvider>
            <AppNavigator />
          </CollectionProvider>
          <StatusBar style="light" />
        </PaperProvider>
      </SafeAreaProvider>
    </View>
  );
}
