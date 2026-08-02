import { ZodError } from "zod";
import ApiError from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/api.constants.js";
import { COMMON_MESSAGES } from "../constants/message.constants.js";

const validate = (schema) => (req, res, next) => {
  try {
    req.validatedData = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return next(
        new ApiError(
          HTTP_STATUS.BAD_REQUEST,
          COMMON_MESSAGES.VALIDATION_FAILED,
          error.issues
        )
      );
    }

    next(error);
  }
};

export default validate;
