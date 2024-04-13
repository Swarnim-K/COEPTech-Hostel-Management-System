import expressAsyncHandler from "express-async-handler";
import Application from "../models/applicationSchema.js";
import Student from "../models/studentSchema.js";
import Room from "../models/roomSchema.js";
import User from "../models/userSchema.js"; // Import the User model
import jwt from "jsonwebtoken";
import Report from "../models/reportSchema.js";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, "..", ".env");
dotenv.config({ path: envPath });

const createReport = async (req, res) => {
  try {
    const { complaint, details } = req.body;
    console.log("Received data:", { complaint, details });

    const newReport = new Report({
      issue: complaint,
      details: details,
      status: "pending",
    });

    await newReport.save();

    res
      .status(200)
      .json({ message: "Complaint received successfully", report: newReport });
  } catch (error) {
    console.error("Error saving report:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the complaint report" });
  }
};

const deletereport = async (req, res) => {
  const id = req.params.id;

  try {
    // Find the review by ID and delete it
    const deletedReview = await Report.findByIdAndDelete(id);
    console.log("Review deleted:", deletedReview);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Send a success message as response
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const changeStatus = expressAsyncHandler(async (req, res) => {
  const reportId = req.params.id;
  const report = await Report.findById(reportId);
  report.status = "resolved";
  await report.save();
  res.status(200).json(report);
});

const viewAllReport = async (req, res) => {
  try {
    // Fetch all reports from the database
    const allReports = await Report.find();
    console.log("Reports fetched:", allReports);

    // Respond with the fetched reports
    res.status(200).json(allReports);
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the reports" });
  }
};

export { createReport, deletereport, changeStatus, viewAllReport };
