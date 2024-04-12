import mongoose from "mongoose";
import Allotment from "../models/allotmentSchema.js";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Hostel");
}

const academicYearStarts = ["2021", "2022", "2023", "2024", "2025"];

async function seedAllotment() {
  for (const academicYearStart of academicYearStarts) {
    await Allotment.create({
      academicYearStart,
      academicYearEnd: (parseInt(academicYearStart) + 1).toString(),
    });
  }

  mongoose.connection.close();
  process.exit(0);
}

seedAllotment();
