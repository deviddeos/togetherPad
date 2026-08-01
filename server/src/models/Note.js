import mongoose from "mongoose";
import { NOTE_VISIBILITY } from "../constants/note.constants.js";

const noteSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    content: {
      type: String,
      default: "",
    },

    visibility: {
      type: String,
      enum: Object.values(NOTE_VISIBILITY),
      default: NOTE_VISIBILITY.PUBLIC,
    },

    password: {
      type: String,
      default: null,
      select: false, // never returned in queries unless explicitly requested
    },
  },
  {
    timestamps: true,
  }
);

// Explicit index for fast slug lookups
noteSchema.index({ slug: 1 });

const Note = mongoose.model("Note", noteSchema);

export default Note;
