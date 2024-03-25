import express from "express";
const router = express.Router();
import { getRoom, getRooms } from "../controllers/roomController.js";
import { protect } from "../middleware/authMiddleware.js";

router.get("/", getRooms);
router.post("/", getRoom);

export default router;
