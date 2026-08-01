import mongoose from "mongoose";
import { MONGODB_URI } from "./env.js";
import log from "../utils/logger.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URI);

    log.success("MongoDB Connected");
    log.info(`Database : ${connection.connection.name}`);
    log.info(`Host : ${connection.connection.host}`);
  } catch (error) {
    log.error("MongoDB Connection Failed");
    log.error(error.message);

    process.exit(1);
  }
};

export default connectDB;