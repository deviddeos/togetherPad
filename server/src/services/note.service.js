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

const verifyPasswordService = async ({ slug, password }) => {
  const normalizedSlug = slug.trim().toLowerCase();

  const note = await Note.findOne({ slug: normalizedSlug }).select("+password");

  if (!note) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, NOTE_MESSAGES.NOT_FOUND);
  }

  // Public notes don't need verification — grant access directly
  if (note.visibility === NOTE_VISIBILITY.PUBLIC) {
    return note;
  }

  const isValid = await bcrypt.compare(password, note.password);

  if (!isValid) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, NOTE_MESSAGES.PASSWORD_INCORRECT);
  }

  return note;
};

export { createNoteService, getNoteService, verifyPasswordService };
