import { MESSAGES } from "../constants/message.constants.js";

const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: MESSAGES.NOT_FOUND(req.originalUrl),
  });
};

export default notFound;
