import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CallFirst } from "@/components/CallFirst";
import { PhoneNotice } from "@/components/landing/PhoneNotice";
import { SectionTitle } from "@/components/landing/SectionTitle";
import { herbalDrinks, site } from "@/data/site";

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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {herbalDrinks.map((d) => (
          <div
            key={d.name}
            className="flex min-w-0 items-center gap-4 rounded-3xl bg-milk p-4 ring-1 ring-bean/50 transition hover:-translate-y-0.5 hover:shadow-md md:p-5"
          >
            <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-leaf/15 text-3xl">
              {d.image ? (
                <Image src={d.image} alt={d.name} width={56} height={56} className="h-full w-full object-cover" />
              ) : (
                d.emoji
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display font-bold text-cocoa md:text-lg">{d.name}</p>
              <p className="text-xs text-cocoa/65">{d.benefit}</p>
            </div>
            <p className="font-display shrink-0 text-xl font-bold text-pumpkin">{d.price} <span className="text-sm font-semibold">บาท</span></p>
          </div>
        ))}
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
