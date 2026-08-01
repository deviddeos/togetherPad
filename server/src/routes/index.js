import { Router } from "express";
import healthRoutes from "./health.routes.js";

const router = Router();

router.use("/health", healthRoutes);

// Future routes registered here:
// router.use("/notes", noteRoutes);
// router.use("/auth", authRoutes);

export default router;
