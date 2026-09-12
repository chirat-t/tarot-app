import { ScrollView, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Appbar, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CharacterAvatar from '../components/CharacterAvatar';
import InfoRow from '../components/InfoRow';
import characters from '../data/characters';
import { colors } from '../theme';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'CharacterDetail'>;

export default function CharacterDetailScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const character = characters.find((c) => c.id === route.params.characterId);

  if (!character) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>ไม่พบตัวละครนี้</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar} statusBarHeight={insets.top}>
        <Appbar.BackAction color={colors.gold} onPress={() => navigation.goBack()} />
        <Appbar.Content title={character.name} titleStyle={styles.appTitle} />
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: 32 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ภาพตัวละครเต็มตัว — ขั้นตอนที่ 7 เปลี่ยนเป็น <Image source={character.avatar} /> */}
        <View style={styles.portrait}>
          <CharacterAvatar characterId={character.id} size={168} />
        </View>

        <View style={styles.heading}>
          <Text style={styles.name}>{character.name}</Text>
          <Text style={styles.archetype}>{character.archetype}</Text>
        </View>

        {/* คำโปรย: อิตาลิก กึ่งกลาง ไม่มีกรอบ เหมือนหน้า Card Detail */}
        <Text style={styles.quote}>{character.quote}</Text>

        <View style={styles.rows}>
          <InfoRow
            icon="account-star-outline"
            label="เป็นตัวแทนของ"
            value={character.represents}
          />
          <InfoRow icon="map-marker-path" label="เส้นทางของตัวละคร" value={character.arcSummary} />

          <View style={styles.frame}>
            <Text style={styles.label}>บุคลิก</Text>
            <View style={styles.chips}>
              {character.personality.map((trait) => (
                <View key={trait} style={styles.chip}>
                  <Text style={styles.chipText}>{trait}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.frame}>
            <Text style={styles.label}>โทนสีหลัก</Text>
            <View style={styles.swatches}>
              {character.colorPalette.map((hex) => (
                <View key={hex} style={styles.swatchItem}>
                  <View
                    style={[styles.swatch, { backgroundColor: hex }]}
                    accessibilityLabel={`สี ${hex}`}
                  />
                  <Text style={styles.swatchHex}>{hex.toUpperCase()}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgPhone },
  appbar: { backgroundColor: colors.bgCard },
  appTitle: { color: colors.parchment, fontSize: 18, letterSpacing: 0.5 },
  content: { padding: 20, alignItems: 'center', gap: 18 },

  portrait: {
    alignSelf: 'stretch',
    aspectRatio: 4 / 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.goldDim,
    backgroundColor: colors.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
  },

  heading: { alignItems: 'center', gap: 4 },
  name: { color: colors.parchment, fontSize: 24, letterSpacing: 0.5 },
  archetype: { color: colors.gold, fontSize: 13, letterSpacing: 2 },

  quote: {
    color: colors.ink,
    fontStyle: 'italic',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 8,
  },

  rows: { alignSelf: 'stretch', gap: 12 },
  frame: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgCard,
    gap: 10,
  },
  label: {
    color: colors.inkDim,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.goldDim,
    backgroundColor: colors.bgCard2,
  },
  chipText: { color: colors.parchment, fontSize: 13 },

  swatches: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  swatchItem: { alignItems: 'center', gap: 6 },
  swatch: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
  },
  swatchHex: {
    color: colors.inkDim,
    fontSize: 11,
    fontVariant: ['tabular-nums'],
  },

  missing: {
    flex: 1,
    backgroundColor: colors.bgPhone,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missingText: { color: colors.parchment },
});
