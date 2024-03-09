const mongoose = require("mongoose");
const Student = require("../models/studentSchema");
const Room = require("../models/roomSchema");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Hostel");
}

const rooms_seed = [
  { block: "E", floor: 1, roomNumber: 1 },
  { block: "E", floor: 1, roomNumber: 2 },
  { block: "E", floor: 1, roomNumber: 3 },
  { block: "E", floor: 1, roomNumber: 4 },
  { block: "E", floor: 1, roomNumber: 5 },
  { block: "E", floor: 1, roomNumber: 6 },
  { block: "E", floor: 1, roomNumber: 7 },
  { block: "E", floor: 1, roomNumber: 8 },
  { block: "E", floor: 1, roomNumber: 9 },
  { block: "E", floor: 2, roomNumber: 1 },
  { block: "E", floor: 2, roomNumber: 2 },
  { block: "E", floor: 2, roomNumber: 3 },
  { block: "E", floor: 2, roomNumber: 4 },
  { block: "E", floor: 2, roomNumber: 5 },
  { block: "E", floor: 2, roomNumber: 6 },
  { block: "E", floor: 2, roomNumber: 7 },
  { block: "E", floor: 2, roomNumber: 8 },
  { block: "E", floor: 2, roomNumber: 9 },
  { block: "E", floor: 3, roomNumber: 1 },
  { block: "E", floor: 3, roomNumber: 2 },
  { block: "E", floor: 3, roomNumber: 3 },
  { block: "E", floor: 3, roomNumber: 4 },
  { block: "E", floor: 3, roomNumber: 5 },
  { block: "E", floor: 3, roomNumber: 6 },
  { block: "E", floor: 3, roomNumber: 7 },
  { block: "E", floor: 3, roomNumber: 8 },
  { block: "E", floor: 3, roomNumber: 9 },
  { block: "F", floor: 1, roomNumber: 1 },
  { block: "F", floor: 1, roomNumber: 2 },
  { block: "F", floor: 1, roomNumber: 3 },
  { block: "F", floor: 1, roomNumber: 4 },
  { block: "F", floor: 1, roomNumber: 5 },
  { block: "F", floor: 1, roomNumber: 6 },
  { block: "F", floor: 2, roomNumber: 1 },
  { block: "F", floor: 2, roomNumber: 2 },
  { block: "F", floor: 2, roomNumber: 3 },
  { block: "F", floor: 2, roomNumber: 4 },
  { block: "F", floor: 2, roomNumber: 5 },
  { block: "F", floor: 2, roomNumber: 6 },
  { block: "G", floor: 1, roomNumber: 1 },
  { block: "G", floor: 1, roomNumber: 2 },
  { block: "G", floor: 1, roomNumber: 3 },
  { block: "G", floor: 1, roomNumber: 4 },
  { block: "G", floor: 1, roomNumber: 5 },
  { block: "G", floor: 1, roomNumber: 6 },
  { block: "G", floor: 1, roomNumber: 7 },
  { block: "G", floor: 1, roomNumber: 8 },
  { block: "G", floor: 1, roomNumber: 9 },
  { block: "G", floor: 2, roomNumber: 1 },
  { block: "G", floor: 2, roomNumber: 2 },
  { block: "G", floor: 2, roomNumber: 3 },
  { block: "G", floor: 2, roomNumber: 4 },
  { block: "G", floor: 2, roomNumber: 5 },
  { block: "G", floor: 2, roomNumber: 6 },
  { block: "G", floor: 2, roomNumber: 7 },
  { block: "G", floor: 2, roomNumber: 8 },
  { block: "G", floor: 2, roomNumber: 9 },
  { block: "G", floor: 3, roomNumber: 1 },
  { block: "G", floor: 3, roomNumber: 2 },
  { block: "G", floor: 3, roomNumber: 3 },
  { block: "G", floor: 3, roomNumber: 4 },
  { block: "G", floor: 3, roomNumber: 5 },
  { block: "G", floor: 3, roomNumber: 6 },
  { block: "G", floor: 3, roomNumber: 7 },
  { block: "G", floor: 3, roomNumber: 8 },
  { block: "G", floor: 3, roomNumber: 9 },
  { block: "G", floor: 3, roomNumber: 10 },
  { block: "G", floor: 3, roomNumber: 11 },
];

async function seedRooms() {
  const rooms = await Room.insertMany(rooms_seed);
  console.log(rooms);

  mongoose.connection.close();
}

seedRooms();
