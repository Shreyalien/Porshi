const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const { optionalAuth } = require('../middleware/auth');

// GET /api/listings -> ফিল্টার ও সার্চ সহ সার্ভিস খোঁজা
router.get('/', async (req, res) => {
  try {
    const filter = {};
    const { area, category, division, district, upazila, q } = req.query;

    if (area && area !== 'all') {
      filter.area = new RegExp(area.trim(), 'i');
    }
    if (category && category !== 'all') {
      filter.category = category;
    }
    if (division && division !== 'all') {
      filter.division = division;
    }
    if (district && district !== 'all') {
      filter.district = district;
    }
    if (upazila && upazila !== 'all') {
      filter.upazila = upazila;
    }
    if (q) {
      const searchRegex = new RegExp(q.trim(), 'i');
      filter.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { address: searchRegex },
        { area: searchRegex }
      ];
    }

    const listings = await Listing.find(filter).sort({ upvotes: -1, createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/categories', (req, res) => {
  res.json(Listing.CATEGORIES);
});

router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing পাওয়া যায়নি' });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', optionalAuth, async (req, res) => {
  try {
    const {
      name, category, division, district, upazila,
      area, address, phone, whatsapp, description, priceRange, addedBy
    } = req.body;

    if (!name || !category || !area || !phone) {
      return res.status(400).json({ error: 'নাম, ক্যাটাগরি, এলাকা এবং মোবাইল নম্বর প্রদান করুন' });
    }

    const listing = await Listing.create({
      name,
      category,
      division: division || 'dhaka',
      district: district || 'dhaka_city',
      upazila: upazila || '',
      area,
      address: address || '',
      phone,
      whatsapp: whatsapp || '',
      description: description || '',
      priceRange: priceRange || '',
      addedBy: req.user ? req.user.name : (addedBy || 'Local User'),
      verified: false
    });

    res.status(201).json(listing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch('/:id/upvote', async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    if (!listing) return res.status(404).json({ error: 'Listing পাওয়া যায়নি' });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /:id/review -> স্টার রেটিং ও মন্তব্য যোগ
router.post('/:id/review', optionalAuth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing পাওয়া যায়নি' });

    const rating = Number(req.body.rating);
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'রেটিং ১ থেকে ৫-এর মধ্যে হতে হবে' });
    }

    listing.reviews.push({
      reviewerName: req.user ? req.user.name : (req.body.reviewerName || 'Anonymous'),
      rating,
      comment: req.body.comment || ''
    });

    await listing.save();
    res.json(listing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
