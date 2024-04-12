import express from "express";
const router = express.Router();
import {
  startAllotment,
  startAllotmentForYear,
  startAllotmentRoundForYear,
  endAllotmentRoundForYear,
  getAllotmentStatus,
} from "../controllers/allotmentControllers.js";

router.post("/", startAllotment);
router.post("/year", startAllotmentForYear);
router.post("/round", startAllotmentRoundForYear);
router.put("/round", endAllotmentRoundForYear);
router.get("/", getAllotmentStatus);

export default router;
