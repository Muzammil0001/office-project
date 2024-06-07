const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Course = require("./course-model");
const jwt = require("jsonwebtoken");
const hashPassword = require("../utils/password-hashing");
const validateEmail = require("../utils/email-validator");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      required: [true, "User role is required"],
      enum: ["student", "teacher", "admin"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validateEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: [true, "Registration Password Required"],
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    userAvatar: {
      type: String,
      default: () => "../uploads/user.png",
      validate: {
        validator: function (v) {
          return /\.(jpg|jpeg|png|gif)$/i.test(v);
        },
        message: (props) => `${props.value} is not a valid image file!`,
      },
    },
  },
  { timestamps: true }
);

userSchema.methods.authTokenGenerator = async function () {
  const newToken = jwt.sign(
    { _id: this._id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: "5s" }
  );
  this.tokens = this.tokens.concat({ token: newToken });
  await this.save();
  console.log("token:", newToken);
  return newToken;
};

//middleware for hashing
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
