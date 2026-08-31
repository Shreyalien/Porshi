const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { requireAuth, optionalAuth } = require('../middleware/auth');

// GET /api/posts -> এলাকা, ধরন ও ক্যাটাগরি অনুযায়ী পোস্ট খোঁজা
router.get('/', async (req, res) => {
  try {
    const filter = {};
    const { area, type, category, q } = req.query;

    if (area && area !== 'all') {
      filter.area = new RegExp(area.trim(), 'i');
    }
    if (type && type !== 'all') {
      filter.type = type;
    }
    if (category && category !== 'all') {
      filter.attachedCategory = category;
    }
    if (q) {
      const searchRegex = new RegExp(q.trim(), 'i');
      filter.$or = [
        { title: searchRegex },
        { content: searchRegex },
        { area: searchRegex },
        { attachedCategory: searchRegex }
      ];
    }

    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/posts -> শুধুমাত্র রেজিস্টার্ড/ভেরিফাইড ইউজাররা পোস্ট করতে পারবে
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { title, content, type, attachedCategory, area, division, district, upazila, authorName } = req.body;
    if (!title || !content || !type || !area) {
      return res.status(400).json({ error: 'শিরোনাম, বিবরণ, ধরন এবং এলাকা নির্বাচন করুন' });
    }

    const post = await Post.create({
      title,
      content,
      type,
      attachedCategory: attachedCategory || 'other_utility',
      area,
      division: division || 'dhaka',
      district: district || 'dhaka_city',
      upazila: upazila || '',
      authorName: req.user ? req.user.name : (authorName || 'Local Neighbor')
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch('/:id/upvote', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    if (!post) return res.status(404).json({ error: 'Post পাওয়া যায়নি' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /:id/reply -> কমেন্ট / মন্তব্য যোগ
router.post('/:id/reply', optionalAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post পাওয়া যায়নি' });

    const content = (req.body.content || '').trim();
    if (!content) return res.status(400).json({ error: 'মন্তব্যের বিবরণ দিন' });

    post.replies.push({
      authorName: req.user ? req.user.name : (req.body.authorName || 'Neighbor'),
      content
    });

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
