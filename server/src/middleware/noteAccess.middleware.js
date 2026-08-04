import { verifyNoteToken } from "../utils/noteToken.js";
import Note from "../models/Note.js";
import ApiError from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/api.constants.js";
import { NOTE_MESSAGES } from "../constants/message.constants.js";
import { NOTE_VISIBILITY } from "../constants/note.constants.js";

// Loads the note, decides access, attaches req.note for downstream controllers.
// Public notes pass through freely.
// Protected notes require a valid Authorization: Bearer <token> with matching slug.
const requireNoteAccess = async (req, res, next) => {
  try {
    const slug = req.params.slug.trim().toLowerCase();

    const note = await Note.findOne({ slug });

    if (!note) {
      return next(new ApiError(HTTP_STATUS.NOT_FOUND, NOTE_MESSAGES.NOT_FOUND));
    }

    // Public notes — attach note and continue
    if (note.visibility === NOTE_VISIBILITY.PUBLIC) {
      req.note = note;
      return next();
    }

    // Protected notes — verify token
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, NOTE_MESSAGES.ACCESS_DENIED));
    }

    const token = authHeader.split(" ")[1];
    const payload = await verifyNoteToken(token);

    // Token must be scoped to this exact slug and correct type
    if (payload.slug !== slug || payload.type !== "note_access") {
      return next(new ApiError(HTTP_STATUS.FORBIDDEN, NOTE_MESSAGES.ACCESS_DENIED));
    }

    req.note = note;
    next();
  } catch {
    next(new ApiError(HTTP_STATUS.UNAUTHORIZED, NOTE_MESSAGES.ACCESS_DENIED));
  }
};

export default requireNoteAccess;
