import mongoose from "mongoose";
const Schema = mongoose.Schema;

const guestroomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  guests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Guest",
    },
  ],
});
export default mongoose.model("GuestRoom", guestroomSchema);
