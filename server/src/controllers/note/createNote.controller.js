import { createNoteService } from "../../services/note/index.js";
import { generateNoteToken } from "../../utils/noteToken.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { HTTP_STATUS } from "../../constants/api.constants.js";
import { NOTE_MESSAGES } from "../../constants/message.constants.js";
import { NOTE_VISIBILITY } from "../../constants/note.constants.js";

const createNote = async (req, res, next) => {
  try {
    const note = await createNoteService(req.validatedData);

    let accessToken = null;
    if (note.visibility === NOTE_VISIBILITY.PROTECTED) {
      accessToken = await generateNoteToken(note.slug);
    }

    res
      .status(HTTP_STATUS.CREATED)
      .json(new ApiResponse(HTTP_STATUS.CREATED, NOTE_MESSAGES.CREATED, {
        accessToken,
        note: {
          slug: note.slug,
          content: note.content,
          visibility: note.visibility,
          createdAt: note.createdAt,
        },
      }));
  } catch (error) {
    next(error);
  }
};

export default createNote;
