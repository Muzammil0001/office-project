const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notifySchema = Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Notification = new mongoose.model("Notification", notifySchema);
module.exports = Notification;
