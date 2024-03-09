const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mis: {
    type: Number,
    required: true,
    unique: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
  },
});

// Set `_id` field value to `mis` value
// studentSchema.pre("validate", function (next) {
//   this._id = this.mis;
//   next();
// });

module.exports = mongoose.model("Student", studentSchema);
