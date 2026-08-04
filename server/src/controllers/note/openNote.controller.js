import openNoteService from "../../services/note/openNote.service.js";
import { generateNoteToken } from "../../utils/noteToken.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { HTTP_STATUS } from "../../constants/api.constants.js";
import { NOTE_MESSAGES } from "../../constants/message.constants.js";
import { NOTE_STATES } from "../../constants/note.constants.js";

const openNote = async (req, res, next) => {
  try {
    const note = await openNoteService({
      slug: req.params.slug,
      password: req.validatedData.password,
    });

    const accessToken = await generateNoteToken(note.slug);

    res.status(HTTP_STATUS.OK).json(
      new ApiResponse(HTTP_STATUS.OK, NOTE_MESSAGES.NOTE_OPENED, {
        state: NOTE_STATES.OPENED,
        accessToken,
        note: {
          slug: note.slug,
          content: note.content,
          visibility: note.visibility,
          updatedAt: note.updatedAt,
        },
      })
    );
  } catch (error) {
    next(error);
  }
};

export default openNote;
