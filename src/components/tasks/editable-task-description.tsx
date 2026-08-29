"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { updateTaskDescription } from "@/actions/task/update-task-description";
import { Pencil, Check, X, Loader2, AlignLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Props {
  taskId: string;
  initialDescription: string | null;
  projectId: string;
}

export default function EditableTaskDescription({
  taskId,
  initialDescription,
  projectId,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(initialDescription || "");
  const [pending, startTransition] = useTransition();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setDescription(initialDescription || "");
  }, [initialDescription]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = textareaRef.current.value.length;
      textareaRef.current.selectionEnd = textareaRef.current.value.length;
    }
  }, [isEditing]);

  function handleSave() {
    const trimmed = description.trim();
    if (trimmed === (initialDescription || "").trim()) {
      setIsEditing(false);
      return;
    }

    setIsEditing(false);
    startTransition(async () => {
      try {
        await updateTaskDescription(taskId, trimmed, projectId);
        toast.success("Description updated");
      } catch {
        setDescription(initialDescription || "");
        toast.error("Failed to update description");
      }
    });
  }

  function handleCancel() {
    setDescription(initialDescription || "");
    setIsEditing(false);
  }

  return (
    <div className="relative">
      {isEditing ? (
        <div className="space-y-3">
          <textarea
            ref={textareaRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                handleSave();
              }
              if (e.key === "Escape") {
                e.preventDefault();
                handleCancel();
              }
            }}
            placeholder="Add detailed task description, context, or acceptance criteria..."
            rows={5}
            className="w-full rounded-2xl border border-border/80 bg-background/80 p-4 text-sm text-foreground outline-none ring-2 ring-indigo-500/30 transition placeholder:text-muted-foreground focus:border-transparent"
          />

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <span>Protip: Press</span>
              <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono border border-border">
                Ctrl + Enter
              </kbd>
              <span>to save</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancel}
                disabled={pending}
                className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={pending}
                className="flex items-center gap-1.5 rounded-xl bg-foreground px-4 py-1.5 text-xs font-medium text-background transition hover:opacity-90 shadow-sm disabled:opacity-50"
              >
                {pending ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Save Description
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="group/desc relative cursor-pointer rounded-2xl border border-transparent p-3 -m-3 transition hover:border-border/60 hover:bg-muted/30"
        >
          {description ? (
            <div className="space-y-2">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90 font-normal">
                {description}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 py-2 text-sm text-muted-foreground">
              <AlignLeft className="h-4 w-4 text-muted-foreground/60" />
              <span className="italic">
                No description provided. Click to add context, links, or notes...
              </span>
            </div>
          )}

          <button
            type="button"
            className="absolute right-3 top-3 opacity-0 group-hover/desc:opacity-100 transition-opacity p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80"
            title="Edit description"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}