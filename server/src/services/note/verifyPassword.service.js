import bcrypt from "bcrypt";
import Note from "../../models/Note.js";
import ApiError from "../../utils/ApiError.js";
import { NOTE_VISIBILITY } from "../../constants/note.constants.js";
import { HTTP_STATUS } from "../../constants/api.constants.js";
import { NOTE_MESSAGES } from "../../constants/message.constants.js";

const verifyPasswordService = async ({ slug, password }) => {
  const normalizedSlug = slug.trim().toLowerCase();

  const note = await Note.findOne({ slug: normalizedSlug }).select("+password");

  if (!note) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, NOTE_MESSAGES.NOT_FOUND);
  }

  // Calling verify on a public note is not a valid operation
  if (note.visibility === NOTE_VISIBILITY.PUBLIC) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "This note is not password protected.");
  }

  const isValid = await bcrypt.compare(password, note.password);

  if (!isValid) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, NOTE_MESSAGES.PASSWORD_INCORRECT);
  }

  return note;
};

export default verifyPasswordService;
