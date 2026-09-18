import Image from "next/image";
import type { CSSProperties } from "react";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-sky/20">
      <span className="animate-float absolute left-6 top-16 text-3xl opacity-60" style={{ "--r": "-15deg" } as CSSProperties}>
        🐾
      </span>
      <span className="animate-float absolute right-10 top-24 text-2xl opacity-70" style={{ animationDelay: "1s" }}>
        💧
      </span>
      <span
        className="animate-float absolute bottom-28 left-1/3 text-2xl opacity-50"
        style={{ animationDelay: "2s", "--r": "20deg" } as CSSProperties}
      >
        🌿
      </span>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-24 pt-12 md:grid-cols-2 md:pt-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-milk px-3 py-1 text-xs font-semibold text-pumpkin ring-1 ring-bean">
            🌅 สดใหม่ทุกเช้า ตั้งแต่ตี 3–4
          </span>
          <h1 className="font-display mt-4 text-4xl font-bold leading-tight text-sky-deep md:text-6xl">
            Pumpkin&amp;Melone
            <span className="block text-pumpkin">Soy Milk</span>
          </h1>
          <p className="font-display mt-4 text-lg font-semibold text-cocoa">
            น้ำเต้าหู้บ้าน ๆ ที่ทำด้วยความตั้งใจจากแม่ 🥛💛
          </p>
          <p className="mt-3 max-w-md leading-relaxed text-cocoa/80">
            แม่ตื่นตั้งแต่ตี 3–4 ของทุกวัน เพื่อเตรียมน้ำเต้าหู้สดใหม่สำหรับขายตั้งแต่ตี 5
            ตั้งใจทำทีละวัน ให้ได้รสชาติหอมอร่อยแบบเรียบง่ายเหมือนทำให้คนในครอบครัวกิน
          </p>
          <p className="mt-3 text-sm text-cocoa/75">
            ร้านของแม่มี 🥛 น้ำเต้าหู้โฮมเมด • 🛒 วิของชำ • 🌿 น้ำสมุนไพรโฮมเมด
          </p>
          <p className="mt-2 text-sm font-semibold text-leaf">🌱 เปิดทุกวัน ยกเว้นวันอาทิตย์</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#sections"
              className="rounded-full bg-sky px-6 py-3 font-semibold text-white shadow-lg shadow-sky/30 transition hover:bg-sky-deep"
            >
              🏠 เลือกส่วนที่อยากดู
            </a>
            <a
              href="#location"
              className="rounded-full bg-milk px-6 py-3 font-semibold text-cocoa ring-1 ring-bean transition hover:bg-white"
            >
              📍 ดูแผนที่ร้าน
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute inset-0 -rotate-6 rounded-[2.5rem] bg-bean/50" />
          <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-milk shadow-xl ring-4 ring-sky/40">
            <Image
              src="/images/logo.webp"
              alt="Pumpkin&Melone Soy Milk — น้ำเต้าหู้บ้าน ๆ จากความตั้งใจของแม่"
              fill
              priority
              sizes="(min-width: 768px) 384px, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <svg className="absolute bottom-0 left-0 w-full text-cream" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
        <path fill="currentColor" d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" />
      </svg>
      <span className="sr-only">{site.tagline}</span>
    </section>
  );
}
