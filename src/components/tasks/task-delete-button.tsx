"use client";

import { deleteTask } from "@/actions/task/delete-task";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface Props {
  taskId: string;
  projectId: string;
}

export default function TaskDeleteButton({ taskId, projectId }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  async function handleDelete() {
    const confirmed = confirm(
      "Are you sure you want to delete this task? This action cannot be undone.",
    );
    if (!confirmed) {
      return;
    }
    startTransition(async () => {
      await deleteTask(taskId, projectId);
      router.push(`/projects/${projectId}`);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-500/20 disabled:opacity-50"
    >
      <Trash2 size={16} />

      {pending ? "Deleting..." : "Delete Task"}
    </button>
  );
}
