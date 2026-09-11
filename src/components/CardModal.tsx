import { StyleSheet, View } from 'react-native';
import { Modal, Portal, Text } from 'react-native-paper';

import CharacterAvatar from './CharacterAvatar';
import { colors } from '../theme';
import { TarotCard } from '../types';

type Props = {
  card: TarotCard | null;
  onDismiss: () => void;
};

// ไพ่เต็มใบ: กรอบทอง เลขโรมันด้านบน พื้นที่ภาพ แล้วแถบชื่อ+บทบาท
// อยู่ในกรอบเดียวกัน (PROJECT_BRIEF.md ข้อ 5.4)
export default function CardModal({ card, onDismiss }: Props) {
  return (
    <Portal>
      <Modal
        visible={card !== null}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        {card ? (
          <View style={styles.frame}>
            <Text style={styles.numeral}>{card.numeral}</Text>

            {/* พื้นที่ภาพเต็มใบ — ขั้นตอนที่ 7 เปลี่ยนเป็น <Image source={card.image} /> */}
            <View style={styles.art}>
              {card.character[0] ? (
                <CharacterAvatar characterId={card.character[0]} size={132} />
              ) : null}
            </View>

            <View style={styles.caption}>
              <Text style={styles.name}>{card.name}</Text>
              <Text style={styles.thaiName}>{card.thaiName}</Text>
              <Text style={styles.role}>{card.role}</Text>
            </View>
          </View>
        ) : null}
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: { padding: 28 },
  frame: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.gold,
    backgroundColor: colors.bgCard,
    padding: 16,
    gap: 14,
    alignItems: 'center',
  },
  numeral: {
    color: colors.gold,
    fontSize: 16,
    letterSpacing: 4,
    fontWeight: '600',
  },
  art: {
    alignSelf: 'stretch',
    aspectRatio: 3 / 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.goldDim,
    backgroundColor: colors.bgCard2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 4,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  name: { color: colors.parchment, fontSize: 20, letterSpacing: 2, textAlign: 'center' },
  thaiName: { color: colors.gold, fontSize: 14 },
  role: { color: colors.inkDim, fontSize: 13, textAlign: 'center' },
});
