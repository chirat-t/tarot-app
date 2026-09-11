import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, Appbar, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

import { colors, paperTheme } from '../theme';
import cards from '../data/cards';
import characters from '../data/characters';

// โครงหน้าจอตาม PROJECT_BRIEF.md ข้อ 5 — จะถูกแทนที่ในขั้นตอนที่ 3-6
export type RootStackParamList = {
  Setup: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.gold,
    background: colors.bgPhone,
    card: colors.bgCard,
    text: colors.parchment,
    border: colors.border,
    notification: colors.purple,
  },
};

// หน้าจอชั่วคราวสำหรับตรวจว่า Expo + Paper + React Navigation ติดตั้งครบ
function SetupScreen() {
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Major Arcana" titleStyle={styles.title} />
        <Appbar.Action icon="cards-outline" onPress={() => {}} />
      </Appbar.Header>
      <View style={styles.body}>
        <ActivityIndicator animating size="large" color={colors.gold} />
        <Text style={styles.caption}>
          พร้อมพัฒนา — ไพ่ {cards.length} ใบ / ตัวละคร {characters.length} ตัว
        </Text>
      </View>
    </View>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Setup" component={SetupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: paperTheme.colors.background },
  appbar: { backgroundColor: colors.bgCard },
  title: { color: colors.parchment, letterSpacing: 1 },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  caption: { color: colors.inkDim },
});
