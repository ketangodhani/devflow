"use client";

import { useState, useTransition } from "react";

import { X } from "lucide-react";

import { updateTaskLabels } from "@/actions/task/update-task-labels";

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
  const [labels, setLabels] =
    useState(initialLabels);

  const [input, setInput] = useState("");

  const [pending, startTransition] =
    useTransition();

  function saveLabels(updated: string[]) {
    setLabels(updated);

    startTransition(async () => {
      await updateTaskLabels(
        taskId,
        updated,
        projectId
      );
    });
  }

  function addLabel() {
    const trimmed = input.trim();

    if (!trimmed) return;

    if (labels.includes(trimmed)) return;

    const updated = [...labels, trimmed];

    saveLabels(updated);

    setInput("");
  }

  function removeLabel(label: string) {
    const updated = labels.filter(
      (l) => l !== label
    );

    saveLabels(updated);
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-zinc-500">
          Labels
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {labels.map((label) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
            >
              {label}

              <button
                onClick={() =>
                  removeLabel(label)
                }
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addLabel();
            }
          }}
          placeholder="Add label..."
          className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white outline-none"
        />

        <button
          onClick={addLabel}
          disabled={pending}
          className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black"
        >
          Add
        </button>
      </div>
    </div>
  );
}