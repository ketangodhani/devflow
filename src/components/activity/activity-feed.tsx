interface ActivityFeedProps {
    activities: {
        id: string;
        action: string;
        entityType: string;
        entityTitle: string;
        createdAt: Date;
    }[];
}
export function ActivityFeed({
    activities,
}: ActivityFeedProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="text-2xl font-bold text-white">
            Activity
        </h2>
        <div className="space-y-4">
            {activities.map((activity) => (
                <div key={activity.id} className="border-b border-zinc-800 rounded-lg pb-4">
                    <p className="text-sm text-white">
                        <span className="font-semibild">
                            {activity.action}
                        </span>{" "}
                        {activity.entityType}:{" "}
                        <span className="text-zinc-400">
                            {activity.entityTitle}
                        </span>
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                        {new Date(activity.createdAt).toLocaleString() }
                    </p>
                </div>
            ))}
        </div>
    </div>
  );
}