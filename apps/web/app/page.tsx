"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@multica/core/api";
import { Spinner } from "@multica/ui/components/ui/spinner";

export default function HomePage() {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["auth-check"],
    queryFn: () => api.get("/api/auth/check"),
    retry: false,
  });

  useEffect(() => {
    if (isLoading || !data) return;

    const { has_users, is_logged_in } = data as { has_users: boolean; is_logged_in: boolean };

    if (!has_users) {
      router.replace("/init");
      return;
    }

    if (is_logged_in) {
      router.replace("/workspaces");
      return;
    }

    router.replace("/login");
  }, [isLoading, data, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner className="size-8 text-muted-foreground" />
    </div>
  );
}
