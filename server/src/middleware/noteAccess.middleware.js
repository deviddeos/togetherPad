import ApiError from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/api.constants.js";
import { NOTE_MESSAGES } from "../constants/message.constants.js";

// Protects routes that require prior password verification for a given slug
const requireNoteAccess = (req, res, next) => {
  const slug = req.params.slug.toLowerCase();

  if (req.session.noteAccess && req.session.noteAccess[slug]) {
    return next();
  }

  return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, NOTE_MESSAGES.ACCESS_DENIED));
};

export default requireNoteAccess;
