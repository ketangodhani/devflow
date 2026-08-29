"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { updateTaskTitle } from "@/actions/task/update-task-title";
import { Pencil, Check, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  taskId: string;
  initialTitle: string;
  projectId: string;
}

export default function EditableTaskTitle({
  taskId,
  initialTitle,
  projectId,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  function handleSave() {
    const trimmed = title.trim();
    if (!trimmed) {
      setTitle(initialTitle);
      setIsEditing(false);
      return;
    }

    if (trimmed === initialTitle) {
      setIsEditing(false);
      return;
    }

    setIsEditing(false);
    startTransition(async () => {
      try {
        await updateTaskTitle(taskId, trimmed, projectId);
        toast.success("Task title updated");
      } catch {
        setTitle(initialTitle);
        toast.error("Failed to update task title");
      }
    });
  }

  function handleCancel() {
    setTitle(initialTitle);
    setIsEditing(false);
  }

  return (
    <div className="relative group">
      {isEditing ? (
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSave();
              }
              if (e.key === "Escape") {
                e.preventDefault();
                handleCancel();
              }
            }}
            onBlur={handleSave}
            placeholder="Task title..."
            className="w-full rounded-xl border border-border/80 bg-muted/40 px-3.5 py-2 text-2xl font-bold tracking-tight text-foreground outline-none ring-2 ring-indigo-500/40 transition sm:text-3xl lg:text-4xl"
          />
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleSave}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background transition hover:opacity-90 shadow-sm"
              title="Save (Enter)"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleCancel}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:bg-muted hover:text-foreground"
              title="Cancel (Esc)"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="group/title -ml-2 flex cursor-pointer items-start justify-between gap-3 rounded-2xl p-2 transition hover:bg-muted/50"
        >
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl leading-tight">
              {title}
            </h1>
            {pending && (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground shrink-0 mt-1" />
            )}
          </div>
          <button
            type="button"
            className="opacity-0 group-hover/title:opacity-100 transition-opacity p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            title="Edit title"
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}