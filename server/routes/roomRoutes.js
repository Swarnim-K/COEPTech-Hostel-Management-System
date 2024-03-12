import express from "express";
const router = express.Router();
import { getRooms } from "../controllers/roomController.js";
import { protect } from "../middleware/authMiddleware.js";

router.get("/", getRooms);

export default router;
