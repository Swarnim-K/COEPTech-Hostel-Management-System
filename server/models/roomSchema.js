const mongoose = require("mongoose");
const { Schema } = mongoose;

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

// Set `_id` field value to a concatenation of block, floor, and roomNumber
// roomSchema.pre("validate", function (next) {
//   if (this.isNew) {
//     const paddedFloor = this.floor.toString().padStart(1, "0"); // Remove leading zero padding for floor
//     const paddedRoomNumber = this.roomNumber.toString().padStart(2, "0");
//     this._id = `${this.block}${paddedFloor}${paddedRoomNumber}`;
//   }
//   next();
// });

module.exports = mongoose.model("Room", roomSchema);
