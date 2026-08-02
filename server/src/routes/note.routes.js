import { Router } from "express";
import { createNote, getNote } from "../controllers/note.controller.js";
import validate from "../middleware/validate.middleware.js";
import { createNoteSchema } from "../validators/note.validator.js";

const router = Router();

router.post("/", validate(createNoteSchema), createNote);
router.get("/:slug", getNote);

export default router;
