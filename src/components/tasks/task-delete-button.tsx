"use client";

import { Trash2 } from "lucide-react";

interface Props {
  taskId: string;
}

export default function TaskDeleteButton({ taskId }: Props) {
  async function handleDelete() {
    console.log("Delete task:", taskId);

    // later:
    // await deleteTask(taskId)
  }

  return (
    <button
      onClick={handleDelete}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
    >
      <Trash2 size={16} />
      Delete Task
    </button>
  );
}