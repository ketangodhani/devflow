import { formatDistanceToNow } from "date-fns";

interface ActivityFeedProps {
  activities: {
    id: string;
    action: string;
    entityType: string;
    entityTitle: string;
    createdAt: Date;
  }[];
}
export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="text-2xl font-bold text-white">Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="border-b border-zinc-800 rounded-lg pb-4"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium text-white">
                {activity.action}
              </p>

              <p className="text-sm text-zinc-400">
                Task:{" "}
                <span className="font-medium text-zinc-200">
                  {activity.entityTitle}
                </span>
              </p>

              <p className="pt-2 text-xs text-zinc-500">
                {formatDistanceToNow(new Date(activity.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
