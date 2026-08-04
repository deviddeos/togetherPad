import { z } from "zod";
import { NOTE_VISIBILITY } from "../constants/note.constants.js";

export const createNoteSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .min(3, "Slug must be at least 3 characters.")
      .max(100, "Slug cannot exceed 100 characters."),

    visibility: z.enum([NOTE_VISIBILITY.PUBLIC, NOTE_VISIBILITY.PROTECTED]),

    password: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.visibility === NOTE_VISIBILITY.PROTECTED &&
      (!data.password || data.password.length < 6)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password must be at least 6 characters.",
      });
    }
  });

export const updateContentSchema = z.object({
  content: z.string(),
});
