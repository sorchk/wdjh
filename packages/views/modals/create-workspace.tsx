"use client";

import { useNavigation } from "../navigation";
import { useImmersiveMode } from "../platform";
import { ArrowLeft } from "lucide-react";
import { Button } from "@multica/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@multica/ui/components/ui/dialog";
import { paths } from "@multica/core/paths";
import { CreateWorkspaceForm } from "../workspace/create-workspace-form";
import { useLocale } from "@/features/dashboard/i18n";

export function CreateWorkspaceModal({ onClose }: { onClose: () => void }) {
  const { t } = useLocale();
  useImmersiveMode();
  const router = useNavigation();

  return (
    <Dialog
      open
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent
        finalFocus={false}
        showCloseButton={false}
        className="inset-0 flex h-full w-full max-w-none sm:max-w-none translate-0 flex-col items-center justify-center rounded-none bg-background ring-0 shadow-none"
      >
        {/* Top drag region — restores window-drag ability that the full-screen
            modal would otherwise swallow. Transparent; web browsers ignore the
            -webkit-app-region property, so this is safe cross-platform. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-10"
          style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
        />

        <Button
          variant="ghost"
          size="sm"
          className="absolute top-12 left-12 text-muted-foreground"
          style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
          onClick={onClose}
        >
          <ArrowLeft className="h-4 w-4" />
          {t.issues.back}
        </Button>

        <div className="flex w-full max-w-md flex-col items-center gap-6">
          <div className="text-center">
            <DialogTitle className="text-2xl font-semibold">
              {t.issues.createNewWorkspace}
            </DialogTitle>
            <DialogDescription className="mt-2">
              {t.issues.workspaceDescription}
            </DialogDescription>
          </div>
          <CreateWorkspaceForm
            onSuccess={(newWs) => {
              onClose();
              router.push(paths.workspace(newWs.slug).issues());
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
