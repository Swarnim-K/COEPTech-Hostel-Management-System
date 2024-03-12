import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

import Student from "./studentSchema.js";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "admin", "guest"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.post("save", async function (doc, next) {
  if (doc.role === "student") {
    try {
      await Student.create({ name: doc.name, username: doc.username });
      console.log("Student created for user:", doc.username);
    } catch (error) {
      console.error("Error creating student:", error);
    }
  }

  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = bcryptjs.genSaltSync(10);
  this.password = bcryptjs.hashSync(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcryptjs.compareSync(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
