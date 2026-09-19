import { nearbyShops } from "@/data/site";
import { SectionTitle } from "./SectionTitle";

export function Nearby() {
  return (
    <section id="nearby" className="bg-milk py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle sub="พื้นที่แนะนำร้านในชุมชน — แวะร้านแม่แล้วไปต่อร้านข้าง ๆ ได้เลย">
          🗺️ ร้านน่าสนใจใกล้ Pumpkin&amp;Melone
        </SectionTitle>
        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          {nearbyShops.map((s) => (
            <a
              key={s.name}
              href="#"
              className="group rounded-3xl bg-cream p-6 ring-1 ring-bean/50 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="text-4xl">{s.type.split(" ")[0]}</div>
              <h3 className="font-display mt-3 text-lg font-bold text-cocoa group-hover:text-sky-deep">{s.name}</h3>
              <p className="mt-2 text-sm text-cocoa/75">📍 {s.distance}</p>
              <p className="text-sm text-cocoa/75">⭐ {s.rating}</p>
              <p className="text-sm text-cocoa/75">{s.type}</p>
              <p className="mt-3 text-xs font-semibold text-sky-deep">ดูรายละเอียด →</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
