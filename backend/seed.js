const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Listing = require('./models/Listing');
const Post = require('./models/Post');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/porshi_db';

const sampleUsers = [
  {
    name: 'তানভীর আহমেদ',
    phone: '01711223344',
    email: 'tanvir@porshi.local',
    role: 'citizen',
    division: 'dhaka',
    district: 'dhaka_city',
    upazila: 'dhanmondi',
    area: 'ধানমন্ডি',
    verified: true,
    points: 240
  },
  {
    name: 'করিম ইলেকট্রিক এন্ড টেকনিক্যাল',
    phone: '01712458823',
    email: 'karim@porshi.local',
    role: 'pro',
    specialty: 'ইলেকট্রিশিয়ান ও ওয়্যারিং',
    nidNumber: '19942692581252',
    division: 'dhaka',
    district: 'dhaka_city',
    upazila: 'dhanmondi',
    area: 'ধানমন্ডি',
    verified: true,
    points: 450
  }
];

const sampleListings = [
  {
    name: 'কুল কেয়ার এসি মাস্টার (Cool Care AC Master)',
    category: 'ac_service',
    division: 'dhaka',
    district: 'dhaka_city',
    upazila: 'dhanmondi',
    area: 'ধানমন্ডি',
    address: 'রোড ২৭ (পুরাতন), বাড়ি ১২, ধানমন্ডি, ঢাকা',
    phone: '01712-458823',
    whatsapp: '01712458823',
    description: 'স্প্লিট ও ক্যাসেট এসি সার্ভিসিং, গ্যাস রিফিল, লিকেজ রিপেয়ার ও ইন্সটলেশন। ৩০ মিনিটে অভিজ্ঞ টেকনিশিয়ান হাজির।',
    priceRange: '৳৬০০ - ৳২,৫০০',
    addedBy: 'তানভীর আহমেদ',
    listingType: 'pro_verified',
    nidNumber: '19942692581234',
    upvotes: 34,
    verified: true,
    badge: 'টপ রেটেড টেকনিশিয়ান',
    reviews: [
      { reviewerName: 'রাফি চৌধুরী', rating: 5, comment: 'খুব দ্রুত এসে এসি গ্যাস রিফিল করে দিয়ে গেছে। সার্ভিস চমৎকার।' },
      { reviewerName: 'শায়লা হক', rating: 5, comment: 'দক্ষ টেকনিশিয়ান, কাজের পর রুম পরিষ্কার করে দিয়ে গেছে।' }
    ]
  },
  {
    name: 'লাইফলাইন ২৪/৭ আইসিইউ অ্যাম্বুলেন্স সেবা',
    category: 'ambulance',
    division: 'dhaka',
    district: 'dhaka_city',
    upazila: 'dhanmondi',
    area: 'ধানমন্ডি',
    address: 'সাত মসজিদ রোড, ধানমন্ডি, ঢাকা',
    phone: '01823-449012',
    whatsapp: '01823449012',
    description: 'জরুরি এসি ও নন-এসি অ্যাম্বুলেন্স, আইসিইউ ও ভেন্টিলেটর সাপোর্ট, অক্সিজেন সিলিন্ডার এবং দেশব্যাপী পেশেন্ট ট্রান্সপোর্ট।',
    priceRange: '৳১,৫০০ - ৳১০,০০০',
    addedBy: 'ডা. মাহমুদ হক',
    listingType: 'pro_verified',
    nidNumber: '19882692589988',
    upvotes: 48,
    verified: true,
    badge: 'জরুরি সেবা ২৪/৭',
    reviews: [{ reviewerName: 'মাহমুদ হক', rating: 5, comment: '১০ মিনিটে অ্যাম্বুলেন্স পাঠিয়েছিল, অত্যন্ত কৃতজ্ঞ।' }]
  },
  {
    name: 'স্মার্ট অ্যাপ্লায়েন্স কেয়ার (ফ্রিজ ও টিভি মেরামত)',
    category: 'appliance',
    division: 'dhaka',
    district: 'dhaka_city',
    upazila: 'mirpur',
    area: 'মিরপুর ১০',
    address: 'মিরপুর ১০ গোলচত্বর সংলগ্ন, ব্লক সি, ঢাকা',
    phone: '01711-908123',
    whatsapp: '01711908123',
    description: 'রেফ্রিজারেটর গ্যাস চার্জিং, কুলিং প্রবলেম, ওয়াশিং মেশিন মোটর ফিক্স, মাইক্রোওয়েভ ও এলইডি টিভি হোম সার্ভিস।',
    priceRange: '৳৫০০ - ৳২,৫০০',
    addedBy: 'করিম ইলেকট্রিক',
    listingType: 'pro_verified',
    nidNumber: '19902692587766',
    upvotes: 31,
    verified: true,
    badge: 'অ্যাপ্লায়েন্স এক্সপার্ট',
    reviews: [{ reviewerName: 'আহমেদ জামিল', rating: 5, comment: 'ফ্রিজের গ্যাস লিকেজ টেস্ট করে সঠিকভাবে ঠিক করেছে।' }]
  },
  {
    name: 'গ্লো বিউটি হোম পার্লার ও স্পা',
    category: 'beauty_parlour',
    division: 'dhaka',
    district: 'dhaka_city',
    upazila: 'dhanmondi',
    area: 'ধানমন্ডি',
    address: 'সাত মসজিদ রোড, রোড ৮/এ, ধানমন্ডি, ঢাকা',
    phone: '01712-449908',
    whatsapp: '01712449908',
    description: 'মহিলাদের জন্য ঘরে বসে প্রিমিয়াম পার্লার সেবা — ফেসিয়াল, হেয়ার কাট, ব্রাইডাল মেকওভার, পেডিকিউর ও ওয়াক্সিং।',
    priceRange: '৳৪০০ - ৳৩,৫০০',
    addedBy: 'ফারহানা ইয়াসমিন',
    listingType: 'pro_verified',
    nidNumber: '19952692584433',
    upvotes: 42,
    verified: true,
    badge: 'টপ বিউটিশিয়ান',
    reviews: [{ reviewerName: 'আনিকা জামান', rating: 5, comment: 'বাসায় এসে খুব যত্ন নিয়ে ফেসিয়াল ও হেয়ার স্পা করে দিয়েছেন।' }]
  },
  {
    name: 'করিম ইলেকট্রিক এন্ড ওয়্যারিং সল্যুশনস',
    category: 'electrician',
    division: 'dhaka',
    district: 'dhaka_city',
    upazila: 'dhanmondi',
    area: 'ধানমন্ডি',
    address: 'রোড ৪/এ, ধানমন্ডি, ঢাকা',
    phone: '01712-458823',
    whatsapp: '01712458823',
    description: 'মেইন ডিবি বোর্ড শর্ট সার্কিট সমাধান, হাউস ওয়্যারিং, ফ্যান-লাইট ফিটিং ও আইপিএস কানেকশন।',
    priceRange: '৳৪০০ - ৳১,৫০০',
    addedBy: 'করিম ইলেকট্রিক',
    listingType: 'pro_verified',
    nidNumber: '19942692581252',
    upvotes: 56,
    verified: true,
    badge: 'মাস্টার ইলেকট্রিশিয়ান',
    reviews: [{ reviewerName: 'তানভীর আহমেদ', rating: 5, comment: 'অত্যন্ত দক্ষ ও সৎ ইলেকট্রিশিয়ান। খুব ভালো কাজ।' }]
  },
  {
    name: 'ঢাকা পাইপলাইন ও মাস্টার প্লাম্বার',
    category: 'plumber',
    division: 'dhaka',
    district: 'dhaka_city',
    upazila: 'dhanmondi',
    area: 'ধানমন্ডি',
    address: 'রোড ১৫ (নতুন), ধানমন্ডি, ঢাকা',
    phone: '01819-332211',
    whatsapp: '01819332211',
    description: 'পানির পাম্প মেরামত, বাথরুম ফিটিংস লিকেজ সমাধান ও ট্যাংক কানেকশন।',
    priceRange: '৳৫০০ - ৳২,০০০',
    addedBy: 'নাসরিন সুলতানা',
    listingType: 'community_recommended',
    upvotes: 27,
    verified: false,
    badge: 'কমিউনিটি সুপারিশ',
    reviews: [{ reviewerName: 'কামরুল হাসান', rating: 5, comment: 'পানির লাইনের লিক সাথে সাথে ঠিক করে দিয়েছে।' }]
  }
];

