import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(1, "Minimum of one character allowed"),
  summary: z
    .string()
    .min(50, "Summary should not be less than 50 characters")
    .max(500, "Summary should be less than 500 characters"),
  content: z.string(),
});
export type ProjectValues = z.infer<typeof ProjectSchema>;
