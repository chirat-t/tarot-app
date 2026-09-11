import { StyleSheet, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../theme';

// แท็บ Profile ตามข้อ 5.1 — ยังไม่มีสเปกรายละเอียดใน PROJECT_BRIEF.md
export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar} statusBarHeight={insets.top}>
        <Appbar.Content title="โปรไฟล์" titleStyle={styles.title} />
      </Appbar.Header>
      <View style={styles.body}>
        <Text style={styles.placeholder}>ยังไม่มีสเปกในบรีฟ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgPhone },
  appbar: { backgroundColor: colors.bgCard },
  title: { color: colors.parchment, fontSize: 18, letterSpacing: 0.5 },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  placeholder: { color: colors.inkDim },
});
