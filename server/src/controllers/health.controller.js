import ApiResponse from "../utils/ApiResponse.js";
import { HTTP_STATUS } from "../constants/api.constants.js";
import { SERVER_MESSAGES } from "../constants/message.constants.js";

const getHealthStatus = (req, res) => {
  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, SERVER_MESSAGES.RUNNING, {
      timestamp: new Date().toISOString(),
    }));
};

export { getHealthStatus };
