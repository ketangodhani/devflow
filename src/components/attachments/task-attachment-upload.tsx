"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { UploadCloud } from "lucide-react";

import { createAttachment } from "@/actions/attachment/create-attachment";

import { generateReactHelpers } from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

interface Props {
  taskId: string;
  projectId: string;
  onUploaded: (attachment: any) => void;
}

export default function TaskAttachmentUpload({ taskId, projectId, onUploaded }: Props) {
  const [file, setFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  const { startUpload } = useUploadThing("taskAttachment");

  const router = useRouter();

  async function handleUpload() {
    if (!file) return;

    try {
      setUploading(true);

      const res = await startUpload([file]);

      if (!res?.length) return;

      const uploaded = res[0];

      const attachment = await createAttachment({
        taskId,
        projectId,

        name: uploaded.name,

        url: uploaded.ufsUrl,

        fileKey: uploaded.key,
      });
      onUploaded(attachment);
      router.refresh();

      setFile(null);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="w-fit">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/50 p-8 transition hover:border-zinc-500">
        <UploadCloud className="mb-3 h-6 w-8 text-zinc-500" />

        <p className="text-sm text-zinc-400">Click to select file</p>

        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            const selected = e.target.files?.[0];

            if (selected) {
              setFile(selected);
            }
          }}
        />
      </label>

      {file && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 mt-2">
          <p className="text-sm text-white">{file.name}</p>

          <p className="mt-1 text-xs text-zinc-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-4 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}
    </div>
  );
}
