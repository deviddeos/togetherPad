import { Router } from "express";
import { createNote } from "../controllers/note.controller.js";

const router = Router();

router.post("/", createNote);

export default router;
