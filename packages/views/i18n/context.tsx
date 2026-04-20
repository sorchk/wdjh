"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { InviteDict, WorkspaceDict, ProjectsDict, InboxDict } from "./types";
import { en } from "./en";
import { zh } from "./zh";

type Locale = "en" | "zh";

const COOKIE_NAME = "multica-locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type LocaleContextValue = {
  locale: Locale;
  t: InviteDict & WorkspaceDict & ProjectsDict & InboxDict;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function getInitialLocale(): Locale {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  const stored = match?.[1];
  return stored === "zh" || stored === "en" ? stored : "en";
}

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? getInitialLocale);
  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    document.cookie = `${COOKIE_NAME}=${l}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  }, []);

  const dictionaries: Record<Locale, InviteDict & WorkspaceDict & ProjectsDict & InboxDict> = { en, zh };

  return (
    <LocaleContext.Provider value={{ locale, t: dictionaries[locale], setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}