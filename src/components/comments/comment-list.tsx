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
    </div>
  );
}
