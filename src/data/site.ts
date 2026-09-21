export const site = {
  name: "Pumpkin&Melone Soy Milk",
  tagline: "น้ำเต้าหู้บ้าน ๆ จากความตั้งใจของแม่",
  phone: "0959375014",
  phoneDisplay: "095-937-5014",
  address: "220/11 วิของชำ ซ. ลาดกระบัง 7 แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพมหานคร 10520",
  mapsUrl: "https://maps.app.goo.gl/7V3KssWFJXyhYwPL8",
  mapsEmbed: "https://www.google.com/maps?q=220/11+ซ.+ลาดกระบัง+7+แขวงลาดกระบัง+เขตลาดกระบัง+กรุงเทพมหานคร+10520&output=embed",
  // TODO: put the shop chat link here (e.g. LINE https://line.me/ti/p/xxxx or Facebook Messenger)
  chatUrl: "",
  chatLabel: "LINE / Facebook",
  open: "05:30",
  close: "08:00",
  closedDay: 0, // Sunday
  // "call before you come" reasons for the family's own shops
  callFirst: {
    soyMilk: "ทำสดใหม่ทุกเช้าและมีจำนวนจำกัด หากสินค้าหมดก่อนเวลา ร้านจะปิดก่อนเวลา",
    herbal: "เนื่องจากน้ำสมุนไพรแต่ละชนิดไม่ได้มีทุกวัน และขึ้นอยู่กับวัตถุดิบที่หาได้",
  },
};

