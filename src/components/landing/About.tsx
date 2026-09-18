import Image from "next/image";
import type { CSSProperties } from "react";

const stats = [
  { value: "ตี 3–4", label: "แม่เริ่มเตรียมทุกวัน" },
  { value: "4.9★", label: "คะแนนรีวิวเฉลี่ย" },
  { value: "จ–ส", label: "เปิดทุกวัน ยกเว้นอาทิตย์" },
];


export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20">
      <div className="relative grid items-center gap-10 overflow-hidden rounded-[2.5rem] bg-milk p-8 shadow-lg ring-1 ring-bean/50 md:grid-cols-[1fr_1.6fr_1fr] md:p-12">
        <span className="animate-float absolute left-6 top-6 text-2xl opacity-60">🥛</span>
        <span className="animate-float absolute bottom-6 left-10 text-2xl opacity-60" style={{ animationDelay: "1.5s", "--r": "-10deg" } as CSSProperties}>🫘</span>

        {/* left: illustration */}
        <div className="relative mx-auto grid h-56 w-56 place-items-center">
          <div className="absolute inset-0 rounded-full bg-sky/25 blur-2xl" />
          <div className="relative text-8xl drop-shadow-lg">🥛</div>
          <div className="absolute -bottom-2 left-1/2 h-6 w-40 -translate-x-1/2 rounded-full bg-bean/50 blur-md" />
        </div>

        {/* center: text */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-sky/15 px-3 py-1 text-xs font-semibold text-sky-deep">
            เกี่ยวกับร้าน 💙
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold text-sky-deep md:text-4xl">
            รู้จักร้าน Pumpkin&amp;Melone
          </h2>
          <p className="font-display mt-3 text-lg font-semibold text-cocoa">
            น้ำเต้าหู้บ้าน ๆ ที่ทำด้วยความตั้งใจจากแม่ 🥛💛
          </p>
          <p className="mt-2 leading-relaxed text-cocoa/80">
            แม่ตื่นตั้งแต่ตี 3–4 ของทุกวัน เพื่อเตรียมน้ำเต้าหู้สดใหม่สำหรับขายตั้งแต่เช้า
            ตั้งใจทำทีละวัน ให้ได้รสชาติหอมอร่อยแบบเรียบง่ายเหมือนทำให้คนในครอบครัวกิน
          </p>
          <p className="mt-3 leading-relaxed text-cocoa/80">
            <strong className="text-pumpkin">Pumpkin&amp;Melone Soy Milk</strong> เปิดขายทุกวัน ยกเว้นวันอาทิตย์ 🌱
            <br />
            เพราะเราเชื่อว่า…ความอร่อยที่ดี เริ่มต้นจากความตั้งใจในทุกเช้า
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-cream px-5 py-3 ring-1 ring-bean/50">
                <p className="font-display text-xl font-bold text-cocoa">{s.value}</p>
                <p className="text-xs text-cocoa/65">{s.label}</p>
              </div>
            ))}
          </div>

          <a href="#story" className="mt-6 inline-block rounded-full bg-sky px-6 py-3 font-semibold text-white shadow-md shadow-sky/30 transition hover:bg-sky-deep">
            📖 อ่านเพิ่มเติม
          </a>
        </div>

        {/* right: logo */}
        <div className="mx-auto">
          <div className="grid h-56 w-56 place-items-center overflow-hidden rounded-full bg-cream shadow-xl ring-8 ring-sky/30 md:h-64 md:w-64">
            <Image src="/images/logo.webp" alt="โลโก้ Pumpkin&Melone Soy Milk" width={512} height={512} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
