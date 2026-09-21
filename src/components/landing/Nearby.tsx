import Image from "next/image";
import Link from "next/link";
import { nearbyShops } from "@/data/site";
import { SectionTitle } from "./SectionTitle";

export function Nearby() {
  return (
    <section id="nearby" className="bg-milk py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle sub="ร้านอื่น ๆ ในบริเวณเดียวกัน — แวะร้านแม่แล้วเดินไปต่อได้เลย (ร้านเหล่านี้เป็นร้านของเพื่อนบ้าน ไม่ใช่ส่วนหนึ่งของ Pumpkin&Melone Soy Milk หรือวิของชำ)">
          🗺️ ร้านใกล้เคียง
        </SectionTitle>
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          {nearbyShops.map((s) => (
            <Link
              key={s.slug}
              href={`/nearby/${s.slug}`}
              className="group flex flex-col rounded-3xl bg-cream p-6 ring-1 ring-bean/50 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                {s.image ? (
                  <Image src={s.image} alt={s.name} width={56} height={56} className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-honey/60" />
                ) : (
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-honey/25 text-3xl">{s.emoji}</span>
                )}
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-bold text-cocoa group-hover:text-sky-deep">{s.name}</h3>
                  <p className="text-xs text-cocoa/60">{s.type}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-cocoa/80">{s.tagline}</p>
              {s.services?.map((sv) => sv.badge && (
                <span key={sv.title} className="mt-2 inline-block w-fit rounded-full bg-honey/40 px-3 py-1 text-xs font-semibold text-cocoa ring-1 ring-honey/60">
                  {sv.badge}
                </span>
              ))}
              <ul className="mt-3 flex-1 space-y-1.5 text-sm text-cocoa/85">
                <li>📍 {s.location}</li>
                {s.details.slice(0, 2).map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <span className="mt-4 inline-flex items-center justify-center gap-1 rounded-full bg-sky px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky/30 transition group-hover:bg-sky-deep">
                ดูรายละเอียดร้าน <span className="transition group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
