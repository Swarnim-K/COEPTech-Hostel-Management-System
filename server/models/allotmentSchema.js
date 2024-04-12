import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define collection and schema for Allotment
let AllotmentSchema = new Schema(
  {
    academicYearStart: {
      type: String,
      required: true,
      unique: true,
    },
    academicYearEnd: {
      type: String,
    },
    years: {
      fybtech: {
        status: {
          type: String,
          required: true,
          default: "unstarted",
          enum: ["unstarted", "running", "completed"],
        },
        rounds: [
          {
            round: {
              type: String,
              required: true,
              default: "0",
            },
            status: {
              type: String,
              required: true,
              default: "unstarted",
              enum: ["unstarted", "running", "completed"],
            },
            result: {
              type: String,
            },
          },
        ],
      },
      sybtech: {
        status: {
          type: String,
          required: true,
          default: "unstarted",
          enum: ["unstarted", "running", "completed"],
        },
        rounds: [
          {
            round: {
              type: String,
              required: true,
              default: "0",
            },
            status: {
              type: String,
              required: true,
              default: "unstarted",
              enum: ["unstarted", "running", "completed"],
            },
            result: {
              type: String,
            },
          },
        ],
      },
      tybtech: {
        status: {
          type: String,
          required: true,
          default: "unstarted",
          enum: ["unstarted", "running", "completed"],
        },
        rounds: [
          {
            round: {
              type: String,
              required: true,
              default: "0",
            },
            status: {
              type: String,
              required: true,
              default: "unstarted",
              enum: ["unstarted", "running", "completed"],
            },
            result: {
              type: String,
            },
          },
        ],
      },
      finalyearbtech: {
        status: {
          type: String,
          required: true,
          default: "unstarted",
          enum: ["unstarted", "running", "completed"],
        },
        rounds: [
          {
            round: {
              type: String,
              required: true,
              default: "0",
            },
            status: {
              type: String,
              required: true,
              default: "unstarted",
              enum: ["unstarted", "running", "completed"],
            },
            result: {
              type: String,
            },
          },
        ],
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Allotment", AllotmentSchema);
