interface DashboardCardProps {
  title: string;
  value: string;
}

export function DashboardCard({
  title,
  value,
}: DashboardCardProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">

      <p className="text-zinc-400">
        {title}
      </p>

      <h2 className="mt-4 text-4xl font-bold text-foreground">
        {value}
      </h2>

    </div>
  );
}