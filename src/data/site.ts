export const site = {
  name: "Pumpkin&Melone Soy Milk",
  tagline: "น้ำเต้าหู้บ้าน ๆ จากความตั้งใจของแม่",
  phone: "0959375014",
  phoneDisplay: "095-937-5014",
  address: "220/11 ซ. ลาดกระบัง 7 แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพมหานคร 10520",
  mapsUrl: "https://maps.app.goo.gl/7V3KssWFJXyhYwPL8",
  mapsEmbed: "https://www.google.com/maps?q=220/11+ซ.+ลาดกระบัง+7+แขวงลาดกระบัง+เขตลาดกระบัง+กรุงเทพมหานคร+10520&output=embed",
  // TODO: put the shop chat link here (e.g. LINE https://line.me/ti/p/xxxx or Facebook Messenger)
  chatUrl: "",
  chatLabel: "LINE / Facebook",
  open: "05:00",
  close: "09:00",
  closedDay: 0, // Sunday
};

export const weekHours = [
  { day: "จันทร์", time: "05:00 – 09:00" },
  { day: "อังคาร", time: "05:00 – 09:00" },
  { day: "พุธ", time: "05:00 – 09:00" },
  { day: "พฤหัสบดี", time: "05:00 – 09:00" },
  { day: "ศุกร์", time: "05:00 – 09:00" },
  { day: "เสาร์", time: "05:00 – 09:00" },
  { day: "อาทิตย์", time: "ปิด", closed: true },
];

export type MenuItem = { name: string; price: number; note?: string; badge?: string };
export type MenuCategory = { title: string; emoji: string; note?: string; items: MenuItem[] };

export const menu: MenuCategory[] = [
  {
    title: "น้ำเต้าหู้",
    emoji: "🥛",
    items: [
      { name: "น้ำเต้าหู้ไม่ใส่เครื่อง", price: 10, badge: "ขายดี" },
      { name: "น้ำเต้าหู้ใส่เครื่อง", price: 12 },
      { name: "น้ำเต้าหู้ใส่เครื่องพิเศษ", price: 15, badge: "แนะนำ" },
    ],
  },
  {
    title: "น้ำเต้าหู้งาดำ",
    emoji: "🖤",
    items: [
      { name: "น้ำเต้าหู้งาดำไม่ใส่เครื่อง", price: 10 },
      { name: "น้ำเต้าหู้งาดำใส่เครื่อง", price: 12 },
      { name: "น้ำเต้าหู้งาดำใส่เครื่องพิเศษ", price: 15 },
    ],
  },
  {
    title: "น้ำฟักทอง",
    emoji: "🎃",
    note: "ไม่มีตัวเลือกใส่เครื่อง",
    items: [{ name: "น้ำฟักทอง", price: 10 }],
  },
];

export const sweetness = ["ไม่ใส่น้ำตาล", "หวานน้อย", "หวานปกติ"];

export const nearbyShops = [
  { name: "ร้านกาแฟหน้าปากซอย", distance: "350 ม.", rating: 4.8, type: "🥤 เครื่องดื่ม" },
  { name: "ก๋วยจั๊บป้าแดง", distance: "700 ม.", rating: 4.6, type: "🍜 อาหารเช้า" },
  { name: "เบเกอรี่บ้านขนม", distance: "1.2 กม.", rating: 4.7, type: "🍞 เบเกอรี่" },
];

export type Review = {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  likes: number;
  comments: { user: string; text: string }[];
};

export const seedReviews: Review[] = [
  {
    id: "r1",
    user: "คุณลูกค้า A",
    avatar: "🐱",
    rating: 5,
    text: "น้ำเต้าหู้หอมมากกก กินตอนเช้าคือดีเลย",
    date: "2026-09-18",
    likes: 12,
    comments: [{ user: "ร้าน", text: "ขอบคุณค่า มาอีกนะคะ 💛" }],
  },
  {
    id: "r2",
    user: "พี่ต้น",
    avatar: "🧑",
    rating: 5,
    text: "ใส่เครื่องพิเศษคือที่สุด งาดำก็หอม ต้องมาก่อน 7 โมงไม่งั้นหมด",
    date: "2026-09-15",
    likes: 8,
    comments: [],
  },
  {
    id: "r3",
    user: "ป้าเล็ก",
    avatar: "👵",
    rating: 4,
    text: "รสชาติเหมือนน้ำเต้าหู้สมัยก่อน กินแล้วนึกถึงบ้าน ซื้อฝากหลานทุกครั้ง",
    date: "2026-09-10",
    likes: 5,
    comments: [],
  },
];

export type Photo = { id: string; user: string; caption: string; rating: number; emoji: string; src?: string; date: string };

