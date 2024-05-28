const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursesSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", coursesSchema);
module.exports = Course;
