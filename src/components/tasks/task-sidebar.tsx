import { format } from "date-fns";
import TaskDeleteButton from "./task-delete-button";
import TaskStatusSelect from "./task-select-status";
import TaskPrioritySelect from "./task-priority-select";
import TaskLabels from "./task-labels";
import TaskDueDatePicker from "./task-due-date-picker";
import TaskAssigneeSelect from "./task-assignee-select";

interface Props {
  task: any;
  users: {
    id: string;
    name: string | null;
    email: string | null;
  }[];
}

export default function TaskSidebar({ task, users }: Props) {
  return (
    <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 h-fit sticky top-24 overflow-visible">
      <TaskLabels
        taskId={task.id}
        initialLabels={task.labels}
        projectId={task.projectId}
      />
      <TaskDueDatePicker
        taskId={task.id}
        dueDate={task.dueDate}
        projectId={task.projectId}
      />
      <TaskStatusSelect
        taskId={task.id}
        currentStatus={task.status}
        projectId={task.projectId}
      />
      <TaskAssigneeSelect
        taskId={task.id}
        currentAssigneeId={task.assigneeId}
        users={users}
        projectId={task.projectId}
      />
      <TaskPrioritySelect
        taskId={task.id}
        currentPriority={task.priority}
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
