// Admin-managed content per shop: photos in named slots and "today's menu".
// Same storage shape for every shop, so the admin edits any shop the same way.
//   photos   pm.shop.<scope>.photos   Record<slotId, ShopPhoto>
//   today    pm.shop.<scope>.today    TodayMenu
import { readJSON, writeJSON } from "./auth";

export type ShopPhoto = { src: string; caption: string; by: string; date: string };
export type TodayMenu = { date: string; items: string[]; note?: string; by: string };

export const photosKey = (scope: string) => `pm.shop.${scope}.photos`;
export const todayKey = (scope: string) => `pm.shop.${scope}.today`;

export const readPhotos = (scope: string) => readJSON<Record<string, ShopPhoto>>(photosKey(scope)) ?? {};

export function setPhoto(scope: string, slot: string, photo: ShopPhoto | null) {
  const cur = readPhotos(scope);
  if (photo) cur[slot] = photo;
  else delete cur[slot];
  writeJSON(photosKey(scope), cur);
  return { ...cur };
}

export const readToday = (scope: string) => readJSON<TodayMenu>(todayKey(scope));

export function setToday(scope: string, menu: TodayMenu | null) {
  writeJSON(todayKey(scope), menu);
  return menu;
}

// Bangkok calendar day, so "today's menu" expires at midnight local time
export const bangkokDay = (d = new Date()) =>
  new Date(d.toLocaleString("en-US", { timeZone: "Asia/Bangkok" })).toISOString().slice(0, 10);
