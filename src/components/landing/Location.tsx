import { site } from "@/data/site";
import { PhoneNotice } from "./PhoneNotice";
import { SectionTitle } from "./SectionTitle";

export function Location() {
  return (
    <section id="location" className="bg-milk py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle>📍 ร้านอยู่ที่ไหน</SectionTitle>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="min-h-72 overflow-hidden rounded-3xl bg-sky/15 ring-1 ring-bean/50">
            <iframe
              title="แผนที่ร้าน Pumpkin&Melone Soy Milk"
              src={site.mapsEmbed}
              className="h-full min-h-72 w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="flex flex-col justify-center rounded-3xl bg-cream p-8 ring-1 ring-bean/50">
            <p className="font-display text-2xl font-bold text-sky-deep">📍 Pumpkin&amp;Melone Soy Milk</p>
            <p className="mt-2 text-cocoa/80">{site.address}</p>
            <p className="mt-2 text-lg font-semibold text-cocoa">📞 {site.phoneDisplay}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-sky px-5 py-3 font-semibold text-white shadow-md shadow-sky/30 transition hover:bg-sky-deep"
              >
                🗺️ เปิดแผนที่
              </a>
              <a
                href={`tel:${site.phone}`}
                className="rounded-full bg-milk px-5 py-3 font-semibold text-cocoa ring-1 ring-bean transition hover:bg-white"
              >
                📞 โทรหาร้าน
              </a>
            </div>
            <div className="mt-6 rounded-2xl bg-blush/20 p-4 text-sm">
              <p className="font-bold text-cocoa">🚫 ไม่มีบริการ Delivery</p>
              <p className="text-cocoa/75">สามารถมาซื้อที่หน้าร้านได้ทุกวันจันทร์–เสาร์</p>
            </div>
            <PhoneNotice className="mt-3" />
          </div>
        </div>
      </div>
    </section>
  );
}
