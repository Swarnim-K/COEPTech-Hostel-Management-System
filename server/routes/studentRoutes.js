import express from "express";
const router = express.Router();
import { getStudent } from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/", getStudent);

export default router;
