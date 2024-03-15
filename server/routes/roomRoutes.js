import express from "express";
const router = express.Router();
import { getRoom } from "../controllers/roomController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/", getRoom);

export default router;
