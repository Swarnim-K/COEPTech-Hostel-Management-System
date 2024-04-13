import express from "express";
const router = express.Router(); // Change outer to router

import {
  createReport,
  deletereport,
  changeStatus,
  viewAllReport,
} from "../controllers/reportControllers.js";

router.delete("/:id", deletereport);
router.get("/", viewAllReport);
router.post("/", createReport);
router.put("/status/:id", changeStatus);

export default router;
