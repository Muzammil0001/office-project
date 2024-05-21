const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const analyticsSchema = new Schema({
  type: {
    type: String,
    required: [true, 'Type of analytics data is required'],
    enum: ['quizPerformance', 'userEngagement', 'resourceUsage'],
    lowercase: true
  },
  data: {
    type: Schema.Types.Mixed,
    required: [true, 'Data is required']
  }
}, { timestamps: true }); 

const Analytics = mongoose.model('Analytics', analyticsSchema);
module.exports = Analytics;