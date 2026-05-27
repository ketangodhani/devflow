"use client";

import { useTransition } from "react";

import { createProject } from "@/actions/project";

export function CreateProjectForm() {
  const [loading, startTransition] =
    useTransition();

  return (
    <form
      action={(formData) =>
        startTransition(() =>
          createProject(formData)
        )
      }
      className="space-y-4 rounded-3xl border border-border bg-card p-6"
    >

      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Create Project
        </h2>

        <p className="mt-1 text-zinc-400">
          Start managing a new project.
        </p>
      </div>

      <input
        name="title"
        placeholder="Project title"
        className="w-full rounded-xl border border-border bg-background p-4 text-foreground outline-none"
      />

      <textarea
        name="description"
        placeholder="Description"
        className="min-h-30 w-full rounded-xl border border-border bg-background p-4 text-foreground outline-none"
      />

      <button
        disabled={loading}
        className="rounded-xl bg-foreground px-6 py-3 font-medium text-background cursor-pointer"
      >
        {loading ? "Creating..." : "Create Project"}
      </button>

    </form>
  );
}