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
export type MenuCategory = { title: string; emoji: string; note?: string; image?: string; imageCaption?: string; items: MenuItem[] };

export const menu: MenuCategory[] = [
  {
    title: "น้ำเต้าหู้",
    emoji: "🥛",
    image: "/images/menu/soy-milk.jpg",
    imageCaption: "น้ำเต้าหู้ใส่ถุง ถุงละ 10 บาท",
    items: [
      { name: "น้ำเต้าหู้ไม่ใส่เครื่อง", price: 10, badge: "ขายดี" },
      { name: "น้ำเต้าหู้ใส่เครื่อง", price: 12 },
      { name: "น้ำเต้าหู้ใส่เครื่องพิเศษ", price: 15, badge: "แนะนำ" },
    ],
  },
  {
    title: "น้ำเต้าหู้งาดำ",
    emoji: "🖤",
    image: "/images/menu/black-sesame.jpg",
    imageCaption: "น้ำเต้าหู้งาดำใส่ถุง ถุงละ 10 บาท",
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
    image: "/images/menu/pumpkin.jpg",
    imageCaption: "น้ำฟักทองใส่ถุง ถุงละ 10 บาท",
    items: [{ name: "น้ำฟักทอง", price: 10 }],
  },
];

export const sweetness = ["ไม่ใส่น้ำตาล", "หวานน้อย", "หวานปกติ"];

// add-ins for the soy milk ("ใส่เครื่อง")
export type Topping = { name: string; image?: string };

export const toppings = {
  title: "🥣 เครื่องน้ำเต้าหู้",
  sub: "เลือกเพิ่มเครื่องได้ตามต้องการ",
  items: [
    { name: "ลูกเดือย", image: "/images/toppings/job-tears.jpg" },
    { name: "สาคูเม็ดใหญ่", image: "/images/toppings/sago.jpg" },
    { name: "เม็ดแมงลัก", image: "/images/toppings/basil-seed.jpg" },
    { name: "ข้าวบาร์เลย์", image: "/images/toppings/barley.jpg" },
    { name: "วุ้น", image: "/images/toppings/jelly.jpg" },
  ],
  note: "🤍 หมายเหตุ: เครื่องน้ำเต้าหู้บางอย่างอาจมีไม่ทุกวัน เพราะทำตามวัตถุดิบที่มีในแต่ละวัน สามารถสอบถามที่ร้านก่อนได้เลยค่ะ",
};

// ready-to-grab bags sitting on the tray at the front of the shop
export const readyBags = {
  title: "🛍️ ถุงที่ตักไว้แล้ว หยิบได้เลย",
  text: "ช่วงเช้าแม่จะตักน้ำเต้าหู้และน้ำฟักทองใส่ถุงเตรียมไว้ ลูกค้าที่รีบสามารถหยิบถุงที่ตักไว้ได้เลย ไม่ต้องรอ",
  photos: [
    { slot: "soy-milk", label: "น้ำเต้าหู้ตักไว้", emoji: "🥛", image: "/images/menu/ready-soy-milk.jpg" },
    { slot: "pumpkin", label: "น้ำฟักทองตักไว้", emoji: "🎃", image: "/images/menu/ready-pumpkin.jpg" },
  ],
};

export type NearbyProduct = { name: string; price: number; unit: string; image?: string };
export type NearbyPhoto = { src: string; caption: string };

export type NearbyService = {
  title: string;
  emoji: string;
  badge?: string;
  image?: string; // real photo of the service (4:3)
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

// Named photo slot the admin can fill from the shop page ("＋ เพิ่มรูป")
export type PhotoSlot = { id: string; label: string; emoji: string };

// Extra info block (e.g. ชุดใส่บาตร)
export type ShopExtra = { title: string; emoji: string; text: string; bullets?: string[]; note?: string; price?: string; photoSlot?: string };

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
  // photo slots the admin fills in; static `photos` fill the first slots
  photoSlots?: PhotoSlot[];
  extras?: ShopExtra[];
  // the shop's menu changes daily — admin posts today's list instead of a fixed menu
  dailyMenu?: { title: string; hint: string };
  // shown when the shop hasn't given us a number yet
  phoneNote?: string;
};

