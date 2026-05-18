interface Props {
  task: any;
}

export default function TaskDescription({ task }: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="mb-4 text-lg font-semibold text-white">
        Description
      </h2>

      <p className="whitespace-pre-wrap text-zinc-400">
        {task.description || "No description provided."}
      </p>
    </div>
  );
}