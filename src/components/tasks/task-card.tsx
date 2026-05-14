import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { TaskStatus } from "@prisma/client";
import { motion } from "framer-motion";

interface TaskCardProps {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
}
export function TaskCard({ id, title, description }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
  };
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
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-2xl border border-zinc-800 bg-black p-4 active:cursor-grabbing"
    >
      <h3 className="font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm text-zinc-400">{description}</p>
    </motion.div>
  );
}
