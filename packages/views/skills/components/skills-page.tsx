"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useDefaultLayout } from "react-resizable-panels";
import {
  Sparkles,
  Plus,
  Trash2,
  Save,
  AlertCircle,
  Download,
  HardDrive,
  Upload,
  FileArchive,
} from "lucide-react";
import type { Skill, CreateSkillRequest, UpdateSkillRequest } from "@multica/core/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@multica/ui/components/ui/dialog";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@multica/ui/components/ui/resizable";
import { Tooltip, TooltipTrigger, TooltipContent } from "@multica/ui/components/ui/tooltip";
import { Badge } from "@multica/ui/components/ui/badge";
import { Button } from "@multica/ui/components/ui/button";
import { Input } from "@multica/ui/components/ui/input";
import { Label } from "@multica/ui/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@multica/ui/components/ui/tabs";
import { toast } from "sonner";
import { Skeleton } from "@multica/ui/components/ui/skeleton";
import { cn } from "@multica/ui/lib/utils";
import { api } from "@multica/core/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useWorkspaceId } from "@multica/core/hooks";
import { skillListOptions, workspaceKeys } from "@multica/core/workspace/queries";

import { PageHeader } from "../../layout/page-header";
import { FileTree } from "./file-tree";
import { FileViewer } from "./file-viewer";
import { RuntimeLocalSkillImportPanel } from "./runtime-local-skill-import-panel";
import { useLocale } from "@/features/dashboard/i18n";

// ---------------------------------------------------------------------------
// Upload Skill Panel
// ---------------------------------------------------------------------------

