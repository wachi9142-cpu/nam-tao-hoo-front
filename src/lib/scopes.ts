import { nearbyShops, seedReviews, type ShopReview } from "@/data/site";

// Every place on the site that has reviews / likes / check-ins shares ONE member
// account. This registry lists those places so the profile page can gather a
// user's activity across all of them, and so storage keys stay consistent:
//   reviews   pm.shop.<scope>.reviews   (home keeps its original key)
//   likes     pm.likes.<scope>
//   check-ins pm.shop.<scope>.checkins  (home: pm.checkins)
export type ReviewScope = {
  scope: string;
  name: string;
  emoji: string;
  href: string; // where the review section lives
  reviewsKey: string;
  checkinsKey: string;
  seed: ShopReview[];
};

export const reviewsKey = (scope: string) => `pm.shop.${scope}.reviews`;
export const checkinsKey = (scope: string) => `pm.shop.${scope}.checkins`;

export const groceryScope: ReviewScope = {
  scope: "grocery",
  name: "วิของชำ",
  emoji: "🛒",
  href: "/grocery#reviews",
  reviewsKey: reviewsKey("grocery"),
  checkinsKey: checkinsKey("grocery"),
  seed: [],
};

export const reviewScopes: ReviewScope[] = [
  {
    scope: "home",
    name: "Pumpkin&Melone Soy Milk",
    emoji: "🥛",
    href: "/#reviews",
    reviewsKey: "pm.reviews",
    checkinsKey: "pm.checkins",
    seed: seedReviews,
  },
  groceryScope,
  ...nearbyShops.map<ReviewScope>((s) => ({
    scope: s.slug,
    name: s.name,
    emoji: s.emoji,
    href: `/nearby/${s.slug}#reviews`,
    reviewsKey: reviewsKey(s.slug),
    checkinsKey: checkinsKey(s.slug),
    seed: s.seedReviews ?? [],
  })),
];
