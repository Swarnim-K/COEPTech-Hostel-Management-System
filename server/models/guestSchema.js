import mongoose from "mongoose";
const Schema = mongoose.Schema;

const guestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  checkIn: {
    type: Date,
  },
  checkOut: {
    type: Date,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "GuestRoom",
  },
});

export default mongoose.model("Guest", guestSchema);
