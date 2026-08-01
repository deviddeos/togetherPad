import bcrypt from "bcrypt";
import Note from "../models/Note.js";
import { NOTE_VISIBILITY } from "../constants/note.constants.js";
import { MESSAGES } from "../constants/message.constants.js";

const createNoteService = async ({ slug, visibility, password }) => {
  const normalizedSlug = slug.trim().toLowerCase();

  const existingNote = await Note.findOne({ slug: normalizedSlug });

  if (existingNote) {
    const error = new Error(MESSAGES.NOTE_SLUG_CONFLICT);
    error.statusCode = 409;
    throw error;
  }

  let hashedPassword = null;

  if (visibility === NOTE_VISIBILITY.PROTECTED) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const note = await Note.create({
    slug: normalizedSlug,
    visibility,
    password: hashedPassword,
  });

  return note;
};

export { createNoteService };
