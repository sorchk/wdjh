"use client";

import { DashboardLayout } from "@multica/views/layout";
import { MulticaIcon } from "@multica/ui/components/common/multica-icon";
import { SearchCommand, SearchTrigger } from "@multica/views/search";
import { ChatFab, ChatWindow } from "@multica/views/chat";
import { LocaleProvider } from "@multica/views/i18n";
import { cookies } from "next/headers";
import { use } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = use(cookies());
  const stored = cookieStore.get("multica-locale")?.value;
  const initialLocale = stored === "zh" || stored === "en" ? stored : "en";

  return (
    <LocaleProvider initialLocale={initialLocale}>
      <DashboardLayout
        loadingIndicator={<MulticaIcon className="size-6" />}
        searchSlot={<SearchTrigger />}
        extra={<><SearchCommand /><ChatWindow /><ChatFab /></>}
      >
        {children}
      </DashboardLayout>
    </LocaleProvider>
  );
}
