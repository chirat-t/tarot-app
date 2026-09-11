import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';

import { colors } from '../theme';
import { TarotCard } from '../types';

type Props = {
  card: TarotCard;
  onPress: (card: TarotCard) => void;
};

// ไพ่ปิดหน้าในกริดหน้า Home — แสดงเฉพาะเลขโรมัน (PROJECT_BRIEF.md ข้อ 5.1)
// ลายหลังไพ่วาดด้วย style ไปก่อน ขั้นตอนที่ 7 ค่อยเปลี่ยนเป็น assets/card-back.png
export default function CardGridItem({ card, onPress }: Props) {
  return (
    <TouchableRipple
      style={styles.touchable}
      borderless
      rippleColor={`${colors.gold}33`}
      onPress={() => onPress(card)}
      accessibilityRole="button"
      accessibilityLabel={`ไพ่ใบที่ ${card.numeral}`}
    >
      <View style={styles.cardBack}>
        <View style={styles.innerFrame}>
          <Text style={styles.ornament}>✦</Text>
          <Text style={styles.numeral}>{card.numeral}</Text>
          <Text style={styles.ornament}>✦</Text>
        </View>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    borderRadius: 10,
  },
  cardBack: {
    aspectRatio: 2 / 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.goldDim,
    backgroundColor: colors.bgCard,
    padding: 6,
  },
  innerFrame: {
    flex: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: `${colors.gold}55`,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  numeral: {
    color: colors.gold,
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 2,
    fontWeight: '600',
  },
  ornament: {
    color: colors.goldDim,
    fontSize: 10,
    lineHeight: 12,
  },
});
