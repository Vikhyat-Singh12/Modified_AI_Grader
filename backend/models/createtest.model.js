import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    selectedClass: {
        type: Number,
        required: true,
        min: 1,
        max: 12,
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true
    },
    testDuration: { // ⏱️ Full test duration in minutes
        type: Number,
        required: true
    },
    questions: {
        type: [{
            question: {
                type: String,
                required: true
            },
            options: {
                type: [String],
                required: true
            },
            answer: {
                type: String,
                required: true
            },
        }],
        required: true
    },
}, { timestamps: true });

const CreateTest = mongoose.model("CreateTest", testSchema);
export default CreateTest;
