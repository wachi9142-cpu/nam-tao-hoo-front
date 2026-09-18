"use client";

import Link from "next/link";
import { useState } from "react";
import { seedReviews, type Review } from "@/data/site";
import { fmtDate, useAuth, useLocalList } from "@/lib/auth";
import { SectionTitle } from "./SectionTitle";

export const Stars = ({ n }: { n: number }) => (
  <span className="text-sm text-honey">
    {"★".repeat(n)}
    <span className="text-bean">{"★".repeat(5 - n)}</span>
  </span>
);

const avatarTones = ["bg-sky/70", "bg-blush/80", "bg-honey/80", "bg-leaf/60"];
export const Avatar = ({ name, i }: { name: string; i: number }) => (
  <span
    className={`font-display grid h-12 w-12 shrink-0 place-items-center rounded-full text-lg font-bold text-white ${avatarTones[i % avatarTones.length]}`}
  >
    {name.trim().charAt(0)}
  </span>
);

export function Reviews() {
  const { user } = useAuth();
  const [reviews, save] = useLocalList<Review>("pm.reviews", seedReviews);
  const [liked, setLiked] = useLocalList<string>("pm.liked", []);
  const [openComment, setOpenComment] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [newText, setNewText] = useState("");
  const [newRating, setNewRating] = useState(5);

  const toggleLike = (id: string) => {
    const has = liked.includes(id);
    setLiked(has ? liked.filter((x) => x !== id) : [...liked, id]);
    save(reviews.map((r) => (r.id === id ? { ...r, likes: r.likes + (has ? -1 : 1) } : r)));
  };

  const addComment = (id: string) => {
    if (!user || !draft.trim()) return;
    save(reviews.map((r) => (r.id === id ? { ...r, comments: [...r.comments, { user: user.name, text: draft.trim() }] } : r)));
    setDraft("");
    setOpenComment(null);
  };

  const addReview = () => {
    if (!user || !newText.trim()) return;
    save([
      { id: `r${Date.now()}`, user: user.name, avatar: user.avatar, rating: newRating, text: newText.trim(), date: new Date().toISOString(), likes: 0, comments: [] },
      ...reviews,
    ]);
    setNewText("");
  };

  return (
    <section id="reviews" className="mx-auto max-w-6xl px-4 py-20">
      <SectionTitle sub="เสียงจริงจากคนที่แวะมาดื่มน้ำเต้าหู้ของแม่ทุกเช้า">รีวิวจากลูกค้า 💙</SectionTitle>

      <div className="mx-auto mb-8 max-w-2xl rounded-3xl bg-milk p-5 ring-1 ring-bean/50">
        {user ? (
          <>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-cocoa">{user.avatar} {user.name} ให้คะแนน:</span>
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setNewRating(n)} className={`text-xl ${n <= newRating ? "text-honey" : "text-bean"}`} aria-label={`${n} ดาว`}>★</button>
              ))}
            </div>
            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="เล่าให้ฟังหน่อยว่าน้ำเต้าหู้เป็นยังไง…"
              className="mt-3 w-full rounded-2xl bg-cream p-3 text-sm outline-none ring-1 ring-bean/50 focus:ring-sky"
              rows={2}
            />
            <button type="button" onClick={addReview} className="mt-2 rounded-full bg-sky px-5 py-2 text-sm font-semibold text-white hover:bg-sky-deep">
              ส่งรีวิว
            </button>
          </>
        ) : (
          <p className="text-center text-sm text-cocoa/75">
            <Link href="/login" className="font-semibold text-sky-deep underline">เข้าสู่ระบบ</Link> เพื่อเขียนรีวิว ถูกใจ และแสดงความคิดเห็น
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((r, i) => (
          <article key={r.id} className="flex flex-col rounded-3xl bg-milk p-6 shadow-sm ring-1 ring-bean/50">
            <div className="flex items-center gap-3">
              <Avatar name={r.user} i={i} />
              <div>
                <p className="font-display font-bold text-cocoa">{r.user}</p>
                <Stars n={r.rating} />
              </div>
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-cocoa/85">“{r.text}”</blockquote>
            <p className="mt-3 text-xs text-cocoa/55">📅 {fmtDate(r.date)}</p>
            <div className="mt-4 flex gap-2 border-t border-bean/40 pt-3 text-xs">
              <button
                type="button"
                onClick={() => (user ? toggleLike(r.id) : undefined)}
                title={user ? "" : "เข้าสู่ระบบก่อน"}
                className={`rounded-full px-3 py-1.5 font-semibold ring-1 ring-bean/60 transition ${liked.includes(r.id) ? "bg-blush/40 text-cocoa" : "bg-cream hover:bg-white"}`}
              >
                ❤️ ถูกใจ {r.likes}
              </button>
              <button
                type="button"
                onClick={() => setOpenComment(openComment === r.id ? null : r.id)}
                className="rounded-full bg-cream px-3 py-1.5 font-semibold ring-1 ring-bean/60 hover:bg-white"
              >
                💬 แสดงความคิดเห็น {r.comments.length > 0 && r.comments.length}
              </button>
            </div>
            {(openComment === r.id || r.comments.length > 0) && (
              <div className="mt-3 space-y-2 text-xs">
                {r.comments.map((c, i) => (
                  <p key={i} className="rounded-xl bg-cream px-3 py-2"><span className="font-semibold text-sky-deep">{c.user}:</span> {c.text}</p>
                ))}
                {openComment === r.id && (
                  user ? (
                    <div className="flex gap-2">
                      <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addComment(r.id)} placeholder="เขียนความคิดเห็น…" className="flex-1 rounded-full bg-cream px-3 py-1.5 outline-none ring-1 ring-bean/50 focus:ring-sky" />
                      <button type="button" onClick={() => addComment(r.id)} className="rounded-full bg-sky px-3 text-white">ส่ง</button>
                    </div>
                  ) : (
                    <p className="text-cocoa/60"><Link href="/login" className="text-sky-deep underline">เข้าสู่ระบบ</Link> เพื่อแสดงความคิดเห็น</p>
                  )
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
