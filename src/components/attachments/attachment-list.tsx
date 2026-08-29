"use client";

import {
  Trash2,
  Loader2,
  ExternalLink,
  File,
  FileText,
  FileCode,
  Image as ImageIcon,
  Archive,
  Film,
  Paperclip,
} from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteAttachment } from "@/actions/attachment/delete-attachment";

interface Attachment {
  id: string;
  name: string;
  url: string;
  size?: number | null;
  createdAt?: Date;
  uploadedBy?: {
    name?: string | null;
    email?: string | null;
  } | null;
}

interface Props {
  attachments: Attachment[];
  onDelete: (id: string) => void;
}

export default function AttachmentList({ attachments, onDelete }: Props) {
  const [pending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  function getFileIcon(filename: string) {
    const ext = filename.split(".").pop()?.toLowerCase() || "";
    if (["png", "jpg", "jpeg", "webp", "svg", "gif"].includes(ext)) {
      return <ImageIcon className="h-4 w-4 text-emerald-400" />;
    }
    if (["pdf", "doc", "docx", "txt", "md"].includes(ext)) {
      return <FileText className="h-4 w-4 text-sky-400" />;
    }
    if (["ts", "tsx", "js", "jsx", "json", "html", "css", "py"].includes(ext)) {
      return <FileCode className="h-4 w-4 text-amber-400" />;
    }
    if (["zip", "tar", "gz", "rar", "7z"].includes(ext)) {
      return <Archive className="h-4 w-4 text-purple-400" />;
    }
    if (["mp4", "mov", "avi", "webm"].includes(ext)) {
      return <Film className="h-4 w-4 text-rose-400" />;
    }
    return <File className="h-4 w-4 text-zinc-400" />;
  }

  function handleDelete(attachmentId: string) {
    setDeletingId(attachmentId);

    startTransition(async () => {
      try {
        await deleteAttachment(attachmentId);
        onDelete(attachmentId);
        toast.success("Attachment removed");
        router.refresh();
      } catch {
        toast.error("Failed to delete attachment");
      } finally {
        setDeletingId(null);
      }
    });
  }

  if (attachments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-card/30 py-8 px-4 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground mb-2">
          <Paperclip className="h-5 w-5" />
        </div>
        <h4 className="text-xs font-semibold text-foreground">No files attached</h4>
        <p className="text-[11px] text-muted-foreground mt-0.5 max-w-xs">
          Upload specifications, screenshots, or design assets to this task.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {attachments.map((attachment) => {
        const isDeleting = deletingId === attachment.id;

        return (
          <div
            key={attachment.id}
            className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-border/80 bg-card/60 p-3 transition hover:border-border hover:bg-card hover:shadow-xs"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted border border-border/60">
                {getFileIcon(attachment.name)}
              </div>

              <div className="min-w-0">
                <a
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate text-xs font-medium text-foreground hover:text-indigo-400 transition-colors"
                >
                  {attachment.name}
                </a>
                <p className="text-[11px] text-muted-foreground">
                  {attachment.uploadedBy?.name || "Uploaded file"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                title="View / Download file"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <button
                type="button"
                disabled={pending && isDeleting}
                onClick={() => handleDelete(attachment.id)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                title="Delete attachment"
              >
                {isDeleting ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}