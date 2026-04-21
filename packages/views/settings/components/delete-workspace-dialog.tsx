"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@multica/ui/components/ui/dialog";
import { Input } from "@multica/ui/components/ui/input";
import { Label } from "@multica/ui/components/ui/label";
import { Button } from "@multica/ui/components/ui/button";
import { useLocale } from "@/features/dashboard/i18n";

export function DeleteWorkspaceDialog({
  workspaceName,
  loading = false,
  open,
  onOpenChange,
  onConfirm,
}: {
  workspaceName: string;
  loading?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  const { t } = useLocale();
  const [typed, setTyped] = useState("");
  const matched = typed === workspaceName;

  useEffect(() => {
    setTyped("");
  }, [open, workspaceName]);

  const submit = () => {
    if (!matched || loading) return;
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.settings.deleteWorkspace.deleteWorkspace}</DialogTitle>
          <DialogDescription>
            {t.settings.deleteWorkspace.thisCannotBeUndone}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="delete-workspace-confirm" className="text-xs">
            {t.settings.deleteWorkspace.toConfirmType}{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              {workspaceName}
            </code>{" "}
            {t.settings.deleteWorkspace.below}
          </Label>
          <Input
            id="delete-workspace-confirm"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submit();
              }
            }}
            placeholder={workspaceName}
            autoFocus
            disabled={loading}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            {t.settings.deleteWorkspace.cancel}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={submit}
            disabled={!matched || loading}
          >
            {loading ? t.settings.deleteWorkspace.deleting : t.settings.deleteWorkspace.delete}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
