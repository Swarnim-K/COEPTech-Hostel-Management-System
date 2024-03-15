import expressAsyncHandler from "express-async-handler";
import Student from "../models/studentSchema.js";
import User from "../models/userSchema.js"; // Import the User model
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, "..", ".env");
dotenv.config({ path: envPath });

//@desc Get user profile
//@route GET /api/users/profile
//@access Private
const getStudent = expressAsyncHandler(async (req, res) => {
  // Check if token cookie is present in the request
  if (!req.cookies.token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token cookie not provided" });
  }

  try {
    const { userId } = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    // Fetch user from database to check if they are an admin
    const user = await User.findOne({ _id: userId });
    if (!user || user.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Only admins can access student data" });
    }

    // Check if a specific username is provided
    if (!req.body.username) {
      return res
        .status(400)
        .json({ message: "Bad request: Username is required" });
    }

    const username = req.body.username;
    const student = await Student.findOne({
      username: username,
    }).populate({
      path: "room",
      populate: {
        path: "members",
        match: { username: { $ne: username } }, // Exclude the searched student
        select: "name username -_id", // Select only name and username fields
      },
    });

    // Check if student exists
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error verifying JWT token:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
});

export { getStudent };
