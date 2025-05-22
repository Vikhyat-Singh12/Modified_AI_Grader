import mangoose from 'mongoose';

const submitTestSchema = new mangoose.Schema(
  {
    testId: {
      type: mangoose.Schema.Types.ObjectId,
      ref: "CreateTest",
      required: true,
    },
    studentId: {
      type: mangoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentClass: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    answers: {
      type: [
        {
          option: {
            type: String,
            default: "",
          },
          isMarked: {
            type: Boolean,
            default: false,
          },
          correct: {
            type: String,
            default: "",
          },
        },
      ],
    },
    marks: {
      type: Number,
      default: 0,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    submissionDateTime: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const SubmitTest = mangoose.model("SubmitTest", submitTestSchema);
export default SubmitTest;