"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@multica/core/auth";
import { workspaceKeys } from "@multica/core/workspace";
import { validateCliCallback } from "@multica/views/auth";
import { api } from "@multica/core/api";
import { paths } from "@multica/core/paths";
import { useLocale } from "@/features/dashboard/i18n";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@multica/ui/components/ui/card";
import { Input } from "@multica/ui/components/ui/input";
import { Button } from "@multica/ui/components/ui/button";
import { Label } from "@multica/ui/components/ui/label";

type Step = "credentials" | "cli_confirm";

function redirectToCliCallback(url: string, token: string, state: string) {
  const separator = url.includes("?") ? "&" : "?";
  window.location.href = `${url}${separator}token=${encodeURIComponent(token)}&state=${encodeURIComponent(state)}`;
}

function LoginPageContent() {
  const router = useRouter();
  const qc = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const searchParams = useSearchParams();
  const { t: i18n } = useLocale();
  const authDict = i18n.auth.login;

  const [step, setStep] = useState<Step>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [existingUser, setExistingUser] = useState<{ email: string } | null>(null);
  const authSourceRef = useRef<"cookie" | "localStorage">("cookie");
  const cliCallbackRef = useRef<{ url: string; state: string } | null>(null);

  const cliCallbackRaw = searchParams.get("cli_callback");
  const cliState = searchParams.get("cli_state") || "";

  useEffect(() => {
    if (!cliCallbackRaw || !validateCliCallback(cliCallbackRaw)) return;

    const cfg = { url: cliCallbackRaw, state: cliState };
    cliCallbackRef.current = cfg;

    api.setToken(null);
    api
      .getMe()
      .then((u) => {
        authSourceRef.current = "cookie";
        setExistingUser(u);
        setStep("cli_confirm");
      })
      .catch(() => {
        const token = localStorage.getItem("multica_token");
        if (!token) return;
        api.setToken(token);
        api.getMe().then((u) => {
          authSourceRef.current = "localStorage";
          setExistingUser(u);
          setStep("cli_confirm");
        }).catch(() => {
          api.setToken(null);
          localStorage.removeItem("multica_token");
        });
      });
  }, [cliCallbackRaw, cliState]);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Invalid credentials");
      }

      const data = await res.json();
      localStorage.setItem("multica_token", data.token);
      api.setToken(data.token);
      setUser(data.user);

      if (cliCallbackRef.current) {
        setExistingUser({ email: data.user.email });
        setStep("cli_confirm");
        setLoading(false);
        return;
      }

      const wsList = await api.listWorkspaces();
      qc.setQueryData(workspaceKeys.list(), wsList);
      const [first] = wsList;
      router.push(
        first ? paths.workspace(first.slug).issues() : paths.newWorkspace(),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCliAuthorize = async () => {
    if (!cliCallbackRef.current) return;
    setLoading(true);

    try {
      let token: string;
      if (authSourceRef.current === "localStorage") {
        const stored = localStorage.getItem("multica_token");
        if (!stored) throw new Error("token missing");
        token = stored;
      } else {
        const res = await api.issueCliToken();
        token = res.token;
      }
      redirectToCliCallback(cliCallbackRef.current.url, token, cliCallbackRef.current.state);
    } catch {
      setError("Failed to authorize CLI. Please log in again.");
      setExistingUser(null);
      setStep("credentials");
      setLoading(false);
    }
  };

  if (step === "cli_confirm" && existingUser) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{authDict.authorizeCli}</CardTitle>
            <CardDescription>
              {authDict.allowCliAccess}{" "}
              <span className="font-medium text-foreground">
                {existingUser.email}
              </span>
              ?
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button
              onClick={handleCliAuthorize}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? authDict.authorizing : authDict.authorizeCli}
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                setExistingUser(null);
                cliCallbackRef.current = null;
                setStep("credentials");
              }}
            >
              {authDict.useDifferentAccount}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{authDict.signIn}</CardTitle>
          <CardDescription>
            {authDict.enterCredentials}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={handleCredentialsLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{authDict.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={authDict.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{authDict.password}</Label>
              <Input
                id="password"
                type="password"
                placeholder={authDict.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            form="login-form"
            className="w-full"
            size="lg"
            disabled={!email || !password || loading}
          >
            {loading ? authDict.signingIn : authDict.signInButton}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  );
}
