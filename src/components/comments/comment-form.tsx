"use client";

import { useState, useTransition } from "react";
import CommentInput from "./comment-input";
import { createComment } from "@/actions/comment/create-comment";

interface Props {
  taskId: string;
  projectId: string;
  users: User[];
}

interface User {
  id: string;
  name: string | null;
  email: string | null;
}
export default function CommentForm({ taskId, projectId, users }: Props) {
  const [content, setContent] = useState("");

  const [pending, startTransition] = useTransition();

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
      <CommentInput users={users} value={content} onChange={setContent} />
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={pending}
          className="rounded-xl bg-foreground text-background px-4 py-2 text-sm font-medium transition hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Posting..." : "Comment"}
        </button>
      </div>
    </div>
  );
}
