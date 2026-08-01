// Centralizes env access — fail fast if a required variable is missing
const env = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV || "development",
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
};

export default env;
