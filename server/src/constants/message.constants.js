export const SERVER_MESSAGES = Object.freeze({
  RUNNING: "Server is running",
  WELCOME: "Welcome to TogetherPad API 🚀",
  NOT_FOUND: (url) => `Route '${url}' not found.`,
  INTERNAL_ERROR: "Internal server error.",
});

export const NOTE_MESSAGES = Object.freeze({
  CREATED: "Note created successfully.",
  NOTE_UPDATED: "Content saved successfully.",
  UPDATED: "Note updated successfully.",
  FETCHED: "Note state fetched successfully.",
  NOT_FOUND: "Note not found.",
  SLUG_EXISTS: "A note with this slug already exists.",
  PASSWORD_REQUIRED: "Password is required for protected notes.",
  PASSWORD_INCORRECT: "Incorrect password.",
  NOTE_OPENED: "Note opened successfully.",
  ACCESS_DENIED: "Access token required.",
  NOT_PROTECTED: "This note is not password protected.",
});

export const COMMON_MESSAGES = Object.freeze({
  VALIDATION_FAILED: "Validation failed.",
  INTERNAL_SERVER_ERROR: "Internal server error.",
});
