"use client";

import { useEffect, useState } from "react";
import type { ShopReview } from "@/data/site";
import type { User } from "./auth";
import { reviewScopes, type ReviewScope } from "./scopes";

// One member account → activity across every shop on the site.
// Reads each scope's localStorage keys once (same keys the review components write).
export type MyReview = ShopReview & { shop: ReviewScope; likeCount: number };
export type MyLike = {
  shop: ReviewScope;
  review: ShopReview;
  likeCount: number;
};
export type MyCheckIn = { shop: ReviewScope; date: string; message?: string };

export type Activity = {
  reviews: MyReview[];
  likes: MyLike[];
  checkins: MyCheckIn[];
};

const empty: Activity = { reviews: [], likes: [], checkins: [] };

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

const byDateDesc = (a: { date: string }, b: { date: string }) =>
  b.date.localeCompare(a.date);

export function useMyActivity(user: User | null): Activity {
  const [activity, setActivity] = useState<Activity>(empty);

  useEffect(() => {
    // localStorage is only available after hydration, so gather in a deferred callback
    // (same pattern as useLocalList in lib/auth)
    const id = setTimeout(() => setActivity(user ? gather(user) : empty), 0);
    return () => clearTimeout(id);
  }, [user]);

  return activity;
}

function gather(user: User): Activity {
  const me = `${user.provider}:${user.name}`;
  const out: Activity = { reviews: [], likes: [], checkins: [] };

  for (const shop of reviewScopes) {
    const reviews = read<ShopReview[]>(shop.reviewsKey, shop.seed);
    const likeMap =
      read<Record<string, string[]>[]>(`pm.likes.${shop.scope}`, [{}])[0] ?? {};
    const likeCount = (r: ShopReview) => r.likes + (likeMap[r.id]?.length ?? 0);

    for (const r of reviews) {
      if (r.user === user.name)
        out.reviews.push({ ...r, shop, likeCount: likeCount(r) });
      if (likeMap[r.id]?.includes(me))
        out.likes.push({ shop, review: r, likeCount: likeCount(r) });
    }

    // home check-ins carry a message; shop check-ins are {user, date}
    const checkins = read<{ user: string; date: string; message?: string }[]>(
      shop.checkinsKey,
      [],
    );
    for (const c of checkins)
      if (c.user === user.name)
        out.checkins.push({ shop, date: c.date, message: c.message });
  }

  out.reviews.sort(byDateDesc);
  out.checkins.sort(byDateDesc);
  return out;
}
