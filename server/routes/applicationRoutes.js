import express from "express";
const router = express.Router();
import {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  autoSortApplications
} from "../controllers/applicationController.js";

router.post("/sort", autoSortApplications);
router.get("/", getApplications);
router.post("/", createApplication);
router.put("/:year", updateApplication);
// router.get("/:id", getApplication);
export default router;
