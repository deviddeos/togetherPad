import { HTTP_STATUS } from "../constants/api.constants.js";
import { SERVER_MESSAGES } from "../constants/message.constants.js";

// Four parameters required — Express identifies this as error middleware
const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message: err.message || SERVER_MESSAGES.INTERNAL_ERROR,
    errors: err.errors || [],
  });
};

export default errorHandler;
