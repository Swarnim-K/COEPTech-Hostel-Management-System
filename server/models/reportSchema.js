import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
    },
    issue: {
        type: String,
        enum: ["Electrical", "Carpentry", "Cleanliness", "Pest Control", "Plumbing", "Others", "pest-control"]
    },    
    details: { // New field to store additional details about the complaint
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'resolved']
    }
}, {
    timestamps: true
});

export default mongoose.model("Report", reportSchema);
