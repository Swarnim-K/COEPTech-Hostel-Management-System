import express from "express";
const router = express.Router();
import{
    createReport,
    viewReport,
    changeStatus,
    viewAllReport,
  } from "../controllers/reportControllers.js";

router.get("/:id", viewReport);
router.get("/", viewAllReport);
router.post("/", createReport);
router.put("/status/:id", changeStatus);

export default router;