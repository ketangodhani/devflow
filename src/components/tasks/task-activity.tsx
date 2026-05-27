import { formatDistanceToNow } from "date-fns";

interface Props {
  activities: any[];
}

export default function TaskActivity({ activities }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="mb-6 text-lg font-semibold text-foreground">Activity</h2>{" "}
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="rounded-2xl border border-border p-4"
          >
            <p className="text-sm font-medium text-foreground">{activity.action}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(activity.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
