import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';

import characters from '../data/characters';
import { colors } from '../theme';
import { CharacterId } from '../types';

// ตัวละครหลัก 4 ตัวมีชื่อใน characters.ts อยู่แล้ว — เติมเฉพาะสัตว์คู่หู
const ANIMAL_NAMES: Record<string, string> = {
  dog: 'สุนัข',
  cat: 'แมว',
  crow: 'อีกา',
};

const ICONS: Record<CharacterId, string> = {
  boy: 'human-child',
  witch: 'hat-fedora',
  reaper: 'skull-outline',
  alchemist: 'flask-outline',
  dog: 'dog',
  cat: 'cat',
  crow: 'bird',
};

export function characterName(id: CharacterId): string {
  return characters.find((c) => c.id === id)?.name ?? ANIMAL_NAMES[id] ?? id;
}

type Props = {
  characterId: CharacterId;
  size?: number;
};

// ขั้นตอนที่ 7 มีรูปจริงแล้วเปลี่ยนเป็น Avatar.Image ที่เดียวตรงนี้
export default function CharacterAvatar({ characterId, size = 120 }: Props) {
  return (
    <Avatar.Icon
      size={size}
      icon={ICONS[characterId] ?? 'account-outline'}
      color={colors.gold}
      style={[styles.avatar, { borderRadius: size / 2 }]}
      accessibilityLabel={characterName(characterId)}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colors.bgCard2,
    borderWidth: 2,
    borderColor: colors.gold,
  },
});
