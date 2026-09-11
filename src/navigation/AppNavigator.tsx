import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useCollection } from '../context/CollectionContext';
import CollectionScreen from '../screens/CollectionScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors } from '../theme';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

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

export default function AppNavigator() {
  const { unviewedCount } = useCollection();
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // แต่ละหน้าจอมี Appbar ของตัวเอง
          tabBarActiveTintColor: colors.gold,
          tabBarInactiveTintColor: colors.inkDim,
          tabBarStyle: {
            backgroundColor: colors.bgCard,
            borderTopColor: colors.border,
            height: 72 + insets.bottom,
            paddingTop: 6,
            paddingBottom: 8 + insets.bottom,
          },
          // lineHeight เผื่อสระบน/ล่างของภาษาไทยไม่ให้ถูกตัด
          tabBarLabelStyle: { fontSize: 11, lineHeight: 16, height: 18 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'หน้าแรก',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home-variant-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Collection"
          component={CollectionScreen}
          options={{
            title: 'คอลเลกชัน',
            // dot แจ้งเตือนเมื่อยังมีไพ่ที่ไม่เคยเปิด (ข้อ 5.4)
            tabBarBadge: unviewedCount > 0 ? '' : undefined,
            tabBarBadgeStyle: {
              backgroundColor: colors.purple,
              minWidth: 10,
              maxHeight: 10,
              borderRadius: 5,
              transform: [{ translateX: -4 }],
            },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cards-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'โปรไฟล์',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
