"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

const DISMISS_KEY = "pm.contact.dismissedAt";
const DISMISS_HOURS = 24; // after × don't pop the card back up for a day
const AUTO_MIN_MS = 8000; // on small screens the prompt card covers content — collapse it by itself

export function FloatingContact() {
  // "card" = prompt shown, "open" = channels shown, "min" = only the round button
  const [mode, setMode] = useState<"hidden" | "card" | "open" | "min">("hidden");

  useEffect(() => {
    const id = setTimeout(() => {
      let dismissed = false;
      try {
        const at = Number(localStorage.getItem(DISMISS_KEY) || 0);
        dismissed = Date.now() - at < DISMISS_HOURS * 3600_000;
      } catch {}
      setMode(dismissed ? "min" : "card");
    }, 0);
    return () => clearTimeout(id);
  }, []);

  // Auto-collapse the prompt (not the channel list) on phones; a tap keeps it open
  useEffect(() => {
    if (mode !== "card") return;
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    const id = setTimeout(() => setMode((m) => (m === "card" ? "min" : m)), AUTO_MIN_MS);
    return () => clearTimeout(id);
  }, [mode]);

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
    setMode("min");
  };

  if (mode === "hidden") return null;

  // below xl the SideRail is a bottom pill, so lift the button above it
  const pos = "fixed right-4 z-50 bottom-20 xl:bottom-6";

  if (mode === "min") {
    return (
      <button
        type="button"
        onClick={() => setMode("open")}
        aria-label="ทักร้าน"
        className={`${pos} grid h-14 w-14 place-items-center rounded-full bg-sky text-2xl text-white shadow-lg shadow-sky/40 transition hover:scale-105 xl:right-24`}
      >
        💬
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-label="ติดต่อร้าน"
      className={`${pos} w-[calc(100vw-2rem)] max-w-xs rounded-3xl bg-milk p-4 shadow-2xl ring-1 ring-bean/60 xl:right-24 md:max-w-sm md:p-5`}
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="ปิด"
        className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-cocoa/60 hover:bg-cream hover:text-cocoa"
      >
        ✕
      </button>

      {mode === "card" ? (
        <>
          <p className="font-display pr-8 text-lg font-bold text-cocoa">💬 มีคำถามเกี่ยวกับสินค้า?</p>
          <p className="mt-1 text-sm text-cocoa/75">ทักสอบถามร้านได้เลย</p>
          <button
            type="button"
            onClick={() => setMode("open")}
            className="mt-3 w-full rounded-full bg-sky py-3 font-semibold text-white shadow-md shadow-sky/30 transition hover:bg-sky-deep"
          >
            💬 ทักร้าน
          </button>
        </>
      ) : (
        <>
          <p className="font-display pr-8 text-lg font-bold text-cocoa">ช่องทางติดต่อร้าน</p>
          <div className="mt-3 space-y-2">
            <a
              href={`tel:${site.phone}`}
              className="flex items-center gap-3 rounded-2xl bg-cream px-4 py-3 ring-1 ring-bean/50 transition hover:bg-white"
            >
              <span className="text-2xl">📞</span>
              <span className="text-sm">
                <span className="block text-xs text-cocoa/60">โทรสอบถาม</span>
                <span className="font-display text-lg font-bold text-sky-deep">{site.phoneDisplay}</span>
              </span>
            </a>
            {site.chatUrl ? (
              <a
                href={site.chatUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl bg-cream px-4 py-3 ring-1 ring-bean/50 transition hover:bg-white"
              >
                <span className="text-2xl">💬</span>
                <span className="text-sm">
                  <span className="block text-xs text-cocoa/60">ติดต่อร้าน</span>
                  <span className="font-semibold text-sky-deep">{site.chatLabel}</span>
                </span>
              </a>
            ) : (
              <div className="flex items-center gap-3 rounded-2xl bg-cream/60 px-4 py-3 ring-1 ring-dashed ring-bean/50">
                <span className="text-2xl">💬</span>
                <span className="text-sm">
                  <span className="block text-xs text-cocoa/60">ติดต่อร้าน</span>
                  <span className="text-cocoa/50">ช่องทางแชต (เร็ว ๆ นี้)</span>
                </span>
              </div>
            )}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-cocoa/60">
            กรุณาติดต่อเกี่ยวกับสินค้าและการสั่งซื้อเท่านั้น งดโทรเล่นหรือก่อกวน
            หากมีการโทรเล่น ทางร้านขอสงวนสิทธิ์ในการบล็อกหมายเลข
          </p>
        </>
      )}
    </div>
  );
}
