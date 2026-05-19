import { format } from "date-fns";
import TaskDeleteButton from "./task-delete-button";
import TaskStatusSelect from "./task-select-status";

interface Props {
  task: any;
}

export default function TaskSidebar({ task }: Props) {
  return (
    <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 h-fit sticky top-6 overflow-visible">
      <TaskStatusSelect
        taskId={task.id}
        currentStatus={task.status}
        projectId={task.projectId}
      />
      <div>
        <p className="text-sm text-zinc-500">Created</p>

        <p className="mt-2 text-white">
          {format(new Date(task.createdAt), "PPP")}
        </p>
      </div>{" "}
      <div>
        <p className="text-sm text-zinc-500">Updated</p>

        <p className="mt-2 text-white">
          {format(new Date(task.updatedAt), "PPP")}
        </p>
      </div>
      <TaskDeleteButton taskId={task.id} projectId={task.projectId} />
    </div>
  );
}
