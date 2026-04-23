"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { DashboardDict, Locale } from "./types";
import { en as commonEn } from "./common/en";
import { zh as commonZh } from "./common/zh";
import { en as issuesEn } from "./issues/en";
import { zh as issuesZh } from "./issues/zh";
import { en as projectsEn } from "./projects/en";
import { zh as projectsZh } from "./projects/zh";
import { en as agentsEn } from "./agents/en";
import { zh as agentsZh } from "./agents/zh";
import { en as skillsEn } from "./skills/en";
import { zh as skillsZh } from "./skills/zh";
import { en as autopilotsEn } from "./autopilots/en";
import { zh as autopilotsZh } from "./autopilots/zh";
import { en as settingsEn } from "./settings/en";
import { zh as settingsZh } from "./settings/zh";
import { en as authEn } from "./auth/en";
import { zh as authZh } from "./auth/zh";
import { en as searchEn } from "./search/en";
import { zh as searchZh } from "./search/zh";
import { en as inboxEn } from "./inbox/en";
import { zh as inboxZh } from "./inbox/zh";
import { en as runtimesEn } from "./runtimes/en";
import { zh as runtimesZh } from "./runtimes/zh";
import { en as inviteEn } from "./invite/en";
import { zh as inviteZh } from "./invite/zh";
import { en as workspaceEn } from "./workspace/en";
import { zh as workspaceZh } from "./workspace/zh";

const COOKIE_NAME = "multica-locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function getInitialLocale(): Locale {
  if (typeof document === "undefined") return "zh";
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=(\\w+)`));
  const cookieLocale = match?.[1] as Locale | undefined;
  if (cookieLocale === "en" || cookieLocale === "zh") return cookieLocale;
  return "zh";
}

type LocaleContextValue = {
  locale: Locale;
  t: DashboardDict;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(() => initialLocale ?? getInitialLocale());
  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    document.cookie = `${COOKIE_NAME}=${l}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  }, []);

  useEffect(() => {
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=(\\w+)`));
    const cookieLocale = match?.[1] as Locale | undefined;
    if ((cookieLocale === "en" || cookieLocale === "zh") && cookieLocale !== locale) {
      setLocaleState(cookieLocale);
    }
  }, []);

  const dictionaries: Record<Locale, DashboardDict> = {
    en: { common: commonEn, issues: issuesEn, projects: projectsEn, agents: agentsEn, settings: settingsEn, inbox: inboxEn, runtimes: runtimesEn, autopilots: autopilotsEn, skills: skillsEn, invite: inviteEn, workspace: workspaceEn, auth: authEn, search: searchEn },
    zh: { common: commonZh, issues: issuesZh, projects: projectsZh, agents: agentsZh, settings: settingsZh, inbox: inboxZh, runtimes: runtimesZh, autopilots: autopilotsZh, skills: skillsZh, invite: inviteZh, workspace: workspaceZh, auth: authZh, search: searchZh },
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
