import { HTTP_STATUS } from "../constants/api.constants.js";
import { SERVER_MESSAGES } from "../constants/message.constants.js";

const notFound = (req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: SERVER_MESSAGES.NOT_FOUND(req.originalUrl),
  });
};

export default notFound;
