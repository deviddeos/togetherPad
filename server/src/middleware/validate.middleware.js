import ApiError from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/api.constants.js";

// validate(schema) returns a middleware that validates req.body against the given schema
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const message = error.details.map((d) => d.message).join(", ");
    return next(new ApiError(HTTP_STATUS.BAD_REQUEST, message));
  }

  next();
};

export default validate;
