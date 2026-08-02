import { createNoteService, getNoteService } from "../services/note.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import { HTTP_STATUS } from "../constants/api.constants.js";
import { NOTE_MESSAGES } from "../constants/message.constants.js";

const createNote = async (req, res, next) => {
  try {
    const note = await createNoteService(req.validatedData);

    res
      .status(HTTP_STATUS.CREATED)
      .json(new ApiResponse(HTTP_STATUS.CREATED, NOTE_MESSAGES.CREATED, note));
  } catch (error) {
    next(error);
  }
};

const getNote = async (req, res, next) => {
  try {
    const result = await getNoteService(req.params.slug);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, NOTE_MESSAGES.FETCHED, result));
  } catch (error) {
    next(error);
  }
};

export { createNote, getNote };
