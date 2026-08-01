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
    throw new ApiError(HTTP_STATUS.CONFLICT, NOTE_MESSAGES.SLUG_CONFLICT);
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
