import z from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3, "Title is too short").max(100, "Title is too long"),
  description: z.string().optional(),
  projectId: z.string(),
});
