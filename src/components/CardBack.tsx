import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

import { colors } from '../theme';

type Props = {
  numeral?: string;
  width?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

// ลายหลังไพ่ — ใช้ทั้งในกริดหน้า Home และหน้า Loading (สับไพ่)
// ขั้นตอนที่ 7 เปลี่ยนมาใช้ assets/card-back.png ที่เดียวตรงนี้
export default function CardBack({ numeral, width, style, children }: Props) {
  return (
    <View style={[styles.cardBack, width ? { width, aspectRatio: undefined, height: width * 1.5 } : null, style]}>
      <View style={styles.innerFrame}>
        {children ?? (
          <>
            <Text style={styles.ornament}>✦</Text>
            {numeral ? <Text style={styles.numeral}>{numeral}</Text> : null}
            <Text style={styles.ornament}>✦</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
