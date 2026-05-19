"use client";

import { updateTaskDescription } from "@/actions/task/update-task-description";
import { useState, useTransition } from "react";

interface Props {
  taskId: string;
  initialDescription: string;
  projectId: string;
}

export default function EditableTaskDescription({
  taskId,
  initialDescription,
  projectId,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const [description, setDescription] = useState(initialDescription);

  const [pending, startTransition] = useTransition();

  function handleSave() {
    setIsEditing(false);

    startTransition(async () => {
      await updateTaskDescription(
        taskId,
        description,
        projectId
      );
    });
  }

  return (
    <div>
      {isEditing ? (
        <textarea
          autoFocus
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSave();
            }

            if (e.key === "Escape") {
              setDescription(initialDescription);
              setIsEditing(false);
            }
          }}
          className="w-full border-none bg-transparent text-md font-bold tracking-tight text-white outline-none"
        />
      ) : (
        <p
          onClick={() => setIsEditing(true)}
          className="cursor-pointer text-md font-bold tracking-tight text-white"
        >
          {pending ? "Saving..." : description || "Click to add description..."}
        </p>
      )}
    </div>
  );
}