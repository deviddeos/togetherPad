import { MESSAGES } from "../constants/message.constants.js";

// Four parameters required — Express identifies this as error middleware
const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || MESSAGES.INTERNAL_ERROR,
  });
};

export default errorHandler;
