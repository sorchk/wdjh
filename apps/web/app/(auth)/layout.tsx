"use client";

import { useState } from "react";
import { LocaleProvider } from "@/features/dashboard/i18n";
import type { Locale } from "@/features/dashboard/i18n";

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = document.cookie
    .split("; ")
    .find((row) => row.startsWith("multica-locale="))
    ?.split("=")[1];
  if (stored === "en" || stored === "zh") return stored;
  const browserLang = navigator.language;
  if (browserLang.includes("zh")) return "zh";
  return "en";
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [initialLocale] = useState<Locale>(() => getInitialLocale());

  return <LocaleProvider initialLocale={initialLocale}>{children}</LocaleProvider>;
}