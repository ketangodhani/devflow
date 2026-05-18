"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import TaskDetailsContent from "./task-details-content";

interface Props {
  task: any;
}

export default function TaskDetailsModal({ task }: Props) {
  const router = useRouter();
  return (
    <Dialog
      open
      onOpenChange={() => router.back()}
    >
      <DialogContent className="max-w-4xl">
        <TaskDetailsContent task={task} />
      </DialogContent>
    </Dialog>
  );
}