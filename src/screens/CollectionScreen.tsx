import { StyleSheet, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useCollection } from '../context/CollectionContext';
import { colors } from '../theme';

// โครงหน้า Collection — เนื้อหาเต็ม (Tabs, Grid 3 คอลัมน์, Badge, Modal ไพ่เต็มใบ)
// อยู่ในขั้นตอนที่ 6 ของ PROJECT_BRIEF.md ข้อ 5.4
export default function CollectionScreen() {
  const insets = useSafeAreaInsets();
  const { viewedCount, totalCount } = useCollection();

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar} statusBarHeight={insets.top}>
        <Appbar.Content title="คอลเลกชันของฉัน" titleStyle={styles.title} />
        <Text style={styles.count}>{`${viewedCount}/${totalCount}`}</Text>
      </Appbar.Header>
      <View style={styles.body}>
        <Text style={styles.placeholder}>ขั้นตอนที่ 6 — Grid ไพ่ + Modal ไพ่เต็มใบ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgPhone },
  appbar: { backgroundColor: colors.bgCard },
  title: { color: colors.parchment, fontSize: 18, letterSpacing: 0.5 },
  count: { color: colors.gold, marginRight: 16, fontSize: 14 },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  placeholder: { color: colors.inkDim },
});