// ร้านใกล้เคียง — ร้านของเพื่อนบ้าน แยกจาก Pumpkin&Melone และวิของชำ
export const nearbyShops: NearbyShop[] = [
  {
    slug: "pa-mon",
    name: "ร้านข้าวราดแกงป้ามน",
    emoji: "🍛",
    image: "/images/nearby/pa-mon-icon.jpg",
    type: "ข้าวราดแกง / ของกินช่วงเช้า",
    tagline: "ข้าวราดแกงและของกินช่วงเช้า เมนูหลากหลาย เปลี่ยนไปในแต่ละวัน",
    location: "บริเวณใกล้ร้านน้ำเต้าหู้ Pumpkin&Melone Soy Milk",
    details: [
      "🕕 เปิด 06:00 – 18:00 น.",
      "🍛 ขายไปจนกว่าของจะหมด",
      "⏰ หากของหมดก่อน อาจปิดก่อนเวลา",
      "🌧️ หากฝนตก อาจไม่ได้ออกมาขาย",
      "🔴 หยุดทุกวันอาทิตย์",
    ],
    note: "เมนูไม่จำเป็นต้องเหมือนกันทุกวัน เพราะทำตามเมนูที่มีในแต่ละวัน",
    callFirst: "เนื่องจากร้านขายอาหารตามจำนวนที่ทำในแต่ละวัน และเมนูอาจเปลี่ยนแปลงทุกวัน",
    owners: [{ name: "ป้ามน", phone: "0955958887", phoneDisplay: "095-595-8887" }],
    products: [
      { name: "กับข้าว", price: 0, unit: "เริ่มต้น 40 บาท / ถุง • เมนูเปลี่ยนไปในแต่ละวัน", image: "/images/nearby/pa-mon-food.jpg" },
      { name: "น้ำพริกกะปิ", price: 10, unit: "บาท / ถุง" },
      { name: "ข้าวธรรมดา", price: 0, unit: "3 ถ้วย / 10 บาท", image: "/images/nearby/pa-mon-rice.jpg" },
      { name: "ข้าวหอมมะลิ", price: 0, unit: "3 ถ้วย / 12 บาท" },
      { name: "ขนมหวาน", price: 0, unit: "เริ่มต้น 10–20 บาท • ราคาขึ้นอยู่กับชนิดของขนม แต่ละวันอาจมีขนมแตกต่างกัน" },
    ],
    extras: [
      {
        title: "ชุดใส่บาตร",
        emoji: "🙏",
        text: "ช่วงเช้าที่รถเข็นป้ามนมีชุดสำหรับใส่บาตรจำหน่ายด้วย ลูกค้าสามารถเลือกเมนูสำหรับใส่บาตรเองได้จากเมนูที่มีในวันนั้น",
        price: "🧺 ชุดใส่บาตร ราคาสอบถามที่ร้าน",
        bullets: ["🍚 ข้าว", "💧 น้ำ", "🥛 นม", "🍬 ขนม", "🍛 กับข้าว"],
        note: "📌 เมนูสำหรับชุดใส่บาตรขึ้นอยู่กับรายการอาหารที่มีในแต่ละวัน",
        photoSlot: "alms",
      },
    ],
    dailyMenu: {
      title: "🥘 เมนูอาหารประจำวัน",
      hint: "เมนูที่แสดงเป็นเมนูของวันที่ร้านอัปเดตเท่านั้น ไม่ใช่รายการตายตัว",
    },
    photoSlots: [
      { id: "cart", label: "รถเข็นป้ามน", emoji: "🚚" },
      { id: "sign", label: "ป้ายร้าน", emoji: "🪧" },
      { id: "snack", label: "ของว่าง / โต๊ะขนม", emoji: "🍡" },
      { id: "fresh", label: "ของสด / กับข้าวถุง", emoji: "🥬" },
      { id: "alms", label: "ชุดใส่บาตร", emoji: "🙏" },
      { id: "food", label: "เมนูอาหาร / กับข้าว", emoji: "🍛" },
      { id: "chili", label: "น้ำพริกกะปิ", emoji: "🌶️" },
      { id: "daily", label: "เมนูอาหารประจำวัน", emoji: "🥘" },
    ],
    photos: [
      { src: "/images/nearby/pa-mon-stall-wide.jpg", caption: "รถเข็นป้ามน กับข้าวหลายอย่างทุกเช้า" },
      { src: "/images/nearby/pa-mon-sign-wide.jpg", caption: "ป้ายร้าน ป้ามน ข้าวแกง" },
      { src: "/images/nearby/pa-mon-dessert-wide.jpg", caption: "หม้อข้าวและของว่างหน้าร้าน" },
      { src: "/images/nearby/pa-mon-fresh-wide.jpg", caption: "ของสดและกับข้าวถุง สแกนจ่ายได้" },
    ],
  },
  {
    slug: "wiriya",
    name: "ร้านหมูปิ้งวิริญา",
    emoji: "🍢",
    image: "/images/nearby/wiriya-icon.jpg",
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
      { name: "ข้าวเหนียว", price: 5, unit: "บาท/ห่อ", image: "/images/nearby/wiriya-sticky-rice.jpg" },
    ],
    owners: [
      { name: "คุณต๋อง", phone: "0652325188", phoneDisplay: "065-232-5188" },
      { name: "คุณนิ", phone: "0991017429", phoneDisplay: "099-101-7429" },
    ],
    services: [
      {
        title: "เครื่องซักผ้าหยอดเหรียญ",
        emoji: "🧺",
        badge: "🤝 จุดแลกเหรียญ: วิของชำ",
        image: "/images/nearby/wiriya-laundry-wide.jpg",
        details: ["🟢 เปิด 24 ชั่วโมง", "🧺 มี 3 เครื่อง: 30 / 30 / 40 บาทต่อครั้ง", "💰 เริ่มต้น 30 บาท", "🪙 ใช้เหรียญ 10 บาทในการหยอดเครื่อง"],
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
            { name: "คุณใหม่", phone: "0624314828", phoneDisplay: "062-431-4828" },
          ],
          fallback: { place: "ร้านวิของชำ", href: "/grocery", phone: "0959375014", phoneDisplay: "095-937-5014" },
        },
      },
    ],
    photoSlots: [
      { id: "front", label: "บริเวณหน้าร้าน", emoji: "🏠" },
      { id: "sign", label: "ป้ายร้าน", emoji: "🪧" },
      { id: "pork", label: "หมูปิ้ง", emoji: "🍢" },
      { id: "rice", label: "ข้าวเหนียว", emoji: "🍚" },
      { id: "rice2", label: "ข้าวเหนียวห่อ", emoji: "🛍️" },
      { id: "closeup", label: "หมูปิ้งใกล้ ๆ", emoji: "🔍" },
      { id: "laundry", label: "เครื่องซักผ้าหยอดเหรียญ", emoji: "🧺" },
      { id: "morning", label: "บรรยากาศตอนเช้า", emoji: "🌅" },
    ],
    photos: [
      { src: "/images/nearby/wiriya-storefront-wide.jpg", caption: "หน้าร้าน — ย่างและขายกันตรงนี้เลย" },
      { src: "/images/nearby/wiriya-sign-wide.jpg", caption: "ป้ายร้าน ข้าวเหนียวหมูปิ้ง ไม้ละ 5 บาท" },
      { src: "/images/nearby/wiriya-moo-ping-leaf-wide.jpg", caption: "หมูปิ้งย่างใหม่ ๆ บนใบตอง" },
      { src: "/images/nearby/wiriya-sticky-rice-wide.jpg", caption: "ข้าวเหนียวร้อน ๆ" },
      { src: "/images/nearby/wiriya-sticky-rice-pack-wide.jpg", caption: "ข้าวเหนียวห่อละ 5 บาท" },
      { src: "/images/nearby/wiriya-closeup-wide.jpg", caption: "หมูนุ่ม ฉ่ำ ๆ ใกล้ ๆ" },
      { src: "/images/nearby/wiriya-laundry-wide.jpg", caption: "เครื่องซักผ้าหยอดเหรียญ 3 เครื่อง (30 / 30 / 40 บาท)" },
    ],
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

