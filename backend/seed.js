require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Listing = require('./models/Listing');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/porshi';

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB at:', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB ✓');

    // Clean existing data
    await User.deleteMany({});
    await Listing.deleteMany({});
    await Post.deleteMany({});
    console.log('Cleared existing collections.');

    // Seed Demo Users
    const hashedCitizenPassword = await bcrypt.hash('123456', 10);
    const hashedProPassword = await bcrypt.hash('123456', 10);

    const citizen = await User.create({
      name: 'রাকিব হাসান (Rakib Hasan)',
      phone: '01700000000',
      password: hashedCitizenPassword,
      role: 'citizen',
      area: 'Dhanmondi, Dhaka',
      points: 240,
      hasServiceListing: false
    });

    const pro = await User.create({
      name: 'মোঃ রহিম (Md. Rahim)',
      phone: '01712458823',
      password: hashedProPassword,
      role: 'pro',
      area: 'Dhanmondi, Dhaka',
      points: 450,
      hasServiceListing: true
    });

    console.log('Demo Users seeded (Rakib Hasan & Md. Rahim) ✓');

    // Seed Specialist Listings
    const listings = [
      {
        name: 'Rahim Electric Service',
        workerName: 'Md. Rahim Hossain',
        category: 'electrician',
        categoryGroup: 'home_services',
        verificationType: 'pro_verified',
        nidNumber: '19942692581252',
        phone: '01712-458823',
        whatsapp: '01712458823',
        area: 'Dhanmondi, Dhaka',
        priceText: '৳300 থেকে',
        priceValue: 300,
        rating: 4.9,
        reviewsCount: 128,
        upvotes: 56,
        reviews: [
          { reviewerName: 'Tanvir Ahmed', rating: 5, comment: 'Extremely skilled electrician. Fixed DB board promptly.' },
          { reviewerName: 'Rafi Chowdhury', rating: 5, comment: 'Punctual and honest technician.' }
        ]
      },
      {
        name: 'Ayon Plumber & Pipe Works',
        workerName: 'Ayon Hossain',
        category: 'plumber',
        categoryGroup: 'home_services',
        verificationType: 'community_added',
        nidNumber: '19912692583344',
        phone: '01819-332211',
        whatsapp: '01819332211',
        area: 'Dhanmondi, Dhaka',
        priceText: '৳250 থেকে',
        priceValue: 250,
        rating: 4.8,
        reviewsCount: 96,
        upvotes: 42,
        reviews: [
          { reviewerName: 'Kamrul Hasan', rating: 5, comment: 'Fixed the concealed bathroom pipe leak immediately.' }
        ]
      },
      {
        name: 'CoolTech AC Master Service',
        workerName: 'Zahid Hasan',
        category: 'ac_service',
        categoryGroup: 'repairs',
        verificationType: 'pro_verified',
        nidNumber: '19942692581234',
        phone: '01712-458823',
        whatsapp: '01712458823',
        area: 'Dhanmondi, Dhaka',
        priceText: '৳500 থেকে',
        priceValue: 500,
        rating: 4.9,
        reviewsCount: 210,
        upvotes: 68,
        reviews: [
          { reviewerName: 'Shaila Haque', rating: 5, comment: 'Punctual technician, left the room spotless after AC gas refill.' }
        ]
      },
      {
        name: 'Dr. Moksedul (পল্লী চিকিৎসক ও ফার্স্ট এইড)',
        workerName: 'Dr. Moksedul Ali (DMS, RMP)',
        category: 'doctor',
        categoryGroup: 'health',
        verificationType: 'pro_verified',
        nidNumber: '19852692581122',
        phone: '01715-998877',
        whatsapp: '01715998877',
        area: 'Dhanmondi, Dhaka',
        priceText: '৳200 থেকে',
        priceValue: 200,
        rating: 4.9,
        reviewsCount: 74,
        upvotes: 62,
        reviews: []
      },
      {
        name: 'Al-Shefa ICU Ambulance 24/7',
        workerName: 'Md. Alamgir Hossain',
        category: 'ambulance',
        categoryGroup: 'health',
        verificationType: 'pro_verified',
        nidNumber: '19872692582211',
        phone: '01912-334455',
        whatsapp: '01912334455',
        area: 'Dhanmondi, Dhaka',
        priceText: '৳1500 থেকে',
        priceValue: 1500,
        rating: 5.0,
        reviewsCount: 112,
        upvotes: 88,
        reviews: []
      }
    ];

    await Listing.insertMany(listings);
    console.log(`Seeded ${listings.length} Specialist Listings ✓`);

    // Seed Community Posts
    const posts = [
      {
        authorName: 'Nasrin Sultana',
        area: 'Dhanmondi, Dhaka',
        category: 'recommendation',
        title: 'Need a reliable plumber for bathroom pipe leakage in Dhanmondi',
        content: 'Our 3rd floor bathroom concealed pipe is leaking. Any trusted and verified plumber in Dhanmondi area who can come today?',
        upvotes: 18,
        comments: [
          { author: 'Md. Rahim', text: 'You can contact Ayon Plumber (01819-332211), he did clean work in our building.' }
        ]
      },
      {
        authorName: 'Shakil Ahmed',
        area: 'Mirpur, Dhaka',
        category: 'help',
        title: 'Urgent: Blood Donor O+ Needed at Central Hospital',
        content: 'Patient scheduled for bypass surgery tomorrow morning. If any neighbor in Dhaka is willing to donate, please reach out directly.',
        upvotes: 34,
        comments: []
      }
    ];

    await Post.insertMany(posts);
    console.log(`Seeded ${posts.length} Community Posts ✓`);

    console.log('\n🎉 Database Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
}

seedDatabase();
