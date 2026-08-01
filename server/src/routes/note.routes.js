import { Router } from "express";
import { createNote } from "../controllers/note.controller.js";
import validate from "../middleware/validate.middleware.js";
import { createNoteSchema } from "../validators/note.validator.js";

const router = Router();

router.post("/", validate(createNoteSchema), createNote);

export default router;
