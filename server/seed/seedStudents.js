import mongoose from "mongoose";
import fs from "fs";
import csvParser from "csv-parser";
import User from "../models/userSchema.js";
import Student from "../models/studentSchema.js";

import { fileURLToPath } from "url";
import { join, dirname } from "path";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Hostel");
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataPath = join(__dirname, "tystudentsdata.csv");
async function seedStudents() {
  const results = [];

  fs.createReadStream(
    "C:/Users/anant/OneDrive/Desktop/heck/COEPTech_Hostel_Management_System/server/seed/tystudentsdata.csv"
  )
    .pipe(csvParser({ separator: "," })) // Specify the separator as a comma
    .on("data", (data) => {
      console.log("Student Data:", data); // Log the data being read
      results.push(data);
    })
    .on("end", async () => {
      for (const studentData of results) {
        try {
          console.log("Student Data:", studentData);
          // Ensure that the fields are correctly mapped from the CSV data
          const name = studentData.Name ? studentData.Name.trim() : ""; // Handle undefined value
          const username = studentData["﻿Username"]
            ? studentData["﻿Username"].trim()
            : ""; // Handle undefined value
          const gender = studentData.Gender;
          const phone = studentData.Phone;
          const email = studentData.Email;
          const branch = studentData.Branch;
          const year = studentData.Year;

          console.log(`Seeding student ${name}...`);

          if (!name || !username) {
            console.error(
              `Error seeding student: Invalid data - Name or Username is missing`
            );
            continue; // Skip this student and move to the next one
          }

          const student = new Student({
            name: name,
            username: username,
            gender,
            phone,
            email,
            branch,
            year,
          });

          await student.save();

          const user = new User({
            name: name,
            username: username,
            password: "coep@123", // Default password
            role: "student",
          });

          await user.save();
          console.log(`Student ${student.name} seeded successfully.`);
        } catch (error) {
          console.error(`Error seeding student: ${error.message}`);
        }
      }
      const admin = new User({
        name: "Swarnim Kamble",
        username: "Swarnim",
        password: "coep@123", // Default password
        role: "admin",
      });
      await admin.save();
      console.log(`Admin ${admin.name} seeded successfully.`);
      mongoose.connection.close();
      process.exit(0);
    });
}

seedStudents();
