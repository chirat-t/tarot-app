import { CharacterArc } from '../types';

const characters: CharacterArc[] = [
  {
    id: "boy",
    name: "เด็กชาย",
    archetype: "The Journey",
    represents: "การเดินทาง — เขาคือคนที่ทำให้เรื่องเริ่มต้น",
    arcSummary: "เริ่มต้น → ออกเดินทาง → เผชิญโลก → ค้นพบความสุข",
    avatar: "assets/characters/boy.png"
  },
  {
    id: "witch",
    name: "แม่มดน้อย",
    archetype: "The Mystery",
    represents: "ความรู้และสิ่งที่มองไม่เห็น — เธอรู้ความลับของโลกมากที่สุด",
    arcSummary: "ความลับ → การเรียนรู้ → ความกลัว → ความหวัง → ความเข้าใจ",
    avatar: "assets/characters/witch.png"
  },
  {
    id: "reaper",
    name: "ยมทูต",
    archetype: "The Change",
    represents: "เวลาและการเปลี่ยนแปลง — ไม่ใช่ตัวร้าย แต่เตือนว่าทุกอย่างมีจุดเริ่มต้นและจุดจบ",
    arcSummary: "เวลา → การตัดสินใจ → การเปลี่ยนแปลง → การปล่อยวาง → การตื่นรู้",
    avatar: "assets/characters/reaper.png"
  },
  {
    id: "alchemist",
    name: "นักเล่นแร่แปรธาตุ",
    archetype: "The Creation",
    represents: "ความรู้ การทดลอง และความผิดพลาด — ผู้ทำให้เกิดทั้งความสำเร็จและความวุ่นวาย",
    arcSummary: "ทดลอง → เรียนรู้ → สร้าง → ล้มเหลว → เข้าใจสมดุล",
    avatar: "assets/characters/alchemist.png"
  }
];

export default characters;
