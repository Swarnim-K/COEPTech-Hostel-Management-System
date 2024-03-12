import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
  },
});

studentSchema.path("room").get(function (value) {
  if (!value) return value;
  return value.customId || value;
});

export default mongoose.model("Student", studentSchema);
