import expressAsyncHandler from "express-async-handler";
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

//@desc Get user profile
//@route GET /api/users/profile
//@access Private
const getRoom = expressAsyncHandler(async (req, res) => {
  if (!req.cookies.token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token cookie not provided" });
  }

  try {
    if (!req.body.customId) {
      return res
        .status(400)
        .json({ message: "Bad request: Room ID is required" });
    }

    const { userId } = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    const username = req.body.username;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Only admins can access room data" });
    }

    const customId = req.body.customId;
    const room = await Room.findOne({
      block: customId[0],
      floor: customId[1],
      roomNumber: customId[3],
    }).populate("members");
    res.status(200).json(room);
  } catch (error) {
    console.log(error);
  }
});

const getRooms = expressAsyncHandler(async (req, res) => {
  if (!req.cookies.token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token cookie not provided" });
  }

  try {
    const { userId } = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    const username = req.body.username;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Only admins can access room data" });
    }

    const rooms = await Room.find().populate("members");
    res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
  }
});

const giveRoomPreferences = expressAsyncHandler(async (req, res) => {
  const { username } = await User.findById(req.params.id);
  const application = await Application.findOne({
    username: username,
  });
  application.roomPreferences=req.body
   await application.save().then(savedApplication => {
    res.status(200).json(savedApplication);
  })
  .catch(error => {
    console.error('Error saving application:', error);
})
});

const allocateRoom=expressAsyncHandler (async (req, res) => {
  const { username } = await User.findById(req.params.id);
  const student = await Student.findOne({
    username: username,
  });
  const roomId = req.query.id
  await Room.findByIdAndUpdate(roomId, { $push: { members: student._id } });

});

const viewRoomallocation = expressAsyncHandler (async (req, res) => {
  const { username } = await User.findById(req.params.id);
  const student = await Student.findOne({
    username: username,
  });
  const room = await Room.findOne({ members: student._id });
  res.status(200).json(room);
});

const approveRoomallocation =  expressAsyncHandler (async (req, res) => {
  const { username } = await User.findById(req.params.id);
  const student = await Student.findOne({
    username: username,
  });
  const room = await Room.findOne({ members: student._id });
  student.room = room._id; 
  await student.save();
});

export { getRoom, getRooms,giveRoomPreferences,allocateRoom,viewRoomallocation,approveRoomallocation };
