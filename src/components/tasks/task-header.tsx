import EditableTaskTitle from "./editable-task-title";

interface Props {
  task: any;
}

export default function TaskHeader({ task }: Props) {
  return (
    <div className="space-y-3 border-b border-border pb-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-green-900 px-3 py-1 text-xs text-white">
          {task.status}
        </div>
      </div>

      <EditableTaskTitle 
        taskId={task.id}
        initialTitle={task.title}
        projectId={task.projectId}
      />
    </div>
  );
}