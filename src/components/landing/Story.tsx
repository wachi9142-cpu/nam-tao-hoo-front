import { AdminPhoto } from "@/components/AdminPhoto";
import { SectionTitle } from "./SectionTitle";

const photos = [
  { emoji: "👩‍🍳", label: "แม่" },
  { emoji: "🫘", label: "เตรียมน้ำเต้าหู้" },
  { emoji: "🏠", label: "หน้าร้าน" },
];

export function Story() {
  return (
    <section id="story" className="mx-auto max-w-6xl px-4 py-20">
      <SectionTitle>🥛 จากครัวเล็ก ๆ ของแม่</SectionTitle>
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-4 leading-relaxed text-cocoa/85">
          <p>ทุกเช้ามืด แม่จะตื่นขึ้นมาตั้งแต่ตี 3–4 เพื่อเตรียมน้ำเต้าหู้สำหรับวันใหม่</p>
          <p>
            กว่าจะถึงเวลา 6 โมงเช้า น้ำเต้าหู้แต่ละหม้อผ่านการเตรียมอย่างตั้งใจ
            เพื่อให้ลูกค้าที่แวะมาในตอนเช้าได้ดื่มน้ำเต้าหู้สดใหม่ หอม และอบอุ่นเหมือนรสชาติจากบ้าน
          </p>
          <p className="font-display text-lg font-semibold text-pumpkin">
            Pumpkin&amp;Melone Soy Milk จึงไม่ได้เป็นเพียงร้านน้ำเต้าหู้
            แต่เป็นสิ่งเล็ก ๆ ที่แม่ตั้งใจทำในทุกเช้า 🥛💛
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {photos.map((p, i) => (
            <AdminPhoto
              key={p.label}
              scope="home-story"
              slot={p.label}
              label={p.label}
              emoji={p.emoji}
              aspect="aspect-[3/4]"
              className={i === 1 ? "mt-8" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
