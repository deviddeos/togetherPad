import { createNoteService } from "../../services/note/index.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { HTTP_STATUS } from "../../constants/api.constants.js";
import { NOTE_MESSAGES } from "../../constants/message.constants.js";

const createNote = async (req, res, next) => {
  try {
    const note = await createNoteService(req.validatedData);

    res
      .status(HTTP_STATUS.CREATED)
      .json(new ApiResponse(HTTP_STATUS.CREATED, NOTE_MESSAGES.CREATED, {
        slug: note.slug,
        visibility: note.visibility,
        createdAt: note.createdAt,
      }));
  } catch (error) {
    next(error);
  }
};

export default createNote;
