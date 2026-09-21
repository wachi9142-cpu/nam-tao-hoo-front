"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { OwnerReply } from "@/data/site";
import { fmtDate, useAuth } from "@/lib/auth";
import { addReport, hasReported, REPORT_REASONS, type ReportReason } from "@/lib/moderation";
import { useLoginHref } from "@/components/LoginRequired";

// "⋯ → รายงานรีวิว" with a reason picker. One report per account per review.
export function ReportMenu({ scope, reviewId, onReported }: { scope: string; reviewId: string; onReported?: () => void }) {
  const { user } = useAuth();
  const loginHref = useLoginHref();
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [note, setNote] = useState("");
  const [reason, setReason] = useState<ReportReason | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setTimeout(() => setDone(hasReported(scope, reviewId, user)), 0);
    return () => clearTimeout(id);
  }, [scope, reviewId, user]);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const submit = () => {
    if (!user || !reason) return;
    addReport(scope, reviewId, user, reason, note.trim() || undefined);
    setDone(true);
    setOpen(false);
    onReported?.();
  };

  if (done) {
    return <span className="shrink-0 rounded-full bg-cream px-2 py-1 text-[11px] text-cocoa/60">🚩 รายงานแล้ว</span>;
  }

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="ตัวเลือกรีวิว"
        aria-expanded={open}
        className="rounded-full px-2 py-1 text-lg leading-none text-cocoa/50 hover:bg-cream hover:text-cocoa"
      >
        ⋯
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-1 w-64 rounded-2xl bg-milk p-3 text-left text-xs shadow-xl ring-1 ring-bean/60">
          <p className="font-display text-sm font-bold text-cocoa">🚩 รายงานรีวิว</p>
          {user ? (
            <>
              <p className="mt-1 text-cocoa/60">เลือกเหตุผล</p>
              <ul className="mt-1 space-y-1">
                {REPORT_REASONS.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => setReason(r.id)}
                      className={`w-full rounded-xl px-3 py-2 text-left transition ${reason === r.id ? "bg-sky text-white" : "bg-cream hover:bg-white"}`}
                    >
                      {r.label}
                    </button>
                  </li>
                ))}
              </ul>
              {reason === "other" && (
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="บอกเพิ่มเติมสั้น ๆ…"
                  className="mt-2 w-full rounded-xl bg-cream px-3 py-2 outline-none ring-1 ring-bean/50 focus:ring-sky"
                />
              )}
              <div className="mt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setOpen(false)} className="rounded-full px-3 py-1.5 font-semibold text-cocoa/70 hover:bg-cream">
                  ยกเลิก
                </button>
                <button
                  type="button"
                  onClick={submit}
                  disabled={!reason}
                  className="rounded-full bg-blush px-3 py-1.5 font-semibold text-white disabled:opacity-50"
                >
                  ส่งรายงาน
                </button>
              </div>
              <p className="mt-2 text-[10px] text-cocoa/50">รีวิวที่ถูกรายงานจะถูกส่งให้แอดมินตรวจสอบ</p>
            </>
          ) : (
            <p className="mt-2 text-cocoa/70">
              <Link href={loginHref} className="font-semibold text-sky-deep underline">เข้าสู่ระบบ</Link> เพื่อรายงานรีวิว
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Reply from the shop shown under a customer review
export function OwnerReplyBox({ reply }: { reply?: OwnerReply }) {
  if (!reply) return null;
  const label = reply.role === "owner" ? "เจ้าของร้าน" : "แอดมินร้าน";
  return (
    <div className="mt-3 rounded-2xl bg-sky/10 p-3 text-sm ring-1 ring-sky/30">
      <p className="flex flex-wrap items-center gap-2 font-semibold text-sky-deep">
        🛡️ {label}
        <span className="rounded-full bg-sky/20 px-2 py-0.5 text-[10px] font-semibold">ตอบกลับอย่างเป็นทางการ</span>
        <span className="ml-auto text-[11px] font-normal text-cocoa/55">📅 {fmtDate(reply.date)}</span>
      </p>
      <p className="mt-1 leading-relaxed text-cocoa/85">“{reply.text}”</p>
    </div>
  );
}
