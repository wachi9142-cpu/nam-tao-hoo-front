# สิ่งที่หน้าบ้านต้องการจากหลังบ้าน

เว็บหน้าบ้าน (Next.js 16) ทำงานได้ครบทุกฟีเจอร์แล้ว **แต่ยังเก็บข้อมูลใน `localStorage` ของแต่ละเครื่อง**
ทุกจุดที่เก็บข้อมูลถูกรวมไว้ใน 4 ไฟล์ เพื่อให้เปลี่ยนมาเรียก API ได้โดยไม่ต้องแก้ UI:

| ไฟล์ | หน้าที่ | ต้องเปลี่ยนเป็น |
|---|---|---|
| `src/lib/auth.tsx` | บัญชีผู้ใช้ + สิทธิ์แอดมิน | OAuth จริง + session |
| `src/lib/scopes.ts` | ทะเบียน "ร้าน" ทุกร้านที่มีรีวิว | อ่านจาก API หรือคงไว้เป็น config |
| `src/lib/moderation.ts` | รายงานรีวิว + งานแอดมิน + audit log | REST API |
| `src/lib/shopContent.ts` | รูปของร้าน + เมนูประจำวัน | REST API + file upload |

> 📌 **สถานะล่าสุด (25 ก.ย. 2569)** — หน้าบ้านเสร็จ, รีวิว/รูป/คะแนนปลอมถูกลบหมดแล้ว,
> ข้อมูลร้านและราคาทั้งหมดเป็นของจริงจากเจ้าของร้าน, `npm run build` ผ่าน, โค้ดอยู่บน branch `main`
>
> ⚠️ **ห้ามเปิดใช้งานจริงก่อนทำข้อ 1** — ตอนนี้กดปุ่ม LINE/Google แล้วได้บัญชีสมมติทันที
> และรหัสแอดมินอยู่ใน env ฝั่ง client (`NEXT_PUBLIC_ADMIN_CODE`) ใครเปิด DevTools ก็เห็น

---

## 1. บัญชีสมาชิก (สำคัญที่สุด)

บัญชีเดียวใช้ได้ทุกร้านในเว็บ (ไม่แยกบัญชีตามร้าน)

```ts
type User = {
  id: string;            // ใหม่: ให้หลังบ้านออก id
  name: string;
  avatar: string;        // URL หรือ emoji
  provider: "line" | "facebook" | "instagram" | "google";
  role?: "admin";        // สิทธิ์แอดมิน ต้องมาจาก server เท่านั้น
};
```

ต้องการ:
- `GET /auth/:provider` → redirect ไป OAuth (LINE, Facebook, Google) แล้วกลับมาที่ `?next=<path>` ที่หน้าบ้านส่งไป
- `GET /me` → ข้อมูลผู้ใช้ปัจจุบันจาก session cookie (httpOnly)
- `POST /logout`
- สิทธิ์แอดมินผูกกับบัญชี ไม่ใช่รหัสผ่านฝั่งหน้าเว็บ

หน้าบ้านเรียกใช้ผ่าน `useAuth()` — เปลี่ยนแค่ภายใน `AuthProvider`

---

## 2. "ร้าน" (scope)

ทุก API ใช้ `scope` เป็นตัวระบุร้าน ค่าที่ใช้อยู่ตอนนี้:

| scope | ร้าน |
|---|---|
| `home` | Pumpkin&Melone Soy Milk |
| `grocery` | วิของชำ |
| `wiriya` | ร้านหมูปิ้งวิริญา |
| `pa-mon` | ร้านข้าวราดแกงป้ามน |

เพิ่มร้านใหม่ = เพิ่มใน `src/data/site.ts` (`nearbyShops`) แล้ว scope จะถูกสร้างอัตโนมัติจาก `slug`

---

## 3. รีวิว

```ts
type Review = {
  id: string;
  scope: string;         // ร้านไหน
  userId: string;
  user: string;          // ชื่อที่แสดง
  avatar: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  image?: string;        // รูปแนบ (หน้าบ้านย่อให้ ≤1200px ก่อนส่งแล้ว)
  checkedIn?: boolean;   // คนรีวิวเคยเช็กอินร้านนี้
  date: string;          // ISO
  likeCount: number;     // นับจาก likes จริง
  likedByMe: boolean;    // ผู้ใช้ปัจจุบันกดไว้ไหม
  reply?: OwnerReply;    // คำตอบจากร้าน
};

type OwnerReply = {
  text: string;
  by: string;                    // ชื่อแอดมินที่ตอบ
  role: "owner" | "admin";       // แสดงเป็น "เจ้าของร้าน" / "แอดมินร้าน"
  date: string;
};
```

- `GET /shops/:scope/reviews` → รายการรีวิว (เรียงใหม่→เก่า)
- `POST /shops/:scope/reviews` → เขียนรีวิว (ต้องล็อกอิน) รับ `rating`, `text`, `image`
- `DELETE /reviews/:id` → เฉพาะแอดมิน ต้องส่ง `reason`

**กติกาที่ตกลงไว้:** แอดมินลบได้เฉพาะ คำหยาบ / สแปม / ก่อกวน / ไม่เกี่ยวข้องกับร้าน / ผิดกฎเว็บ
**ห้ามลบเพราะให้ดาวน้อยหรือวิจารณ์ร้าน**

---

## 4. ถูกใจรีวิว

1 บัญชีกดได้ครั้งเดียวต่อ 1 รีวิว กดซ้ำ = ยกเลิก ยอดต้องนับจากคนกดจริง

