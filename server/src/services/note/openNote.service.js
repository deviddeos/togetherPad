import bcrypt from "bcrypt";
import Note from "../../models/Note.js";
import ApiError from "../../utils/ApiError.js";
import { NOTE_VISIBILITY } from "../../constants/note.constants.js";
import { HTTP_STATUS } from "../../constants/api.constants.js";
import { NOTE_MESSAGES } from "../../constants/message.constants.js";

const openNoteService = async ({ slug, password }) => {
  const normalizedSlug = slug.trim().toLowerCase();

  const note = await Note.findOne({ slug: normalizedSlug }).select("+password");

  if (!note) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, NOTE_MESSAGES.NOT_FOUND);
  }

  if (note.visibility === NOTE_VISIBILITY.PUBLIC) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, NOTE_MESSAGES.NOT_PROTECTED);
  }

  const isValid = await bcrypt.compare(password, note.password);

  if (!isValid) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, NOTE_MESSAGES.PASSWORD_INCORRECT);
  }

  return note;
};

export default openNoteService;
