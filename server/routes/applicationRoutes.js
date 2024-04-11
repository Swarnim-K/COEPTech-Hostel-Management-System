import express from "express";
const router = express.Router();
import {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
} from "../controllers/applicationController.js";

router.get("/:id", getApplication);
router.get("/", getApplications);
router.post("/", createApplication);
router.put("/:year", updateApplication);
export default router;