- `POST /reviews/:id/like`
- `DELETE /reviews/:id/like`

ตาราง: `likes(review_id, user_id)` unique คู่กัน

---

## 5. เช็กอิน

```ts
type CheckIn = { id: string; scope: string; userId: string; user: string; message?: string; date: string };
```

- `GET /shops/:scope/checkins`
- `POST /shops/:scope/checkins` (ต้องล็อกอิน)

---

## 6. รายงานรีวิว + งานแอดมิน

```ts
type Report = {
  reviewId: string;
  by: string;                                                  // userId
  reason: "abuse" | "spam" | "offtopic" | "other";
  note?: string;                                               // กรอกเพิ่มเมื่อเลือก other
  date: string;
};
```

- `POST /reviews/:id/report` → ลูกค้ารายงาน (1 บัญชี ต่อ 1 รีวิว ได้ครั้งเดียว)
- `GET /admin/reports` → คิวรีวิวที่ถูกรายงานทุกร้าน (แอดมินเท่านั้น)
- `DELETE /reviews/:id/reports` → ยกเลิกรายงาน (รีวิวปกติ)
- `PUT /reviews/:id/reply` / `DELETE /reviews/:id/reply` → ตอบ/ลบคำตอบ

**Audit log** — บันทึกทุกการกระทำของแอดมิน เพื่อรู้ว่าใครลบ/ตอบอะไร:

```ts
type AdminAction = {
  id: string;
  action: "reply" | "delete" | "dismiss";
  scope: string;
  reviewId: string;
  by: string;            // แอดมิน
  date: string;
  reason?: string;
  snapshot?: { user: string; rating: number; text: string };  // เก็บรีวิวที่ลบไว้ด้วย
};
```

- `GET /admin/log`

---

## 7. รูปของร้าน (แอดมินอัปโหลดเอง)

แต่ละร้านมี "ช่องรูป" ที่ตั้งชื่อไว้แล้ว (`photoSlots` ใน `src/data/site.ts`)
เช่น ป้ามน: `cart`, `sign`, `snack`, `fresh`, `alms`, `food`, `chili`, `daily`

นอกจาก scope ของร้าน ยังมี scope สำหรับรูปในหน้าแรกอีก 3 ตัว (ใช้ API ชุดเดียวกัน):

| scope | ใช้ที่ไหน | slot คือ |
|---|---|---|
| `home-menu` | รูปในหมวดเมนูน้ำเต้าหู้ + ถุงที่ตักไว้ | ชื่อหมวด เช่น `น้ำเต้าหู้`, `ready-soy-milk` |
| `home-story` | รูปส่วน "จากครัวเล็ก ๆ ของแม่" | `แม่`, `เตรียมน้ำเต้าหู้`, `หน้าร้าน` |
| `home-toppings` | รูปเครื่องน้ำเต้าหู้ | ชื่อเครื่อง เช่น `ลูกเดือย` |

รูปที่ติดมากับเว็บ (ในโฟลเดอร์ `public/images/`) เป็นค่าตั้งต้น — ถ้าแอดมินอัปโหลดทับจะใช้ของใหม่
ถ้าลบรูปที่อัปโหลด จะกลับไปใช้รูปตั้งต้นเอง

```ts
type ShopPhoto = { src: string; caption: string; by: string; date: string };
```

- `GET /shops/:scope/photos` → `{ [slotId]: ShopPhoto }`
- `PUT /shops/:scope/photos/:slot` → อัปโหลดรูป (multipart) + caption
- `DELETE /shops/:scope/photos/:slot`

หน้าบ้านย่อรูปเป็น JPEG ≤1400px ให้ก่อนส่งแล้ว (`src/lib/image.ts`) แต่หลังบ้านควรจำกัดขนาด/ชนิดไฟล์ซ้ำอีกชั้น

---

## 8. เมนูประจำวัน (ร้านป้ามน)

เมนูเปลี่ยนทุกวัน แอดมินโพสต์เอง ถ้าไม่ได้อัปเดตวันนี้ หน้าบ้านจะขึ้นเตือนว่าเป็นเมนูเก่าอัตโนมัติ

```ts
type TodayMenu = {
  date: string;      // YYYY-MM-DD ตามเวลาไทย
  items: string[];
  note?: string;
  by: string;
};
```

- `GET /shops/:scope/today`
- `PUT /shops/:scope/today` (แอดมิน)
- `DELETE /shops/:scope/today`

---

## 9. อื่น ๆ ที่ควรรู้

- **ข้อมูลร้าน เมนู ราคา เวลาเปิด-ปิด รูปสินค้า** อยู่ใน `src/data/site.ts` เป็นไฟล์คงที่
  ยังไม่ต้องทำ API ก็ได้ แก้ในโค้ดแล้ว deploy ใหม่
- **รีวิวตัวอย่างในไฟล์ `site.ts`** (`seedReviews`) เป็นข้อมูลปลอมสำหรับทดสอบ
  **ต้องลบก่อนเปิดใช้งานจริง** ไม่งั้นจะกลายเป็นรีวิวปลอมบนเว็บร้านจริง
- ตัวแปรที่ต้องตั้งตอน deploy: `NEXT_PUBLIC_SITE_URL` (ใช้ทำ Open Graph + sitemap)
  และเลิกใช้ `NEXT_PUBLIC_ADMIN_CODE` เมื่อมี auth จริง
- หน้าเว็บทั้งหมดผ่านการทดสอบขนาดจอ 360 / 390 / 768 / 1024 / 1366 / 1920 แล้ว
