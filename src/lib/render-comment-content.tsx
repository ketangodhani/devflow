import { ReactNode } from "react";

export function renderCommentContent(
  content: string
): ReactNode[] {
  const parts =
    content.split(/(@\w+)/g);

  return parts.map(
    (part, index) => {
      if (
        part.startsWith("@")
      ) {
        return (
          <span
            key={index}
            className="rounded-md bg-blue-500/10 px-1.5 py-0.5 font-medium text-blue-400"
          >
            {part}
          </span>
        );
      }

      return part;
    }
  );
}