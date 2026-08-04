import Note from "../../models/Note.js";
import ApiError from "../../utils/ApiError.js";
import { HTTP_STATUS } from "../../constants/api.constants.js";
import { NOTE_MESSAGES } from "../../constants/message.constants.js";

const updateContentService = async ({ slug, content }) => {
  const note = await Note.findOneAndUpdate(
    { slug: slug.trim().toLowerCase() },
    { content },
    { new: true }
  );

  if (!note) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, NOTE_MESSAGES.NOT_FOUND);
  }

  return { slug: note.slug, updatedAt: note.updatedAt };
};

export default updateContentService;
