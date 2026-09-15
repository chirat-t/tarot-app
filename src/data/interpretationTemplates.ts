import { TarotCard, TopicId } from '../types';
import { pickRandom, pickRandomN } from '../utils/random';

type Opener = (thaiName: string, positionLabel: string) => string;
type Connector = (keyword: string) => string;

// ประโยคเปิด — ไม่ผูกกับหัวข้อ ใช้ร่วมกันได้ทุกหัวข้อ โทนเดียวกับ card.quote/story
// ที่มีอยู่แล้ว (นุ่มนวล เปรียบเทียบกับการเดินทาง ไม่ใช้เครื่องหมายอัศเจรีย์)
const OPENERS: Opener[] = [
  (thaiName, position) =>
    `เมื่อไพ่ ${thaiName} ปรากฏขึ้นในตำแหน่ง "${position}" เหมือนมีใครสักคนเดินมาเคาะประตูใจคุณเบา ๆ`,
  (thaiName, position) =>
    `ไพ่ ${thaiName} เดินทางมาหยุดอยู่ที่ตำแหน่ง "${position}" ราวกับมีเรื่องราวบางอย่างอยากบอกคุณ`,
  (thaiName, position) =>
    `ในตำแหน่ง "${position}" ไพ่ ${thaiName} เผยตัวออกมาช้า ๆ ให้คุณได้มองเห็นสิ่งที่ซ่อนอยู่ข้างใน`,
  (thaiName, position) =>
    `แสงจากไพ่ ${thaiName} ในตำแหน่ง "${position}" ทอดเงาบางอย่างลงบนเส้นทางที่คุณกำลังเดิน`,
  (thaiName, position) =>
    `ไพ่ ${thaiName} เลือกที่จะปรากฏในตำแหน่ง "${position}" — บางทีนั่นอาจไม่ใช่เรื่องบังเอิญ`,
  (thaiName, position) =>
    `ตำแหน่ง "${position}" เปิดเผยไพ่ ${thaiName} ให้คุณได้พิจารณาอีกครั้งหนึ่ง`,
  (thaiName, position) =>
    `ไพ่ ${thaiName} ในตำแหน่ง "${position}" เหมือนหน้าหนึ่งของแผนที่ที่เพิ่งถูกเปิดออก`,
];

// ประโยคเชื่อมโยงกับหัวข้อ — 4 ชุดแยกตามหัวข้อ แต่ละชุดพาคีย์เวิร์ดของไพ่มาตีความ
// ผ่านมุมมองของหัวข้อนั้น ๆ โดยเฉพาะ
const CONNECTORS: Record<TopicId, Connector[]> = {
  love: [
    (keyword) => `ในความสัมพันธ์ครั้งนี้ ${keyword} คือสิ่งที่หัวใจคุณกำลังเรียกหา`,
    (keyword) => `หากมองผ่านเลนส์ของความรัก ${keyword} อาจเป็นกุญแจที่ไขความรู้สึกที่ค้างคาอยู่`,
    (keyword) => `ระหว่างคุณกับอีกฝ่าย ${keyword} คือเส้นด้ายบาง ๆ ที่ยังโยงทั้งสองคนไว้ด้วยกัน`,
    (keyword) => `คนรอบตัวคุณอาจกำลังสะท้อน ${keyword} กลับมาให้คุณเห็นโดยไม่รู้ตัว`,
  ],
  career: [
    (keyword) => `ในเส้นทางการงาน ${keyword} คือแรงผลักที่จะพาคุณก้าวไปอีกขั้น`,
    (keyword) => `เมื่อพูดถึงเรื่องเงินและอาชีพ ${keyword} คือสิ่งที่ควรพกติดตัวไว้เสมอ`,
    (keyword) => `สถานการณ์ตรงหน้าอาจต้องการ ${keyword} มากกว่าที่คุณคิด`,
    (keyword) => `โอกาสที่กำลังจะมาถึงอาจแฝงตัวอยู่เบื้องหลัง ${keyword}`,
  ],
  advice: [
    (keyword) => `ในการเดินทางของจิตใจ ${keyword} คือบทเรียนที่กำลังรอให้คุณเรียนรู้`,
    (keyword) => `หากฟังเสียงภายในให้ดี ${keyword} คือสิ่งที่ร่างกายและใจกำลังบอกคุณ`,
    (keyword) => `การเติบโตครั้งนี้อาจเริ่มจาก ${keyword} ที่ซ่อนอยู่ในตัวคุณเอง`,
    (keyword) => `แนวทางข้างหน้าอาจชัดเจนขึ้น หากคุณให้พื้นที่กับ ${keyword}`,
  ],
  daily: [
    (keyword) => `โชคของวันนี้แต่งแต้มด้วย ${keyword} ที่อาจแวะเวียนมาหาคุณโดยไม่ทันตั้งตัว`,
    (keyword) => `วันนี้ ${keyword} อาจเป็นของขวัญเล็ก ๆ ที่จักรวาลส่งมาให้`,
    (keyword) => `ให้ ${keyword} เป็นเข็มทิศนำทางคุณตลอดวันนี้`,
  ],
};

export interface Interpretation {
  body: string;  // ประโยคเปิด + ประโยคเชื่อมโยงหัวข้อ ประกอบจาก template
  quote: string; // card.quote เดิม แนบท้ายเสมอ แสดงแยกสไตล์ต่างหาก
}

// ประกอบคำตีความ 1 ไพ่ จากข้อมูลไพ่ที่มีอยู่แล้ว (thaiName, upright/reversed, quote)
// ผสมกับ template แบบสุ่ม — ไม่มีข้อความ hardcode ต่อไพ่/หัวข้อแยกกัน 170+ ชุด
export function composeInterpretation(
  card: TarotCard,
  reversed: boolean,
  topicId: TopicId,
  positionLabel: string
): Interpretation {
  const opener = pickRandom(OPENERS)(card.thaiName, positionLabel);
  const pool = reversed ? card.reversed : card.upright;
  const keywordCount = Math.random() < 0.5 ? 1 : 2;
  const keyword = pickRandomN(pool, keywordCount).join('และ');
  const connector = pickRandom(CONNECTORS[topicId])(keyword);

  return { body: `${opener} ${connector}`, quote: card.quote };
}
