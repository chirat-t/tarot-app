import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActivityIndicator, Appbar, Badge, Banner, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CardGridItem from '../components/CardGridItem';
import { useCollection } from '../context/CollectionContext';
import { colors } from '../theme';
import { TarotCard } from '../types';
import type { RootStackParamList, RootTabParamList } from '../navigation/types';

// Home อยู่ใน tab ที่ซ้อนอยู่ใน stack — ต้อง navigate ได้ทั้งสองระดับ
type HomeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const COLUMNS = 3;
const GAP = 12;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  const insets = useSafeAreaInsets();
  const { cards, isLoading, viewedCount, totalCount, getRandomCard } = useCollection();

  // Banner แนะนำครั้งแรก — ปิดแล้วไม่กลับมาอีก (ข้อ 5.1)
  const [bannerVisible, setBannerVisible] = useState(true);

  const handleCardPress = useCallback(
    (card: TarotCard) => {
      navigation.navigate('Loading', { cardId: card.id });
    },
    [navigation]
  );

  const handleStart = useCallback(() => {
    setBannerVisible(false);
    handleCardPress(getRandomCard());
  }, [getRandomCard, handleCardPress]);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar} statusBarHeight={insets.top}>
        <Appbar.Content title="Major Arcana" titleStyle={styles.appTitle} />
        <View style={styles.actionWrapper}>
          <Appbar.Action
            icon="cards-outline"
            iconColor={colors.gold}
            accessibilityLabel="ไปที่คอลเลกชัน"
            onPress={() => navigation.navigate('Collection')}
          />
          <Badge style={styles.countBadge} size={18}>
            {`${viewedCount}/${totalCount}`}
          </Badge>
        </View>
      </Appbar.Header>

      <Banner
        visible={bannerVisible}
        icon="compass-rose"
        elevation={0}
        style={styles.banner}
        contentStyle={styles.bannerContent}
        actions={[
          {
            label: 'เริ่มเลย',
            mode: 'contained',
            buttonColor: colors.gold,
            textColor: colors.bgPage,
            compact: true,
            onPress: handleStart,
          },
          {
            label: 'ปิด',
            textColor: colors.inkDim,
            compact: true,
            onPress: () => setBannerVisible(false),
          },
        ]}
      >
        <Text style={styles.bannerText}>แตะไพ่เพื่อเริ่มการเดินทาง</Text>
      </Banner>

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator animating size="large" color={colors.gold} />
          <Text style={styles.loadingText}>กำลังเปิดสำรับ...</Text>
        </View>
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(card) => card.id}
          numColumns={COLUMNS}
          renderItem={({ item }) => <CardGridItem card={item} onPress={handleCardPress} />}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text style={styles.sectionLabel}>เส้นทางทั้ง {totalCount} ใบ</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgPhone },
  appbar: { backgroundColor: colors.bgCard },
  appTitle: { color: colors.parchment, letterSpacing: 1.5, fontSize: 20 },
  actionWrapper: { justifyContent: 'center' },
  countBadge: {
    position: 'absolute',
    top: 6,
    right: 2,
    backgroundColor: colors.purple,
    color: colors.parchment,
    fontSize: 10,
    lineHeight: 18,
    paddingHorizontal: 4,
  },
  banner: { backgroundColor: colors.bgCard2 },
  bannerContent: { paddingTop: 4 },
  bannerText: { color: colors.parchment, fontSize: 15 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14 },
  loadingText: { color: colors.inkDim },
  grid: { padding: 16, gap: GAP },
  row: { gap: GAP },
  sectionLabel: {
    color: colors.inkDim,
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
});
