import dotenv from "dotenv";

dotenv.config();

/**
 * Read environment variables
 */
const {
  PORT,
  NODE_ENV,
  MONGODB_URI,
} = process.env;

/**
 * Validate required environment variables
 */
const requiredEnvVariables = {
  PORT,
  NODE_ENV,
  MONGODB_URI,
};

for (const [key, value] of Object.entries(requiredEnvVariables)) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export {
  PORT,
  NODE_ENV,
  MONGODB_URI,
};