function UploadSkillPanel({
  onUploaded,
}: {
  onUploaded: (skill: Skill) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.name.endsWith(".zip")) {
      toast.error("Only .zip files are supported");
      return;
    }
    if (selectedFile.size > 50 * 1024 * 1024) {
      toast.error("File size must be less than 50MB");
      return;
    }
    setFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const skill = await api.uploadSkill(file);
      toast.success("Skill uploaded successfully");
      onUploaded(skill);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to upload skill");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 min-h-[180px]">
      <div
        className={cn(
          "relative rounded-lg border-2 border-dashed p-8 text-center transition-colors",
          dragOver
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50",
          file && "border-primary/50 bg-primary/5",
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".zip"
          className="hidden"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) handleFileSelect(selectedFile);
            e.target.value = "";
          }}
        />

        {file ? (
          <div className="flex flex-col items-center">
            <FileArchive className="h-10 w-10 text-primary" />
            <p className="mt-2 text-sm font-medium">{file.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2"
              onClick={() => setFile(null)}
            >
              Remove
            </Button>
          </div>
        ) : (
          <button
            type="button"
            className="flex flex-col items-center"
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="h-10 w-10 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium">
              {dragOver ? "Drop file here" : "Click to select or drag & drop"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              ZIP file containing SKILL.md (max 50MB)
            </p>
          </button>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading ? (
            "Uploading..."
          ) : (
            <>
              <Upload className="mr-1.5 h-3 w-3" />
              Upload
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Create Skill Dialog
// ---------------------------------------------------------------------------

function CreateSkillDialog({
  onClose,
  onCreate,
  onImport,
  onRuntimeImported,
  t,
  onUploadUploaded,
}: {
  onClose: () => void;
  onCreate: (data: CreateSkillRequest) => Promise<void>;
  onImport: (url: string) => Promise<void>;
  onRuntimeImported?: (skill: Skill) => void;
  t: ReturnType<typeof useLocale>["t"];
  onUploadUploaded?: (skill: Skill) => void;
}) {
  const [tab, setTab] = useState<"create" | "import" | "runtime" | "upload">("create");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [importUrl, setImportUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [importError, setImportError] = useState("");

  const detectedSource = (() => {
    const url = importUrl.trim().toLowerCase();
    if (url.includes("clawhub.ai")) return "clawhub" as const;
    if (url.includes("skills.sh")) return "skills.sh" as const;
    return null;
  })();

  const handleCreate = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await onCreate({ name: name.trim(), description: description.trim() });
      onClose();
    } catch {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    if (!importUrl.trim()) return;
    setLoading(true);
    setImportError("");
    try {
      await onImport(importUrl.trim());
      onClose();
    } catch (err) {
      setImportError(err instanceof Error ? err.message : t.skills.importFailed);
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent
        className={`flex max-h-[85vh] flex-col ${tab === "runtime" || tab === "upload" ? "sm:max-w-2xl" : "sm:max-w-md"}`}
      >
        <DialogHeader>
          <DialogTitle>{t.skills.addWorkspaceSkill}</DialogTitle>
          <DialogDescription>
            {t.skills.addWorkspaceSkillDescription}
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as "create" | "import" | "runtime" | "upload")}
          className="flex min-h-0 flex-1 flex-col"
        >
          <TabsList className="w-full">
            <TabsTrigger value="create" className="flex-1">
              <Plus className="mr-1.5 h-3 w-3" />
              {t.skills.createTab}
            </TabsTrigger>
            <TabsTrigger value="import" className="flex-1">
              <Download className="mr-1.5 h-3 w-3" />
              {t.skills.importTab}
            </TabsTrigger>
            <TabsTrigger value="runtime" className="flex-1">
              <HardDrive className="mr-1.5 h-3 w-3" />
              {t.skills.runtimeTab}
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex-1">
              <Upload className="mr-1.5 h-3 w-3" />
              Upload
            </TabsTrigger>
          </TabsList>

          <div className="-mx-6 mt-4 flex-1 overflow-y-auto px-6">

          <TabsContent value="create" className="space-y-4 min-h-[180px]">
            <div>
              <Label className="text-xs text-muted-foreground">{t.skills.nameLabel}</Label>
              <Input
                autoFocus
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.skills.namePlaceholder}
                className="mt-1"
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">{t.skills.descriptionLabel}</Label>
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.skills.descriptionPlaceholder}
                className="mt-1"
              />
            </div>
          </TabsContent>

          <TabsContent value="import" className="space-y-4 min-h-[180px]">
            <div>
              <Label className="text-xs text-muted-foreground">{t.skills.skillUrlLabel}</Label>
              <Input
                autoFocus
                type="text"
                value={importUrl}
                onChange={(e) => { setImportUrl(e.target.value); setImportError(""); }}
                placeholder={t.skills.skillUrlPlaceholder}
                className="mt-1"
                onKeyDown={(e) => e.key === "Enter" && handleImport()}
              />
            </div>

            {/* Supported sources — highlight on detection */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">{t.skills.supportedSources}</p>
              <div className="grid grid-cols-2 gap-2">
                <div className={`rounded-lg border px-3 py-2.5 transition-colors ${
                  detectedSource === "clawhub"
                    ? "border-primary bg-primary/5"
                    : ""
                }`}>
                  <div className="text-xs font-medium">ClawHub</div>
                  <div className="mt-0.5 truncate text-[11px] text-muted-foreground font-mono">
                    clawhub.ai/owner/skill
                  </div>
                </div>
                <div className={`rounded-lg border px-3 py-2.5 transition-colors ${
                  detectedSource === "skills.sh"
                    ? "border-primary bg-primary/5"
                    : ""
                }`}>
                  <div className="text-xs font-medium">Skills.sh</div>
                  <div className="mt-0.5 truncate text-[11px] text-muted-foreground font-mono">
                    skills.sh/owner/repo/skill
                  </div>
                </div>
              </div>
            </div>

            {importError && (
              <div className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {importError}
              </div>
            )}
          </TabsContent>

          <TabsContent value="runtime" className="min-h-[180px]">
            <RuntimeLocalSkillImportPanel
              active={tab === "runtime"}
              onImported={(skill) => {
                onRuntimeImported?.(skill);
                onClose();
              }}
            />
          </TabsContent>

          <TabsContent value="upload" className="min-h-[180px]">
            <UploadSkillPanel
              onUploaded={(skill) => {
                onUploadUploaded?.(skill);
                onClose();
              }}
            />
          </TabsContent>
          </div>
        </Tabs>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>{t.skills.cancel}</Button>
          {tab === "create" && (
            <Button onClick={handleCreate} disabled={loading || !name.trim()}>
              {loading ? t.skills.creating : t.skills.create}
            </Button>
          )}
          {tab === "import" && (
            <Button onClick={handleImport} disabled={loading || !importUrl.trim()}>
              {loading ? (
                detectedSource === "clawhub"
                  ? t.skills.importingFromClawHub
                  : detectedSource === "skills.sh"
                    ? t.skills.importingFromSkillsSh
                    : t.skills.importing
              ) : (
                <>
                  <Download className="mr-1.5 h-3 w-3" />
                  {t.skills.import}
                </>
              )}
            </Button>
          )}
          {/* The runtime tab embeds its own "Import to Workspace" button
              inside the panel since it can only enable once a runtime +
              skill are picked. */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Skill List Item
// ---------------------------------------------------------------------------

function SkillListItem({
  skill,
  isSelected,
  onClick,
}: {
  skill: Skill;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
        isSelected ? "bg-accent" : "hover:bg-accent/50"
      }`}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Sparkles className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">{skill.name}</div>
        {skill.description && (
          <div className="mt-0.5 truncate text-xs text-muted-foreground">
            {skill.description}
          </div>
        )}
      </div>
      {(skill.files?.length ?? 0) > 0 && (
        <Badge variant="secondary">
          {skill.files.length} file{skill.files.length !== 1 ? "s" : ""}
        </Badge>
      )}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Helpers: virtual file list for the tree
// ---------------------------------------------------------------------------

const SKILL_MD = "SKILL.md";

/** Merge skill.content (as SKILL.md) + skill.files into a single map */
function buildFileMap(
  content: string,
  files: { path: string; content: string }[],
): Map<string, string> {
  const map = new Map<string, string>();
  map.set(SKILL_MD, content);
  for (const f of files) {
    if (f.path.trim()) map.set(f.path, f.content);
  }
  return map;
}

// ---------------------------------------------------------------------------
// Add File Dialog
// ---------------------------------------------------------------------------

function AddFileDialog({
  existingPaths,
  onClose,
  onAdd,
  t,
}: {
  existingPaths: string[];
  onClose: () => void;
  onAdd: (path: string) => void;
  t: ReturnType<typeof useLocale>["t"];
}) {
  const [path, setPath] = useState("");
  const duplicate = existingPaths.includes(path.trim());

  return (
    <Dialog open onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-sm" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-sm font-semibold">{t.skills.addFile}</DialogTitle>
          <DialogDescription className="text-xs">
            {t.skills.addFileDescription}
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label className="text-xs text-muted-foreground">{t.skills.filePathLabel}</Label>
          <Input
            autoFocus
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder={t.skills.filePathPlaceholder}
            className="mt-1 font-mono text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter" && path.trim() && !duplicate) {
                onAdd(path.trim());
                onClose();
              }
            }}
          />
          {duplicate && (
            <p className="mt-1 text-xs text-destructive">{t.skills.fileAlreadyExists}</p>
          )}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>{t.skills.cancel}</Button>
          <Button
            disabled={!path.trim() || duplicate}
            onClick={() => { onAdd(path.trim()); onClose(); }}
          >
            {t.skills.add}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Skill Detail — file-browser layout
// ---------------------------------------------------------------------------

function SkillDetail({
  skill,
  onUpdate,
  onDelete,
  t,
}: {
  skill: Skill;
  onUpdate: (id: string, data: UpdateSkillRequest) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  t: ReturnType<typeof useLocale>["t"];
}) {
  const qc = useQueryClient();
  const wsId = useWorkspaceId();
  const [name, setName] = useState(skill.name);
  const [description, setDescription] = useState(skill.description);
  const [content, setContent] = useState(skill.content);
  const [files, setFiles] = useState<{ path: string; content: string }[]>(
    (skill.files ?? []).map((f) => ({ path: f.path, content: f.content })),
  );
  const [selectedPath, setSelectedPath] = useState(SKILL_MD);
  const [saving, setSaving] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showAddFile, setShowAddFile] = useState(false);

  // Sync basic fields from store updates
  useEffect(() => {
    setName(skill.name);
    setDescription(skill.description);
    setContent(skill.content);
  }, [skill.id, skill.name, skill.description, skill.content]);

  // Fetch full skill (with files) on selection change
  useEffect(() => {
    setSelectedPath(SKILL_MD);
    setLoadingFiles(true);
    api.getSkill(skill.id).then((full) => {
      qc.invalidateQueries({ queryKey: workspaceKeys.skills(wsId) });
      setFiles((full.files ?? []).map((f) => ({ path: f.path, content: f.content })));
    }).catch((e) => {
      toast.error(e instanceof Error ? e.message : t.skills.failedToLoadSkillFiles);
    }).finally(() => setLoadingFiles(false));
  }, [skill.id, qc, wsId]);

  // Build the virtual file map
  const fileMap = useMemo(() => buildFileMap(content, files), [content, files]);
  const filePaths = useMemo(() => Array.from(fileMap.keys()), [fileMap]);
  const selectedContent = fileMap.get(selectedPath) ?? "";

  const isDirty =
    name !== skill.name ||
    description !== skill.description ||
    content !== skill.content ||
    JSON.stringify(files) !==
      JSON.stringify((skill.files ?? []).map((f) => ({ path: f.path, content: f.content })));

  const handleSave = async () => {
    setSaving(true);
    try {
      await onUpdate(skill.id, {
        name: name.trim(),
        description: description.trim(),
        content,
        files: files.filter((f) => f.path.trim()),
      });
    } catch {
      // toast handled by parent
    } finally {
      setSaving(false);
    }
  };

  const handleFileContentChange = (newContent: string) => {
    if (selectedPath === SKILL_MD) {
      setContent(newContent);
    } else {
      setFiles((prev) =>
        prev.map((f) =>
          f.path === selectedPath ? { ...f, content: newContent } : f,
        ),
      );
    }
  };

  const handleAddFile = (path: string) => {
    setFiles((prev) => [...prev, { path, content: "" }]);
    setSelectedPath(path);
  };

  const handleDeleteFile = () => {
    if (selectedPath === SKILL_MD) return;
    setFiles((prev) => prev.filter((f) => f.path !== selectedPath));
    setSelectedPath(SKILL_MD);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="grid grid-cols-2 gap-3 flex-1 min-w-0">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-8 text-sm font-medium"
              placeholder={t.skills.namePlaceholder}
            />
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-8 text-sm"
              placeholder={t.skills.descriptionPlaceholder}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 ml-3">
          {isDirty && (
            <Button onClick={handleSave} disabled={saving || !name.trim()} size="xs">
              <Save className="h-3 w-3" />
              {saving ? t.skills.saving : t.skills.save}
            </Button>
          )}
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => setConfirmDelete(true)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              }
            />
            <TooltipContent>{t.skills.deleteSkill}</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* File browser: tree + viewer */}
      <div className="flex flex-1 min-h-0">
        {/* File tree */}
        <div className="w-52 shrink-0 border-r flex flex-col">
          <div className="flex h-10 items-center justify-between border-b px-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {t.skills.files}
            </span>
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setShowAddFile(true)}
                      className="text-muted-foreground"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  }
                />
                <TooltipContent>{t.skills.addFile}</TooltipContent>
              </Tooltip>
              {selectedPath !== SKILL_MD && (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={handleDeleteFile}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    }
                  />
                  <TooltipContent>{t.skills.deleteFile}</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {loadingFiles ? (
              <div className="p-3 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : (
              <FileTree
                filePaths={filePaths}
                selectedPath={selectedPath}
                onSelect={setSelectedPath}
              />
            )}
          </div>
        </div>

        {/* File viewer */}
        <div className="flex-1 min-w-0">
          {loadingFiles ? (
            <div className="p-4 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
          <FileViewer
            key={selectedPath}
            path={selectedPath}
            content={selectedContent}
            onChange={handleFileContentChange}
          />
          )}
        </div>
      </div>

      {/* Add file dialog */}
      {showAddFile && (
        <AddFileDialog
          existingPaths={filePaths}
          onClose={() => setShowAddFile(false)}
          onAdd={handleAddFile}
          t={t}
        />
      )}

      {/* Delete Confirmation */}
      {confirmDelete && (
        <Dialog open onOpenChange={(v) => { if (!v) setConfirmDelete(false); }}>
          <DialogContent className="max-w-sm" showCloseButton={false}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
              <DialogHeader className="flex-1 gap-1">
                <DialogTitle className="text-sm font-semibold">{t.skills.deleteSkill}?</DialogTitle>
                <DialogDescription className="text-xs">
                  {t.skills.deleteSkillConfirmation.replace("{name}", skill.name)}
                </DialogDescription>
              </DialogHeader>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setConfirmDelete(false)}>
                {t.skills.cancel}
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setConfirmDelete(false);
                  onDelete(skill.id);
                }}
              >
                {t.skills.deleteSkill}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SkillsPage() {
  const qc = useQueryClient();
  const wsId = useWorkspaceId();
  const { t } = useLocale();
  const { data: skills = [], isLoading } = useQuery(skillListOptions(wsId));
  const [selectedId, setSelectedId] = useState<string>("");
  const [showCreate, setShowCreate] = useState(false);
  const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    id: "multica_skills_layout",
  });

  useEffect(() => {
    if (skills.length > 0 && !selectedId) {
      setSelectedId(skills[0]!.id);
    }
  }, [skills, selectedId]);

  const handleCreate = async (data: CreateSkillRequest) => {
    const skill = await api.createSkill(data);
    qc.invalidateQueries({ queryKey: workspaceKeys.skills(wsId) });
    setSelectedId(skill.id);
    toast.success(t.skills.skillCreated);
  };

  const handleImport = async (url: string) => {
    const skill = await api.importSkill({ url });
    qc.invalidateQueries({ queryKey: workspaceKeys.skills(wsId) });
    setSelectedId(skill.id);
    toast.success(t.skills.skillImported);
  };

  const handleUpdate = async (id: string, data: UpdateSkillRequest) => {
    try {
      await api.updateSkill(id, data);
      qc.invalidateQueries({ queryKey: workspaceKeys.skills(wsId) });
      toast.success(t.skills.skillSaved);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t.skills.failedToSaveSkill);
      throw e;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteSkill(id);
      if (selectedId === id) {
        const remaining = skills.filter((s) => s.id !== id);
        setSelectedId(remaining[0]?.id ?? "");
      }
      qc.invalidateQueries({ queryKey: workspaceKeys.skills(wsId) });
      toast.success(t.skills.skillDeleted);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t.skills.failedToDeleteSkill);
    }
  };

  const selected = skills.find((s) => s.id === selectedId) ?? null;

  if (isLoading) {
    return (
      <div className="flex flex-1 min-h-0">
        {/* List skeleton */}
        <div className="w-72 border-r">
          <div className="flex h-12 items-center justify-between border-b px-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-6 rounded" />
          </div>
          <div className="divide-y">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Detail skeleton */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-3 border-b px-4 py-3">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-8 w-56" />
          </div>
          <div className="flex flex-1 min-h-0">
            <div className="w-52 border-r p-3 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="flex-1 p-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="flex-1 min-h-0"
      defaultLayout={defaultLayout}
      onLayoutChanged={onLayoutChanged}
    >
      <ResizablePanel id="list" defaultSize={280} minSize={240} maxSize={400} groupResizeBehavior="preserve-pixel-size">
        {/* Left column — skill list */}
        <div className="overflow-y-auto h-full border-r">
          <PageHeader className="justify-between">
            <h1 className="text-sm font-semibold">{t.skills.skills}</h1>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setShowCreate(true)}
                  >
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </Button>
                }
              />
              <TooltipContent side="bottom">{t.skills.createSkill}</TooltipContent>
            </Tooltip>
          </PageHeader>
          {skills.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-12">
              <Sparkles className="h-8 w-8 text-muted-foreground/40" />
              <p className="mt-3 text-sm text-muted-foreground">{t.skills.noWorkspaceSkillsYet}</p>
              <p className="mt-1 text-xs text-muted-foreground text-center max-w-[280px]">
                {t.skills.workspaceSkillsDescription}
              </p>
              <Button
                onClick={() => setShowCreate(true)}
                size="xs"
                className="mt-3"
              >
                <Plus className="h-3 w-3" />
                {t.skills.createSkill}
              </Button>
            </div>
          ) : (
            <div className="divide-y">
              {skills.map((skill) => (
                <SkillListItem
                  key={skill.id}
                  skill={skill}
                  isSelected={skill.id === selectedId}
                  onClick={() => setSelectedId(skill.id)}
                />
              ))}
            </div>
          )}
        </div>
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel id="detail" minSize="50%">
        {/* Right column — skill detail */}
        <div className="flex-1 overflow-hidden h-full">
          {selected ? (
            <SkillDetail
              key={selected.id}
              skill={selected}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              t={t}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
              <Sparkles className="h-10 w-10 text-muted-foreground/30" />
              <p className="mt-3 text-sm">{t.skills.selectSkillToViewDetails}</p>
              <p className="mt-1 text-xs text-center max-w-[260px]">
                {t.skills.workspaceSkillsSupplement}
              </p>
              <Button
                onClick={() => setShowCreate(true)}
                size="xs"
                className="mt-3"
              >
                <Plus className="h-3 w-3" />
                {t.skills.createSkill}
              </Button>
            </div>
          )}
        </div>
      </ResizablePanel>

      {showCreate && (
        <CreateSkillDialog
          onClose={() => setShowCreate(false)}
          onCreate={handleCreate}
          onImport={handleImport}
          onRuntimeImported={(skill) => setSelectedId(skill.id)}
          t={t}
          onUploadUploaded={(skill) => setSelectedId(skill.id)}
        />
      )}
    </ResizablePanelGroup>
  );
}
