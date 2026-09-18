import Link from "next/link";

const sections = [
  {
    href: "/#menu",
    emoji: "🥛",
    title: "Pumpkin&Melone Soy Milk",
    desc: "น้ำเต้าหู้โฮมเมด ทำสดทุกเช้า มีน้ำเต้าหู้ งาดำ และน้ำฟักทอง",
    tone: "bg-sky/15 ring-sky/40",
    cta: "ดูร้านน้ำเต้าหู้",
  },
  {
    href: "/grocery",
    emoji: "🛒",
    title: "วิของชำ",
    desc: "ร้านของชำของครอบครัว มีสินค้าอุปโภคบริโภคและของใช้ต่าง ๆ",
    tone: "bg-honey/20 ring-honey/50",
    cta: "ไปดูร้านของชำ",
  },
  {
    href: "/herbal",
    emoji: "🌿",
    title: "สมุนไพรโฮมเมด",
    desc: "น้ำสมุนไพรที่แม่ทำเอง มีตามวัน / ตามวัตถุดิบที่หาได้",
    tone: "bg-leaf/15 ring-leaf/40",
    cta: "ดูน้ำสมุนไพร",
  },
];

export function Sections() {
  return (
    <section id="sections" className="mx-auto max-w-6xl px-4 pt-16">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-milk px-3 py-1 text-xs font-semibold text-pumpkin ring-1 ring-bean">
          🏠 ร้านของแม่ มี 3 อย่าง
        </span>
        <h2 className="font-display mt-3 text-3xl font-bold text-pumpkin md:text-4xl">อยากได้อะไร เลือกได้เลย</h2>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className={`group flex flex-col rounded-[2rem] p-7 ring-2 transition hover:-translate-y-1 hover:shadow-lg ${s.tone}`}
          >
            <span className="text-5xl drop-shadow">{s.emoji}</span>
            <h3 className="font-display mt-4 text-2xl font-bold text-cocoa">{s.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-cocoa/75">{s.desc}</p>
            <span className="mt-5 inline-flex items-center gap-1 font-semibold text-sky-deep">
              {s.cta} <span className="transition group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
