"use client";

import { useState, useTransition } from "react";
import { X, Tag, Plus, Loader2 } from "lucide-react";
import { updateTaskLabels } from "@/actions/task/update-task-labels";
import { toast } from "sonner";

interface Props {
  taskId: string;
  initialLabels: string[];
  projectId: string;
}

export default function TaskLabels({
  taskId,
  initialLabels,
  projectId,
}: Props) {
  const [labels, setLabels] = useState(initialLabels || []);
  const [input, setInput] = useState("");
  const [pending, startTransition] = useTransition();

  function saveLabels(updated: string[]) {
    setLabels(updated);

    startTransition(async () => {
      try {
        await updateTaskLabels(taskId, updated, projectId);
        toast.success("Labels updated");
      } catch {
        toast.error("Failed to update labels");
      }
    });
  }

  function addLabel() {
    const trimmed = input.trim();
    if (!trimmed) return;

    if (labels.includes(trimmed)) {
      toast.info("Label already added");
      setInput("");
      return;
    }

    const updated = [...labels, trimmed];
    saveLabels(updated);
    setInput("");
  }

  function removeLabel(label: string) {
    const updated = labels.filter((l) => l !== label);
    saveLabels(updated);
  }

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Labels
        </label>
        {pending && (
          <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
        )}
      </div>

      {/* Label Chips */}
      <div className="flex flex-wrap gap-1.5 min-h-6">
        {labels.length > 0 ? (
          labels.map((label) => (
            <div
              key={label}
              className="group flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-300 transition hover:bg-indigo-500/20"
            >
              <Tag className="h-3 w-3 text-indigo-400" />
              <span>{label}</span>
              <button
                type="button"
                onClick={() => removeLabel(label)}
                className="text-indigo-400/70 hover:text-indigo-200 transition p-0.5 rounded-full"
                title="Remove label"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))
        ) : (
          <span className="text-xs text-muted-foreground italic">
            No labels attached
          </span>
        )}
      </div>

      {/* Add Label Input */}
      <div className="flex items-center gap-1.5 pt-1">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addLabel();
            }
          }}
          placeholder="New label..."
          className="flex-1 rounded-xl border border-border/80 bg-background/60 px-3 py-1.5 text-xs text-foreground outline-none ring-2 ring-indigo-500/20 transition placeholder:text-muted-foreground focus:border-transparent focus:ring-indigo-500/50"
        />

        <button
          type="button"
          onClick={addLabel}
          disabled={pending || !input.trim()}
          className="flex h-7 items-center justify-center gap-1 rounded-xl bg-foreground px-3 text-xs font-semibold text-background transition hover:opacity-90 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}