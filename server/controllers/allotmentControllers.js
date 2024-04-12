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
  });

  res.status(201).json(allotment);
});

const startAllotmentForYear = expressAsyncHandler(async (req, res) => {
  const { academicYearStart, year } = req.body;
  const allotment = await Allotment.findOne({ academicYearStart });
  allotment.years[year].status = "running";

  await allotment.save();
  res.status(201).json(allotment);
});

const startAllotmentRoundForYear = expressAsyncHandler(async (req, res) => {
  const { academicYearStart, year, round } = req.body;
  const allotment = await Allotment.findOne({ academicYearStart });
  allotment.years[year].rounds.push({ round, status: "running" });
  await allotment.save();

  res.status(201).json(allotment);
});

const endAllotmentRoundForYear = expressAsyncHandler(async (req, res) => {
  const { academicYearStart, year, round } = req.body;
  const allotment = await Allotment.findOne({ academicYearStart });

  const roundIndex = allotment.years[year].rounds.findIndex(
    (r) => r.round === round
  );

  allotment.years[year].rounds[roundIndex].status = "completed";
  await allotment.save();

  res.status(201).json(allotment);
});

const getAllotmentStatus = expressAsyncHandler(async (req, res) => {
  const { academicYearStart, year } = req.body;
  const allotment = await Allotment.findOne({ academicYearStart });

  res.status(200).json(allotment.years[year]);
});

export {
  startAllotment,
  startAllotmentForYear,
  startAllotmentRoundForYear,
  endAllotmentRoundForYear,
  getAllotmentStatus,
};
