import { Router } from "express";
import { createNote, getNote, openNote, updateContent } from "../../controllers/note/index.js";
import validate from "../../middleware/validate.middleware.js";
import requireNoteAccess from "../../middleware/noteAccess.middleware.js";
import { createNoteSchema } from "../../validators/note.validator.js";
import { openNoteSchema } from "../../validators/openNote.validator.js";
import { updateContentSchema } from "../../validators/updateContent.validator.js";

const router = Router();

router.post("/", validate(createNoteSchema), createNote);
router.get("/:slug", getNote);
router.post("/:slug/open", validate(openNoteSchema), openNote);
router.patch("/:slug/content", requireNoteAccess, validate(updateContentSchema), updateContent);

export default router;
