import { z } from "zod";

export const createProjectSchema = z.object({
  title: z
    .string()
    .min(3, "Title is too short")
    .max(50),

  description: z
    .string()
    .max(500)
    .optional(),
});