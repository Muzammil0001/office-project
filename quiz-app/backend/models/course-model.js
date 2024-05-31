const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursesSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    courseImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", coursesSchema);
module.exports = Course;
