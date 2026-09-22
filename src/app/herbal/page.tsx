import type { Metadata } from "next";
import Link from "next/link";
import { CallFirst } from "@/components/CallFirst";
import { HerbalGrid } from "@/components/herbal/HerbalGrid";
import { PhoneNotice } from "@/components/landing/PhoneNotice";
import { SectionTitle } from "@/components/landing/SectionTitle";
import Image from "next/image";
import { herbalDrinks, herbalGallery, herbalIntro, site } from "@/data/site";

export const metadata: Metadata = { title: "สมุนไพรโฮมเมดจากแม่" };

export default function HerbalPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-sky px-4 py-2 text-sm font-semibold text-white shadow-md shadow-sky/30 transition hover:bg-sky-deep"
      >
        🥛 กลับไปร้านน้ำเต้าหู้
      </Link>
      <div className="mt-6">
        <SectionTitle sub="น้ำสมุนไพรที่แม่ทำเอง มีจำหน่ายเป็นบางช่วงตามวัตถุดิบที่หาได้ แต่ละชนิดอาจมีไม่ตลอด และบางวันอาจไม่มีบางรายการ">
          🌿 น้ำสมุนไพรโฮมเมด
        </SectionTitle>
      </div>

      <CallFirst className="mb-6" text={site.callFirst.herbal} phones={[{ phone: site.phone, phoneDisplay: site.phoneDisplay }]} />

      {/* sample bottles */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        {herbalGallery.map((g) => (
          <figure key={g.src} className="overflow-hidden rounded-3xl bg-milk ring-1 ring-bean/50">
            <Image src={g.src} alt={g.caption} width={1400} height={800} className="aspect-[7/4] w-full object-cover" />
            <figcaption className="px-4 py-2 text-xs text-cocoa/70">
              {g.caption}
              <span className="mt-0.5 block text-[11px] text-cocoa/50">{herbalIntro.colorNote}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mb-6 rounded-3xl bg-leaf/15 p-5 ring-1 ring-leaf/40">
        <p className="font-display text-lg font-bold text-cocoa">{herbalIntro.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-cocoa/80">{herbalIntro.text}</p>
      </div>

      <HerbalGrid drinks={herbalDrinks} />

      <div className="mt-4 space-y-2 text-xs leading-relaxed text-cocoa/60">
        <p>
          <strong className="text-cocoa/80">🌿 หมายเหตุเกี่ยวกับสีและรูปภาพ:</strong> {herbalIntro.colorNoteLong}
        </p>
        <p>{herbalIntro.disclaimer}</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-leaf/15 p-6 ring-1 ring-leaf/40">
          <p className="font-display text-lg font-bold text-cocoa">💚 มีแบบไม่ใส่น้ำตาล</p>
          <p className="mt-1 text-sm leading-relaxed text-cocoa/80">
            สำหรับลูกค้าที่ต้องการแบบไม่หวาน <strong className="text-cocoa">ต้องสั่งล่วงหน้า</strong>
            <br />
            ขั้นต่ำ <strong className="text-cocoa">10 ขวด</strong>
          </p>
          <a href={`tel:${site.phone}`} className="mt-3 inline-block rounded-full bg-sky px-5 py-2 text-sm font-semibold text-white hover:bg-sky-deep">
            📞 สั่งล่วงหน้า {site.phoneDisplay}
          </a>
        </div>
        <div className="rounded-3xl bg-milk p-6 ring-1 ring-bean/50">
          <p className="font-display text-lg font-bold text-cocoa">📌 รับทำจำนวนไม่มาก</p>
          <p className="mt-1 text-sm leading-relaxed text-cocoa/80">เนื่องจากแม่ทำเองคนเดียว จึงรับทำได้ในจำนวนที่ไม่มาก ขอบคุณที่เข้าใจน้า 💛</p>
        </div>
      </div>
      <PhoneNotice className="mt-4" />
    </main>
  );
}
