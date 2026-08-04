import session from "express-session";
import env from "./env.js";

const sessionMiddleware = session({
  secret: env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 12, // 12 hours
  },
});

export default sessionMiddleware;
