"use client";

import { useState, useTransition } from "react";

import { createComment } from "@/actions/comment/create-comment";

interface Props {
  taskId: string;
  projectId: string;
}

export default function CommentForm({
  taskId,
  projectId,
}: Props) {
  const [content, setContent] = useState("");

  const [pending, startTransition] =
    useTransition();

  function handleSubmit() {
    if (!content.trim()) return;

    startTransition(async () => {
      await createComment({
        taskId,
        content,
        projectId,
      });

      setContent("");
    });
  }

  return (
    <div className="space-y-3">
      <textarea
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        placeholder="Write a comment..."
        className="min-h-30 w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-sm text-white outline-none"
      />

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={pending}
          className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black"
        >
          {pending
            ? "Posting..."
            : "Comment"}
        </button>
      </div>
    </div>
  );
}