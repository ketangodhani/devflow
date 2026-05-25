"use client";

import { Trash2, Loader2 } from "lucide-react";

import { useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import { deleteAttachment } from "@/actions/attachment/delete-attachment";

interface Attachment {
  id: string;
  name: string;
  url: string;
}

interface Props {
  attachments: Attachment[];
  onDelete: (id: string) => void;
}

export default function AttachmentList({
  attachments, onDelete,
}: Props) {
  const [pending, startTransition] =
    useTransition();

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

    const router = useRouter();

  function handleDelete(
    attachmentId: string
  ) {
    setDeletingId(attachmentId);

    startTransition(async () => {
      try {
        await deleteAttachment(
          attachmentId
        );
        onDelete(attachmentId);
        router.refresh();
      } finally {
        setDeletingId(null);
      }
    });
  }

  return (
    <div className="self-stretch space-y-3">
      {attachments.map((attachment) => {
        const isDeleting =
          deletingId === attachment.id;

        return (
          <div
            key={attachment.id}
            className="flex w-full items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
          >
            <a
              href={attachment.url}
              target="_blank"
              className="text-sm text-white hover:underline"
            >
              {attachment.name}
            </a>

            <button
              disabled={
                pending && isDeleting
              }
              onClick={() =>
                handleDelete(
                  attachment.id
                )
              }
              className="flex items-center gap-2 text-zinc-500 transition hover:text-red-500 disabled:opacity-50"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />

                  <span className="text-xs">
                    Deleting...
                  </span>
                </>
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}