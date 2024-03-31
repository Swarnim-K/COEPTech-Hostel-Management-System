import expressAsyncHandler from "express-async-handler";
import Application from "../models/applicationSchema.js";
import Student from "../models/studentSchema.js";
import Room from "../models/roomSchema.js";
import User from "../models/userSchema.js"; // Import the User model
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, "..", ".env");
dotenv.config({ path: envPath });

const getApplication = expressAsyncHandler(async (req, res) => {
  const { username } = await User.findById(req.params.id);
  const application = await Application.findOne({
    username: username,
  });
  res.status(200).json(application);
});

const createApplication = expressAsyncHandler(async (req, res) => {
  const formData = req.body.form;
  console.log(formData);
  const application = await Application.create(formData);
  res.status(200).json(application);
});

const getApplications = expressAsyncHandler(async (req, res) => {
  const applications = await Application.find({
    "allotment.allotmentStatus": false,
  });
  res.status(200).json(applications);
});

const updateApplication = expressAsyncHandler(async (req, res) => {
  const applicationId = req.body.studentId;
  const application = await Application.findOne({ _id: applicationId });
  application.allotment.allotmentStatus = true;
  await application.save();
  res.status(200).json(application);
});

export {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
};
