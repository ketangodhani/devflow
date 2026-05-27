"use client";

import { useState } from "react";

import TaskAttachmentUpload from "./task-attachment-upload";

import AttachmentList from "./attachment-list";

interface Attachment {
  id: string;
  name: string;
  url: string;
  fileKey: string;
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
    <div className=" space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Attachments</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Upload files for this task.
          </p>
        </div>
        <TaskAttachmentUpload
          taskId={taskId}
          projectId={projectId}
          onUploaded={(attachment) => {
            setAttachments((prev) => [attachment, ...prev]);
          }}
        />
      </div>
      <AttachmentList
        attachments={attachments}
        onDelete={(id) => {
          setAttachments((prev) => prev.filter((a) => a.id !== id));
        }}
      />
    </div>
  );
}
