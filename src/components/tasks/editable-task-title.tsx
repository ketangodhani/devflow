"use client";

import { useState, useTransition } from "react";
import { updateTaskTitle } from "@/actions/task/update-task-title";

interface Props {
  taskId: string;
  initialTitle: string;
  projectId: string;
}

export default function EditableTaskTitle({
  taskId,
  initialTitle,
  projectId,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(initialTitle);

  const [pending, startTransition] = useTransition();

  function handleSave() {
    setIsEditing(false);

    startTransition(async () => {
      await updateTaskTitle(
        taskId,
        title,
        projectId
      );
    });
  }

  return (
    <div>
      {isEditing ? (
        <input
          autoFocus
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSave();
            }

            if (e.key === "Escape") {
              setTitle(initialTitle);
              setIsEditing(false);
            }
          }}
          className="w-full border-none bg-transparent text-4xl font-bold tracking-tight text-white outline-none"
        />
      ) : (
        <h1
          onClick={() => setIsEditing(true)}
          className="cursor-pointer text-4xl font-bold tracking-tight text-white"
        >
          {pending ? "Saving..." : title}
        </h1>
      )}
    </div>
  );
}