import { formatDistanceToNow } from "date-fns";
import CommentCard from "./comment-card";

interface Comment {
  id: string;
  content: string;

  createdAt: Date;

  user: {
    name: string | null;
    email: string | null;
  };
}

interface Props {
  comments: Comment[];
  projectId: string;
  taskId: string;
}

export default function CommentList({ comments, projectId, taskId }: Props) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          projectId={projectId}
          taskId={taskId}
        />
      ))}
      {/* {comments.map((comment) => (
        <div
          key={comment.id}
          className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-white">
              {comment.user.name ||
                comment.user.email}
            </p>

            <p className="text-xs text-zinc-500">
              {formatDistanceToNow(
                new Date(comment.createdAt),
                {
                  addSuffix: true,
                }
              )}
            </p>
          </div>

          <p className="text-sm leading-relaxed text-zinc-300">
            {comment.content}
          </p>
        </div>
      ))} */}
    </div>
  );
}
