"use client";

import { useState } from "react";
import TaskAttachmentUpload from "./task-attachment-upload";
import AttachmentList from "./attachment-list";

interface Attachment {
  id: string;
  name: string;
  url: string;
  fileKey: string;
  size?: number | null;
  createdAt?: Date;
  uploadedBy?: {
    name?: string | null;
    email?: string | null;
  } | null;
}

interface Props {
  taskId: string;
  projectId: string;
  initialAttachments: Attachment[];
}

export default function TaskAttachmentsSection({
  taskId,
  projectId,
  initialAttachments,
}: Props) {
  const [attachments, setAttachments] = useState(initialAttachments);

  return (
    <div className="space-y-6">
      <TaskAttachmentUpload
        taskId={taskId}
        projectId={projectId}
        onUploaded={(attachment) => {
          setAttachments((prev) => [attachment, ...prev]);
        }}
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Uploaded Files ({attachments.length})
          </h3>
        </div>

        <AttachmentList
          attachments={attachments}
          onDelete={(id) => {
            setAttachments((prev) => prev.filter((a) => a.id !== id));
          }}
        />
      </div>
    </div>
  );
}
