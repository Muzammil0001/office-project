const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discussionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  relatedQuiz: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
    required: false
  }
}, { timestamps: true });

const Discussion = mongoose.model('Discussion', discussionSchema);
module.exports = Discussion;