// No seeded reviews — real customer reviews only
export const seedReviews: Review[] = [];

export type Photo = { id: string; user: string; caption: string; rating: number; emoji: string; src?: string; date: string };

export const seedPhotos: Photo[] = [];

export type CheckIn = { id: string; user: string; avatar: string; message: string; date: string; emoji: string };

export const seedCheckIns: CheckIn[] = [];

// ---------- วิของชำ ----------
// comingSoon: หมวดที่ยังไม่ได้ขาย — เก็บโครงไว้ แต่ไม่แสดงเป็นสินค้าที่สั่งซื้อได้
export type GroceryCategory = {
  title: string;
  emoji: string;
  items: string[];
  // หมวดย่อย — ถ้ามี จะแสดงแบบพับไว้ กดดูทั้งหมดได้ (สินค้าเยอะเกินกว่าจะโชว์หมดทีเดียว)
  groups?: { title: string; items: string[] }[];
  sub?: string;   // คำอธิบายสั้น ๆ ใต้ชื่อหมวด
  note?: string;  // หมายเหตุท้ายการ์ด เช่น สินค้าหมุนเวียน
  comingSoon?: boolean;
};

export const grocery: GroceryCategory[] = [
  {
    title: "ของกินติดบ้าน",
    emoji: "🍜",
    items: [
      "ข้าวสาร",
      "บะหมี่กึ่งสำเร็จรูป",
      "ไข่ไก่",
      "วุ้นเส้น",
      "ผักกาดดอง",
      "กระดาษตราไก่ / ตราสมอ",
      "ตะเกียบ",
      "ที่ครอบคลุมอาหาร",
    ],
    note: "🥚 ราคาไข่ไก่ปรับตามราคาตลาดในแต่ละสัปดาห์",
  },
  {
    title: "เครื่องปรุง / วัตถุดิบทำอาหาร",
    emoji: "🧂",
    sub: "มีทั้งขวดเล็กและขวดใหญ่ เลือกตามที่ใช้ได้เลย",
    items: ["น้ำมันพืช", "น้ำปลา", "ซีอิ๊วขาว", "น้ำตาล / เกลือ", "กะทิกล่อง", "ผงชูรส / รสดีหมู"],
    groups: [
      {
        title: "น้ำมัน / น้ำปลา / ซอส",
        items: [
          "น้ำมันพืช ขวดใหญ่",
          "น้ำมันพืช ขวดเล็ก",
          "น้ำปลาไมค์",
          "น้ำปลา ขวดเล็ก",
          "น้ำปลา ขวดใหญ่",
          "น้ำปลาร้าไมค์",
          "ซอสน้ำมันหอย",
          "ซอสฝาเขียวตราภูเขาทอง",
          "ซีอิ๊วขาว",
          "น้ำส้มสายชู",
        ],
      },
      {
        title: "เครื่องปรุง / ของแห้ง",
        items: ["กะทิกล่อง", "กะปิ", "เกลือ", "น้ำตาลทรายขาว", "น้ำตาลทรายแดง", "ผงชูรส", "รสดีหมู", "วุ้นเส้น", "ผักกาดดอง"],
      },
    ],
  },
  {
    title: "ขนม / ของกินเล่น",
    emoji: "🍿",
    items: [
      "ขนมปัง",
      "เลย์ / โดริโทส",
      "ป็อปคอร์นรสหวาน",
      "หมึกกรุบหมาล่า",
      "กุ้งกรุบ",
      "สาหร่ายเถ้าแก่น้อย",
      "ขนมช็อกโกแลต",
      "แบง ๆ",
      "ลูกอม / ลูกอมเปรี้ยว",
      "ลูกอมแพ็คละ 5 บาท (6–7 เม็ด)",
    ],
    note: "🍬 มีขนมอื่น ๆ หมุนเวียนตามสต๊อก",
  },
  {
    title: "น้ำดื่ม / น้ำอัดลม",
    emoji: "🥤",
    sub: "มีหลายขนาดหลายราคา เลือกได้ตามต้องการ",
    items: ["น้ำดื่มขวดเล็ก–ใหญ่", "น้ำแพ็ค", "น้ำแข็ง", "เป๊ปซี่ / โค้ก / สไปรท์", "น้ำแดง / น้ำเขียว", "โซดา"],
    groups: [
      {
        title: "น้ำดื่ม",
        items: [
          "คริสตัล ขวดใหญ่ 14 บาท",
          "คริสตัล ขวดเล็ก 8 บาท",
          "วีด้า ขวดใหญ่ 12 บาท",
          "วีด้า ขวดเล็ก 6 บาท",
          "น้ำทิพย์ ขวดใหญ่ 12 บาท",
          "น้ำทิพย์ ขวดเล็ก 6 บาท",
          "ขวดจิ๋ว 5 บาท",
          "น้ำแพ็ค 40 / 55 / 60 บาท",
          "น้ำแข็ง",
        ],
      },
      {
        title: "น้ำอัดลม",
        items: [
          "เป๊ปซี่ 10 / 13 / 19 / 35 บาท",
          "โค้ก 10 / 17 / 35 บาท",
          "สไปรท์ 17 / 35 บาท",
          "น้ำแดง 10 / 35 บาท",
          "น้ำเขียว 10 / 35 บาท",
          "น้ำอัดลมสูตรไม่มีน้ำตาล",
        ],
      },
      {
        title: "เครื่องดื่มอื่น ๆ",
        items: ["โซดาวันเวย์ 8 บาท", "สปอนเซอร์", "โออิชิ", "เย็นเย็น", "จับใจ", "สปาย", "น้ำสมุนไพรแม่วิทำเอง 10 บาท"],
      },
    ],
  },
  {
    title: "นม / เครื่องดื่มสุขภาพ",
    emoji: "🥛",
    items: [
      "ดีน่างาดำ 10 บาท",
      "โฟร์โมสต์ ช็อกโกแลต 10 บาท",
      "โฟร์โมสต์ จืด 10 บาท",
      "ดีมอลล์ 10 บาท",
      "แลคตาซอย 12 บาท",
      "ดัชมิลล์ ผลไม้รวม 10 บาท",
      "ดัชมิลล์ ส้ม 10 บาท",
      "นมกล่องอื่น ๆ",
      "วิตามินซี",
      "แบรนด์ซุปไก่สกัด",
    ],
  },
  {
    title: "กาแฟ / เครื่องดื่มชูกำลัง",
    emoji: "☕",
    items: [
      "M-150",
      "คาราบาว",
      "กระทิงแดง ฝาน้ำเงิน / ฝาแดง",
      "ลิโพ",
      "เรดดี้",
      "โสม",
      "กุมิกมิ",
      "กาแฟเบอร์ดี้แดง กระป๋อง 17 บาท",
      "กาแฟเนส กระป๋อง 17 บาท",
      "กาแฟกระป๋อง 25 บาท",
      "กาแฟซอง",
    ],
  },
  {
    title: "ของใช้ในบ้าน",
    emoji: "🧴",
    sub: "ของใช้จำเป็นสำหรับทุกบ้าน ทั้งผลิตภัณฑ์ซักผ้า ล้างจาน ทำความสะอาด และอื่น ๆ",
    items: [
      "ผงซักฟอก",
      "น้ำยาซักผ้า / น้ำยาปรับผ้านุ่ม",
      "ไฮยีน / น้ำยาซักผ้าขาว",
      "น้ำยาล้างจาน",
      "น้ำยาทำความสะอาดห้อง",
      "น้ำยาเช็ดกระจก",
      "น้ำยาล้างห้องน้ำ",
      "ฝอยขัดหม้อ / สก็อตไบท์",
      "ไม้กวาด / ผ้าเช็ด",
      "ถุงขยะ",
    ],
    note: "🏠 สินค้าอาจมีไม่ครบทุกวัน มีการสลับหมุนเวียนตามสต๊อกของร้าน ทางร้านจะทยอยนำสินค้ามาเพิ่มเติม สอบถามสินค้าที่ต้องการกับทางร้านก่อนได้ค่ะ",
  },
  {
    title: "กันยุง / กันแมลง",
    emoji: "🦟",
    items: ["สเปรย์ฉีดยุง", "สเปรย์ฉีดมด แมลงสาบ", "ยาจุดกันยุง", "กย.15", "กาวดักหนู"],
  },
  {
    title: "กระดาษ / ทิชชู่ / เบ็ดเตล็ด",
    emoji: "🧻",
    items: [
      "ทิชชู่",
      "ทิชชู่เปียก",
      "กระดาษตราไก่ / ตราสมอ",
      "ไฟแช็ก",
      "กาวลาเท็กซ์ / กาวน้ำ",
      "กาวสองหน้า บาง / หนา",
      "เทปใส / เทปสีขุ่น",
      "ถ่านก้อน AAA",
    ],
  },
  {
    title: "เครื่องเขียน / อุปกรณ์การเรียน",
    emoji: "✏️",
    items: ["ปากกา", "ดินสอ", "ยางลบ", "ดินน้ำมัน", "กระเป๋าดินสอ", "กาวลาเท็กซ์ / กาวน้ำ", "กาวสองหน้า", "เทปใส / เทปสีขุ่น"],
  },
  {
    title: "สุขภาพ / ความงาม",
    emoji: "💊",
    sub: "มีสินค้าให้เลือกหลากหลาย สินค้าหมุนเวียนตามสต๊อก",
    items: ["สบู่ / ครีมอาบน้ำ", "แชมพู / ครีมนวดผม", "ยาสีฟัน / แปรงสีฟัน", "โรลออน / น้ำหอม", "ครีมกันแดด", "ผ้าอนามัย"],
    groups: [
      { title: "ดูแลร่างกาย", items: ["สบู่", "ครีมอาบน้ำ", "โรลออน", "น้ำหอมผู้ชาย", "น้ำหอมผู้หญิง", "ออยล์", "แป้งทาตัว", "ครีมทาผิว", "ครีมกันแดด"] },
      { title: "ดูแลช่องปาก", items: ["แปรงสีฟัน", "ยาสีฟัน", "น้ำยาบ้วนปาก", "ไม้จิ้มฟัน"] },
      { title: "ดูแลเส้นผม", items: ["แชมพู", "ครีมนวดผม", "แชมพูกำจัดเหา"] },
      { title: "ของใช้ส่วนตัว", items: ["หวีเด็ก", "หวีผู้ใหญ่", "กรรไกร", "กรรไกรตัดเล็บ", "แหนบ", "กระจก", "สบู่ซักถุงเท้า"] },
      { title: "สุขอนามัย", items: ["หน้ากากอนามัย", "พลาสเตอร์แปะแผล", "ผ้าอนามัย", "ผ้าอนามัยแบบกางเกงใน", "วาสลีนทาปาก"] },
      { title: "ซักผ้า / ดูแลเสื้อผ้า", items: ["โอโม่", "บรีส", "ดาวน์นี่", "อีซี่", "ไฮยีน"] },
    ],
    note: "💗 สินค้าในหมวดนี้สลับหมุนเวียนตามสต๊อกของร้าน บางรายการอาจไม่ได้มีทุกวัน และมีสินค้าเพิ่มเติมเข้ามาเรื่อย ๆ สอบถามสินค้าที่ต้องการกับทางร้านก่อนได้ค่ะ",
  },
  {
    title: "ยาสามัญ / เวชภัณฑ์",
    emoji: "🩹",
    items: [
      "ทิฟฟี่ / ดีคอลเจน",
      "ไทลินอล / ซาร่า",
      "ไดอาร่า / ยาแก้ท้องเสีย",
      "ยาแก้อักเสบ",
      "ยาแก้แพ้",
      "ยาแก้ไอ",
      "อาปาเช่",
      "ยาดม / ยาดมโป๊ยเซียน",
      "ยาหม่องตราถ้วยทอง",
      "ยาอมกำกิกเผี่ยง",
      "พลาสเตอร์แปะแผล",
    ],
    note: "💊 รายการยาเปลี่ยนแปลงตามสต๊อก สอบถามที่ร้านก่อนได้ค่ะ",
  },
  {
    title: "ของใช้ส่วนตัว / เครื่องประดับ",
    emoji: "💄",
    items: ["กิ๊บช็อป", "กิ๊บติดผม", "โบติดผม", "ยางรัดผม 10 บาท", "พวงกุญแจ", "น้ำหอมปรับอากาศ"],
  },
  {
    title: "ของใช้ทั่วไป / ตามฤดูกาล",
    emoji: "☔",
    items: ["ร่มกันฝน", "เสื้อกันฝน 20 / 30 บาท", "ที่ใส่เทียนเวียนเทียน 35 บาท", "ดินสอพอง", "ของเล่นเด็ก"],
  },
  {
    title: "สัตว์เลี้ยง",
    emoji: "🐱",
    items: ["อาหารเม็ดแมว", "ขนมแมว", "แมวเลีย", "แป้งแมว", "แป้งหมา", "อาหารปลา ถุงละ 10 บาท"],
  },
  { title: "ของกระป๋อง", emoji: "🥫", items: ["ปลากระป๋อง", "ซุป / อาหารสำเร็จรูป"] },
  { title: "ผักผลไม้", emoji: "🥬", items: [], comingSoon: true },
  {
    title: "สินค้าควบคุมตามกฎหมาย",
    emoji: "🔞",
    items: [],
    note: "🔞 ร้านมีจำหน่ายเครื่องดื่มแอลกอฮอล์และยาสูบที่หน้าร้าน แต่กฎหมายไม่อนุญาตให้แสดงยี่ห้อ ราคา หรือโฆษณาบนเว็บไซต์ — สอบถามได้โดยตรงที่ร้าน จำหน่ายเฉพาะผู้ที่มีอายุ 20 ปีขึ้นไป และตามเวลาที่กฎหมายกำหนดเท่านั้น",
  },
];

