import Note from "../../models/Note.js";
import ApiError from "../../utils/ApiError.js";
import { HTTP_STATUS } from "../../constants/api.constants.js";
import { NOTE_MESSAGES } from "../../constants/message.constants.js";

const updateContentService = async (slug, content) => {
  const normalizedSlug = slug.trim().toLowerCase();

  const note = await Note.findOne({ slug: normalizedSlug });

  if (!note) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, NOTE_MESSAGES.NOT_FOUND);
  }

  note.content = content;
  await note.save();

  return { updatedAt: note.updatedAt };
};

export default updateContentService;
