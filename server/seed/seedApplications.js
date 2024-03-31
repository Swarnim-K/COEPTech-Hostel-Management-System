import mongoose from "mongoose";
import Application from "../models/applicationSchema.js";
import Student from "../models/studentSchema.js";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Hostel");
}

const categories = ["General", "OBC", "SC", "ST"];
const cities = [
  "Mumbai",
  "Pune",
  "Nagpur",
  "Nashik",
  "Aurangabad",
  "Solapur",
  "Amravati",
  "Latur",
  "Kolhapur",
  "Nanded",
  "Sangli",
  "Bhiwandi",
  "Akola",
  "Malegaon",
  "Jalgaon",
  "Ahmednagar",
  "Miraj",
  "Ichalkaranji",
  "Chandrapur",
  "Parbhani",
  "Jalna",
  "Bhusawal",
  "Navi Mumbai",
  "Panvel",
  "Satara",
  "Beed",
  "Yavatmal",
  "Kamptee",
  "Gondia",
  "Barshi",
  "Osmanabad",
  "Nandurbar",
  "Wardha",
  "Udgir",
  "Hinganghat",
  "Devgarh",
  "Washim",
  "Achalpur",
  "Parli",
  "Malkapur",
];

async function seedApplications() {
  const studentsWithoutRoom = await Student.find({
    room: null,
  });

  for (const student of studentsWithoutRoom) {
    const application = new Application({
      name: student.name,
      username: student.username,
      gender: student.gender,
      phone: student.phone,
      email: student.email,
      branch: student.branch,
      year: student.year,
      grade: (Math.floor(Math.random() * 400) / 100 + 6).toFixed(2),
      category: categories[Math.floor(Math.random() * categories.length)],
      address: `${
        cities[Math.floor(Math.random() * cities.length)]
      }, Maharashtra`,
    });
    await application.save();
    console.log(application);
  }
  console.log("Applications seeded successfully.");

  mongoose.connection.close();
  process.exit(0);
}

seedApplications();
