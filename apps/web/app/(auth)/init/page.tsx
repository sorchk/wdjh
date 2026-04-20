"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@multica/ui/components/ui/card";
import { Input } from "@multica/ui/components/ui/input";
import { Button } from "@multica/ui/components/ui/button";
import { Label } from "@multica/ui/components/ui/label";
import { useAuthStore } from "@multica/core/auth";
import { api } from "@multica/core/api";
import { useLocale } from "@/features/dashboard/i18n";

export default function InitPage() {
  const { t } = useLocale();
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t.auth.init.emailAndPasswordRequired);
      return;
    }

    if (password.length < 6) {
      setError(t.auth.init.passwordMinLength);
      return;
    }

    if (password !== confirmPassword) {
      setError(t.auth.init.passwordsDoNotMatch);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || t.auth.init.failedToInitializeAdmin);
      }

      const data = await res.json();
      localStorage.setItem("multica_token", data.token);
      api.setToken(data.token);
      setUser(data.user);

      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.auth.init.failedToInitializeAdmin);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t.auth.init.initializeAdmin}</CardTitle>
          <CardDescription>
            {t.auth.init.createAdminAccount}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="init-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.auth.init.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t.auth.init.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t.auth.init.password}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t.auth.init.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">{t.auth.init.confirmPassword}</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder={t.auth.init.passwordPlaceholder}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            form="init-form"
            className="w-full"
            size="lg"
            disabled={loading}
          >
            {loading ? t.auth.init.creating : t.auth.init.createAdminAccountButton}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
