"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { OwnerReply, ShopReview } from "@/data/site";
import { fmtDate, fmtDateTime, useAuth } from "@/lib/auth";
import {
  deleteReview,
  dismissReports,
  readLog,
  readReportedQueue,
  readReports,
  readReviews,
  reasonLabel,
  removeReply,
  replyToReview,
  type AdminAction,
  type Report,
} from "@/lib/moderation";
import { reviewScopes, type ReviewScope } from "@/lib/scopes";

// Reasons an admin may delete for. Low stars / criticism is deliberately NOT one of them.
const DELETE_REASONS = [
  "คำหยาบ / ไม่เหมาะสม",
  "โฆษณา / สแปม",
  "โทร-ก่อกวนแล้วเข้ามาป่วนรีวิว",
  "เนื้อหาไม่เกี่ยวข้องกับร้าน",
  "ผิดกฎของเว็บไซต์",
];

type View = { kind: "shop"; scope: ReviewScope } | { kind: "reported" } | { kind: "log" };

// ---------- admin login (mock passcode) ----------
function AdminLogin() {
  const { loginAdmin } = useAuth();
  const [code, setCode] = useState("");
  const [err, setErr] = useState(false);
  return (
    <main className="grid min-h-[70vh] place-items-center px-4 py-16">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setErr(!loginAdmin(code));
        }}
        className="w-full max-w-sm rounded-[2rem] bg-milk p-8 text-center shadow-xl ring-4 ring-sky/30"
      >
        <div className="text-5xl">🛡️</div>
        <h1 className="font-display mt-2 text-2xl font-bold text-sky-deep">เข้าสู่ระบบแอดมิน</h1>
        <p className="mt-1 text-sm text-cocoa/70">สิทธิ์แอดมินแยกจากบัญชีลูกค้า — ใช้จัดการรีวิวทุกร้านในเว็บ</p>
        <input
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="รหัสแอดมิน"
          className="mt-5 w-full rounded-full bg-cream px-4 py-3 text-center outline-none ring-1 ring-bean/60 focus:ring-sky"
          autoFocus
        />
        {err && <p className="mt-2 text-sm font-semibold text-blush">รหัสไม่ถูกต้อง</p>}
        <button type="submit" className="mt-4 w-full rounded-full bg-sky py-3 font-semibold text-white shadow-md shadow-sky/30 hover:bg-sky-deep">
          เข้าสู่ระบบ
        </button>
        <p className="mt-4 text-[11px] text-cocoa/50">🐾 โหมดทดลอง — ระบบสิทธิ์จริงจะเชื่อมกับหลังบ้าน</p>
      </form>
    </main>
  );
}

