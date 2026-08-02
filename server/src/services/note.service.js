import bcrypt from "bcrypt";
import Note from "../models/Note.js";
import ApiError from "../utils/ApiError.js";
import { NOTE_VISIBILITY } from "../constants/note.constants.js";
import { HTTP_STATUS } from "../constants/api.constants.js";
import { NOTE_MESSAGES } from "../constants/message.constants.js";

const createNoteService = async ({ slug, visibility, password }) => {
  const normalizedSlug = slug.trim().toLowerCase();

  const existingNote = await Note.findOne({ slug: normalizedSlug });

  if (existingNote) {
    throw new ApiError(HTTP_STATUS.CONFLICT, NOTE_MESSAGES.SLUG_EXISTS);
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

const getNoteService = async (slug) => {
  const normalizedSlug = slug.trim().toLowerCase();

  const note = await Note.findOne({ slug: normalizedSlug });

  if (!note) {
    return { exists: false, slug: normalizedSlug };
  }

  if (note.visibility === NOTE_VISIBILITY.PROTECTED) {
    return { exists: true, requiresPassword: true, slug: note.slug };
  }

  return { exists: true, requiresPassword: false, note };
};

export { createNoteService, getNoteService };
