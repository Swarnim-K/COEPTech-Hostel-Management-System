import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  block: {
    type: String,
    required: true,
  },
  floor: {
    type: Number,
    required: true,
  },
  roomNumber: {
    type: Number,
    required: true,
  },
  members: {
    type: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  },
});

// Define a virtual property for customId
roomSchema.virtual("customId").get(function () {
  return `${this.block}${this.floor * 100 + this.roomNumber}`;
});

// Include virtuals when converting to JSON or calling toJSON()
roomSchema.set("toJSON", { virtuals: true });

// Include virtuals when calling toObject()
roomSchema.set("toObject", { virtuals: true });

export default mongoose.model("Room", roomSchema);
