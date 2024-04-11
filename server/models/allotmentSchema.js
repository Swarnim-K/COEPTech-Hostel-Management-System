import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define collection and schema for Allotment
let AllotmentSchema = new Schema(
  {
    academicYearStart: {
      type: String,
    },
    academicYearEnd: {
      type: String,
    },
    years: {
      fybtech: {
        type: String,
        required: true,
        default: "0",
      },
      sybtech: {
        type: String,
        required: true,
        default: "0",
      },
      tybtech: {
        type: String,
        required: true,
        default: "0",
      },
      finalyearbtech: {
        type: String,
        required: true,
        default: "0",
      },
    },
    results: {
      fybtech: {
        type: String,
      },
      sybtech: {
        type: String,
      },
      tybtech: {
        type: String,
      },
      finalyearbtech: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Allotment", AllotmentSchema);
