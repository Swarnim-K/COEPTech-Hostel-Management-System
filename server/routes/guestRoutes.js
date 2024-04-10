import express from "express";
const router = express.Router();
import {
  putGuestInRoom,
  getGuestRooms,
  removeGuestFromRoom,
} from "../controllers/guestController.js";

router
  .route("/")
  .post(putGuestInRoom)
  .get(getGuestRooms)
  .delete(removeGuestFromRoom);

export default router;
