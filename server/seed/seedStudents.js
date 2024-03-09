const mongoose = require("mongoose");
const Student = require("../models/studentSchema");
const Room = require("../models/roomSchema");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Hostel");
}

async function seedStudents() {
  const roomE207 = await Room.findOne({ block: "E", floor: 2, roomNumber: 7 });

  const students_seed = [
    { name: "Abhinav Kurule", mis: 112103004 },
    { name: "Gaurish Dodke", mis: 112103039 },
    { name: "Snehasish Bose", mis: 112103027 },
    { name: "Swarnim Kamble", mis: 112105030 },
  ];

  roomE207.members = await Student.insertMany(students_seed);
  await roomE207.save();

  const Abhinav = await Student.findOne({ mis: 112103004 });
  const Gaurish = await Student.findOne({ mis: 112103039 });
  const Snehasish = await Student.findOne({ mis: 112103027 });
  const Swarnim = await Student.findOne({ mis: 112105030 });

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
