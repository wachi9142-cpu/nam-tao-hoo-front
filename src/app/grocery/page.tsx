import type { Metadata } from "next";
import Link from "next/link";
import { PhoneNotice } from "@/components/landing/PhoneNotice";
import { ShopReviews } from "@/components/nearby/ShopReviews";
import { groceryScope } from "@/lib/scopes";
import { SectionTitle } from "@/components/landing/SectionTitle";
import { grocery, site } from "@/data/site";

export const metadata: Metadata = { title: "วิของชำ" };

const BackButton = () => (
  <Link
    href="/"
    className="inline-flex items-center gap-2 rounded-full bg-sky px-4 py-2 text-sm font-semibold text-white shadow-md shadow-sky/30 transition hover:bg-sky-deep"
  >
    🥛 กลับไปร้านน้ำเต้าหู้
  </Link>
);

export default function GroceryPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <BackButton />
      <div className="mt-6">
        <SectionTitle sub="ร้านของชำของครอบครัว มีสินค้าอุปโภคบริโภคและของใช้ต่าง ๆ เปิดพร้อมร้านน้ำเต้าหู้ทุกเช้า">
          🛒 วิของชำ
        </SectionTitle>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {grocery.map((cat) => (
          <div key={cat.title} className="rounded-3xl bg-milk p-5 ring-1 ring-bean/50 md:p-6">
            <h3 className="font-display flex items-center gap-2 text-lg font-bold text-sky-deep md:text-xl">
              <span className="text-2xl">{cat.emoji}</span> {cat.title}
            </h3>
            {cat.sub && <p className="mt-1 text-xs leading-relaxed text-cocoa/65">{cat.sub}</p>}
            {cat.comingSoon ? (
              <p className="mt-3 rounded-2xl bg-cream px-3 py-2 text-sm text-cocoa/60 ring-1 ring-dashed ring-bean/60">
                🌱 ในอนาคตอาจมีจำหน่าย
              </p>
            ) : (
              <ul className="mt-3 space-y-1.5 text-sm text-cocoa/85">
                {cat.items.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-honey" /> {it}
                  </li>
                ))}
              </ul>
            )}
            {cat.note && <p className="mt-3 text-[11px] leading-relaxed text-cocoa/55">🏠 {cat.note}</p>}
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-3xl bg-leaf/15 p-6 ring-1 ring-leaf/40 sm:flex-row sm:items-center">
        <span className="text-4xl">🪙</span>
        <div className="flex-1">
          <p className="font-display text-lg font-bold text-cocoa">🤝 จุดแลกเหรียญ 10 บาท</p>
          <p className="text-sm text-cocoa/80">
            สำหรับเครื่องซักผ้าหยอดเหรียญของ <Link href="/nearby/wiriya" className="font-semibold text-sky-deep underline">ร้านหมูปิ้งวิริญา</Link> ข้างร้าน — นำเงินมาแลกเหรียญได้ที่นี่เลย
          </p>
          <p className="mt-1 text-sm font-semibold text-cocoa">🕠 รับแลกเหรียญ 05:30–21:00 น.</p>
          <p className="text-xs text-cocoa/60">⚠️ เครื่องซักผ้าเปิด 24 ชม. แต่แลกเหรียญได้เฉพาะช่วงที่ร้านเปิด</p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-honey/20 p-6 ring-1 ring-honey/50">
          <p className="font-display text-lg font-bold text-cocoa">🔎 มีสินค้าที่ต้องการไหม? โทรสอบถามได้เลย</p>
          <a href={`tel:${site.phone}`} className="mt-3 inline-block rounded-full bg-sky px-5 py-3 font-semibold text-white hover:bg-sky-deep">
            📞 {site.phoneDisplay}
          </a>
          <p className="mt-3 text-sm leading-relaxed text-cocoa/80">
            โทรสอบถามก่อนได้ว่าสินค้าที่ต้องการมีจำหน่ายหรือไม่
            เนื่องจากสินค้าบางรายการมีจำนวนจำกัด และน้ำสมุนไพรแต่ละชนิดอาจมีไม่ตลอด
          </p>
        </div>
        <div className="rounded-3xl bg-milk p-6 ring-1 ring-bean/50">
          <p className="font-display text-lg font-bold text-cocoa">📦 สั่งซื้อจำนวนมาก / สั่งทำน้ำสมุนไพร</p>
          <p className="mt-2 text-sm leading-relaxed text-cocoa/80">
            กรุณาโทรสอบถามและ<strong className="text-cocoa">เช็กคิวกับแม่ก่อนทุกครั้ง</strong> เนื่องจากแม่ทำเองคนเดียว
            <br />
            เมื่อยืนยันคิวแล้ว จึงชำระ<strong className="text-cocoa">ค่ามัดจำ</strong>เพื่อยืนยันออเดอร์
          </p>
        </div>
      </div>

      <PhoneNotice className="mt-4" />

      <ShopReviews slug={groceryScope.scope} shopName={groceryScope.name} emoji={groceryScope.emoji} seed={groceryScope.seed} />

      <div className="mt-4 rounded-3xl border-2 border-dashed border-blush bg-blush/15 p-5 text-center">
        <p className="font-display font-bold text-cocoa">🏠 ซื้อสินค้าที่หน้าร้านเท่านั้น</p>
        <p className="text-sm text-cocoa/75">ไม่มีบริการ Delivery</p>
      </div>

      <div className="mt-8 text-center">
        <BackButton />
      </div>
    </main>
  );
}
