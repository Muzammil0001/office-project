const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user-model");
const Course = require("./course-model");

const quizSchema = new Schema(
  {
    quizTitle: { type: String, required: true },
    description: { type: String },
    questions: [
      {
        questionText: { type: String, required: true },
        options: [
          {
            optionText: { type: String, required: true },
            isSelected: { type: Boolean, required: true },
          },
        ],
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
    },
    studentId: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