// ---------- น้ำสมุนไพร ----------
// Sample photos of the bottles (shown above the drink list)
export const herbalGallery = [
  { src: "/images/herbal/bottles-row.jpg", caption: "น้ำสมุนไพรของแม่ ขวดละ 10 บาท" },
  { src: "/images/herbal/bottles-three.jpg", caption: "กระเจี๊ยบ • เก๊กฮวย • และอีกหลายรส" },
];

export const herbalIntro = {
  title: "🌿 น้ำสมุนไพรของแม่",
  text: "สมุนไพรแต่ละชนิดมีเอกลักษณ์และสารอาหารแตกต่างกัน เลือกดื่มตามรสชาติและความชอบได้เลย 💚",
  disclaimer: "หมายเหตุ: ข้อมูลเป็นข้อมูลทั่วไปเกี่ยวกับส่วนประกอบของเครื่องดื่ม ไม่ใช่คำแนะนำในการรักษาโรค",
  // short line under every drink photo
  colorNote: "📌 สีจริงของสินค้าอาจแตกต่างจากภาพเล็กน้อย ขึ้นอยู่กับวัตถุดิบและการทำในแต่ละรอบ",
  colorNoteLong:
    "สีของน้ำสมุนไพรในภาพอาจแตกต่างจากสีของสินค้าจริงเล็กน้อย เนื่องจากสีของน้ำสมุนไพรอาจเปลี่ยนแปลงตามชนิดและความสดของวัตถุดิบ ปริมาณวัตถุดิบ และขั้นตอนการต้มในแต่ละรอบ สีที่เห็นในภาพจึงใช้สำหรับประกอบการแนะนำเท่านั้น ไม่สามารถรับประกันว่าสีจริงจะตรงกับภาพ 100%",
};
// image: optional path under public/ — shown instead of the emoji when set
// imageFull: whole-bottle photo for the enlarged view (image is the square crop for cards)
export type HerbalDrink = { name: string; emoji: string; price: number; benefit: string; days?: string; image?: string; imageFull?: string };

