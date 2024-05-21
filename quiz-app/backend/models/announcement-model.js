const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
  content: {
    type: String,
    required: [true, 'Announcement content is required'],
    trim: true
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'PostedBy user reference is required']
  },
  targetRole: {
    type: String,
    required: [true, 'Target role is required'],
    enum: ['student', 'teacher'],
    lowercase: true
  }
}, { timestamps: true });

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;
