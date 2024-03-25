import express from "express";
const router = express.Router();
import {
  getStudent,
  getStudents,
  putStudentInRoom,
} from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";

router.get("/", getStudents);
router.post("/", getStudent);
router.put("/", putStudentInRoom);

export default router;
