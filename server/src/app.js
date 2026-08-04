import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import env from "./config/env.js";
import routes from "./routes/index.js";
import notFound from "./middleware/notFound.middleware.js";
import errorHandler from "./middleware/error.middleware.js";
import { SERVER_MESSAGES } from "./constants/message.constants.js";

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
*/
app.use(helmet());
app.use(cors({ origin: env.clientOrigin, credentials: true }));
app.use(express.json());
app.use(morgan(env.nodeEnv === "development" ? "dev" : "combined"));

/*
|--------------------------------------------------------------------------
| API Routes — /api → /v1 → resource routes
|--------------------------------------------------------------------------
*/
app.use("/api", routes);

/*
|--------------------------------------------------------------------------
| Root Route
|--------------------------------------------------------------------------
*/
app.get("/", (req, res) => {
  res.json({ success: true, message: SERVER_MESSAGES.WELCOME });
});

/*
|--------------------------------------------------------------------------
| Not Found Middleware
|--------------------------------------------------------------------------
*/
app.use(notFound);

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/
app.use(errorHandler);

export default app;
