const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Course = require("./course-model");
const User = require("./user-model");

const assignedCoursesSchema = new Schema(
  {
    courseId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
    ],
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const AssignedCourse = mongoose.model("AssignedCourse", assignedCoursesSchema);
module.exports = AssignedCourse;
