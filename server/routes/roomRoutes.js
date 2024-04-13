import express from "express";
const router = express.Router();
import { getRoom, getRooms,giveRoomPreferences,allocateRoom,viewRoomallocation,approveRoomallocation } from "../controllers/roomController.js";
import { protect } from "../middleware/authMiddleware.js";

router.get("/", getRooms);
router.post("/", getRoom);
router.post("/pref/:id", giveRoomPreferences)
router.put("/allocate/:id", allocateRoom)
router.get("/view/:id", viewRoomallocation)
router.put("/approve/:id", approveRoomallocation)


export default router;
