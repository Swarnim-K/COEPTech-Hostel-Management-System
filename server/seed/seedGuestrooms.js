import mongoose from "mongoose";
import GuestRoom from "../models/guestroomSchema.js";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Hostel");
}

const guestrooms_seed = [
  { name: "Guest Room 1" },
  { name: "Guest Room 2" },
  { name: "Guest Room 3" },
];

async function seedGuestrooms() {
  await GuestRoom.insertMany(guestrooms_seed);
  console.log("Guestrooms seeded successfully");

  mongoose.connection.close();
  process.exit(0);
}
seedGuestrooms();
