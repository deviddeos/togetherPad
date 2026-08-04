import { Router } from "express";
import { createNote, getNote, verifyPassword, updateContent } from "../controllers/note/index.js";
import validate from "../middleware/validate.middleware.js";
import requireNoteAccess from "../middleware/noteAccess.middleware.js";
import { createNoteSchema, updateContentSchema } from "../validators/note.validator.js";
import { verifyPasswordSchema } from "../validators/verifyPassword.validator.js";

const router = Router();

router.post("/", validate(createNoteSchema), createNote);
router.get("/:slug", getNote);
router.post("/:slug/verify", validate(verifyPasswordSchema), verifyPassword);
router.patch("/:slug/content", requireNoteAccess, validate(updateContentSchema), updateContent);

export default router;
