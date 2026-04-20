"use client";

import { LocaleProvider } from "@/features/dashboard/i18n";
import type { Locale } from "@/features/dashboard/i18n";
import { cookies } from "next/headers";
import { use } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = use(cookies());
  const stored = cookieStore.get("multica-locale")?.value;
  const initialLocale: Locale = stored === "zh" || stored === "en" ? stored : "en";

  return (
    <LocaleProvider initialLocale={initialLocale}>
      {children}
    </LocaleProvider>
  );
}