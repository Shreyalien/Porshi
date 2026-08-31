const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendVerificationCode } = require('../utils/mailer');
const { requireAuth } = require('../middleware/auth');

function makeCode() {
  return String(Math.floor(100000 + Math.random() * 900000)); // ৬ সংখ্যার OTP code
}

function makeToken(user) {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      phone: user.phone,
      area: user.area,
      division: user.division,
      district: user.district,
      upazila: user.upazila
    },
    process.env.JWT_SECRET || 'porshi_secret_key_2026_bd',
    { expiresIn: '30d' }
  );
}

// POST /api/auth/signup -> নতুন account তৈরি ও verification code পাঠানো
router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, division, district, upazila, localArea, area, password } = req.body;
    if (!name || !phone || !password) {
      return res.status(400).json({ error: 'নাম, মোবাইল নম্বর ও পাসওয়ার্ড প্রদান করুন' });
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 11) {
      return res.status(400).json({ error: 'সঠিক ১১ সংখ্যার মোবাইল নম্বর প্রদান করুন (যেমন: 017XXXXXXXX)' });
    }

    // Check duplicate phone
    const existingPhone = await User.findOne({ phone: cleanPhone });
    if (existingPhone) {
      return res.status(400).json({ error: 'এই মোবাইল নম্বর দিয়ে আগেই অ্যাকাউন্ট তৈরি করা আছে' });
    }

    if (email) {
      const existingEmail = await User.findOne({ email: email.toLowerCase() });
      if (existingEmail) {
        return res.status(400).json({ error: 'এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট তৈরি করা আছে' });
      }
    }

    const finalArea = area || localArea || upazila || 'ধানমন্ডি';
    const passwordHash = await bcrypt.hash(password, 10);
    const code = makeCode();

    const user = await User.create({
      name,
      email: email ? email.toLowerCase() : undefined,
      phone: cleanPhone,
      division: division || 'dhaka',
      district: district || 'dhaka_city',
      upazila: upazila || 'dhanmondi',
      localArea: localArea || '',
      area: finalArea,
      passwordHash,
      verificationCode: code,
      verificationExpires: new Date(Date.now() + 15 * 60 * 1000)
    });

    console.log(`\n========================================\n[PORSHI OTP] User: ${user.name} (${user.phone}) -> CODE: ${code}\n========================================\n`);

    if (user.email) {
      try {
        await sendVerificationCode(user.email, code);
      } catch (e) {
        console.log('Email delivery skipped, terminal code displayed.');
      }
    }

    res.status(201).json({
      message: 'Verification OTP কোড পাঠানো হয়েছে',
      phone: user.phone,
      email: user.email,
      demoCode: code
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/auth/verify -> OTP কোড মিলিয়ে অ্যাকাউন্ট সক্রিয়করণ
router.post('/verify', async (req, res) => {
  try {
    const { identifier, phone, email, code } = req.body;
    const query = {};
    if (phone) query.phone = phone.replace(/[^0-9+]/g, '');
    else if (email) query.email = email.toLowerCase();
    else if (identifier) {
      if (identifier.includes('@')) query.email = identifier.toLowerCase();
      else query.phone = identifier.replace(/[^0-9+]/g, '');
    }

    const user = await User.findOne(query);
    if (!user) return res.status(404).json({ error: 'ব্যবহারকারী পাওয়া যায়নি' });

    // Allow master demo OTP code (123456) or the real generated code
    const isMasterCode = (code === '123456');
    const isRealCode = (user.verificationCode === code && user.verificationExpires >= new Date());

    if (!isMasterCode && !isRealCode) {
      return res.status(400).json({ error: 'ওটিপি (OTP) কোডটি ভুল অথবা মেয়াদ শেষ হয়ে গেছে' });
    }

    user.verified = true;
    user.verificationCode = undefined;
    user.verificationExpires = undefined;
    await user.save();

    const token = makeToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        area: user.area,
        division: user.division,
        district: user.district,
        upazila: user.upazila,
        localArea: user.localArea
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/auth/login -> ফোন বা ইমেইল + পাসওয়ার্ড দিয়ে লগইন
router.post('/login', async (req, res) => {
  try {
    const { identifier, email, phone, password } = req.body;
    const searchTarget = (identifier || email || phone || '').trim();
    if (!searchTarget || !password) {
      return res.status(400).json({ error: 'মোবাইল নম্বর/ইমেইল এবং পাসওয়ার্ড দিন' });
    }

    let user = null;
    if (searchTarget.includes('@')) {
      user = await User.findOne({ email: searchTarget.toLowerCase() });
    } else {
      const cleanPhone = searchTarget.replace(/[^0-9+]/g, '');
      user = await User.findOne({ phone: cleanPhone });
    }

    if (!user) {
      return res.status(400).json({ error: 'মোবাইল নম্বর/ইমেইল অথবা পাসওয়ার্ড সঠিক নয়' });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(400).json({ error: 'মোবাইল নম্বর/ইমেইল অথবা পাসওয়ার্ড সঠিক নয়' });
    }

    if (!user.verified) {
      const code = makeCode();
      user.verificationCode = code;
      user.verificationExpires = new Date(Date.now() + 15 * 60 * 1000);
      await user.save();
      console.log(`\n[PORSHI LOGIN OTP] ${user.name} (${user.phone}) -> CODE: ${code}\n`);

      return res.status(403).json({
        error: 'অ্যাকাউন্ট ভেরিফাই করা হয়নি। নতুন ওটিপি কোড পাঠানো হয়েছে',
        needsVerification: true,
        phone: user.phone,
        email: user.email,
        demoCode: code
      });
    }

    const token = makeToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        area: user.area,
        division: user.division,
        district: user.district,
        upazila: user.upazila,
        localArea: user.localArea
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/auth/me -> প্রোফাইল তথ্য
router.get('/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash -verificationCode');
  if (!user) return res.status(404).json({ error: 'ব্যবহারকারী পাওয়া যায়নি' });
  res.json(user);
});

module.exports = router;