export const weekHours = [
  { day: "จันทร์", time: "05:30 – 08:00" },
  { day: "อังคาร", time: "05:30 – 08:00" },
  { day: "พุธ", time: "05:30 – 08:00" },
  { day: "พฤหัสบดี", time: "05:30 – 08:00" },
  { day: "ศุกร์", time: "05:30 – 08:00" },
  { day: "เสาร์", time: "05:30 – 08:00" },
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

export type NearbyProduct = { name: string; price: number; unit: string; image?: string };
export type NearbyPhoto = { src: string; caption: string };

export type NearbyService = {
  title: string;
  emoji: string;
  badge?: string;
  details: string[];
  // where/when customers can get coins for the machine
  coinExchange?: { place: string; href: string; hours: string; warning: string };
  // who to call when the machine has a problem, plus a fallback place
  support?: { intro: string; owners: NearbyOwner[]; fallback: { place: string; href: string; phone: string; phoneDisplay: string } };
};

export type NearbyOwner = { name: string; phone: string; phoneDisplay: string };

// Customer review of a neighbouring shop (stored per shop, like the main reviews)
export type ShopReview = {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  likes: number; // base count; live likes come from lib/likes
  image?: string; // data URL from the user's phone, or a path under public/
  checkedIn?: boolean; // reviewer had checked in at this shop
  reply?: OwnerReply;
};

export type NearbyShop = {
  slug: string;
  name: string;
  emoji: string;
  image?: string; // real photo shown instead of the emoji (square)
  type: string;
  tagline: string;
  location: string;
  details: string[];
  note?: string;
  products: NearbyProduct[];
  // extra services besides food (e.g. coin laundry)
  services?: NearbyService[];
  // real photos only — leave empty until we have them (no AI stand-ins)
  photos: NearbyPhoto[];
  // optional overrides; default = same spot as our shop (they are next door)
  mapsUrl?: string;
  mapsEmbed?: string;
  // shop owners with a phone number (tel: links on the detail page)
  owners?: NearbyOwner[];
  // why customers should call ahead (shown as a "📞 โทรสอบถามก่อนมา" notice)
  callFirst?: string;
  // starter reviews shown until customers add their own
  seedReviews?: ShopReview[];
};

// ร้านใกล้เคียง — ร้านของเพื่อนบ้าน แยกจาก Pumpkin&Melone และวิของชำ
export const nearbyShops: NearbyShop[] = [
  {
    slug: "pa-mon",
    name: "ร้านข้าวราดแกงป้ามน",
    emoji: "🍛",
    type: "ข้าวราดแกง",
    tagline: "ร้านข้าวราดแกงที่อยู่ข้างร้านน้ำเต้าหู้ เดินไปซื้อได้เลย",
    location: "ข้างร้านน้ำเต้าหู้ บริเวณหน้าร้านบ้านเรา",
    details: [
      "🕕 เริ่มขายประมาณ 05:40 น.",
      "🏠 โดยทั่วไปขายถึงประมาณ 18:00 น. หรือจนกว่าของจะหมด",
      "🌧️ หากฝนตกอาจไม่ได้ออกมาขาย",
      "🔴 หยุดทุกวันจันทร์",
    ],
    note: "เวลาเปิด–ปิดอาจเปลี่ยนแปลงในแต่ละวัน ขึ้นอยู่กับสภาพอากาศและสินค้าว่าหมดเร็วหรือหมดช้า",
    callFirst: "เวลาออกขายและเวลาหมดอาจแตกต่างกันในแต่ละวัน และหากฝนตกอาจไม่ได้ออกมาขาย",
    products: [
      { name: "ข้าวราดแกง", price: 0, unit: "ราคาตามกับข้าว" },
    ],
    photos: [],
  },
  {
    slug: "wiriya",
    name: "ร้านหมูปิ้งวิริญา",
    emoji: "🍢",
    image: "/images/nearby/wiriya-moo-ping.jpg",
    type: "หมูปิ้ง / เครื่องซักผ้าหยอดเหรียญ",
    tagline: "หมูปิ้งร้อน ๆ ขายช่วงเช้า และมีเครื่องซักผ้าหยอดเหรียญให้บริการ",
    location: "ข้างบ้าน ติดกับหมู่บ้าน/ซอยประเสริฐสุข",
    details: [
      "🕟 เริ่มขายประมาณ 04:30 น.",
      "⏰ ขายจนกว่าของจะหมด เวลาเก็บร้านอาจแตกต่างกันในแต่ละวัน",
    ],
    note: "โดยทั่วไปขายช่วงเช้าและอาจเก็บร้านประมาณ 09:00 น. แต่ไม่แน่นอน ขึ้นอยู่กับว่าสินค้าหมดเร็วหรือช้า",
    callFirst: "ร้านย่างและขายไปพร้อมกัน และขายจนกว่าสินค้าจะหมด หากหมูปิ้งหมดก่อนเวลาที่คาดไว้ ร้านอาจปิดก่อนเวลา",
    products: [
      { name: "หมูปิ้ง", price: 5, unit: "บาท/ไม้", image: "/images/nearby/wiriya-moo-ping.jpg" },
      { name: "ข้าวเหนียว", price: 5, unit: "บาท/ห่อ" },
    ],
    owners: [
      { name: "คุณต๋อง", phone: "0652325188", phoneDisplay: "065-232-5188" },
      { name: "คุณนิ", phone: "0991017429", phoneDisplay: "099-101-7429" },
    ],
    seedReviews: [
      { id: "w1", user: "ฟ่าง", avatar: "🐱", rating: 5, text: "หมูปิ้งหอมมาก ตอนเช้าแวะซื้อก่อนออกไปทำงาน อร่อยดีค่ะ", date: "2026-09-18", likes: 12, checkedIn: true },
      { id: "w2", user: "ลูกค้าหน้าร้าน", avatar: "🧑", rating: 4, text: "หมูนุ่ม ข้าวเหนียวร้อน ๆ ราคาไม่แพง", date: "2026-09-12", likes: 5 },
    ],
    services: [
      {
        title: "เครื่องซักผ้าหยอดเหรียญ",
        emoji: "🧺",
        badge: "🤝 จุดแลกเหรียญ: วิของชำ",
        details: ["🟢 เปิด 24 ชั่วโมง", "💰 เริ่มต้น 30 บาท", "🪙 ใช้เหรียญ 10 บาทในการหยอดเครื่อง"],
        coinExchange: {
          place: "วิของชำ",
          href: "/grocery",
          hours: "05:30–21:00 น.",
          warning: "แลกเหรียญได้เฉพาะช่วงที่ร้านวิของชำเปิด — เครื่องซักผ้าเปิด 24 ชม. แต่หากร้านวิของชำปิด จะไม่สามารถแลกเหรียญที่ร้านได้",
        },
        support: {
          intro: "หากพบปัญหาขณะใช้เครื่องซักผ้า สามารถติดต่อเจ้าของเครื่องได้โดยตรง เพื่อให้ช่วยตรวจสอบและแก้ไขปัญหาได้รวดเร็ว",
          owners: [
            { name: "คุณต๋อง", phone: "0652325188", phoneDisplay: "065-232-5188" },
            { name: "คุณใหม่", phone: "0990354032", phoneDisplay: "099-035-4032" },
          ],
          fallback: { place: "ร้านวิของชำ", href: "/grocery", phone: "0959375014", phoneDisplay: "095-937-5014" },
        },
      },
    ],
    photos: [{ src: "/images/nearby/wiriya-moo-ping-wide.jpg", caption: "หมูปิ้งย่างใหม่ ๆ บนใบตอง" }],
  },
];

// Owner/admin reply shown under a review, with who wrote it (audit)
export type OwnerReply = { text: string; by: string; role: "owner" | "admin"; date: string };

export type Review = {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  likes: number; // base count from before the like system; live likes are added on top (see lib/likes)
  comments: { user: string; text: string }[];
  reply?: OwnerReply;
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
export const herbalIntro = {
  title: "🌿 น้ำสมุนไพรของแม่",
  text: "สมุนไพรแต่ละชนิดมีเอกลักษณ์และสารอาหารแตกต่างกัน เลือกดื่มตามรสชาติและความชอบได้เลย 💚",
  disclaimer: "หมายเหตุ: ข้อมูลเป็นข้อมูลทั่วไปเกี่ยวกับส่วนประกอบของเครื่องดื่ม ไม่ใช่คำแนะนำในการรักษาโรค",
};
// image: optional path under public/ — shown instead of the emoji when set
// imageFull: whole-bottle photo for the enlarged view (image is the square crop for cards)
export type HerbalDrink = { name: string; emoji: string; price: number; benefit: string; days?: string; image?: string; imageFull?: string };

export const herbalDrinks: HerbalDrink[] = [
  { name: "น้ำเก๊กฮวย", emoji: "🌼", price: 10, benefit: "ดื่มง่าย หอมสดชื่น ช่วยเติมความสดชื่น", image: "/images/herbal/chrysanthemum.jpg", imageFull: "/images/herbal/chrysanthemum-full.jpg" },
  { name: "น้ำกระเจี๊ยบ", emoji: "🌺", price: 10, benefit: "รสเปรี้ยวสดชื่น มีสารต้านอนุมูลอิสระจากสารสีธรรมชาติ" },
  { name: "อัญชันมะนาว", emoji: "🦋", price: 10, benefit: "สีสวย เปรี้ยวสดชื่น และอัญชันมีสารแอนโทไซยานิน" },
  { name: "น้ำใบเตย", emoji: "🌿", price: 10, benefit: "หอมละมุน ดื่มง่าย ให้ความสดชื่น" },
  { name: "น้ำมะม่วงหาวมะนาวโห่", emoji: "🫐", price: 10, benefit: "รสเปรี้ยวอมหวาน มีสารต้านอนุมูลอิสระ" },
  { name: "น้ำเสาวรส", emoji: "🟣", price: 10, benefit: "หอมเปรี้ยว มีวิตามินและสารต้านอนุมูลอิสระ" },
  { name: "น้ำผึ้งมะนาว", emoji: "🍋", price: 10, benefit: "เปรี้ยวหวานสดชื่น เหมาะสำหรับดื่มเพิ่มความสดชื่น" },
  { name: "เสาวรสน้ำผึ้งมะนาว", emoji: "🍯", price: 10, benefit: "หอมหวาน สดชื่น" },
  { name: "น้ำลำไย", emoji: "🟤", price: 10, benefit: "หวานหอม บำรุงกำลัง" },
  { name: "น้ำมะตูม", emoji: "🟠", price: 10, benefit: "หอมอุ่น ช่วยย่อย" },
  { name: "น้ำขิง", emoji: "🫚", price: 10, benefit: "กลิ่นเผ็ดอุ่น ๆ มีสารสำคัญจากขิง เช่น gingerols", image: "/images/herbal/ginger-bottle.jpg", imageFull: "/images/herbal/ginger-bottle-full.jpg" },
  { name: "น้ำใบบัวบก", emoji: "🍃", price: 10, benefit: "เย็นสบาย ดื่มง่าย" },
  { name: "น้ำตะไคร้", emoji: "🌱", price: 10, benefit: "กลิ่นหอม ดื่มแล้วสดชื่น" },
  { name: "น้ำสามสหาย", emoji: "🧃", price: 10, benefit: "มะตูม + พุทรา + กระเจี๊ยบ หอมหวานเปรี้ยวลงตัว", image: "/images/herbal/three-friends.jpg", imageFull: "/images/herbal/three-friends-full.jpg" },
];
