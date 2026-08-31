const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, lowercase: true, sparse: true },
  phone: { type: String, required: true, unique: true },
  role: { type: String, enum: ['citizen', 'pro', 'admin'], default: 'citizen' },
  division: { type: String, default: 'dhaka' },
  district: { type: String, default: 'dhaka_city' },
  upazila: { type: String, default: 'dhanmondi' },
  localArea: { type: String, default: '' },
  area: { type: String, required: true },
  nidNumber: { type: String, default: null },
  specialty: { type: String, default: '' },
  points: { type: Number, default: 100 },
  passwordHash: { type: String, required: true },
  verified: { type: Boolean, default: false },
  verificationCode: { type: String },
  verificationExpires: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
