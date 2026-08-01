import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";
import logger from "./utils/logger.js";

connectDB()
  .then(() => {
    app.listen(env.port, () => logger.info(`Server running on port ${env.port}`));
  })
  .catch((err) => {
    logger.error(`DB connection failed: ${err.message}`);
    process.exit(1);
  });
