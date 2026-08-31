const mongoose = require('mongoose');

const CATEGORIES = [
  'ac_service', 'ambulance', 'appliance', 'beauty_parlour', 'car_mechanic',
  'carpenter', 'catering', 'cctv_security', 'cleaning', 'courier',
  'doctor', 'driver', 'electrician', 'event_decor', 'gas_delivery',
  'generator_ips', 'glass_fitting', 'graphics_print', 'grocery', 'handyman',
  'house_maid', 'painting', 'interior_design', 'laundry', 'locksmith',
  'mobile_laptop', 'movers', 'pest_control', 'pet_care', 'pharmacy',
  'plumber', 'real_estate', 'restaurant', 'salon_men', 'septic_clean',
  'solar_inverter', 'tailor', 'tutor', 'water_filter', 'water_tank',
  'welding', 'other_utility'
];

const reviewSchema = new mongoose.Schema({
  reviewerName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const listingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: CATEGORIES, required: true },
  division: { type: String, default: 'dhaka' },
  district: { type: String, default: 'dhaka_city' },
  upazila: { type: String, default: '' },
  area: { type: String, required: true },
  address: { type: String, default: '' },
  phone: { type: String, required: true },
  whatsapp: { type: String, default: '' },
  description: { type: String, default: '' },
  priceRange: { type: String, default: '' },
  photoUrl: { type: String, default: '' },
  addedBy: { type: String, required: true },
  listingType: { type: String, enum: ['pro_verified', 'community_recommended'], default: 'pro_verified' },
  nidNumber: { type: String, default: null },
  upvotes: { type: Number, default: 0 },
  verified: { type: Boolean, default: false },
  badge: { type: String, default: '' },
  reviews: [reviewSchema],
  createdAt: { type: Date, default: Date.now }
});

listingSchema.statics.CATEGORIES = CATEGORIES;

listingSchema.methods.averageRating = function () {
  if (!this.reviews || !this.reviews.length) return 0;
  const sum = this.reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / this.reviews.length) * 10) / 10;
};

module.exports = mongoose.model('Listing', listingSchema);
