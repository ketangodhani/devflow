"use client";

import { useState, useTransition } from "react";

import { Pencil, Trash2, Loader2, Check, X } from "lucide-react";

import { deleteComment } from "@/actions/comment/delete-comment";

import { updateComment } from "@/actions/comment/update-comment";

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    name: string | null;
    email: string | null;
  };
}

interface Props {
  comment: Comment;

  projectId: string;

  taskId: string;
}

export default function CommentCard({ comment, projectId, taskId }: Props) {
  const [editing, setEditing] = useState(false);

  const [content, setContent] = useState(comment.content);

  const [pending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteComment({
        commentId: comment.id,
        projectId,
        taskId,
      });
    });
  }

  function handleUpdate() {
    startTransition(async () => {
      await updateComment({
        commentId: comment.id,
        content,
        projectId,
        taskId,
      });

      setEditing(false);
    });
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-medium text-white">
            {comment.user.name || comment.user.email}
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditing(!editing)}
            className="text-zinc-500 transition hover:text-white"
          >
            <Pencil className="h-4 w-4" />
          </button>

          <button
            onClick={handleDelete}
            className="text-zinc-500 transition hover:text-red-500"
          >
            {pending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {editing ? (
        <div className="mt-4 space-y-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-25 w-full rounded-xl border border-zinc-800 bg-black p-3 text-sm text-white outline-none"
          />

          <div className="flex items-center gap-2">
            <button
              onClick={handleUpdate}
              disabled={pending}
              className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              <Check className="h-4 w-4" />
            </button>

            <button
              onClick={() => {
                setEditing(false);

                setContent(comment.content);
              }}
              className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-white transition hover:bg-zinc-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-4 whitespace-pre-wrap text-sm text-zinc-300">
          {comment.content}
        </p>
      )}
    </div>
  );
}
