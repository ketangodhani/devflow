import z from "zod";
import { TaskPriority, TaskStatus } from "@prisma/client";

export const createTaskSchema = z.object({
  title: z.string().min(2, "Title is too short").max(120, "Title is too long"),
  description: z.string().optional(),
  projectId: z.string().min(1, "Project ID is required"),
  status: z.nativeEnum(TaskStatus).optional().default(TaskStatus.TODO),
  priority: z.nativeEnum(TaskPriority).optional().default(TaskPriority.MEDIUM),
  assigneeId: z.string().optional().nullable(),
  dueDate: z.string().optional().nullable(),
  labels: z.array(z.string()).optional().default([]),
});
