import EditableTaskDescription from "./editable-task-description";

interface Props {
  task: any;
}

export default function TaskDescription({ task }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold text-foreground">Description</h2>
      <EditableTaskDescription
        taskId={task.id}
        initialDescription={task.description}
        projectId={task.projectId}
      />
      {/* <p className="whitespace-pre-wrap text-zinc-400">
        {task.description || "No description provided."}
      </p> */}
    </div>
  );
}
