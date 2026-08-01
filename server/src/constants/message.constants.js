export const SERVER_MESSAGES = {
  RUNNING: "Server is running",
  WELCOME: "Welcome to TogetherPad API 🚀",
  NOT_FOUND: (url) => `Route '${url}' not found.`,
  INTERNAL_ERROR: "Internal Server Error",
};

export const NOTE_MESSAGES = {
  CREATED: "Note created successfully.",
  UPDATED: "Note updated successfully.",
  FOUND: "Note fetched successfully.",
  NOT_FOUND: "Note not found.",
  SLUG_CONFLICT: "A note with this slug already exists.",
  PASSWORD_REQUIRED: "Password is required for protected notes.",
  PASSWORD_INCORRECT: "Incorrect password.",
};
