import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CallFirst } from "@/components/CallFirst";
import { DailyMenu } from "@/components/nearby/DailyMenu";
import { ShopGallery } from "@/components/nearby/ShopGallery";
import { ShopReviews } from "@/components/nearby/ShopReviews";
import { nearbyShops, site } from "@/data/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return nearbyShops.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const shop = nearbyShops.find((s) => s.slug === slug);
  return { title: shop ? `${shop.name} — ร้านใกล้เคียง` : "ร้านใกล้เคียง" };
}

// Default slots for shops that don't define their own
const DEFAULT_SLOTS = [
  { id: "front", label: "บริเวณหน้าร้าน", emoji: "🏠" },
  { id: "stall", label: "จุดขาย / รถเข็น", emoji: "🛒" },
  { id: "food", label: "สินค้า", emoji: "🍽️" },
  { id: "morning", label: "บรรยากาศตอนเช้า", emoji: "🌅" },
  { id: "sign", label: "ป้ายร้าน", emoji: "🪧" },
];

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
        {shop.image ? (
          <Image src={shop.image} alt={shop.name} width={80} height={80} className="h-20 w-20 shrink-0 rounded-full object-cover shadow-md ring-2 ring-honey/60" />
        ) : (
          <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-honey/25 text-5xl">{shop.emoji}</span>
        )}
        <div className="min-w-0">
          <p className="mb-2 text-xs font-semibold text-cocoa/60">ร้านใกล้เคียง • {shop.type}</p>
          <h1 className="font-display text-3xl font-bold text-cocoa md:text-4xl">{shop.name}</h1>
          <p className="mt-2 text-cocoa/80">{shop.tagline}</p>
        </div>
      </header>

      {/* storefront photos — admin fills the named slots from this page */}
      <ShopGallery scope={shop.slug} slots={shop.photoSlots ?? DEFAULT_SLOTS} seed={shop.photos} />

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

      {shop.callFirst && (
        <CallFirst
          className="mt-8"
          text={shop.callFirst}
          phones={(shop.owners ?? []).map((o) => ({ label: o.name, phone: o.phone, phoneDisplay: o.phoneDisplay }))}
        />
      )}

      {shop.extras?.map((ex) => (
        <section key={ex.title} className="mt-8 rounded-3xl bg-milk p-6 ring-1 ring-bean/50">
          <h2 className="font-display text-xl font-bold text-pumpkin">
            {ex.emoji} {ex.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-cocoa/85">{ex.text}</p>
          {ex.price && <p className="mt-2 font-display font-bold text-cocoa">{ex.price}</p>}
          {ex.bullets && (
            <>
              <p className="mt-3 text-xs font-semibold text-cocoa/60">ภายในชุดสามารถประกอบด้วย</p>
              <ul className="mt-1 flex flex-wrap gap-2">
                {ex.bullets.map((b) => (
                  <li key={b} className="rounded-full bg-cream px-3 py-1 text-sm ring-1 ring-bean/50">
                    {b}
                  </li>
                ))}
              </ul>
            </>
          )}
          {ex.note && <p className="mt-3 text-xs text-cocoa/60">{ex.note}</p>}
        </section>
      ))}

      {shop.dailyMenu && (
        <DailyMenu
          scope={shop.slug}
          title={shop.dailyMenu.title}
          hint={shop.dailyMenu.hint}
          phone={shop.owners?.[0]?.phone}
          phoneDisplay={shop.owners?.[0]?.phoneDisplay}
        />
      )}

      {/* products */}
      <section className="mt-8">
        <h2 className="font-display text-xl font-bold text-pumpkin">{shop.emoji} เมนูและราคา</h2>
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
                <p className="text-sm leading-snug text-pumpkin">
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

      {/* services */}
      {shop.services?.map((sv) => (
        <section key={sv.title} className="mt-8 rounded-3xl bg-leaf/15 p-6 ring-1 ring-leaf/40">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-display text-xl font-bold text-pumpkin">
              {sv.emoji} {sv.title}
            </h2>
            {sv.badge && (
              <span className="rounded-full bg-honey/40 px-3 py-1 text-xs font-semibold text-cocoa ring-1 ring-honey/60">{sv.badge}</span>
            )}
          </div>
          {sv.image && (
            <Image src={sv.image} alt={sv.title} width={1200} height={900} className="mt-4 aspect-[4/3] w-full rounded-2xl object-cover ring-1 ring-bean/50 sm:aspect-[16/9]" />
          )}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-milk p-4 ring-1 ring-bean/50">
              <p className="font-display font-bold text-cocoa">{sv.emoji} เครื่องซักผ้า</p>
              <ul className="mt-2 space-y-1.5 text-sm text-cocoa/85">
                {sv.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
            {sv.coinExchange && (
              <div className="rounded-2xl bg-milk p-4 ring-1 ring-bean/50">
                <p className="font-display font-bold text-cocoa">🪙 จุดแลกเหรียญ 10 บาท</p>
                <ul className="mt-2 space-y-1.5 text-sm text-cocoa/85">
                  <li>
                    📍 <Link href={sv.coinExchange.href} className="font-semibold text-sky-deep underline">{sv.coinExchange.place}</Link> (ร้านของแม่ ข้างร้าน)
                  </li>
                  <li>🕠 {sv.coinExchange.hours}</li>
                </ul>
                <p className="mt-2 rounded-xl bg-blush/20 px-3 py-2 text-xs leading-relaxed text-cocoa/80">⚠️ {sv.coinExchange.warning}</p>
              </div>
            )}
          </div>
          {sv.support && (
            <div className="mt-4 rounded-2xl bg-milk p-4 ring-1 ring-blush/60">
              <p className="font-display font-bold text-cocoa">🧺 เครื่องซักผ้ามีปัญหา?</p>
              <p className="mt-1 text-sm leading-relaxed text-cocoa/85">{sv.support.intro}</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {sv.support.owners.map((o) => (
                  <li key={o.phone}>
                    <a
                      href={`tel:${o.phone}`}
                      className="flex items-center gap-3 rounded-2xl bg-cream px-4 py-3 ring-1 ring-bean/50 transition hover:bg-white"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sky/20 text-2xl">📞</span>
                      <span className="min-w-0">
                        <span className="block text-xs text-cocoa/60">{o.name} — เจ้าของเครื่อง</span>
                        <span className="font-display text-lg font-bold text-sky-deep">{o.phoneDisplay}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-cocoa/70">
                หากไม่สะดวกติดต่อเจ้าของเครื่อง สามารถติดต่อ{" "}
                <Link href={sv.support.fallback.href} className="font-semibold text-sky-deep underline">
                  {sv.support.fallback.place}
                </Link>{" "}
                เพื่อแจ้งปัญหาได้เช่นกัน —{" "}
                <a href={`tel:${sv.support.fallback.phone}`} className="font-semibold text-sky-deep">
                  📞 {sv.support.fallback.phoneDisplay}
                </a>
              </p>
            </div>
          )}
          <p className="mt-3 text-xs text-cocoa/60">🤝 ร้านหมูปิ้งวิริญาและวิของชำอยู่ใกล้กันและช่วยอำนวยความสะดวกให้กัน</p>
        </section>
      ))}

      {/* customer reviews */}
      <ShopReviews slug={shop.slug} shopName={shop.name} emoji={shop.emoji} seed={shop.seedReviews ?? []} />

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
        </div>
        <div className="rounded-3xl bg-milk p-6 ring-1 ring-bean/50 md:col-span-2">
          <h2 className="font-display text-xl font-bold text-pumpkin">👤 ติดต่อ{shop.name}</h2>
          {shop.owners && shop.owners.length > 0 ? (
            <>
              <p className="mt-1 text-xs text-cocoa/60">
                {shop.owners.length > 1 ? `ร้านนี้มีเจ้าของ ${shop.owners.length} คน` : "เจ้าของร้าน"} — แตะที่เบอร์เพื่อโทรออกได้เลย
              </p>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {shop.owners.map((o) => (
                  <li key={o.phone}>
                    <a
                      href={`tel:${o.phone}`}
                      className="flex items-center gap-3 rounded-2xl bg-cream px-4 py-3 ring-1 ring-bean/50 transition hover:bg-white"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sky/20 text-2xl">👤</span>
                      <span className="min-w-0">
                        <span className="block font-display font-bold text-cocoa">{o.name}</span>
                        <span className="font-display text-lg font-bold text-sky-deep">📞 {o.phoneDisplay}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="mt-2 text-xs text-cocoa/55">📞 {shop.phoneNote ?? "ร้านนี้ไม่มีเบอร์โทรติดต่อ — แวะมาที่หน้าร้านได้เลย"}</p>
          )}
        </div>
      </section>

      <p className="mt-8 text-center text-xs text-cocoa/50">
        ร้านนี้เป็นร้านของเพื่อนบ้าน ไม่ใช่ส่วนหนึ่งของ Pumpkin&amp;Melone Soy Milk หรือวิของชำ
      </p>
    </main>
  );
}
