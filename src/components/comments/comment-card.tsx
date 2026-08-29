"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2, Loader2, Check, X, MessageSquare } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { toast } from "sonner";
import { deleteComment } from "@/actions/comment/delete-comment";
import { updateComment } from "@/actions/comment/update-comment";
import { renderCommentContent } from "@/lib/render-comment-content";

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    id?: string;
    name: string | null;
    email: string | null;
    image?: string | null;
  };
}

interface Props {
  comment: Comment;
  projectId: string;
  taskId: string;
  currentUserId?: string;
}

export default function CommentCard({
  comment,
  projectId,
  taskId,
  currentUserId,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [pending, startTransition] = useTransition();

  const authorName = comment.user.name || comment.user.email || "Anonymous";
  const initials = authorName.charAt(0).toUpperCase();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteComment({
          commentId: comment.id,
          projectId,
          taskId,
        });
        toast.success("Comment deleted");
      } catch {
        toast.error("Failed to delete comment");
      }
    });
  }

  function handleUpdate() {
    const trimmed = content.trim();
    if (!trimmed) return;

    startTransition(async () => {
      try {
        await updateComment({
          commentId: comment.id,
          content: trimmed,
          projectId,
          taskId,
        });
        setEditing(false);
        toast.success("Comment updated");
      } catch {
        toast.error("Failed to update comment");
      }
    });
  }

  return (
    <div className="group/comment relative rounded-2xl border border-border/80 bg-card/60 p-4 transition-all hover:border-border hover:shadow-xs">
      <div className="flex items-start justify-between gap-3">
        {/* Author Avatar & Details */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 font-bold text-xs text-indigo-400 border border-indigo-500/20">
            {initials}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground">
                {authorName}
              </p>
              {comment.user.id && currentUserId && comment.user.id === currentUserId && (
                <span className="rounded-full bg-indigo-500/10 px-2 py-0.2 text-[10px] font-medium text-indigo-400">
                  You
                </span>
              )}
            </div>

            <p
              className="text-xs text-muted-foreground"
              title={format(new Date(comment.createdAt), "PPP p")}
            >
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 opacity-80 group-hover/comment:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={() => setEditing(!editing)}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
            title="Edit comment"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={pending}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
            title="Delete comment"
          >
            {pending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Comment Body / Inline Editor */}
      {editing ? (
        <div className="mt-3 space-y-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                handleUpdate();
              }
              if (e.key === "Escape") {
                e.preventDefault();
                setEditing(false);
                setContent(comment.content);
              }
            }}
            className="w-full rounded-xl border border-border/80 bg-background p-3 text-sm text-foreground outline-none ring-2 ring-indigo-500/30 transition placeholder:text-muted-foreground"
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">
              Ctrl+Enter to save • Esc to cancel
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setContent(comment.content);
                }}
                className="flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <X className="h-3 w-3" />
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                disabled={pending}
                className="flex items-center gap-1 rounded-lg bg-foreground px-3 py-1 text-xs font-medium text-background transition hover:opacity-90 shadow-sm disabled:opacity-50"
              >
                {pending ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Check className="h-3 w-3" />
                )}
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3 pl-11 text-sm leading-relaxed text-foreground whitespace-pre-wrap">
          {renderCommentContent(comment.content)}
        </div>
      )}
    </div>
  );
}
