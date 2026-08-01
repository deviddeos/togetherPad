import { MESSAGES } from "../constants/message.constants.js";

const getHealthStatus = (req, res) => {
  res.status(200).json({
    success: true,
    message: MESSAGES.SERVER_RUNNING,
    timestamp: new Date().toISOString(),
  });
};

export { getHealthStatus };
