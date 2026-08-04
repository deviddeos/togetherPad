import { z } from "zod";

export const updateContentSchema = z.object({
  content: z
    .string()
    .max(100000, "Content is too large.")
    .default(""),
});
