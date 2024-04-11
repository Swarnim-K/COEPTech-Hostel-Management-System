import mongoose from "mongoose";
const Schema = mongoose.Schema;

const applicationSchema = new Schema(
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
    gender: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    branch: {
      type: String,
    },
    year: {
      type: String,
    },
    grade: {
      type: String,
    },
    category: {
      type: String,
    },
    address: {
      type: String,
    },
    allotment: {
      allotmentId: {
        type: Schema.Types.ObjectId,
        ref: "Allotment",
      },
      allotmentPriority: {
        type: Number,
      },
      allotmentStatus: {
        type: Boolean,
        default: false,
      },
      allotmentDate: {
        type: Date,
      },
      allotmentRound: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Application", applicationSchema);
