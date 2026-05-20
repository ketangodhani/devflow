import { formatDistanceToNow } from "date-fns";
import TaskHeader from "./task-header";
import TaskDescription from "./task-description";
import TaskActivity from "./task-activity";
import TaskSidebar from "./task-sidebar";

interface Props {
  task: any;
  users: {
    id: string;
    name: string | null;
    email: string | null;
  }[];
}

export default function TaskDetailsContent({ task, users }: Props) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-8">
        <TaskHeader task={task} />

        <TaskDescription task={task} />

        <TaskActivity activities={task.activities} />
      </div>

      <TaskSidebar task={task} users={users} />
    </div>
  );
}
