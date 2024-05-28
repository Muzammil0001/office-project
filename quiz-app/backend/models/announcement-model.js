const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const announcementSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Announcement title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Announcement description is required"],
      trim: true,
    },
    targetRole: {
      type: String,
      required: [true, "Target role is required"],
      enum: ["student", "teacher"],
      lowercase: true,
    },
  },
  { timestamps: true }
);

const Announcement = mongoose.model("Announcement", announcementSchema);
module.exports = Announcement;
