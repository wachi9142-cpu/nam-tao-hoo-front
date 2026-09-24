import { AdminPhoto } from "@/components/AdminPhoto";
import { menu, readyBags, sweetness, toppings } from "@/data/site";
import { SectionTitle } from "./SectionTitle";

export function Menu() {
  return (
    <section id="menu" className="bg-milk py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle>🥛 เมนู Pumpkin&amp;Melone Soy Milk</SectionTitle>

        <div className="grid gap-6 md:grid-cols-3">
          {menu.map((cat) => (
            <div key={cat.title} className="flex flex-col rounded-3xl bg-cream p-6 shadow-sm ring-1 ring-bean/50">
              <h3 className="font-display flex items-center gap-2 text-xl font-bold text-sky-deep">
                <span className="text-2xl">{cat.emoji}</span> {cat.title}
              </h3>
              {/* photo of the drink — admin fills this in from the page */}
              <AdminPhoto
                scope="home-menu"
                slot={cat.title}
                label={cat.title}
                emoji={cat.emoji}
                fallback={cat.image}
                fallbackCaption={cat.imageCaption}
                className="mt-3"
              />
              <ul className="mt-4 flex-1 divide-y divide-bean/40">
                {cat.items.map((it) => (
                  <li key={it.name} className="flex items-start justify-between gap-3 py-3">
                    <div>
                      <p className="font-semibold text-cocoa">
                        {it.name}
                        {it.badge && (
                          <span className="ml-2 rounded-full bg-sky px-2 py-0.5 text-[10px] font-bold text-white">{it.badge}</span>
                        )}
                      </p>
                      {it.note && <p className="text-xs text-cocoa/60">{it.note}</p>}
                    </div>
                    <p className="font-display shrink-0 text-lg font-bold text-pumpkin">{it.price} <span className="text-sm font-semibold">บาท</span></p>
                  </li>
                ))}
              </ul>
              {cat.note && <p className="mt-3 text-xs text-cocoa/55">ℹ️ {cat.note}</p>}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl bg-cream p-6 ring-1 ring-bean/50">
          <p className="font-display text-lg font-bold text-cocoa">{toppings.title}</p>
          <p className="text-sm text-cocoa/70">{toppings.sub}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {toppings.items.map((t) => (
              <span key={t} className="rounded-full bg-milk px-4 py-1.5 text-sm font-semibold text-pumpkin ring-1 ring-honey/60">
                {t}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-cocoa/65">{toppings.note}</p>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-cream p-6 ring-1 ring-bean/50">
            <p className="font-display text-lg font-bold text-cocoa">🍬 ระดับความหวาน</p>
            <p className="text-sm text-cocoa/70">ลูกค้าเลือกได้ตามชอบ</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sweetness.map((s) => (
                <span key={s} className="rounded-full bg-milk px-4 py-1.5 text-sm font-semibold text-sky-deep ring-1 ring-sky/40">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-leaf/15 p-6 ring-1 ring-leaf/40">
            <p className="font-display text-lg font-bold text-cocoa">{readyBags.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-cocoa/80">{readyBags.text}</p>
            <AdminPhoto
              scope="home-menu"
              slot="ready-bags"
              label="ถุงที่ตักไว้"
              emoji="🛍️"
              className="mt-3"
            />
          </div>
          <div className="flex flex-col justify-center rounded-3xl border-2 border-dashed border-blush bg-blush/15 p-6 text-center">
            <p className="font-display text-lg font-bold text-cocoa">🏠 ซื้อที่หน้าร้านเท่านั้น</p>
            <p className="text-sm text-cocoa/75">ร้านไม่มีบริการจัดส่ง Delivery</p>
          </div>
        </div>
      </div>
    </section>
  );
}
