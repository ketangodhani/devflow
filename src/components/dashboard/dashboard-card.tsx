import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
  description?: string;
  className?: string;
}

export function DashboardCard({
  title,
  value,
  icon,
  description,
  className = "",
}: DashboardCardProps) {
  return (
    <div className={`rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:border-border/100 transition-all ${className}`}>
      <div className="flex items-center justify-between space-y-0">
        <p className="text-sm font-medium text-muted-foreground tracking-tight">
          {title}
        </p>
        {icon && (
          <div className="p-2 rounded-xl bg-muted/60 text-muted-foreground border border-border/40">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          {value}
        </h2>
        {description && (
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}