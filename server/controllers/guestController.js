import expressAsyncHandler from "express-async-handler";
import Student from "../models/studentSchema.js";
import Room from "../models/roomSchema.js";
import User from "../models/userSchema.js";
import Guest from "../models/guestSchema.js";
import GuestRoom from "../models/guestroomSchema.js";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, "..", ".env");
dotenv.config({ path: envPath });

//@desc Put a guest in a room
//@route POST /api/guests
//@access Private
const putGuestInRoom = expressAsyncHandler(async (req, res) => {
  if (!req.cookies.token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token cookie not provided" });
  }

  try {
    const { userId } = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Only admins can add guests" });
    }

    const { name, uniqueId, phone, email, checkIn, checkOut, room } = req.body;

    const newGuest = new Guest({
      name,
      uniqueId,
      phone,
      email,
      checkIn,
      checkOut,
      room,
    });

    const guest = await newGuest.save();

    const guestroom = await GuestRoom.findOne({ _id: room });
    if (!guestroom) {
      return res.status(404).json({ message: "Guestroom not found" });
    }

    guestroom.guests.push(guest._id);
    await guestroom.save();

    res.status(200).json(guest);
  } catch (error) {
    console.log(error);
  }
});

//@desc Get all guestrooms
//@route GET /api/guestrooms
//@access Private
const getGuestRooms = expressAsyncHandler(async (req, res) => {
  if (!req.cookies.token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token cookie not provided" });
  }

  try {
    const { userId } = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Only admins can access guestrooms" });
    }

    const guestrooms = await GuestRoom.find({}).populate("guests");

    res.status(200).json(guestrooms);
  } catch (error) {
    console.log(error);
  }
});

//@desc Remove a guest from a room
//@route DELETE /api/guests
//@access Private
const removeGuestFromRoom = expressAsyncHandler(async (req, res) => {
  if (!req.cookies.token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token cookie not provided" });
  }

  try {
    const { userId } = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Only admins can remove guests" });
    }

    const { guestId } = req.body;

    const guest = await Guest.findOne({ _id: guestId });
    if (!guest) {
      return res.status(404).json({ message: "Guest not found" });
    }

    await GuestRoom.findOneAndDelete({ guest: guestId });

    res.status(200).json({ message: "Guest removed" });
  } catch (error) {
    console.log(error);
  }
});

export { putGuestInRoom, getGuestRooms, removeGuestFromRoom };
