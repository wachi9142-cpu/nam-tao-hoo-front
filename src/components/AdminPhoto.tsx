"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth";
import { fileToDataUrl } from "@/lib/image";
import { readPhotos, setPhoto } from "@/lib/shopContent";

type Props = {
  /** storage scope, e.g. "home-menu" */
  scope: string;
  /** slot id inside that scope, e.g. the menu category */
  slot: string;
  label: string;
  emoji?: string;
  /** static photo shipped with the site; an admin upload replaces it */
  fallback?: string;
  fallbackCaption?: string;
  /** hide the empty placeholder from customers (the admin still sees ＋) */
  hideWhenEmpty?: boolean;
  /** tailwind aspect class for the frame */
  aspect?: string;
  className?: string;
};

// One admin-fillable photo frame. Customers see the photo (or a "รอรูปจริง"
// placeholder); an admin gets ＋ เพิ่มภาพ / เปลี่ยน / ลบ right where it shows.
export function AdminPhoto({ scope, slot, label, emoji = "📷", fallback, fallbackCaption, hideWhenEmpty, aspect = "aspect-[4/3]", className = "" }: Props) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [src, setSrc] = useState<string | null>(fallback ?? null);
  const [caption, setCaption] = useState(fallbackCaption ?? "");
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      const p = readPhotos(scope)[slot];
      setSrc(p?.src ?? fallback ?? null);
      setCaption(p?.caption ?? fallbackCaption ?? "");
    }, 0);
    return () => clearTimeout(id);
  }, [scope, slot, fallback, fallbackCaption]);

  const onFile = async (f?: File) => {
    if (!f || !user) return;
    setBusy(true);
    try {
      const data = await fileToDataUrl(f, 1400, 0.8);
      const cap = (prompt("คำบรรยายรูป (เว้นว่างได้)", label) ?? label).trim() || label;
      setPhoto(scope, slot, { src: data, caption: cap, by: user.name, date: new Date().toISOString() });
      setSrc(data);
      setCaption(cap);
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const remove = () => {
    if (!confirm("ลบรูปนี้?")) return;
    setPhoto(scope, slot, null);
    setSrc(fallback ?? null);
    setCaption(fallbackCaption ?? "");
  };

  if (!src && !isAdmin && hideWhenEmpty) return null;

  return (
    <div className={className}>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0])} />

      {src ? (
        <figure className="overflow-hidden rounded-2xl ring-1 ring-bean/50">
          <button type="button" onClick={() => setOpen(true)} className={`block w-full cursor-zoom-in ${aspect}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={caption || label} className="h-full w-full object-cover" />
          </button>
          {isAdmin && (
            <figcaption className="flex items-center justify-between gap-2 bg-milk px-3 py-1.5 text-[11px] text-cocoa/70">
              <span className="truncate">{caption || label}</span>
              <span className="flex shrink-0 gap-1">
                <button type="button" onClick={() => fileRef.current?.click()} className="rounded-full bg-cream px-2 py-0.5 font-semibold ring-1 ring-bean/60 hover:bg-white">
                  เปลี่ยน
                </button>
                <button type="button" onClick={remove} className="rounded-full bg-cream px-2 py-0.5 font-semibold text-blush ring-1 ring-blush/60 hover:bg-white">
                  ลบ
                </button>
              </span>
            </figcaption>
          )}
        </figure>
      ) : isAdmin ? (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className={`grid w-full place-items-center rounded-2xl border-2 border-dashed border-sky/60 bg-sky/5 text-center text-xs text-sky-deep hover:bg-sky/10 ${aspect}`}
        >
          <span>
            <span className="block text-2xl">{busy ? "⏳" : "＋"}</span>
            เพิ่มภาพ{label}
          </span>
        </button>
      ) : (
        <div className={`grid w-full place-items-center rounded-2xl border-2 border-dashed border-bean/60 bg-milk/70 text-center text-xs text-cocoa/45 ${aspect}`}>
          <span>
            <span className="block text-2xl">{emoji}</span>
            {label}
            <br />
            <span className="text-[10px]">(รอรูปจริงจากร้าน)</span>
          </span>
        </div>
      )}

      {open && src && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-cocoa/90 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <button type="button" onClick={() => setOpen(false)} aria-label="ปิด" className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-milk/90 text-lg text-cocoa shadow ring-1 ring-bean">
            ✕
          </button>
          <div className="relative min-h-0 flex-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={caption || label} className="h-full w-full object-contain" />
          </div>
          <p className="bg-milk px-5 py-4 text-center text-sm text-cocoa">{caption || label}</p>
        </div>
      )}
    </div>
  );
}
