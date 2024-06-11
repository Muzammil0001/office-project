const mongoose = require("mongoose");
const Course = require("./course-model");

const StudyMaterialSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const StudyMaterial = mongoose.model("StudyMaterial", StudyMaterialSchema);
module.exports = StudyMaterial;
