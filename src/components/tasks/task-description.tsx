import EditableTaskDescription from "./editable-task-description";
import { AlignLeft } from "lucide-react";

interface Props {
  task: any;
}

export default function TaskDescription({ task }: Props) {
  return (
    <div className="rounded-3xl border border-border/80 bg-card/60 p-6 backdrop-blur-xl transition shadow-xs">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
            <AlignLeft className="h-4 w-4" />
          </div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
            Description
          </h2>
        </div>
      </div>

      <EditableTaskDescription
        taskId={task.id}
        initialDescription={task.description}
        projectId={task.projectId}
      />
    </div>
  );
}
