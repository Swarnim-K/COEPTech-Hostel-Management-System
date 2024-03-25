import expressAsyncHandler from "express-async-handler";
import Student from "../models/studentSchema.js";
import Room from "../models/roomSchema.js";

//@desc Get user profile
//@route GET /api/users/profile
//@access Private
const getRoom = expressAsyncHandler(async (req, res) => {
  if (req.body.customId) {
    const customId = req.body.customId;
    const room = await Room.findOne({
      block: customId[0],
      floor: customId[1],
      roomNumber: customId[3],
    }).populate("members");
    res.status(200).json(room);
  } else {
    const rooms = await Room.find().populate("members");
    res.status(200).json(rooms);
  }
});

const getRooms = expressAsyncHandler(async (req, res) => {
  const rooms = await Room.find().populate("members");
  res.status(200).json(rooms);
});

export { getRoom, getRooms };
