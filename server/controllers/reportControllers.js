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

const createReport =expressAsyncHandler(async (req, res) => {
    const reportData = req.body.form;
    reportData.status = "pending";
    const report =  await Report.create(reportData);
    res.status(200).json(report);

  });

const viewReport =expressAsyncHandler(async (req, res) => {
    const reportId = req.params.id
    const report = await Report.findById(reportId)
            .populate('student')
            .populate({
                path: 'student',
                populate: { path: 'room' }
            });
    res.status(200).json(report);

});

const changeStatus=expressAsyncHandler(async (req, res) => {
    const reportId = req.params.id
    const report = await Report.findById(reportId);
    report.status = "resolved";
    await report.save();
    res.status(200).json(report);
});

const viewAllReport=expressAsyncHandler(async (req, res) => {
    const report = await Report.find({})
    res.status(200).json(report);

});


//   const deleteReport=expressAsyncHandler(async (req, res) => {
//     const reportId = req.params.id
//     const report = await Report.findByIdandDelete(reportId)
//   });

  export{
    createReport,
    viewReport,
    changeStatus,
    viewAllReport,
  };