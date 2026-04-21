"use client";

import { useEffect, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getApi } from "../api";
import { useAuthStore } from "../auth";
import {
  captureSignupSource,
  identify as identifyAnalytics,
  initAnalytics,
  resetAnalytics,
} from "../analytics";
import { configStore } from "../config";
import { workspaceKeys } from "../workspace/queries";
import { createLogger } from "../logger";
import { defaultStorage } from "./storage";
import { setCurrentWorkspace } from "./workspace-storage";
import type { StorageAdapter } from "../types/storage";
import type { User } from "../types";

const logger = createLogger("auth");

export function AuthInitializer({
  children,
  onLogin,
  onLogout,
  storage = defaultStorage,
  cookieAuth,
}: {
  children: ReactNode;
  onLogin?: () => void;
  onLogout?: () => void;
  storage?: StorageAdapter;
  cookieAuth?: boolean;
}) {
  const qc = useQueryClient();

  useEffect(() => {
    const api = getApi();

    api.getConfig().then((cfg) => {
      if (cfg.cdn_domain) configStore.getState().setCdnDomain(cfg.cdn_domain);
    }).catch(() => { /* config is optional — legacy file card matching degrades gracefully */ });

    if (cookieAuth) {
      api.authCheck().then(({ has_users, is_logged_in }) => {
        if (!has_users) {
          useAuthStore.setState({ isLoading: false });
          onLogout?.();
          return;
        }
        if (!is_logged_in) {
          useAuthStore.setState({ isLoading: false });
          onLogout?.();
          return;
        }
        Promise.all([api.getMe(), api.listWorkspaces()])
          .then(([user, wsList]) => {
            onLogin?.();
            useAuthStore.setState({ user, isLoading: false });
            qc.setQueryData(workspaceKeys.list(), wsList);
          })
          .catch((err) => {
            logger.error("cookie auth init failed", err);
            onLogout?.();
            useAuthStore.setState({ user: null, isLoading: false });
          });
      }).catch(() => {
        useAuthStore.setState({ isLoading: false });
        onLogout?.();
      }); 

    // Fetch app config (CDN domain, PostHog key, …) in the background — non-blocking.
    api
      .getConfig()
      .then((cfg) => {
        if (cfg.cdn_domain) configStore.getState().setCdnDomain(cfg.cdn_domain);
        if (cfg.posthog_key) {
          initAnalytics({ key: cfg.posthog_key, host: cfg.posthog_host || "" });
        }
      })
      .catch(() => {
        /* config is optional — legacy file card matching degrades gracefully */
      });

 
 
    }
   const onAuthSuccess = (user: User) => {
      onLogin?.();
      useAuthStore.setState({ user, isLoading: false });
      identifyAnalytics(user.id, { email: user.email, name: user.name });
    };

    const onAuthFailure = () => {
      onLogout?.();
      resetAnalytics();
      useAuthStore.setState({ user: null, isLoading: false });
    };
    api.authCheck().then(({ has_users }) => {
      if (!has_users) {
        useAuthStore.setState({ isLoading: false });
        onLogout?.();
        return;
      }
    }).catch(() => {});

    const token = storage.getItem("multica_token");
    if (!token) {
      onLogout?.();
      useAuthStore.setState({ isLoading: false });
      return;
    }

    api.setToken(token);

    Promise.all([api.getMe(), api.listWorkspaces()])
      .then(([user, wsList]) => {
        onLogin?.();
        useAuthStore.setState({ user, isLoading: false });
        onAuthSuccess(user);
        // Seed React Query cache so the URL-driven layout can resolve the
        // slug without a second fetch.
        qc.setQueryData(workspaceKeys.list(), wsList);
      })
      .catch((err) => {
        logger.error("auth init failed", err);
        api.setToken(null);
        setCurrentWorkspace(null, null);
        storage.removeItem("multica_token");
        onAuthFailure();
      });
  }, []);

  return <>{children}</>;
}
