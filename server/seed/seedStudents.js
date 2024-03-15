import mongoose from "mongoose";
import Student from "../models/studentSchema.js";
import Room from "../models/roomSchema.js";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Hostel");
}

async function seedStudents() {
  const roomE207 = await Room.findOne({ block: "E", floor: 2, roomNumber: 7 });

  const students_seed = [
    { name: "Abhinav Kurule", username: "112103004" },
    { name: "Gaurish Dodke", username: "112103039" },
    { name: "Snehasish Bose", username: "112103027" },
    { name: "Swarnim Kamble", username: "112105030" },
  ];

  roomE207.members = await Student.insertMany(students_seed);
  await roomE207.save();

  const Abhinav = await Student.findOne({ username: "112103004" });
  const Gaurish = await Student.findOne({ username: "112103039" });
  const Snehasish = await Student.findOne({ username: "112103027" });
  const Swarnim = await Student.findOne({ username: "112105030" });

  Abhinav.room = roomE207;
  Gaurish.room = roomE207;
  Snehasish.room = roomE207;
  Swarnim.room = roomE207;

  await Abhinav.save();
  await Gaurish.save();
  await Snehasish.save();
  await Swarnim.save();

  console.log(roomE207);
}

seedStudents();
