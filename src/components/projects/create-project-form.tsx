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
      className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-6"
    >

      <div>
        <h2 className="text-2xl font-bold text-white">
          Create Project
        </h2>

        <p className="mt-1 text-zinc-400">
          Start managing a new project.
        </p>
      </div>

      <input
        name="title"
        placeholder="Project title"
        className="w-full rounded-xl border border-zinc-800 bg-black p-4 text-white outline-none"
      />

      <textarea
        name="description"
        placeholder="Description"
        className="min-h-30 w-full rounded-xl border border-zinc-800 bg-black p-4 text-white outline-none"
      />

      <button
        disabled={loading}
        className="rounded-xl bg-white px-6 py-3 font-medium text-black"
      >
        {loading ? "Creating..." : "Create Project"}
      </button>

    </form>
  );
}