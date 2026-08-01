import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middlewares
|--------------------------------------------------------------------------
*/

// Parse JSON request body
app.use(express.json());

// Parse URL encoded body
app.use(express.urlencoded({ extended: true }));

// Parse Cookies
app.use(cookieParser());

// Security headers
app.use(helmet());

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Request Logger
app.use(morgan("dev"));

import routes from "./routes/index.js";
import notFound from "./middleware/notFound.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to TogetherPad API 🚀",
  });
});

export default app;