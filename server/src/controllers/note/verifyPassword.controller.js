import { verifyPasswordService } from "../../services/note/index.js";
import { generateNoteToken } from "../../utils/noteToken.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { HTTP_STATUS } from "../../constants/api.constants.js";
import { NOTE_MESSAGES } from "../../constants/message.constants.js";

const verifyPassword = async (req, res, next) => {
  try {
    const note = await verifyPasswordService({
      slug: req.params.slug,
      password: req.validatedData.password,
    });

    const accessToken = await generateNoteToken(note.slug);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, NOTE_MESSAGES.PASSWORD_VERIFIED, {
        note: {
          slug: note.slug,
          content: note.content,
          visibility: note.visibility,
          updatedAt: note.updatedAt,
        },
        permissions: { canRead: true, canWrite: true },
        accessToken,
      }));
  } catch (error) {
    next(error);
  }
};

export default verifyPassword;
