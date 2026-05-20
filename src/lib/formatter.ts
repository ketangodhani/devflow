import { TaskPriority, TaskStatus } from "@prisma/client";

export function formatStatus(
  status: TaskStatus
) {
  switch (status) {
    case "TODO":
      return "Todo";

    case "IN_PROGRESS":
      return "In Progress";

    case "DONE":
      return "Done";

    default:
      return status;
  }
}

export function formatPriority(
  priority: TaskPriority
) {
  switch (priority) {
    case "LOW":
      return "Low";

    case "MEDIUM":
      return "Medium";

    case "HIGH":
      return "High";

    case "URGENT":
      return "Urgent";

    default:
      return priority;
  }
}