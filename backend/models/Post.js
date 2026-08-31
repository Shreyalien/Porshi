const mongoose = require('mongoose');

const POST_TYPES = ['question', 'recommendation', 'emergency', 'notice'];

const replySchema = new mongoose.Schema({
  authorName: { type: String, required: true },
  authorRole: { type: String, default: 'citizen' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, enum: POST_TYPES, default: 'question' },
  serviceCategory: { type: String, default: null },
  division: { type: String, default: 'dhaka' },
  district: { type: String, default: 'dhaka_city' },
  upazila: { type: String, default: '' },
  area: { type: String, required: true },
  authorName: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  replies: [replySchema],
  createdAt: { type: Date, default: Date.now }
});

postSchema.statics.POST_TYPES = POST_TYPES;

module.exports = mongoose.model('Post', postSchema);
