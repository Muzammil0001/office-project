const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    questions: [
      {
        questionText: { type: String, required: true },
        options: [{ type: String }],
        answer: { type: String, required: true },
      },
    ],
    timeLimit: {
      type: Number,
      required: true,
      min: [0, "Time limit is invalid."],
    },
    totalMarks: {
      type: Number,
      required: true,
      min: [0, "Time limit is invalid."],
    },
    dueDate: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);
const QuizModel = new mongoose.model("Quiz", quizSchema);
module.exports = QuizModel;