export const seedPhotos: Photo[] = [
  { id: "p1", user: "Nana", caption: "น้ำเต้าหู้ร้อน ๆ ตอนเช้า", rating: 5, emoji: "🥛", date: "2026-09-18" },
  { id: "p2", user: "Beam", caption: "หน้าร้านวันนี้", rating: 5, emoji: "🏠", date: "2026-09-17" },
  { id: "p3", user: "Mook", caption: "น้ำฟักทองหวานธรรมชาติ", rating: 4, emoji: "🎃", date: "2026-09-16" },
  { id: "p4", user: "Ploy", caption: "มากับเพื่อน ๆ", rating: 5, emoji: "👭", date: "2026-09-14" },
];

export type CheckIn = { id: string; user: string; avatar: string; message: string; date: string; emoji: string };

export const seedCheckIns: CheckIn[] = [
  { id: "c1", user: "Nana", avatar: "🐱", message: "แวะเติมพลังตอนเช้า 🥛🐱", date: "2026-09-18T06:40:00", emoji: "🥛" },
  { id: "c2", user: "Beam", avatar: "🧑", message: "มาซื้อฝากที่ออฟฟิศ", date: "2026-09-18T07:15:00", emoji: "🛍️" },
];

// ---------- วิของชำ ----------
export type GroceryCategory = { title: string; emoji: string; items: string[] };

export const grocery: GroceryCategory[] = [
  { title: "ของกินของใช้", emoji: "🍜", items: ["บะหมี่กึ่งสำเร็จรูป", "ข้าวสาร", "ไข่ไก่", "น้ำปลา / ซีอิ๊ว / น้ำมัน", "น้ำตาล / เกลือ", "ขนมขบเคี้ยว"] },
  { title: "ของใช้ในบ้าน", emoji: "🧴", items: ["ผงซักฟอก / น้ำยาล้างจาน", "ทิชชู่", "ถุงขยะ", "ไม้กวาด / ผ้าเช็ด", "ถ่านไฟฉาย / ไฟแช็ก"] },
  { title: "สุขภาพ / ความงาม", emoji: "💊", items: ["ยาสามัญประจำบ้าน", "สบู่ / แชมพู", "ยาสีฟัน / แปรงสีฟัน", "ผ้าอนามัย", "ครีมกันแดด"] },
  { title: "IT", emoji: "🔌", items: ["สายชาร์จ", "หัวชาร์จ", "หูฟัง", "ถ่านก้อน", "ซิม / เติมเงิน"] },
  { title: "สัตว์เลี้ยง", emoji: "🐱", items: ["อาหารแมว", "อาหารสุนัข", "ทรายแมว", "ขนมสัตว์เลี้ยง"] },
  { title: "ผักผลไม้", emoji: "🥬", items: ["ผักสดตามฤดู", "ผลไม้ตามฤดู", "พริก / กระเทียม / หอม", "มะนาว"] },
  { title: "ของกระป๋อง", emoji: "🥫", items: ["ปลากระป๋อง", "ผลไม้กระป๋อง", "ซุป / อาหารสำเร็จรูป"] },
  { title: "น้ำแข็ง & เครื่องดื่ม", emoji: "🧊", items: ["น้ำแข็ง", "น้ำดื่ม", "น้ำอัดลม", "นมกล่อง", "กาแฟซอง"] },
];

// ---------- น้ำสมุนไพร ----------
export type HerbalDrink = { name: string; emoji: string; price: number; benefit: string; days?: string };

export const herbalDrinks: HerbalDrink[] = [
  { name: "น้ำเก๊กฮวย", emoji: "🌼", price: 10, benefit: "แก้ร้อนใน ชื่นใจ" },
  { name: "น้ำกระเจี๊ยบ", emoji: "❤️", price: 10, benefit: "เปรี้ยวหวาน ลดกระหาย" },
  { name: "อัญชันมะนาว", emoji: "💙", price: 10, benefit: "สีสวย บำรุงสายตา" },
  { name: "น้ำใบเตย", emoji: "🌿", price: 10, benefit: "หอมเย็น ชื่นใจ" },
  { name: "น้ำมะม่วงหาวมะนาวโห่", emoji: "🍒", price: 10, benefit: "เปรี้ยวจี๊ด วิตามินซีสูง" },
  { name: "เสาวรสน้ำผึ้งมะนาว", emoji: "🍯", price: 10, benefit: "หอมหวาน สดชื่น" },
  { name: "น้ำลำไย", emoji: "🟤", price: 10, benefit: "หวานหอม บำรุงกำลัง" },
  { name: "น้ำมะตูม", emoji: "🟠", price: 10, benefit: "หอมอุ่น ช่วยย่อย" },
  { name: "น้ำขิง", emoji: "🫚", price: 10, benefit: "อุ่นท้อง ขับลม" },
  { name: "น้ำใบบัวบก", emoji: "🍃", price: 10, benefit: "แก้ช้ำใน เย็นสบาย" },
];
