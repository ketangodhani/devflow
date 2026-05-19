import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { TaskPriority, TaskStatus } from "@prisma/client";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TaskCardProps {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  projectId: string;
  priority: TaskPriority;
  labels: string[];
}
export function TaskCard({
  id,
  title,
  description,
  projectId,
  priority,
  labels,
}: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
  };

  const router = useRouter();
  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      ref={setNodeRef}
      style={style}
      className="rounded-2xl border border-zinc-800 bg-black p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div
          onClick={() => router.push(`/projects/${projectId}/tasks/${id}`)}
          className="flex-1 cursor-pointer"
        >
          <h3 className="font-semibold text-white">{title}</h3>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`
      rounded-full px-2 py-1 text-xs font-medium
      ${priority === "LOW" ? "bg-zinc-800 text-zinc-300" : ""}
      ${priority === "MEDIUM" ? "bg-blue-500/20 text-blue-400" : ""}
      ${priority === "HIGH" ? "bg-orange-500/20 text-orange-400" : ""}
      ${priority === "URGENT" ? "bg-red-500/20 text-red-400" : ""}
    `}
            >
              {priority}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {labels.map((label) => (
              <span
                key={label}
                className="rounded-full bg-zinc-800 px-2 py-1 text-xs text-zinc-300"
              >
                {label}
              </span>
            ))}
          </div>
          <p className="mt-2 text-sm text-zinc-400">{description}</p>
        </div>
        {/* </Link> */}

        <button
          {...listeners}
          {...attributes}
          className="cursor-grab text-zinc-500 active:cursor-grabbing"
        >
          <GripVertical size={18} />
        </button>
      </div>
    </motion.div>
  );
}
