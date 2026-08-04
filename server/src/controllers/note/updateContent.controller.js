import { updateContentService } from "../../services/note/index.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { HTTP_STATUS } from "../../constants/api.constants.js";
import { NOTE_MESSAGES } from "../../constants/message.constants.js";

const updateContent = async (req, res, next) => {
  try {
    const result = await updateContentService({
      slug: req.params.slug,
      content: req.validatedData.content,
    });

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, NOTE_MESSAGES.UPDATED, result));
  } catch (error) {
    next(error);
  }
};

export default updateContent;
