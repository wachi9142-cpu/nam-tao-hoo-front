"use client";

import { useCallback, useMemo } from "react";
import { useAuth, useLocalList, type User } from "./auth";

// Likes are stored as "who liked what" per scope (home reviews, each nearby shop…):
//   { [reviewId]: ["line:ข้าวฟ่าง", "google:Kaofang", …] }
// so the count is derived from real likers, one like per account, and an account
// that logs out and back in still owns its likes. Kept in localStorage until the
// backend exposes a likes API — the shape maps 1:1 onto a likes table.
type LikeMap = Record<string, string[]>;

const accountKey = (u: User) => `${u.provider}:${u.name}`;

export function useLikes(scope: string) {
  const { user } = useAuth();
  const [maps, save] = useLocalList<LikeMap>(`pm.likes.${scope}`, [{}]);
  const map = useMemo(() => maps[0] ?? {}, [maps]);

  // base = likes that existed before this system (seed data); new reviews pass 0
  const count = useCallback((id: string, base = 0) => base + (map[id]?.length ?? 0), [map]);

  const liked = useCallback((id: string) => !!user && (map[id] ?? []).includes(accountKey(user)), [map, user]);

  const toggle = useCallback(
    (id: string) => {
      if (!user) return;
      const me = accountKey(user);
      const cur = map[id] ?? [];
      const next = cur.includes(me) ? cur.filter((k) => k !== me) : [...cur, me];
      save([{ ...map, [id]: next }]);
    },
    [map, save, user],
  );

  return { count, liked, toggle, canLike: !!user };
}

export function LikeButton({
  id,
  base = 0,
  likes,
  label = "ถูกใจ",
}: {
  id: string;
  base?: number;
  likes: ReturnType<typeof useLikes>;
  label?: string;
}) {
  const on = likes.liked(id);
  const n = likes.count(id, base);
  return (
    <button
      type="button"
      onClick={() => likes.toggle(id)}
      disabled={!likes.canLike}
      aria-pressed={on}
      title={likes.canLike ? (on ? "ยกเลิกถูกใจ" : "ถูกใจ") : "เข้าสู่ระบบก่อน"}
      className={`rounded-full px-3 py-1.5 font-semibold ring-1 transition disabled:cursor-not-allowed ${
        on ? "bg-blush/40 text-cocoa ring-blush" : "bg-cream ring-bean/60 hover:bg-white"
      }`}
    >
      <span className={on ? "text-[#e0475f]" : "text-cocoa/60"}>{on ? "❤️" : "♡"}</span> {n} {label}
    </button>
  );
}
