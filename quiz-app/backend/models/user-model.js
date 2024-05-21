const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator=require("validator");
const hashPassword = require('../utils/password-hashing');
const validateEmail = require('../utils/email-validator');

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  role: String,
  email: {
    type:String,
    unique:true,
    validate(value){
      if (!validateEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: String
}, { timestamps: true });


//middleware for hashing
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
      this.password = await hashPassword(this.password);
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
