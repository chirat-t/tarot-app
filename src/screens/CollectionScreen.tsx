import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Appbar, Badge, Text, TouchableRipple } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CardBack from '../components/CardBack';
import CardModal from '../components/CardModal';
import CharacterAvatar from '../components/CharacterAvatar';
import { useCollection } from '../context/CollectionContext';
import characters from '../data/characters';
import { colors } from '../theme';
import { CharacterArc, TarotCard } from '../types';

const COLUMNS = 3;
const GAP = 12;

type TabKey = 'cards' | 'characters';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'cards', label: 'ไพ่ที่เคยดูแล้ว' },
  { key: 'characters', label: 'ตัวละคร' },
];

// ไพ่ในกริด: เคยดูแล้วเปิดหน้าให้เห็นเลขโรมัน + ชื่อ + ✓
// ยังไม่เคยดูแสดงหลังไพ่ + Badge "ใหม่" (PROJECT_BRIEF.md ข้อ 5.4)
function CollectionCard({
  card,
  viewed,
  onPress,
}: {
  card: TarotCard;
  viewed: boolean;
  onPress: (card: TarotCard) => void;
}) {
  return (
    <View style={styles.cell}>
      <TouchableRipple
        style={styles.touchable}
        borderless
        rippleColor={`${colors.gold}33`}
        disabled={!viewed}
        onPress={() => onPress(card)}
        accessibilityRole="button"
        accessibilityLabel={
          viewed ? `ดูไพ่ ${card.name} เต็มใบ` : `ไพ่ใบที่ ${card.numeral} ยังไม่เคยเปิด`
        }
      >
        {viewed ? (
          <View style={styles.faceUp}>
            <Text style={styles.numeral}>{card.numeral}</Text>
            <Text style={styles.cardName} numberOfLines={2}>
              {card.thaiName}
            </Text>
          </View>
        ) : (
          <CardBack numeral={card.numeral} />
        )}
      </TouchableRipple>

      {viewed ? (
        <Badge style={styles.checkBadge} size={20}>
          ✓
        </Badge>
      ) : (
        <Badge style={styles.newBadge} size={18}>
          ใหม่
        </Badge>
      )}
    </View>
  );
}

function CharacterRow({ character }: { character: CharacterArc }) {
  return (
    <View style={styles.characterRow}>
      <CharacterAvatar characterId={character.id} size={56} />
      <View style={styles.characterTexts}>
        <Text style={styles.characterName}>{character.name}</Text>
        <Text style={styles.characterArchetype}>{character.archetype}</Text>
        <Text style={styles.characterArc}>{character.arcSummary}</Text>
      </View>
    </View>
  );
}

export default function CollectionScreen() {
  const insets = useSafeAreaInsets();
  const { cards, viewedCount, totalCount, isViewed } = useCollection();
  const [tab, setTab] = useState<TabKey>('cards');
  const [selected, setSelected] = useState<TarotCard | null>(null);

  const handleCardPress = useCallback((card: TarotCard) => setSelected(card), []);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar} statusBarHeight={insets.top}>
        <Appbar.Content title="คอลเลกชันของฉัน" titleStyle={styles.title} />
        <Text style={styles.count}>{`${viewedCount}/${totalCount}`}</Text>
      </Appbar.Header>

      <View style={styles.tabBar}>
        {TABS.map(({ key, label }) => {
          const active = tab === key;
          return (
            <TouchableRipple
              key={key}
              style={[styles.tab, active && styles.tabActive]}
              rippleColor={`${colors.gold}22`}
              onPress={() => setTab(key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
            >
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
            </TouchableRipple>
          );
        })}
      </View>

      {tab === 'cards' ? (
        <FlatList
          // key ต่างกันเพื่อบังคับให้ remount ตอนสลับแท็บ — ไม่งั้น React ใช้
          // FlatList ตัวเดิมซ้ำ แล้ว numColumns เปลี่ยนกลางคัน ซึ่งไม่รองรับ
          key="tab-cards"
          data={cards}
          keyExtractor={(card) => card.id}
          numColumns={COLUMNS}
          renderItem={({ item }) => (
            <CollectionCard card={item} viewed={isViewed(item.id)} onPress={handleCardPress} />
          )}
          columnWrapperStyle={styles.row}
          contentContainerStyle={[styles.list, { paddingBottom: 24 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          key="tab-characters"
          data={characters}
          keyExtractor={(character) => character.id}
          renderItem={({ item }) => <CharacterRow character={item} />}
          contentContainerStyle={[styles.list, { paddingBottom: 24 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
        />
      )}

      <CardModal card={selected} onDismiss={() => setSelected(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgPhone },
  appbar: { backgroundColor: colors.bgCard },
  title: { color: colors.parchment, fontSize: 18, letterSpacing: 0.5 },
  count: { color: colors.gold, marginRight: 16, fontSize: 14 },

  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.bgCard,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: colors.gold },
  tabLabel: { color: colors.inkDim, fontSize: 13 },
  tabLabelActive: { color: colors.gold },

  list: { padding: 16, gap: GAP },
  row: { gap: GAP },
  cell: { flex: 1 },
  touchable: { borderRadius: 10 },
  faceUp: {
    aspectRatio: 2 / 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gold,
    backgroundColor: colors.bgCard2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 8,
  },
  numeral: { color: colors.gold, fontSize: 18, letterSpacing: 2, fontWeight: '600' },
  cardName: { color: colors.parchment, fontSize: 11, textAlign: 'center', lineHeight: 16 },
  checkBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: colors.gold,
    color: colors.bgPage,
    fontSize: 11,
    lineHeight: 20,
  },
  newBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: colors.purple,
    color: colors.parchment,
    fontSize: 10,
    lineHeight: 18,
    paddingHorizontal: 6,
  },

  characterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgCard,
  },
  characterTexts: { flex: 1, gap: 3 },
  characterName: { color: colors.parchment, fontSize: 16 },
  characterArchetype: { color: colors.gold, fontSize: 12, letterSpacing: 1 },
  characterArc: { color: colors.ink, fontSize: 12, lineHeight: 18 },
});
