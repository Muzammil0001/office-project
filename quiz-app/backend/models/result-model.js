const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: [0, 'Score must be at least 0'],
    max: [100, 'Score cannot exceed 100']
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;