// ---------- one review row with reply / delete ----------
function ReviewRow({
  scope,
  review,
  reports,
  onChange,
  adminName,
}: {
  scope: ReviewScope;
  review: ShopReview;
  reports: Report[];
  onChange: () => void;
  adminName: string;
}) {
  const { user } = useAuth();
  const [replyOpen, setReplyOpen] = useState(false);
  const [text, setText] = useState(review.reply?.text ?? "");
  const [role, setRole] = useState<OwnerReply["role"]>("owner");
  const [delOpen, setDelOpen] = useState(false);
  const [reason, setReason] = useState(DELETE_REASONS[0]);

  if (!user) return null;

  const sendReply = () => {
    if (!text.trim()) return;
    replyToReview(scope, review.id, text.trim(), role, user);
    setReplyOpen(false);
    onChange();
  };

  const del = () => {
    deleteReview(scope, review.id, reason, user);
    setDelOpen(false);
    onChange();
  };

  return (
    <article className={`rounded-3xl bg-milk p-5 ring-1 ${reports.length ? "ring-blush" : "ring-bean/50"}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-display font-bold text-cocoa">
            👤 {review.user} <span className="text-honey">{"★".repeat(review.rating)}</span>
            {review.checkedIn && <span className="ml-2 rounded-full bg-leaf/20 px-2 py-0.5 text-[10px] font-semibold text-leaf">📍 เช็กอิน</span>}
          </p>
          <p className="text-xs text-cocoa/55">
            📅 {fmtDate(review.date)} • <Link href={scope.href} className="underline">ดูหน้าร้าน</Link>
          </p>
        </div>
        {reports.length > 0 && (
          <span className="rounded-full bg-blush/30 px-3 py-1 text-xs font-semibold text-cocoa">🚨 ถูกรายงาน {reports.length} ครั้ง</span>
        )}
      </div>

      <p className="mt-3 text-sm text-cocoa/85">“{review.text}”</p>
      {review.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={review.image} alt="" className="mt-2 h-28 w-40 rounded-xl object-cover ring-1 ring-bean/40" />
      )}

      {reports.length > 0 && (
        <ul className="mt-3 space-y-1 rounded-2xl bg-blush/10 p-3 text-xs text-cocoa/80">
          {reports.map((r, i) => (
            <li key={i}>
              {reasonLabel(r.reason)}
              {r.note && <span className="text-cocoa/60"> — “{r.note}”</span>}
              <span className="text-cocoa/50">
                {" "}
                • โดย {r.by.split(":")[1]} • {fmtDateTime(r.date)}
              </span>
            </li>
          ))}
        </ul>
      )}

      {review.reply && !replyOpen && (
        <div className="mt-3 rounded-2xl bg-sky/10 p-3 text-sm ring-1 ring-sky/30">
          <p className="font-semibold text-sky-deep">
            🛡️ {review.reply.role === "owner" ? "เจ้าของร้าน" : "แอดมินร้าน"}
            <span className="ml-2 text-[11px] font-normal text-cocoa/55">
              ตอบโดย {review.reply.by} • {fmtDateTime(review.reply.date)}
            </span>
          </p>
          <p className="mt-1 text-cocoa/85">“{review.reply.text}”</p>
        </div>
      )}

      {replyOpen && (
        <div className="mt-3 rounded-2xl bg-cream p-3 ring-1 ring-bean/50">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold">ตอบในนาม:</span>
            {(["owner", "admin"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`rounded-full px-3 py-1 font-semibold ring-1 ring-bean/60 ${role === r ? "bg-sky text-white" : "bg-milk"}`}
              >
                🛡️ {r === "owner" ? "เจ้าของร้าน" : "แอดมินร้าน"}
              </button>
            ))}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="เช่น ขอบคุณที่แวะมานะคะ ❤️ …"
            className="mt-2 w-full rounded-2xl bg-milk p-3 text-sm outline-none ring-1 ring-bean/50 focus:ring-sky"
          />
          <div className="mt-2 flex justify-end gap-2 text-xs">
            <button type="button" onClick={() => setReplyOpen(false)} className="rounded-full px-3 py-1.5 font-semibold text-cocoa/70 hover:bg-milk">
              ยกเลิก
            </button>
            <button type="button" onClick={sendReply} disabled={!text.trim()} className="rounded-full bg-sky px-4 py-1.5 font-semibold text-white disabled:opacity-50">
              ส่งคำตอบ
            </button>
          </div>
        </div>
      )}

      {delOpen && (
        <div className="mt-3 rounded-2xl bg-blush/15 p-3 ring-1 ring-blush">
          <p className="text-sm font-semibold text-cocoa">🗑️ ลบรีวิวนี้เพราะ…</p>
          <select value={reason} onChange={(e) => setReason(e.target.value)} className="mt-2 w-full rounded-xl bg-milk px-3 py-2 text-sm ring-1 ring-bean/50">
            {DELETE_REASONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <p className="mt-2 text-[11px] leading-relaxed text-cocoa/65">
            ⚠️ ไม่ควรลบเพียงเพราะให้ดาวน้อยหรือวิจารณ์ร้าน — ตอบกลับอย่างสุภาพแทน เพื่อให้รีวิวน่าเชื่อถือ
            การลบจะถูกบันทึกว่า <strong>{adminName}</strong> เป็นผู้ลบ
          </p>
          <div className="mt-2 flex justify-end gap-2 text-xs">
            <button type="button" onClick={() => setDelOpen(false)} className="rounded-full px-3 py-1.5 font-semibold text-cocoa/70 hover:bg-milk">
              ยกเลิก
            </button>
            <button type="button" onClick={del} className="rounded-full bg-blush px-4 py-1.5 font-semibold text-white">
              ยืนยันลบ
            </button>
          </div>
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-2 border-t border-bean/40 pt-3 text-xs">
        <button type="button" onClick={() => setReplyOpen((v) => !v)} className="rounded-full bg-sky/15 px-3 py-1.5 font-semibold text-sky-deep ring-1 ring-sky/40 hover:bg-sky/25">
          💬 {review.reply ? "แก้คำตอบ" : "ตอบกลับรีวิว"}
        </button>
        {review.reply && (
          <button
            type="button"
            onClick={() => {
              removeReply(scope, review.id);
              setText("");
              onChange();
            }}
            className="rounded-full bg-cream px-3 py-1.5 font-semibold ring-1 ring-bean/60 hover:bg-white"
          >
            ลบคำตอบ
          </button>
        )}
        {reports.length > 0 && (
          <button
            type="button"
            onClick={() => {
              dismissReports(scope, review.id, user);
              onChange();
            }}
            className="rounded-full bg-leaf/15 px-3 py-1.5 font-semibold text-leaf ring-1 ring-leaf/40 hover:bg-leaf/25"
          >
            ✅ รีวิวปกติ ยกเลิกรายงาน
          </button>
        )}
        <button type="button" onClick={() => setDelOpen((v) => !v)} className="ml-auto rounded-full bg-cream px-3 py-1.5 font-semibold text-blush ring-1 ring-blush/60 hover:bg-white">
          🗑️ ลบรีวิว
        </button>
      </div>
    </article>
  );
}

// ---------- dashboard ----------
export default function AdminPage() {
  const { user, ready, logout } = useAuth();
  const [view, setView] = useState<View>({ kind: "reported" });
  const [tick, setTick] = useState(0);
  const refresh = useCallback(() => setTick((t) => t + 1), []);

  // read from storage on the client only
  const [data, setData] = useState<{
    queue: ReturnType<typeof readReportedQueue>;
    counts: Record<string, number>;
    reviews: ShopReview[];
    reports: Report[];
    log: AdminAction[];
  } | null>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      const queue = readReportedQueue();
      const counts: Record<string, number> = {};
      for (const s of reviewScopes) counts[s.scope] = readReviews(s).length;
      const scope = view.kind === "shop" ? view.scope : null;
      setData({
        queue,
        counts,
        reviews: scope ? readReviews<ShopReview>(scope) : [],
        reports: scope ? readReports(scope.scope) : [],
        log: readLog(),
      });
    }, 0);
    return () => clearTimeout(id);
  }, [view, tick]);

  if (!ready) return null;
  if (!user || user.role !== "admin") return <AdminLogin />;
  if (!data) return null;

  const reportedCount = data.queue.length;
  const navBtn = (active: boolean) =>
    `flex w-full items-center justify-between gap-2 rounded-2xl px-3 py-2.5 text-left text-sm font-semibold transition ${active ? "bg-sky text-white" : "bg-milk ring-1 ring-bean/50 hover:bg-white"}`;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[2rem] bg-milk p-5 ring-1 ring-bean/50">
        <div>
          <h1 className="font-display text-2xl font-bold text-sky-deep">🛡️ Admin Dashboard</h1>
          <p className="text-sm text-cocoa/65">จัดการรีวิวทุกร้านในเว็บ • เข้าสู่ระบบเป็น {user.avatar} {user.name}</p>
        </div>
        <button type="button" onClick={logout} className="rounded-full bg-cream px-4 py-2 text-sm font-semibold ring-1 ring-bean hover:bg-white">
          🚪 ออกจากระบบแอดมิน
        </button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[16rem_1fr]">
        <nav className="space-y-2">
          <button type="button" onClick={() => setView({ kind: "reported" })} className={navBtn(view.kind === "reported")}>
            <span>🚨 รีวิวที่ถูกรายงาน</span>
            <span className={`rounded-full px-2 py-0.5 text-xs ${reportedCount ? "bg-blush text-white" : "bg-cream text-cocoa/60"}`}>{reportedCount}</span>
          </button>
          <p className="px-3 pt-2 text-xs font-semibold text-cocoa/50">ร้านค้า</p>
          {reviewScopes.map((s) => (
            <button key={s.scope} type="button" onClick={() => setView({ kind: "shop", scope: s })} className={navBtn(view.kind === "shop" && view.scope.scope === s.scope)}>
              <span className="truncate">
                {s.emoji} {s.name}
              </span>
              <span className="rounded-full bg-cream px-2 py-0.5 text-xs text-cocoa/60">{data.counts[s.scope]}</span>
            </button>
          ))}
          <p className="px-3 pt-2 text-xs font-semibold text-cocoa/50">ระบบ</p>
          <button type="button" onClick={() => setView({ kind: "log" })} className={navBtn(view.kind === "log")}>
            <span>📋 ประวัติการจัดการ</span>
            <span className="rounded-full bg-cream px-2 py-0.5 text-xs text-cocoa/60">{data.log.length}</span>
          </button>
        </nav>

        <section className="space-y-4">
          {view.kind === "reported" && (
            <>
              <h2 className="font-display text-xl font-bold text-pumpkin">🚨 รีวิวที่ต้องตรวจสอบ</h2>
              {data.queue.length === 0 ? (
                <p className="rounded-2xl bg-cream p-6 text-center text-sm text-cocoa/65">ไม่มีรีวิวที่ถูกรายงาน 🎉</p>
              ) : (
                data.queue.map(({ scope, review, reports }) => (
                  <div key={`${scope.scope}-${review.id}`}>
                    <p className="mb-1 text-xs font-semibold text-cocoa/60">
                      {scope.emoji} {scope.name}
                    </p>
                    <ReviewRow scope={scope} review={review as ShopReview} reports={reports} onChange={refresh} adminName={user.name} />
                  </div>
                ))
              )}
            </>
          )}

          {view.kind === "shop" && (
            <>
              <h2 className="font-display text-xl font-bold text-pumpkin">
                {view.scope.emoji} รีวิว{view.scope.name} <span className="text-sm font-normal text-cocoa/60">({data.reviews.length} รีวิว)</span>
              </h2>
              {data.reviews.length === 0 ? (
                <p className="rounded-2xl bg-cream p-6 text-center text-sm text-cocoa/65">ยังไม่มีรีวิว</p>
              ) : (
                data.reviews.map((r) => (
                  <ReviewRow key={r.id} scope={view.scope} review={r} reports={data.reports.filter((x) => x.reviewId === r.id)} onChange={refresh} adminName={user.name} />
                ))
              )}
            </>
          )}

          {view.kind === "log" && (
            <>
              <h2 className="font-display text-xl font-bold text-pumpkin">📋 ประวัติการจัดการ</h2>
              <p className="text-xs text-cocoa/60">บันทึกว่าใครตอบ / ลบ / ยกเลิกรายงานรีวิวไหน เมื่อไร</p>
              {data.log.length === 0 ? (
                <p className="rounded-2xl bg-cream p-6 text-center text-sm text-cocoa/65">ยังไม่มีประวัติ</p>
              ) : (
                <ul className="space-y-2">
                  {data.log.map((a) => {
                    const scope = reviewScopes.find((s) => s.scope === a.scope);
                    const label = { reply: "💬 ตอบกลับรีวิว", delete: "🗑️ ลบรีวิว", dismiss: "✅ ยกเลิกรายงาน" }[a.action];
                    return (
                      <li key={a.id} className="rounded-2xl bg-milk p-4 text-sm ring-1 ring-bean/50">
                        <p className="font-semibold text-cocoa">
                          {label} <span className="text-cocoa/60">• {scope?.emoji} {scope?.name}</span>
                        </p>
                        <p className="text-xs text-cocoa/60">
                          โดย 🛡️ {a.by} • {fmtDateTime(a.date)}
                          {a.reason && <> • เหตุผล: {a.reason}</>}
                        </p>
                        {a.snapshot && (
                          <p className="mt-1 text-xs text-cocoa/70">
                            รีวิวที่ลบ: {a.snapshot.user} {"★".repeat(a.snapshot.rating)} “{a.snapshot.text}”
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
