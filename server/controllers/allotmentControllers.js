import expressAsyncHandler from "express-async-handler";
import Application from "../models/applicationSchema.js";
import Student from "../models/studentSchema.js";
import Room from "../models/roomSchema.js";
import User from "../models/userSchema.js"; // Import the User model
import Allotment from "../models/allotmentSchema.js";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, "..", ".env");
dotenv.config({ path: envPath });

const startAllotment = expressAsyncHandler(async (req, res) => {
  const { academicYearStart } = req.body;

  const allotment = await Allotment.create({
    academicYearStart,
    academicYearEnd: (parseInt(academicYearStart) + 1).toString(),
    years: {
      fybtech: "0",
      sybtech: "0",
      tybtech: "0",
      finalyearbtech: "0",
    },
  });

  res.status(201).json(allotment);
});

const startAllotmentForYear = expressAsyncHandler(async (req, res) => {
  const { academicYearStart, year } = req.body;
  const allotment = await Allotment.findOneAndUpdate(
    { academicYearStart },
    { $set: { [`years.${year}`]: "1" } },
    { new: true }
  );

  res.status(201).json(allotment);
});

const getAllotmentStatus = expressAsyncHandler(async (req, res) => {
  const { academicYearStart, year } = req.body;
  const allotment = await Allotment.findOne({ academicYearStart });

  if (allotment[year] === "1") {
    res.status(200).json({ status: "started" });
  } else {
    res.status(200).json({ status: "not started" });
  }
});

export { getAllotmentStatus };
