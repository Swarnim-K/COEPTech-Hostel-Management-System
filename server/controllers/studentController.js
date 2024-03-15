import expressAsyncHandler from "express-async-handler";
import Student from "../models/studentSchema.js";
import Room from "../models/roomSchema.js";

//@desc Get user profile
//@route GET /api/users/profile
//@access Private
const getStudents = expressAsyncHandler(async (req, res) => {
  if (req.body.username) {
    const username = req.body.username;
    const student = await Student.findOne({
      username: username,
    }).populate("room");
    res.status(200).json(student);
  } else {
    const students = await Student.find().populate("room");
    res.status(200).json(students);
  }
});

export { getStudents };
