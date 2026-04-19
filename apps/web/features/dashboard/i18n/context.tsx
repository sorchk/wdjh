"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { DashboardDict, Locale } from "./types";
import { en as commonEn } from "./common/en";
import { zh as commonZh } from "./common/zh";
import { en as issuesEn } from "./issues/en";
import { zh as issuesZh } from "./issues/zh";

const COOKIE_NAME = "multica-locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type LocaleContextValue = {
  locale: Locale;
  t: DashboardDict;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale = "zh",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    document.cookie = `${COOKIE_NAME}=${l}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  }, []);

  const dictionaries: Record<Locale, DashboardDict> = {
    en: { common: commonEn, issues: issuesEn, projects: {} as DashboardDict["projects"], agents: {} as DashboardDict["agents"], settings: {} as DashboardDict["settings"], inbox: {} as DashboardDict["inbox"], runtimes: {} as DashboardDict["runtimes"], autopilots: {} as DashboardDict["autopilots"], skills: {} as DashboardDict["skills"], invite: {} as DashboardDict["invite"], workspace: {} as DashboardDict["workspace"] },
    zh: { common: commonZh, issues: issuesZh, projects: {} as DashboardDict["projects"], agents: {} as DashboardDict["agents"], settings: {} as DashboardDict["settings"], inbox: {} as DashboardDict["inbox"], runtimes: {} as DashboardDict["runtimes"], autopilots: {} as DashboardDict["autopilots"], skills: {} as DashboardDict["skills"], invite: {} as DashboardDict["invite"], workspace: {} as DashboardDict["workspace"] },
  };

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
