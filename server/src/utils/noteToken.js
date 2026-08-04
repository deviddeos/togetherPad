import { SignJWT, jwtVerify } from "jose";
import env from "../config/env.js";

const secret = new TextEncoder().encode(env.noteAccessSecret);

export const generateNoteToken = async (slug) => {
  return await new SignJWT({ slug, type: "note_access" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secret);
};

export const verifyNoteToken = async (token) => {
  const { payload } = await jwtVerify(token, secret);
  return payload;
};
