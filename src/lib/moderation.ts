import type { OwnerReply, ShopReview } from "@/data/site";
import { readJSON, writeJSON, type User } from "./auth";
import { reviewScopes, type ReviewScope } from "./scopes";

// Reports from customers and admin actions (reply / delete / dismiss).
// Everything records WHO did it so the backend audit trail can be reproduced.
//   reports   pm.reports.<scope>   Report[]
//   audit log pm.admin.log         AdminAction[]

export const REPORT_REASONS = [
  { id: "abuse", label: "🚫 คำหยาบ / ไม่เหมาะสม" },
  { id: "spam", label: "📢 โฆษณา / สแปม" },
  { id: "offtopic", label: "❌ เนื้อหาไม่เกี่ยวข้องกับร้าน" },
  { id: "other", label: "⚠️ อื่น ๆ" },
] as const;
export type ReportReason = (typeof REPORT_REASONS)[number]["id"];
export const reasonLabel = (id: string) => REPORT_REASONS.find((r) => r.id === id)?.label ?? id;

export type Report = { reviewId: string; by: string; reason: ReportReason; note?: string; date: string };

export type AdminAction = {
  id: string;
  action: "reply" | "delete" | "dismiss";
  scope: string;
  reviewId: string;
  by: string; // admin account name
  date: string;
  reason?: string;
  // what the review said at the time (so a deleted review is still auditable)
  snapshot?: { user: string; rating: number; text: string };
};

export const reportsKey = (scope: string) => `pm.reports.${scope}`;
export const ADMIN_LOG_KEY = "pm.admin.log";

export const accountKey = (u: User) => `${u.provider}:${u.name}`;

export const readReports = (scope: string) => readJSON<Report[]>(reportsKey(scope)) ?? [];

export function addReport(scope: string, reviewId: string, user: User, reason: ReportReason, note?: string) {
  const cur = readReports(scope);
  const by = accountKey(user);
  if (cur.some((r) => r.reviewId === reviewId && r.by === by)) return cur; // one report per account
  const next = [...cur, { reviewId, by, reason, note, date: new Date().toISOString() }];
  writeJSON(reportsKey(scope), next);
  return next;
}

export const hasReported = (scope: string, reviewId: string, user: User | null) =>
  !!user && readReports(scope).some((r) => r.reviewId === reviewId && r.by === accountKey(user));

// ---- admin side ----
// Generic enough for both the home Review and ShopReview shapes
type AnyReview = Pick<ShopReview, "id" | "user" | "rating" | "text" | "date" | "likes"> & { reply?: OwnerReply };

export const readReviews = <T extends AnyReview>(scope: ReviewScope) => readJSON<T[]>(scope.reviewsKey) ?? (scope.seed as unknown as T[]);

export const readLog = () => readJSON<AdminAction[]>(ADMIN_LOG_KEY) ?? [];

function log(entry: Omit<AdminAction, "id" | "date">) {
  const next = [{ ...entry, id: `a${Date.now()}`, date: new Date().toISOString() }, ...readLog()];
  writeJSON(ADMIN_LOG_KEY, next);
}

export function replyToReview(scope: ReviewScope, reviewId: string, text: string, role: OwnerReply["role"], admin: User) {
  const reviews = readReviews(scope);
  const reply: OwnerReply = { text, by: admin.name, role, date: new Date().toISOString() };
  writeJSON(scope.reviewsKey, reviews.map((r) => (r.id === reviewId ? { ...r, reply } : r)));
  log({ action: "reply", scope: scope.scope, reviewId, by: admin.name });
}

export function removeReply(scope: ReviewScope, reviewId: string) {
  const reviews = readReviews(scope);
  writeJSON(
    scope.reviewsKey,
    reviews.map((r) => {
      if (r.id !== reviewId) return r;
      const { reply: _drop, ...rest } = r;
      void _drop;
      return rest;
    }),
  );
}

export function deleteReview(scope: ReviewScope, reviewId: string, reason: string, admin: User) {
  const reviews = readReviews(scope);
  const target = reviews.find((r) => r.id === reviewId);
  writeJSON(scope.reviewsKey, reviews.filter((r) => r.id !== reviewId));
  // its reports are resolved along with it
  writeJSON(reportsKey(scope.scope), readReports(scope.scope).filter((r) => r.reviewId !== reviewId));
  log({
    action: "delete",
    scope: scope.scope,
    reviewId,
    by: admin.name,
    reason,
    snapshot: target && { user: target.user, rating: target.rating, text: target.text },
  });
}

export function dismissReports(scope: ReviewScope, reviewId: string, admin: User) {
  writeJSON(reportsKey(scope.scope), readReports(scope.scope).filter((r) => r.reviewId !== reviewId));
  log({ action: "dismiss", scope: scope.scope, reviewId, by: admin.name });
}

// All reported reviews across the site, grouped per review, for the admin queue
export function readReportedQueue() {
  const out: { scope: ReviewScope; review: AnyReview; reports: Report[] }[] = [];
  for (const scope of reviewScopes) {
    const reports = readReports(scope.scope);
    if (!reports.length) continue;
    const reviews = readReviews(scope);
    const ids = [...new Set(reports.map((r) => r.reviewId))];
    for (const id of ids) {
      const review = reviews.find((r) => r.id === id);
      if (review) out.push({ scope, review, reports: reports.filter((r) => r.reviewId === id) });
    }
  }
  return out.sort((a, b) => b.reports.length - a.reports.length);
}
