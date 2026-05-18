import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { TaskStatus } from "@prisma/client";
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
}
export function TaskCard({ id, title, description, projectId }: TaskCardProps) {
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
        {/* <Link href={`/projects/${projectId}/tasks/${id}`} className="flex-1"> */}
        <div
          onClick={() => router.push(`/projects/${projectId}/tasks/${id}`)}
          className="flex-1 cursor-pointer"
        >
          <h3 className="font-semibold text-white">{title}</h3>

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
  // return (
  //   <Link href={`/projects/${projectId}/tasks/${id}`} className="w-full">
  //     <motion.div
  //       layout
  //       initial={{
  //         opacity: 0,
  //         y: 20,
  //       }}
  //       animate={{
  //         opacity: 1,
  //         y: 0,
  //       }}
  //       ref={setNodeRef}
  //       style={style}
  //       {...listeners}
  //       {...attributes}
  //       className="cursor-grab rounded-2xl border border-zinc-800 bg-black p-4 active:cursor-grabbing"
  //     >
  //       <h3 className="font-semibold text-white">{title}</h3>

  //       <p className="mt-2 text-sm text-zinc-400">{description}</p>
  //     </motion.div>
  //   </Link>
  // );
}
