"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

// Mock auth: stored in localStorage until the backend OAuth flow exists.
export type Provider = "line" | "facebook" | "instagram" | "google";
export type User = { name: string; avatar: string; provider: Provider };

type AuthCtx = {
  user: User | null;
  ready: boolean;
  login: (provider: Provider) => void;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);
const KEY = "pm.user";

const mockNames: Record<Provider, string> = {
  line: "ข้าวฟ่าง",
  facebook: "Fang K.",
  instagram: "fang.soymilk",
  google: "Kaofang",
};

function readJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJSON(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // { user, ready } as one state so hydration from storage is a single update
  const [state, setState] = useState<{ user: User | null; ready: boolean }>({ user: null, ready: false });

  useEffect(() => {
    // Runs after hydration so server and first client render match
    const id = setTimeout(() => setState({ user: readJSON<User>(KEY), ready: true }), 0);
    return () => clearTimeout(id);
  }, []);

  const login = useCallback((provider: Provider) => {
    const u: User = { name: mockNames[provider], avatar: "🐱", provider };
    writeJSON(KEY, u);
    setState({ user: u, ready: true });
  }, []);

  const logout = useCallback(() => {
    writeJSON(KEY, null);
    setState({ user: null, ready: true });
  }, []);

  return <Ctx.Provider value={{ user: state.user, ready: state.ready, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

// Client-side persisted list (reviews, photos, check-ins) seeded with defaults
export function useLocalList<T>(key: string, seed: T[]) {
  const [items, setItems] = useState<T[]>(seed);

  useEffect(() => {
    const id = setTimeout(() => {
      const stored = readJSON<T[]>(key);
      if (stored) setItems(stored);
    }, 0);
    return () => clearTimeout(id);
  }, [key]);

  const save = useCallback(
    (next: T[]) => {
      setItems(next);
      writeJSON(key, next);
    },
    [key],
  );

  return [items, save] as const;
}

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" });

export const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString("th-TH", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
