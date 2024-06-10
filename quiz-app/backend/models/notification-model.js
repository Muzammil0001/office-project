const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user-model");

const notifySchema = Schema(
  {
    content: {
      type: String,
      required: true,
    },
    status:{
      type:String,
      enum:["read", "unread"],
      default:"unread",
      required:true,
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
