const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaderBoardSchema = new Schema({
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  topScores: [{
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    score: {
      type:Number,
      min: [0, 'Invalid Score'],
    max: [100, 'Score cannot exceed 100']
    }
  }]
}, { timestamps: true });

const LeaderBoard = mongoose.model('LeaderBoard', leaderBoardSchema);
module.exports = LeaderBoard;
