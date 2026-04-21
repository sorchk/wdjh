import { cookies, headers } from "next/headers";
import { LocaleProvider } from "@/features/dashboard/i18n";
import type { Locale } from "@/features/dashboard/i18n";

async function getInitialLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const stored = cookieStore.get("multica-locale")?.value;
  if (stored === "en" || stored === "zh") return stored;

  const headersList = await headers();
  const acceptLang = headersList.get("accept-language") ?? "";
  if (acceptLang.includes("zh")) return "zh";

  return "en";
}

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialLocale = await getInitialLocale();

  return <LocaleProvider initialLocale={initialLocale}>{children}</LocaleProvider>;
}