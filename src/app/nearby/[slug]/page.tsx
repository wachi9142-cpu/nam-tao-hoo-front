import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { nearbyShops, site } from "@/data/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return nearbyShops.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const shop = nearbyShops.find((s) => s.slug === slug);
  return { title: shop ? `${shop.name} — ร้านใกล้เคียง Pumpkin&Melone` : "ร้านใกล้เคียง" };
}

// Placeholder shown until real photos are added (never AI images)
function PhotoSlot({ label }: { label: string }) {
  return (
    <div className="grid aspect-[4/3] place-items-center rounded-2xl border-2 border-dashed border-bean/60 bg-cream text-center text-xs text-cocoa/50">
      <span>
        📷
        <br />
        {label}
        <br />
        <span className="text-[10px]">(รอรูปจริงจากร้าน)</span>
      </span>
    </div>
  );
}

export default async function NearbyShopPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const shop = nearbyShops.find((s) => s.slug === slug);
  if (!shop) notFound();

  const mapsUrl = shop.mapsUrl ?? site.mapsUrl;
  const mapsEmbed = shop.mapsEmbed ?? site.mapsEmbed;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.address)}`;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:py-16">
      <Link href="/#nearby" className="text-sm font-semibold text-sky-deep hover:underline">
        ← กลับไปร้านใกล้เคียง
      </Link>

      {/* header */}
      <header className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-honey/25 text-5xl">{shop.emoji}</span>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-cocoa/60">ร้านใกล้เคียง • {shop.type}</p>
          <h1 className="font-display text-3xl font-bold text-cocoa md:text-4xl">{shop.name}</h1>
          <p className="mt-1 text-cocoa/80">{shop.tagline}</p>
        </div>
      </header>

      {/* storefront photos */}
      <section className="mt-8">
        <h2 className="font-display text-xl font-bold text-pumpkin">🏠 ภาพหน้าร้าน</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
          {shop.photos.length > 0 ? (
            shop.photos.map((ph) => (
              <figure key={ph.src} className="overflow-hidden rounded-2xl ring-1 ring-bean/50">
                <Image src={ph.src} alt={ph.caption} width={600} height={450} className="aspect-[4/3] w-full object-cover" />
                <figcaption className="bg-milk px-3 py-2 text-xs text-cocoa/70">{ph.caption}</figcaption>
              </figure>
            ))
          ) : (
            <>
              <PhotoSlot label="บริเวณหน้าร้าน" />
              <PhotoSlot label="จุดขาย / รถเข็น" />
            </>
          )}
        </div>
      </section>

      {/* map */}
      <section className="mt-8 grid gap-4 md:grid-cols-[3fr_2fr]">
        <div className="overflow-hidden rounded-3xl ring-1 ring-bean/50">
          <iframe
            title={`แผนที่ ${shop.name}`}
            src={mapsEmbed}
            className="h-64 w-full border-0 md:h-full md:min-h-72"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="flex flex-col justify-center rounded-3xl bg-milk p-6 ring-1 ring-bean/50">
          <h2 className="font-display text-xl font-bold text-pumpkin">📍 ร้านอยู่ตรงไหน</h2>
          <p className="mt-2 text-sm text-cocoa/85">{shop.location}</p>
          <p className="mt-1 text-xs text-cocoa/60">อยู่บริเวณเดียวกับร้าน Pumpkin&amp;Melone Soy Milk — มาถึงร้านแม่แล้วมองหาได้เลย</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="rounded-full bg-milk px-4 py-2.5 text-sm font-semibold text-cocoa ring-1 ring-bean transition hover:bg-white">
              🗺️ ดูแผนที่
            </a>
            <a href={directions} target="_blank" rel="noreferrer" className="rounded-full bg-sky px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky/30 transition hover:bg-sky-deep">
              🧭 เปิดเส้นทาง
            </a>
          </div>
        </div>
      </section>

      {/* products */}
      <section className="mt-8">
        <h2 className="font-display text-xl font-bold text-pumpkin">{shop.emoji} สินค้า</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {shop.products.map((pr) => (
            <div key={pr.name} className="flex items-center gap-4 rounded-2xl bg-milk p-4 ring-1 ring-bean/50">
              {pr.image ? (
                <Image src={pr.image} alt={pr.name} width={80} height={80} className="h-20 w-20 shrink-0 rounded-xl object-cover" />
              ) : (
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl border-2 border-dashed border-bean/60 bg-cream text-[10px] text-cocoa/50">
                  รอรูปจริง
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-display font-bold text-cocoa">{pr.name}</p>
                <p className="text-sm text-pumpkin">
                  {pr.price > 0 ? (
                    <>
                      <span className="font-display text-lg font-bold">{pr.price}</span> {pr.unit}
                    </>
                  ) : (
                    pr.unit
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* details */}
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-milk p-6 ring-1 ring-bean/50">
          <h2 className="font-display text-xl font-bold text-pumpkin">🕐 เวลาขาย</h2>
          <ul className="mt-3 space-y-2 text-sm text-cocoa/85">
            {shop.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          {shop.note && <p className="mt-3 text-xs leading-relaxed text-cocoa/55">หมายเหตุ: {shop.note}</p>}
        </div>
        <div className="rounded-3xl bg-cream p-6 ring-1 ring-bean/50">
          <h2 className="font-display text-xl font-bold text-pumpkin">📝 รายละเอียดร้าน</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex gap-2"><dt className="w-24 shrink-0 text-cocoa/60">ชื่อร้าน</dt><dd className="font-semibold text-cocoa">{shop.name}</dd></div>
            <div className="flex gap-2"><dt className="w-24 shrink-0 text-cocoa/60">ประเภท</dt><dd className="text-cocoa">{shop.type}</dd></div>
            <div className="flex gap-2"><dt className="w-24 shrink-0 text-cocoa/60">ตำแหน่ง</dt><dd className="text-cocoa">{shop.location}</dd></div>
          </dl>
          {shop.phone ? (
            <a href={`tel:${shop.phone}`} className="mt-4 inline-block rounded-full bg-sky px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-deep">
              📞 โทรหาร้าน
            </a>
          ) : (
            <p className="mt-4 text-xs text-cocoa/55">📞 ร้านนี้ไม่มีเบอร์โทรติดต่อ — แวะมาที่หน้าร้านได้เลย</p>
          )}
        </div>
      </section>

      <p className="mt-8 text-center text-xs text-cocoa/50">
        ร้านนี้เป็นร้านของเพื่อนบ้าน ไม่ใช่ส่วนหนึ่งของ Pumpkin&amp;Melone Soy Milk หรือวิของชำ
      </p>
    </main>
  );
}
