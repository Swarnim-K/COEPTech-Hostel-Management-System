import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
    },
    issue : {
        type : String,
        enum : ["Electrical","Carpentry","Cleanliness","Pest Control","Plumbing","Others"]
    },
    issueMessage: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'resolved'] // Enclose enum values in quotes
    }

}, {
    timestamps: true
});

export default mongoose.model("Report", reportSchema);