"use client";

import { useState, useTransition } from "react";
import CommentInput from "./comment-input";
import { createComment } from "@/actions/comment/create-comment";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

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
    const trimmed = content.trim();
    if (!trimmed) return;

    startTransition(async () => {
      try {
        await createComment({
          taskId,
          content: trimmed,
          projectId,
        });
        setContent("");
        toast.success("Comment posted");
      } catch {
        toast.error("Failed to post comment");
      }
    });
  }

  return (
    <div className="space-y-3 rounded-2xl border border-border/80 bg-card/40 p-3.5 backdrop-blur-md">
      <CommentInput
        users={users}
        value={content}
        onChange={setContent}
        onSubmit={handleSubmit}
      />
      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
          <span>Tip:</span>
          <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono border border-border">
            Ctrl + Enter
          </kbd>
          <span>to send</span>
        </span>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={pending || !content.trim()}
          className="flex items-center gap-1.5 rounded-xl bg-foreground px-4 py-2 text-xs font-semibold text-background transition hover:opacity-90 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {pending ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Posting...
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" />
              Post Comment
            </>
          )}
        </button>
      </div>
    </div>
  );
}
