const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user-model");
const Course = require("./course-model");

const enrolledCoursesSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    courseStatus: {
      type: String,
      enum: ["completed", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const EnrolledCourse = mongoose.model("EnrolledCourse", enrolledCoursesSchema);
module.exports = EnrolledCourse;
