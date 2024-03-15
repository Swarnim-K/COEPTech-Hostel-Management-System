import express from "express";
const router = express.Router();
import { getStudents } from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/", getStudents);

export default router;
