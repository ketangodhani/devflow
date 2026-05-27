"use client"
import { createTask } from "@/actions/task";
import { useTransition } from "react";

interface createTaskFormProps {
  projectId: string;
}

export function CreateTaskForm({ projectId }: createTaskFormProps) {
  const [loading, statrtTransition] = useTransition();
  return (
    <form
      action={(formData) => statrtTransition(() => createTask(formData))}
      className="rounded-3xl border border-border bg-card p-6"
    >
      <input type="hidden" name="projectId" value={projectId} />
      <div>
        <h2 className="text-xl font-semibold text-foreground">Create Task</h2>
        <p className="text-zinc-400">Add a new task to your workflow.</p>
      </div>
      <input
        name="title"
        placeholder="Task title"
        className="w-full rounded-xl border border-border bg-background p-4 text-foreground outline-none mt-2"
      />
      <textarea
        name="description"
        placeholder="Description (optional)"
        className="min-h-30 w-full rounded-xl border border-border bg-background p-4 text-foreground outline-none mt-2"
      />
      <button
        disabled={loading}
        className="rounded-xl bg-foreground px-6 py-3 font-medium text-background cursor-pointer"
      >
        {loading ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
}
