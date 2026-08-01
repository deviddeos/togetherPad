import app from "./app.js";
import connectDB from "./config/db.js";
import { PORT } from "./config/env.js";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed.");
    console.error(error.message);
  }
};

startServer();