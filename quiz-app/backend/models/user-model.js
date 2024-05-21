const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hashPassword = require('../utils/password-hashing');
const validateEmail = require('../utils/email-validator');


const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  role: {
    type:String,
    required: [true, 'User role is required'],
    enum: ['student', 'teacher','admin'],
  },
  email: {
    type:String,
    unique:true,
    validate(value){
      if (!validateEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type:String,
    required:[true,"Registration Password Required"]
  },
  userAvatar: {
    type: String,
    validate: {
      validator: function(v) {
        return /\.(jpg|jpeg|png|gif)$/i.test(v);
      },
      message: props => `${props.value} is not a valid image file!`
    }
  }
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
