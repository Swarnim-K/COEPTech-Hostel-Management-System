import expressAsyncHandler from "express-async-handler";
import Application from "../models/applicationSchema.js";
import Student from "../models/studentSchema.js";
import Room from "../models/roomSchema.js";
import User from "../models/userSchema.js"; // Import the User model
import Allotment from "../models/allotmentSchema.js";
import allocation from "./allocate.js"
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, "..", ".env");
dotenv.config({ path: envPath });

const studentsByBranchBoys = {};
const studentsByBranchGirls={};

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
  const { round, academicYearStart } = req.query;
  const allotment = await Allotment.findOne({
    academicYearStart,
  });

  if (req.query.year) {
    let year = req.query.year;

    if (
      allotment.years[year].status === "completed" ||
      allotment.years[year].rounds[round - 1].status === "completed"
    ) {
      return res.status(400).json("Allotment:Completed");
    } else if (allotment.years[year].status === "running") {
      if (req.query.year === "fybtech") {
        year = "F.Y.B.Tech";
      } else if (req.query.year === "sybtech") {
        year = "S.Y.B.Tech";
      } else if (req.query.year === "tybtech") {
        year = "T.Y.B.Tech";
      } else if (req.query.year === "btech") {
        year = "B.Tech";
      } else {
        return res.status(400);
      }
      const applications = await Application.find({
        year: year,
        branch: "Computer Engineering",
        "allotment.allotmentStatus": false,
        "allotment.allotmentId": allotment._id,
        "allotment.allotmentRound": round,
      });

      res.status(200).json(applications);
    } else if (allotment.years[year].status === "unstarted") {
      return res.status(400).json("Allotment:Unstarted");
    }
  }
});


const autoSortApplications = expressAsyncHandler(async (req, res) => {
  const { round, academicYearStart } = req.query;
  const {branch} = req.body;
  const allotment = await Allotment.findOne({
    academicYearStart,
  });
  if (req.query.year) 
  {
    let year = req.query.year;
    const total_boys = 231
    const total_girls = 147
    if (req.query.year === "fybtech") {
      year = "F.Y.B.Tech";
    } else if (req.query.year === "sybtech") {
      year = "S.Y.B.Tech";
    } else if (req.query.year === "tybtech") {
      year = "T.Y.B.Tech";
    } else if (req.query.year === "btech") {
      year = "B.Tech";
    } else {
      return res.status(400);
    }
    const applications = await Application.find({
      year: year,
      "allotment.allotmentStatus": false,
      "allotment.allotmentId": allotment._id,
      "allotment.allotmentRound": round,
    });
    
    // if (Object.keys(studentsByBranchBoys).length === 0 && Object.keys(studentsByBranchGirls).length === 0) 
    // {
    //   console.log("hi")
    //   applications.forEach(application => {
    //     const { branch } = application;
  
    //     if (!studentsByBranchBoys[branch] && application.gender==="Male") {
    //         studentsByBranchBoys[branch] = [];
    //     }
    //     else if(studentsByBranchBoys[branch] && application.gender==="Male"){
    //         studentsByBranchBoys[branch].push(application);
    //     }
    //     else if (!studentsByBranchGirls[branch] && application.gender==="Female") {
    //         studentsByBranchGirls[branch] = [];
    //     }
    //     else{
    //         studentsByBranchGirls[branch].push(application)
    //     }
    //   })
    // }
    applications.forEach(application => {
      const { branch, gender } = application;

      if (!studentsByBranchBoys[branch] && gender === "Male") {
        studentsByBranchBoys[branch] = [];
      }

      if (!studentsByBranchGirls[branch] && gender === "Female") {
        studentsByBranchGirls[branch] = [];
      }

      if (gender === "Male") {
        studentsByBranchBoys[branch].push(application);
      } else {
        studentsByBranchGirls[branch].push(application);
      }
    });
    const finalList = allocation(studentsByBranchBoys[branch],studentsByBranchGirls[branch],total_boys,total_girls)
    res.status(200).json({"Male":
    {
      "Confirmed" : finalList[0][0],
      "Waiting" : finalList[0][1]
    } , 
    "Female":{
      "Confirmed" : finalList[1][0],
      "Waiting" : finalList[1][1]
    } });

  }
});

const updateApplication = expressAsyncHandler(async (req, res) => {
  const year = req.params.year;
  const allotments = req.body;
  try {
    Object.keys(allotments).forEach((branch) => {
      Object.keys(allotments[branch]).forEach((gender) => {
        Object.keys(allotments[branch][gender]).forEach((status) => {
          allotments[branch][gender][status].forEach(async (student) => {
            const allotment = await Allotment.findOne({
              _id: student.allotment.allotmentId,
            });

            const application = await Application.findOne({
              username: student.username,
              "allotment.allotmentId": allotment._id,
            });

            if (status === "confirmed") {
              application.allotment.allotmentStatus = true;
              application.allotment.allotmentDate = new Date();
            } else {
              application.allotment.allotmentStatus = false;
              application.allotment.allotmentRound =
                application.allotment.allotmentRound + 1;
            }
            await application.save();
            console.log(application);
          });
        });
      });
    });
    res.status(200).json("Application updated successfully!");
  } catch (error) {
    console.log(error);
    res.status(400).json("Error updating application");
  }
});

export {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  autoSortApplications,
};
