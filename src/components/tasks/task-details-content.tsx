import { formatDistanceToNow } from "date-fns";

interface Props {
  task: any;
}

export default function TaskDetailsContent({ task }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">
            {task.title}
          </h2><p className="mt-2 text-muted-foreground">
            {task.description || "No description"}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="rounded-lg border px-3 py-1 text-sm">
            Status: {task.status}
          </div>

          {task.priority && (
            <div className="rounded-lg border px-3 py-1 text-sm">
              Priority: {task.priority}
            </div>
          )}</div>

        <div className="space-y-2">
          <h3 className="font-semibold">
            Activity
          </h3>

          <div className="space-y-3">
            {task.activities?.map((activity: any) => (
              <div
                key={activity.id}
                className="rounded-lg border p-3 text-sm"
              >
                <p>
                  {activity.action}
                </p><p className="mt-1 text-xs text-muted-foreground">
                  {formatDistanceToNow(
                    new Date(activity.createdAt),
                    {
                      addSuffix: true,
                    }
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div><div className="space-y-4 border-l pl-6">
        <div>
          <p className="text-sm text-muted-foreground">
            Created
          </p>

          <p className="font-medium">
            {formatDistanceToNow(
              new Date(task.createdAt),
              {
                addSuffix: true,
              }
            )}
          </p>
        </div>

        <div><p className="text-sm text-muted-foreground">
            Updated
          </p>

          <p className="font-medium">
            {formatDistanceToNow(
              new Date(task.updatedAt),
              {
                addSuffix: true,
              }
            )}
          </p>
        </div>
      </div>
    </div>
  );
}