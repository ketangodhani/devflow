interface DashboardCardProps {
  title: string;
  value: string;
}

export function DashboardCard({
  title,
  value,
}: DashboardCardProps) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

      <p className="text-zinc-400">
        {title}
      </p>

      <h2 className="mt-4 text-4xl font-bold text-white">
        {value}
      </h2>

    </div>
  );
}