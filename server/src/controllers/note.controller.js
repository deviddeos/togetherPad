import { createNoteService } from "../services/note.service.js";
import { MESSAGES } from "../constants/message.constants.js";

const createNote = async (req, res, next) => {
  try {
    const note = await createNoteService(req.body);

    res.status(201).json({
      success: true,
      message: MESSAGES.NOTE_CREATED,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export { createNote };
