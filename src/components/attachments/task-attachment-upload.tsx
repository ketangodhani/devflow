"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, File, Loader2, X, Check } from "lucide-react";
import { toast } from "sonner";
import { createAttachment } from "@/actions/attachment/create-attachment";
import { generateReactHelpers } from "@uploadthing/react";
import { useDropzone } from "react-dropzone";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

interface Props {
  taskId: string;
  projectId: string;
  onUploaded: (attachment: any) => void;
}

export default function TaskAttachmentUpload({
  taskId,
  projectId,
  onUploaded,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { startUpload } = useUploadThing("taskAttachment");
  const router = useRouter();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      const selected = acceptedFiles[0];
      if (selected) {
        setFile(selected);
      }
    },
  });

  async function handleUpload() {
    if (!file) return;

    try {
      setUploading(true);
      const res = await startUpload([file]);

      if (!res?.length) {
        toast.error("Upload failed");
        return;
      }

      const uploaded = res[0];

      const attachment = await createAttachment({
        taskId,
        projectId,
        name: uploaded.name,
        url: uploaded.ufsUrl,
        fileKey: uploaded.key,
      });

      onUploaded(attachment);
      toast.success("File uploaded successfully");
      router.refresh();
      setFile(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload file");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="w-full space-y-3">
      <div
        {...getRootProps()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed p-6 transition text-center ${
          isDragActive
            ? "border-indigo-500 bg-indigo-500/10"
            : "border-border/80 bg-card/40 hover:border-border hover:bg-card/70"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 mb-2">
          <UploadCloud className="h-5 w-5" />
        </div>
        <p className="text-xs font-semibold text-foreground">
          {isDragActive ? "Drop the file here" : "Drag & drop files here, or click to browse"}
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Support for images, docs, videos, code archives (up to 32MB)
        </p>
      </div>

      {file && (
        <div className="flex items-center justify-between rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-3 animate-in fade-in zoom-in-95">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
              <File className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-foreground">
                {file.name}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setFile(null)}
              disabled={uploading}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="flex items-center gap-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 text-xs font-semibold text-white transition shadow-sm disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Check className="h-3 w-3" />
                  Upload
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
