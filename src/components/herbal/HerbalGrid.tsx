"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { HerbalDrink } from "@/data/site";

// Drink cards with a bigger photo; tapping a card with a real photo opens it
// large in the middle of the screen with name, price and benefit.
export function HerbalGrid({ drinks }: { drinks: HerbalDrink[] }) {
  const [open, setOpen] = useState<HerbalDrink | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {drinks.map((d) => {
          const inner = (
            <>
              <span className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-leaf/15 text-4xl ring-1 ring-bean/40 md:h-24 md:w-24">
                {d.image ? (
                  <Image src={d.image} alt={d.name} width={96} height={96} className="h-full w-full object-cover" />
                ) : (
                  d.emoji
                )}
              </span>
              <div className="min-w-0 flex-1 text-left">
                <p className="font-display font-bold text-cocoa md:text-lg">{d.name}</p>
                <p className="text-xs text-cocoa/65">{d.benefit}</p>
                {d.image && <p className="mt-1 text-[11px] font-semibold text-sky-deep">🔍 แตะเพื่อดูรูปใหญ่</p>}
              </div>
              <p className="font-display shrink-0 text-xl font-bold text-pumpkin">
                {d.price} <span className="text-sm font-semibold">บาท</span>
              </p>
            </>
          );
          const cls = "flex w-full min-w-0 items-center gap-4 rounded-3xl bg-milk p-4 ring-1 ring-bean/50 transition hover:-translate-y-0.5 hover:shadow-md md:p-5";
          return d.image ? (
            <button key={d.name} type="button" onClick={() => setOpen(d)} className={`${cls} cursor-zoom-in`}>
              {inner}
            </button>
          ) : (
            <div key={d.name} className={cls}>
              {inner}
            </div>
          );
        })}
      </div>

      {open && open.image && (
        <div
          role="dialog"
          aria-label={open.name}
          className="fixed inset-0 z-[70] grid place-items-center bg-cocoa/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <div className="w-full max-w-md overflow-hidden rounded-[2rem] bg-milk shadow-2xl ring-4 ring-sky/30" onClick={(e) => e.stopPropagation()}>
            {/* whole bottle, never cropped */}
            <div className="relative aspect-[3/4] max-h-[70vh] w-full bg-cream">
              <Image src={open.imageFull ?? open.image} alt={open.name} fill sizes="(min-width: 448px) 448px, 100vw" className="object-contain" priority />
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="ปิด"
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-milk/90 text-lg text-cocoa shadow ring-1 ring-bean"
              >
                ✕
              </button>
            </div>
            <div className="flex items-start justify-between gap-4 p-5">
              <div className="min-w-0">
                <p className="font-display text-2xl font-bold text-cocoa">
                  {open.emoji} {open.name}
                </p>
                <p className="mt-1 text-sm text-cocoa/70">{open.benefit}</p>
                {open.days && <p className="mt-1 text-xs text-cocoa/55">📅 {open.days}</p>}
              </div>
              <p className="font-display shrink-0 rounded-full bg-honey/30 px-4 py-2 text-2xl font-bold text-pumpkin ring-1 ring-honey/60">
                {open.price} <span className="text-sm font-semibold">บาท</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
