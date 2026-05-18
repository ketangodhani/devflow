import { format } from "date-fns";
import TaskDeleteButton from "./task-delete-button";

interface Props {
  task: any;
}

export default function TaskSidebar({ task }: Props) {
  return (
    <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 h-fit sticky top-6">
      <div>
        <p className="text-sm text-zinc-500">Status</p>
        <p className="mt-2 font-medium text-white">{task.status}</p>
      </div>
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
      <TaskDeleteButton taskId={task.id} />
    </div>
  );
}