const samplePosts = [
  {
    type: 'question',
    serviceCategory: 'tutor',
    area: 'ধানমন্ডি',
    title: 'ধানমন্ডি এলাকায় ক্লাস ৯-এর জন্য ভালো পদার্থবিজ্ঞান টিউটর প্রয়োজন',
    content: 'আমার ছোট ভাইয়ের জন্য সপ্তাহে ৩ দিন পড়ানোর মতো একজন বুয়েট/ঢাবি ব্যাকগ্রাউন্ডের বিশ্বস্ত গৃহশিক্ষক খুঁজছি। কারো পরিচিত থাকলে নম্বর শেয়ার করবেন প্লিজ।',
    authorName: 'তানভীর আহমেদ',
    upvotes: 8,
    replies: [
      { authorName: 'রাফি চৌধুরী', content: 'রোড ৮ এ একজন ভালো টিউটর আছেন, আমি ওনার ফোন নম্বর ইনবক্স করছি।' }
    ]
  },
  {
    type: 'recommendation',
    serviceCategory: 'ac_service',
    area: 'ধানমন্ডি',
    title: 'কুল কেয়ার এসি মাস্টার এর দারুণ সার্ভিস পেলাম!',
    content: 'আজ সকালে আমার ড্রয়িংরুমের এসির গ্যাস রিফিল ও ওয়াশ করিয়েছি। মাত্র ৩০ মিনিটে এসেছে এবং কাজের পর কোনো ময়লা রাখেনি। সবাইকে রিকমেন্ড করছি।',
    authorName: 'নাসরিন সুলতানা',
    upvotes: 14,
    replies: []
  },
  {
    type: 'emergency',
    serviceCategory: 'doctor',
    area: 'ধানমন্ডি',
    title: 'জরুরি B+ রক্তদাতার সন্ধান (ধানমন্ডি পপুলার হাসপাতাল)',
    content: 'আগামীকাল সকাল ১০টায় একজন হৃদরোগীর অপারেশনের জন্য ১ ব্যাগ B+ রক্তের প্রয়োজন। কোনো সহৃদয় প্রতিবেশী রক্তদানে এগিয়ে এলে চিরকৃতজ্ঞ থাকব।',
    authorName: 'ফাহিম ইসলাম',
    upvotes: 22,
    replies: [
      { authorName: 'তানভীর আহমেদ', content: 'আমি B+ পজিটিভ। আমি প্রস্তুত আছি ভাই।' }
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    await User.deleteMany({});
    await Listing.deleteMany({});
    await Post.deleteMany({});

    const passwordHash = await bcrypt.hash('123456', 10);
    const usersWithPass = sampleUsers.map(u => ({ ...u, passwordHash }));
    await User.insertMany(usersWithPass);
    await Listing.insertMany(sampleListings);
    await Post.insertMany(samplePosts);

    console.log('Seeded database successfully with Porshi dataset.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding DB:', err);
    process.exit(1);
  }
}

seed();

