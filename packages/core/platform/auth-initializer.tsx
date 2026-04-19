"use client";

import { useEffect, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getApi } from "../api";
import { useAuthStore } from "../auth";
import { configStore } from "../config";
import { workspaceKeys } from "../workspace/queries";
import { createLogger } from "../logger";
import { defaultStorage } from "./storage";
import { setCurrentWorkspace } from "./workspace-storage";
import type { StorageAdapter } from "../types/storage";

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
      return;
    }

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
        qc.setQueryData(workspaceKeys.list(), wsList);
      })
      .catch((err) => {
        logger.error("auth init failed", err);
        api.setToken(null);
        setCurrentWorkspace(null, null);
        storage.removeItem("multica_token");
        onLogout?.();
        useAuthStore.setState({ user: null, isLoading: false });
      });
  }, []);

  return <>{children}</>;
}