export const herbalDrinks: HerbalDrink[] = [
  { name: "น้ำเก๊กฮวย", emoji: "🌼", price: 10, benefit: "ดื่มง่าย หอมสดชื่น ช่วยเติมความสดชื่น", image: "/images/herbal/chrysanthemum.jpg", imageFull: "/images/herbal/chrysanthemum-full.jpg" },
  { name: "น้ำกระเจี๊ยบ", emoji: "🌺", price: 10, benefit: "รสเปรี้ยวสดชื่น มีสารต้านอนุมูลอิสระจากสารสีธรรมชาติ", image: "/images/herbal/roselle-bottle.jpg", imageFull: "/images/herbal/roselle-bottle-full.jpg" },
  { name: "น้ำอัญชัน", emoji: "🦋", price: 10, benefit: "สีสวย สดชื่น และอัญชันมีสารแอนโทไซยานิน", image: "/images/herbal/butterfly-pea.jpg", imageFull: "/images/herbal/butterfly-pea-full.jpg" },
  { name: "น้ำอัญชันมะนาว", emoji: "💜", price: 10, benefit: "สีสวย เปรี้ยวสดชื่น อัญชันผสมมะนาว", image: "/images/herbal/butterfly-pea-lime.jpg", imageFull: "/images/herbal/butterfly-pea-lime-full.jpg" },
  { name: "น้ำใบเตยหอม", emoji: "🌿", price: 10, benefit: "หอมละมุน ดื่มง่าย ให้ความสดชื่น", image: "/images/herbal/pandan.jpg", imageFull: "/images/herbal/pandan-full.jpg" },
  { name: "น้ำมะม่วงหาวมะนาวโห่", emoji: "🫐", price: 10, benefit: "รสเปรี้ยวอมหวาน มีสารต้านอนุมูลอิสระ", image: "/images/herbal/karanda.jpg", imageFull: "/images/herbal/karanda-full.jpg" },
  { name: "น้ำเสาวรส", emoji: "🟣", price: 10, benefit: "หอมเปรี้ยว มีวิตามินและสารต้านอนุมูลอิสระ", image: "/images/herbal/passion-fruit.jpg", imageFull: "/images/herbal/passion-fruit-full.jpg" },
  { name: "น้ำผึ้งมะนาว", emoji: "🍋", price: 10, benefit: "เปรี้ยวหวานสดชื่น เหมาะสำหรับดื่มเพิ่มความสดชื่น", image: "/images/herbal/honey-lime.jpg", imageFull: "/images/herbal/honey-lime-full.jpg" },
  { name: "น้ำเสาวรสน้ำผึ้งมะนาว", emoji: "🍯", price: 10, benefit: "หอมหวาน สดชื่น" },
  { name: "น้ำลำไย", emoji: "🟤", price: 10, benefit: "หวานหอม บำรุงกำลัง", image: "/images/herbal/longan.jpg", imageFull: "/images/herbal/longan-full.jpg" },
  { name: "น้ำมะตูม", emoji: "🟠", price: 10, benefit: "หอมอุ่น ช่วยย่อย", image: "/images/herbal/bael.jpg", imageFull: "/images/herbal/bael-full.jpg" },
  { name: "น้ำขิง", emoji: "🫚", price: 10, benefit: "กลิ่นเผ็ดอุ่น ๆ มีสารสำคัญจากขิง เช่น gingerols", image: "/images/herbal/ginger-bottle.jpg", imageFull: "/images/herbal/ginger-bottle-full.jpg" },
  { name: "น้ำใบบัวบก", emoji: "🍃", price: 10, benefit: "เย็นสบาย ดื่มง่าย", image: "/images/herbal/gotu-kola.jpg", imageFull: "/images/herbal/gotu-kola-full.jpg" },
  { name: "น้ำตะไคร้ใบเตยหอม", emoji: "🌱", price: 10, benefit: "หอมตะไคร้ผสมใบเตย ดื่มแล้วสดชื่น", image: "/images/herbal/lemongrass-pandan.jpg", imageFull: "/images/herbal/lemongrass-pandan-full.jpg" },
  { name: "น้ำถั่วห้าสี", emoji: "🫘", price: 10, benefit: "ถั่ว 5 ชนิด หอมมัน อิ่มท้อง" },
  { name: "น้ำสามสหาย", emoji: "🧃", price: 10, benefit: "มะตูม + พุทรา + กระเจี๊ยบ หอมหวานเปรี้ยวลงตัว", image: "/images/herbal/three-friends.jpg", imageFull: "/images/herbal/three-friends-full.jpg" },
];
