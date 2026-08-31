// ==========================================================================
// Porshi (পড়শী) — Neighborhood Services & Community Network
// Full Application Logic & Multi-Page View Routing
// Developed by Shreya (github.com/Shreyalien)
// ==========================================================================

// Clean Avatar Generator Helper (guarantees NO pacifiers, NO weird accessories, polite smiling normal faces)
function getCleanAvatar(seed, bgHex = 'b6e3f4') {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&mouth=smile&eyebrows=default&eyes=default&accessoriesProbability=0&backgroundColor=${bgHex}`;
}

// 40+ Category Material Symbols & Metadata Mapping
const ALL_CATEGORIES_DATA = [
  { id: 'electrician', group: 'home_services', icon: 'bolt', nameEn: 'Electrician', nameBn: 'ইলেকট্রিশিয়ান', count: 0 },
  { id: 'plumber', group: 'home_services', icon: 'plumbing', nameEn: 'Plumber', nameBn: 'প্লাম্বার', count: 0 },
  { id: 'ac_service', group: 'repairs', icon: 'ac_unit', nameEn: 'AC Service', nameBn: 'এসি সার্ভিস', count: 0 },
  { id: 'cleaning', group: 'home_services', icon: 'cleaning_services', nameEn: 'Home Cleaning', nameBn: 'ঘর পরিচ্ছন্নতা', count: 0 },
  { id: 'doctor', group: 'health', icon: 'medical_services', nameEn: 'Local Health Doctor', nameBn: 'পল্লী চিকিৎসক ও স্বাস্থ্যসেবা', count: 0 },
  { id: 'pet_care', group: 'health', icon: 'pets', nameEn: 'Vet / Animal Doctor', nameBn: 'পশু চিকিৎসক (ভেটেরিনারি)', count: 0 },
  { id: 'tutor', group: 'education', icon: 'school', nameEn: 'Home Tutor', nameBn: 'গৃহশিক্ষক', count: 0 },
  { id: 'gas_delivery', group: 'home_services', icon: 'propane_tank', nameEn: 'LPG Gas Cylinder', nameBn: 'গ্যাস সিলিন্ডার', count: 0 },
  { id: 'ambulance', group: 'health', icon: 'emergency', nameEn: 'Ambulance 24/7', nameBn: 'অ্যাম্বুলেন্স ২৪/৭', count: 0 },
  { id: 'pharmacy', group: 'health', icon: 'local_pharmacy', nameEn: '24/7 Pharmacy', nameBn: '২৪/৭ ফার্মেসি', count: 0 },
  { id: 'appliance', group: 'repairs', icon: 'kitchen', nameEn: 'Fridge & TV Repair', nameBn: 'ফ্রিজ ও টিভি মেরামত', count: 0 },
  { id: 'carpenter', group: 'home_services', icon: 'carpenter', nameEn: 'Carpenter', nameBn: 'কাঠমিস্ত্রি', count: 0 },
  { id: 'painting', group: 'home_services', icon: 'format_paint', nameEn: 'House Painting', nameBn: 'বাড়ি রঙমিস্ত্রি', count: 0 },
  { id: 'house_maid', group: 'home_services', icon: 'person', nameEn: 'House Maid / Cook', nameBn: 'কাজের লোক ও রাঁধুনি', count: 0 },
  { id: 'car_mechanic', group: 'transportation', icon: 'car_repair', nameEn: 'Car & Bike Mechanic', nameBn: 'গাড়ি ও বাইক মেকানিক', count: 0 },
  { id: 'driver', group: 'transportation', icon: 'directions_car', nameEn: 'Driver on Demand', nameBn: 'অন-ডিমান্ড ড্রাইভার', count: 0 },
  { id: 'courier', group: 'transportation', icon: 'local_shipping', nameEn: 'Parcel Courier & Delivery', nameBn: 'পার্সেল ও কুরিয়ার', count: 0 },
  { id: 'pest_control', group: 'home_services', icon: 'pest_control', nameEn: 'Pest Control', nameBn: 'কীটপতঙ্গ দমন', count: 0 },
  { id: 'water_filter', group: 'home_services', icon: 'water_drop', nameEn: 'Water Filter Service', nameBn: 'ওয়াটার ফিল্টার', count: 0 },
  { id: 'water_tank', group: 'home_services', icon: 'water', nameEn: 'Water Tank Cleaning', nameBn: 'পানির ট্যাংক ওয়াশ', count: 0 },
  { id: 'generator_ips', group: 'repairs', icon: 'power', nameEn: 'IPS & Generator Fix', nameBn: 'আইপিএস ও জেনারেটর', count: 0 },
  { id: 'mobile_laptop', group: 'repairs', icon: 'devices', nameEn: 'Mobile & Laptop Repair', nameBn: 'মোবাইল ও ল্যাপটপ', count: 0 },
  { id: 'cctv_security', group: 'repairs', icon: 'videocam', nameEn: 'CCTV & Security Alarm', nameBn: 'সিসিটিভি ও সিকিউরিটি', count: 0 },
  { id: 'locksmith', group: 'home_services', icon: 'lock', nameEn: 'Locksmith (তালামিস্ত্রি)', nameBn: 'তালামিস্ত্রি', count: 0 },
  { id: 'glass_fitting', group: 'home_services', icon: 'window', nameEn: 'Glass & Thai Fitting', nameBn: 'গ্লাস ও থাই অ্যালুমিনিয়াম', count: 0 },
  { id: 'interior_design', group: 'home_services', icon: 'weekend', nameEn: 'Interior & Renovation', nameBn: 'ইন্টেরিয়র ও সাজসজ্জা', count: 0 },
  { id: 'laundry', group: 'home_services', icon: 'local_laundry_service', nameEn: 'Laundry & Dry Clean', nameBn: 'লন্ড্রি ও ড্রাই ওয়াশ', count: 0 },
  { id: 'salon_men', group: 'events', icon: 'content_cut', nameEn: 'Home Barber / Salon', nameBn: 'হোম সেলুন / নাপিত', count: 0 },
  { id: 'beauty_parlour', group: 'events', icon: 'spa', nameEn: 'Ladies Beauty Parlour', nameBn: 'বিউটি পার্লার', count: 0 },
  { id: 'tailor', group: 'events', icon: 'dry_cleaning', nameEn: 'Tailor & Dress Making', nameBn: 'দর্জি ও সেলাই', count: 0 },
  { id: 'event_decor', group: 'events', icon: 'celebration', nameEn: 'Event & Wedding Decor', nameBn: 'ইভেন্ট ও বিয়ে ডেকোরেশন', count: 0 },
  { id: 'catering', group: 'events', icon: 'restaurant_menu', nameEn: 'Catering & Cook Service', nameBn: 'বাবুর্চি ও ক্যাটারিং', count: 0 },
  { id: 'graphics_print', group: 'events', icon: 'print', nameEn: 'Printing & Photocopy', nameBn: 'প্রিন্টিং ও সাইনবোর্ড', count: 0 },
  { id: 'grocery', group: 'home_services', icon: 'local_mall', nameEn: 'Local Grocery Delivery', nameBn: 'মুদি বাজার ডেলিভারি', count: 0 },
  { id: 'septic_clean', group: 'home_services', icon: 'cleaning_services', nameEn: 'Septic Tank Cleaning', nameBn: 'সেপটিক ট্যাংক পরিষ্কার', count: 0 },
  { id: 'solar_inverter', group: 'repairs', icon: 'solar_power', nameEn: 'Solar Panel Setup', nameBn: 'সোলার প্যানেল ফিটিং', count: 0 },
  { id: 'welding', group: 'repairs', icon: 'precision_manufacturing', nameEn: 'Welding & Grill Works', nameBn: 'ওয়েল্ডিং ও গ্রিল মিস্ত্রি', count: 0 },
  { id: 'real_estate', group: 'home_services', icon: 'real_estate_agent', nameEn: 'House Rent & Flat Broker', nameBn: 'বাসা ভাড়া ও ফ্ল্যাট এজেন্ট', count: 0 },
  { id: 'handyman', group: 'home_services', icon: 'handyman', nameEn: 'General Handyman', nameBn: 'অলরাউন্ডার মিস্ত্রি', count: 0 },
  { id: 'movers', group: 'transportation', icon: 'local_shipping', nameEn: 'House Shifting & Movers', nameBn: 'বাসা বদল ও মালামাল পরিবহন', count: 0 }
];

// Rich Multi-Category Listings Dataset (Curated with clean, normal smiling cartoon human avatars)
let INITIAL_LISTINGS = [
  // 1. Electrician (NID Verified)
  {
    _id: 'l1',
    name: 'Rahim Electric Service',
    workerName: 'Md. Rahim Hossain',
    avatar: getCleanAvatar('RahimProWorker', 'ffd5dc'),
    category: 'electrician',
    categoryGroup: 'home_services',
    verificationType: 'pro_verified',
    area: 'Dhanmondi, Dhaka',
    distanceKm: 1.2,
    availability: 'now',
    tags: 'Wiring • Fan • Light • Switch • AC Electric',
    address: 'Road 4/A, Dhanmondi, Dhaka',
    phone: '01712-458823',
    whatsapp: '01712458823',
    description: 'Main DB board short circuit repair, complete apartment house wiring, fan-light fittings, circuit breaker replacement & IPS setup.',
    priceText: '৳300 থেকে',
    priceValue: 300,
    rating: 4.9,
    reviewsCount: 128,
    experience: '8+ Years Exp.',
    jobsCount: '1.2K+ Jobs',
    nidNumber: '19942692581252',
    upvotes: 56,
    reviews: [
      { reviewerName: 'Tanvir Ahmed', rating: 5, comment: 'Extremely skilled and honest electrician. Fixed DB board promptly.' },
      { reviewerName: 'Rafi Chowdhury', rating: 5, comment: 'Punctual and courteous.' }
    ]
  },

  // 2. Plumber (Community Recommended)
  {
    _id: 'l2',
    name: 'Ayon Plumber & Pipe Works',
    workerName: 'Ayon Hossain',
    avatar: getCleanAvatar('AyonPlumberMan', 'c0aede'),
    category: 'plumber',
    categoryGroup: 'home_services',
    verificationType: 'community_added',
    addedBy: 'Tanvir Ahmed (Neighbor)',
    area: 'Dhanmondi, Dhaka',
    distanceKm: 1.5,
    availability: 'now',
    tags: 'Pipe Fitting • Leak • Bathroom • Sink • Motor',
    address: 'Road 15 (New), Dhanmondi, Dhaka',
    phone: '01819-332211',
    whatsapp: '01819332211',
    description: 'Water pump repair, bathroom fittings leakage fix, concealed pipe inspection & water tank connection.',
    priceText: '৳250 থেকে',
    priceValue: 250,
    rating: 4.8,
    reviewsCount: 96,
    experience: '6+ Years Exp.',
    jobsCount: '900+ Jobs',
    nidNumber: '19912692583344',
    upvotes: 42,
    reviews: [
      { reviewerName: 'Kamrul Hasan', rating: 5, comment: 'Fixed the leaking basin pipe immediately.' }
    ]
  },

  // 3. AC Service (NID Verified)
  {
    _id: 'l3',
    name: 'CoolTech AC Master Service',
    workerName: 'Zahid Hasan',
    avatar: getCleanAvatar('ZahidACTechnician', 'b6e3f4'),
    category: 'ac_service',
    categoryGroup: 'repairs',
    verificationType: 'pro_verified',
    area: 'Dhanmondi, Dhaka',
    distanceKm: 1.8,
    availability: 'now',
    tags: 'AC Repair • Gas Refill • Service • Install',
    address: 'Road 27 (Old), House 12, Dhanmondi, Dhaka',
    phone: '01712-458823',
    whatsapp: '01712458823',
    description: 'Split & cassette AC master servicing, refrigerant gas refill, leakage test & rapid installation with guarantee.',
    priceText: '৳500 থেকে',
    priceValue: 500,
    rating: 4.9,
    reviewsCount: 210,
    experience: '9+ Years Exp.',
    jobsCount: '1.5K+ Jobs',
    nidNumber: '19942692581234',
    upvotes: 68,
    reviews: [
      { reviewerName: 'Shaila Haque', rating: 5, comment: 'Punctual technician, left the room spotless after repair.' }
    ]
  },

  // 4. Gas Delivery (NID Verified)
  {
    _id: 'l4',
    name: 'Al-Madina LPG Express',
    workerName: 'Kawsar Mahmud',
    avatar: getCleanAvatar('KawsarGasDeliver', 'ffdfbf'),
    category: 'gas_delivery',
    categoryGroup: 'home_services',
    verificationType: 'pro_verified',
    area: 'Dhanmondi, Dhaka',
    distanceKm: 0.8,
    availability: 'now',
    tags: 'Bashundhara • Omera • Beximco • 12KG',
    address: 'Shankar, Dhanmondi, Dhaka',
    phone: '01911-889900',
    whatsapp: '01911889900',
    description: 'Doorstep cylinder delivery within 15-20 minutes with leak safety test and free regulator connection.',
    priceText: '৳1450 থেকে',
    priceValue: 1450,
    rating: 4.9,
    reviewsCount: 340,
    experience: '5+ Years Exp.',
    jobsCount: '3.4K+ Jobs',
    nidNumber: '19892692589988',
    upvotes: 94,
    reviews: [
      { reviewerName: 'Farhana Kabir', rating: 5, comment: 'Delivered cylinder in 15 mins during emergency cooking.' }
    ]
  },

  // 5. Home Cleaning (Community Added)
  {
    _id: 'l5',
    name: 'Maya Cleaning & Deep Wash',
    workerName: 'Maya Begum & Team',
    avatar: getCleanAvatar('MayaBegumClean', 'ffd5dc'),
    category: 'cleaning',
    categoryGroup: 'home_services',
    verificationType: 'community_added',
    addedBy: 'Dr. Moksedul',
    area: 'Dhanmondi, Dhaka',
    distanceKm: 1.4,
    availability: 'today',
    tags: 'Full Flat • Kitchen • Bathroom • Sofa Wash',
    address: 'Road 8/A, Dhanmondi, Dhaka',
    phone: '01611-445566',
    whatsapp: '01611445566',
    description: 'Complete apartment deep cleaning, bathroom tile descaling, sofa & carpet shampoo wash, pest spray.',
    priceText: '৳800 থেকে',
    priceValue: 800,
    rating: 4.7,
    reviewsCount: 88,
    experience: '4+ Years Exp.',
    jobsCount: '650+ Jobs',
    nidNumber: '19952692587766',
    upvotes: 35,
    reviews: [
      { reviewerName: 'Tahmina Islam', rating: 5, comment: 'Superb cleaning and very polite staff.' }
    ]
  },

  // 6. Local Health Doctor (Palli Chikitshok & Pharmacy Practice)
  {
    _id: 'l6',
    name: 'Dr. Moksedul (পল্লী চিকিৎসক ও ফার্স্ট এইড)',
    workerName: 'Dr. Moksedul Ali (DMS, RMP)',
    avatar: getCleanAvatar('DrMoksedulHealth', 'b6e3f4'),
    category: 'doctor',
    categoryGroup: 'health',
    verificationType: 'pro_verified',
    area: 'Dhanmondi, Dhaka',
    distanceKm: 2.0,
    availability: 'now',
    tags: 'Home Visit • Blood Pressure • Diabetes • First Aid',
    address: 'Green Road, Dhanmondi, Dhaka',
    phone: '01715-998877',
    whatsapp: '01715998877',
    description: 'Local neighborhood health practitioner. Home visits for blood pressure check, diabetes sugar test, wound dressing, saline push and urgent primary treatment.',
    priceText: '৳200 থেকে',
    priceValue: 200,
    rating: 4.9,
    reviewsCount: 74,
    experience: '12+ Years Exp.',
    jobsCount: '1.8K+ Visits',
    nidNumber: '19852692581122',
    upvotes: 62,
    reviews: [
      { reviewerName: 'Zubair Hossain', rating: 5, comment: 'Came to our home within 15 mins to check blood pressure and dressing.' }
    ]
  },

  // 7. Vet / Animal Doctor (Poshu Chikitshok)
  {
    _id: 'l7',
    name: 'Dr. Shafiqul (পশু চিকিৎসক ও পেট কেয়ার)',
    workerName: 'Dr. Shafiqul Islam (DVM / Vet)',
    avatar: getCleanAvatar('DrShafiqulVetDoctor', 'c0aede'),
    category: 'pet_care',
    categoryGroup: 'health',
    verificationType: 'pro_verified',
    area: 'Dhanmondi, Dhaka',
    distanceKm: 1.6,
    availability: 'now',
    tags: 'Pet Vaccine • Cat & Dog Care • Bird • Farm Animal',
    address: 'Road 12/A, Dhanmondi, Dhaka',
    phone: '01817-665544',
    whatsapp: '01817665544',
    description: 'Veterinary doctor for cats, dogs, birds and domestic animals. Doorstep vaccination, deworming, emergency sickness treatment and diet care.',
    priceText: '৳400 থেকে',
    priceValue: 400,
    rating: 5.0,
    reviewsCount: 48,
    experience: '8+ Years Exp.',
    jobsCount: '750+ Treatments',
    nidNumber: '19922692588899',
    upvotes: 49,
    reviews: [
      { reviewerName: 'Sadia Rahman', rating: 5, comment: 'Treated our pet cat very gently and accurately.' }
    ]
  },

  // 8. Home Tutor (NID Verified)
  {
    _id: 'l8',
    name: 'Tanvir Physics & Math Tutor',
    workerName: 'Tanvir Ahmed (BUET)',
    avatar: getCleanAvatar('TanvirTeacherBuet', 'd1d4f9'),
    category: 'tutor',
    categoryGroup: 'education',
    verificationType: 'pro_verified',
    area: 'Dhanmondi, Dhaka',
    distanceKm: 1.1,
    availability: 'today',
    tags: 'Class 9-12 • HSC • Physics • Math • English Medium',
    address: 'Road 6, Dhanmondi, Dhaka',
    phone: '01718-223344',
    whatsapp: '01718223344',
    description: 'Special care for Class 9-12 board exams, engineering admission base building, weekly tests and doubt solving.',
    priceText: '৳5000 / মাস',
    priceValue: 5000,
    rating: 4.9,
    reviewsCount: 45,
    experience: '5+ Years Exp.',
    jobsCount: '60+ Students',
    nidNumber: '19962692584455',
    upvotes: 51,
    reviews: [
      { reviewerName: 'Shahinur Rahman', rating: 5, comment: 'My son scored GPA 5 in Physics under his guidance.' }
    ]
  },

  // 9. Ambulance 24/7 (NID Verified)
  {
    _id: 'l9',
    name: 'Al-Shefa ICU Ambulance 24/7',
    workerName: 'Md. Alamgir Hossain',
    avatar: getCleanAvatar('AlamgirAmbulanceDriver', 'b6e3f4'),
    category: 'ambulance',
    categoryGroup: 'health',
    verificationType: 'pro_verified',
    area: 'Dhanmondi, Dhaka',
    distanceKm: 0.9,
    availability: 'now',
    tags: 'ICU • AC • Oxygen • Ventilator Support',
    address: 'Near Ibn Sina Hospital, Dhanmondi',
    phone: '01912-334455',
    whatsapp: '01912334455',
    description: 'Instant 24/7 ICU & Freezing ambulance dispatch with trained paramedic and continuous high-flow oxygen.',
    priceText: '৳1500 থেকে',
    priceValue: 1500,
    rating: 5.0,
    reviewsCount: 112,
    experience: '8+ Years Exp.',
    jobsCount: '1.4K+ Trips',
    nidNumber: '19872692582211',
    upvotes: 88,
    reviews: []
  },

  // 10. 24/7 Pharmacy (Community Recommended)
  {
    _id: 'l10',
    name: 'Dhanmondi Care Pharmacy 24/7',
    workerName: 'Shahadat Hossain',
    avatar: getCleanAvatar('ShahadatPharmacist', 'ffdfbf'),
    category: 'pharmacy',
    categoryGroup: 'health',
    verificationType: 'community_added',
    addedBy: 'Rakib Hasan (Citizen)',
    area: 'Dhanmondi, Dhaka',
    distanceKm: 0.6,
    availability: 'now',
    tags: 'Prescription Drugs • Insulin • Delivery',
    address: 'Road 2, Dhanmondi, Dhaka',
    phone: '01711-667788',
    whatsapp: '01711667788',
    description: 'Open 24 hours every day. Home delivery of essential medicines, surgical items, insulin and baby food.',
    priceText: '৳50 থেকে',
    priceValue: 50,
    rating: 4.8,
    reviewsCount: 154,
    experience: '10+ Years',
    jobsCount: '5K+ Orders',
    nidNumber: '19882692589900',
    upvotes: 79,
    reviews: []
  }
];

// Dynamically seed initial sample specialists for all other categories with clean avatars
ALL_CATEGORIES_DATA.forEach(cat => {
  const existing = INITIAL_LISTINGS.filter(l => l.category === cat.id);
  if (existing.length === 0) {
    INITIAL_LISTINGS.push({
      _id: 'l_' + cat.id,
      name: `${cat.nameEn} Specialist Dhaka`,
      workerName: `Specialist (${cat.nameEn})`,
      avatar: getCleanAvatar(`${cat.id}ExpertWorker`, 'b6e3f4'),
      category: cat.id,
      categoryGroup: cat.group,
      verificationType: 'pro_verified',
      area: 'Dhanmondi, Dhaka',
      distanceKm: 2.5,
      availability: 'now',
      tags: `${cat.nameEn} • Doorstep • Local Service`,
      address: 'Dhanmondi / Dhaka Area',
      phone: '01711-998877',
      whatsapp: '01711998877',
      description: `Professional ${cat.nameEn} with verified National ID and years of practical experience across Bangladesh.`,
      priceText: '৳350 থেকে',
      priceValue: 350,
      rating: 4.8,
      reviewsCount: 15,
      experience: '5+ Years Exp.',
      jobsCount: '300+ Jobs',
      nidNumber: '19942692589999',
      upvotes: 20,
      reviews: []
    });
  }
});

// Update category counts in real time
function updateCategoryCounts() {
  ALL_CATEGORIES_DATA.forEach(cat => {
    cat.count = INITIAL_LISTINGS.filter(l => l.category === cat.id).length;
  });
}

// Sample Community Posts Feed with Clean Avatars
let COMMUNITY_POSTS = [
  {
    _id: 'p1',
    authorName: 'Nasrin Sultana',
    authorAvatar: getCleanAvatar('NasrinLady', 'ffd5dc'),
    area: 'Dhanmondi, Dhaka',
    category: 'recommendation',
    categoryNameBn: 'পরামর্শ / সুপারিশ',
    title: 'Need a reliable plumber for bathroom pipe leakage in Dhanmondi',
    titleBn: 'ধানমন্ডি এলাকায় বাথরুমের পাইপ লিকেজের জন্য ভালো প্লাম্বারের সন্ধান চাই',
    content: 'Our 3rd floor bathroom concealed pipe is leaking. Any trusted and verified plumber in Dhanmondi area who can come today?',
    contentBn: 'আমাদের ৩য় তলার বাথরুমের দেওয়ালের ভেতরের পাইপে লিকেজ হয়েছে। ধানমন্ডি এলাকায় কোনো বিশ্বস্ত প্লাম্বারের নম্বর জানা থাকলে জানাবেন।',
    timeAgo: '2 hours ago',
    upvotes: 18,
    userUpvoted: false,
    comments: [
      { author: 'Md. Rahim', text: 'You can contact Ayon Plumber (01819-332211), he did clean work in our building.' },
      { author: 'Tanvir', text: 'Yes, Ayon is verified on Porshi and very reliable.' }
    ]
  },
  {
    _id: 'p2',
    authorName: 'Shakil Ahmed',
    authorAvatar: getCleanAvatar('ShakilBoy', 'b6e3f4'),
    area: 'Mirpur, Dhaka',
    category: 'help',
    categoryNameBn: 'জরুরি সাহায্য',
    title: 'Urgent: Blood Donor O+ Needed at Central Hospital',
    titleBn: 'জরুরি: সেন্ট্রাল হাসপাতালে ১ ব্যাগ ও+ (O+) রক্তের প্রয়োজন',
    content: 'Patient scheduled for bypass surgery tomorrow morning. If any neighbor in Dhaka is willing to donate, please reach out directly.',
    contentBn: 'কাল সকালে রোগীর বাইপাস সার্জারির জন্য ১ ব্যাগ ও+ রক্ত দরকার। কেউ ডোনেট করতে পারলে দয়া করে দ্রুত জানাবেন।',
    timeAgo: '4 hours ago',
    upvotes: 34,
    userUpvoted: true,
    comments: [
      { author: 'Rony Hasan', text: 'I am O+, sending you a private message.' }
    ]
  },
  {
    _id: 'p3',
    authorName: 'Mahbub Alam',
    authorAvatar: getCleanAvatar('MahbubMan', 'ffdfbf'),
    area: 'Panchlaish, Chittagong',
    category: 'event',
    categoryNameBn: 'এলাকার ইভেন্ট',
    title: 'Neighborhood Tree Plantation Drive this Friday in Chittagong',
    titleBn: 'আগামী শুক্রবার চট্টগ্রামে এলাকাভিত্তিক বৃক্ষরোপণ কর্মসূচি',
    content: 'We are planting 200 fruit and flower trees along the main avenue. All neighbors and youth are invited to join.',
    contentBn: 'আমরা প্রধান সড়কে ২০০টি ফলজ ও ফুল গাছ রোপণ করতে যাচ্ছি। সকল প্রতিবেশী ও তরুণদের অংশ নেওয়ার আমন্ত্রণ রইল।',
    timeAgo: '1 day ago',
    upvotes: 45,
    userUpvoted: false,
    comments: []
  }
];

// Notifications
let NOTIFICATIONS = [];

// Application State (GUEST DEFAULT, DEMO NUMBER 01700-000000)
let appState = {
  user: {
    isLoggedIn: false, // Default is Guest Mode
    role: 'citizen',
    hasServiceListing: false,
    name: 'রাকিব হাসান',
    nameEn: 'Rakib Hasan',
    phone: '01700-000000',
    area: 'Dhanmondi, Dhaka',
    points: 240,
    bookings: [
      { id: 'b1', workerId: 'l1', serviceName: 'Rahim Electric Service', date: '2026-09-02', time: 'Afternoon (2:00 PM)', status: 'confirmed', statusText: 'Confirmed', rated: false },
      { id: 'b2', workerId: 'l3', serviceName: 'CoolTech AC Master Service', date: '2026-08-28', time: 'Morning (10:00 AM)', status: 'completed', statusText: 'Completed', rated: true, myRating: 5 }
    ],
    proOrders: [
      { id: 'po1', clientName: 'Tanvir Ahmed', area: 'Road 27, Dhanmondi', problem: 'Short circuit in DB board', status: 'pending' },
      { id: 'po2', clientName: 'Dr. Moksedul', area: 'Green Road', problem: 'Fan regulator & switch replacement', status: 'confirmed' }
    ]
  },
  currentView: 'view-home',
  currentCategoryFilter: 'all',
  currentArea: 'Dhanmondi, Dhaka',
  currentSort: 'rating',
  communityScope: 'my_area', // 'my_area' or 'all_bd'
  maxDistanceKm: 25,
  minRating: 0,
  minPrice: null,
  maxPrice: null,
  availOnlyNow: false,
  availToday: false,
  filterProVerified: true,
  filterCommAdded: true,
  searchQuery: '',
  selectedListing: null,
  reviewTargetWorker: null
};

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  updateCategoryCounts();
  initTheme();
  initLanguage();
  initViewRouting();
  initNotifications();
  initDirectory();
  initCategoriesPage();
  initCommunityPage();
  initProfilePage();
  initModals();
  initServiceMap();
  initBangladeshCascade();
  updateAuthUI();
});

// --------------------------------------------------------------------------
// 1. THEME SWITCHING (DAY / NIGHT MODE)
// --------------------------------------------------------------------------
function initTheme() {
  const savedTheme = localStorage.getItem('porshi_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('porshi_theme', next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.textContent = theme === 'dark' ? 'dark_mode' : 'light_mode';
  }
}

// --------------------------------------------------------------------------
// 2. LANGUAGE SWITCHER (EN | বাং)
// --------------------------------------------------------------------------
function initLanguage() {
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  const savedLang = localStorage.getItem('porshi_lang') || 'en';
  setLanguage(savedLang);
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('porshi_lang', lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  applyTranslations();
  renderListings();
  renderCategoriesGrid();
  renderCommunityPosts();
  renderNotifications();
  renderProfile();
}

function applyTranslations() {
  safeSetText('dnav-home-text', t('navHome'));
  safeSetText('dnav-services-text', t('navDirectory'));
  safeSetText('dnav-cats-text', t('navCategories'));
  safeSetText('dnav-em-text', t('navEmergency'));
  safeSetText('dnav-community-text', t('navCommunity'));
  safeSetText('nav-login-text', t('navLogin'));
  safeSetText('tagline', t('brandTagline'));

  // Hero
  safeSetText('hero-badge-tag', t('heroNetworkBadge'));
  safeSetText('home-slogan-hero', t('landingSlogan'));
  safeSetText('home-subtext', t('landingSubtext'));
  safeSetText('home-guest-notice', t('landingGuestNotice'));
  safeSetText('home-search-btn-text', t('searchBtn'));
  safeSetText('home-cta-login-text', t('landingCtaLogin'));
  safeSetText('home-cta-guest-text', t('landingCtaExplore'));

  const homeInput = document.getElementById('home-search-input');
  if (homeInput) homeInput.placeholder = t('landingSearchPlaceholder');

  // Real-time Dynamic Stats Counter
  const totalProsCount = INITIAL_LISTINGS.length;
  safeSetText('stat-pros', `${totalProsCount}`);
  safeSetText('stat-pros-lbl', t('statProsLabel'));
  safeSetText('stat-categories', `${ALL_CATEGORIES_DATA.length}+`);
  safeSetText('stat-categories-lbl', t('statCatsLabel'));
  safeSetText('stat-districts', '64');
  safeSetText('stat-districts-lbl', t('statDistrictsLabel'));
  safeSetText('stat-community', '100%');
  safeSetText('stat-community-lbl', t('statFreeLabel'));

  // 4 Quick Feature Pills
  safeSetText('feat-pill-1-title', t('featPill1Title'));
  safeSetText('feat-pill-1-desc', t('featPill1Desc'));
  safeSetText('feat-pill-2-title', t('featPill2Title'));
  safeSetText('feat-pill-2-desc', t('featPill2Desc'));
  safeSetText('feat-pill-3-title', t('featPill3Title'));
  safeSetText('feat-pill-3-desc', t('featPill3Desc'));
  safeSetText('feat-pill-4-title', t('featPill4Title'));
  safeSetText('feat-pill-4-desc', t('featPill4Desc'));

  // 4 Core Pillars
  safeSetText('pillar1-title', t('pillar1Title'));
  safeSetText('pillar1-desc', t('pillar1Desc'));
  safeSetText('pillar2-title', t('pillar2Title'));
  safeSetText('pillar2-desc', t('pillar2Desc'));
  safeSetText('pillar3-title', t('pillar3Title'));
  safeSetText('pillar3-desc', t('pillar3Desc'));
  safeSetText('pillar4-title', t('pillar4Title'));
  safeSetText('pillar4-desc', t('pillar4Desc'));

  // Showcase
  safeSetText('showcase1-title', t('showcase1Title'));
  safeSetText('showcase1-sub', t('showcase1Sub'));
  safeSetText('showcase2-title', t('showcase2Title'));
  safeSetText('showcase2-sub', t('showcase2Sub'));

  // 4 Steps
  safeSetText('how-heading', t('howItWorksHeading'));
  safeSetText('how-sub', t('howItWorksSub'));
  safeSetText('step1-title', t('step1Title'));
  safeSetText('step1-desc', t('step1Desc'));
  safeSetText('step2-title', t('step2Title'));
  safeSetText('step2-desc', t('step2Desc'));
  safeSetText('step3-title', t('step3Title'));
  safeSetText('step3-desc', t('step3Desc'));
  safeSetText('step4-title', t('step4Title'));
  safeSetText('step4-desc', t('step4Desc'));

  // Dashboard
  const dashTitle = document.getElementById('dash-hero-title');
  if (dashTitle) dashTitle.innerHTML = t('dashHeroTitle');
  safeSetText('dash-hero-sub', t('dashHeroSub'));
  safeSetText('hero-search-btn-text', t('searchBtnText'));
  safeSetText('pop-searches-lbl', t('popSearchesLabel'));
  safeSetText('lbl-sort-by', t('sortByLabel'));
  safeSetText('load-more-text', t('loadMoreServices'));
  safeSetText('lbl-map-title', t('serviceMapTitle'));
  safeSetText('lbl-top-rated-title', t('topRatedTitle'));
  safeSetText('view-all-top-rated', t('viewAllTopRated'));
  safeSetText('lbl-become-prov-title', t('becomeProviderTitle'));
  safeSetText('lbl-become-prov-sub', t('becomeProviderSub'));
  safeSetText('lbl-join-now-btn', t('joinNowBtn'));

  const mainInput = document.getElementById('main-search-input');
  if (mainInput) mainInput.placeholder = t('searchPlaceholder');

  // Filters
  safeSetText('lbl-filters-title', t('filtersTitle'));
  safeSetText('filter-reset-link', t('filterReset'));
  safeSetText('lbl-filter-cat', t('filterCategoryTitle'));
  safeSetText('fc-all', t('filterAllCats'));
  safeSetText('fc-home', t('filterHomeServices'));
  safeSetText('fc-repairs', t('filterRepairs'));
  safeSetText('fc-health', t('filterHealth'));
  safeSetText('fc-edu', t('filterEducation'));
  safeSetText('fc-transport', t('filterTransportation'));
  safeSetText('fc-events', t('filterEvents'));
  safeSetText('lbl-filter-radius', t('filterRadiusTitle'));
  safeSetText('lbl-filter-avail', t('filterAvailTitle'));
  safeSetText('lbl-avail-today', t('availToday'));
  safeSetText('lbl-filter-ratings', t('filterRatingsTitle'));
  safeSetText('lbl-filter-price', t('filterPriceTitle'));

  // Quick categories
  safeSetText('qc-elec', t('qCatElectrician'));
  safeSetText('qc-plumb', t('qCatPlumber'));
  safeSetText('qc-ac', t('qCatAc'));
  safeSetText('qc-tutor', t('qCatTutor'));
  safeSetText('qc-clean', t('qCatCleaning'));
  safeSetText('qc-all', t('qCatSeeAll'));
  safeSetText('qc-all-sub', t('qCatExploreAll'));

  // Categories Page
  safeSetText('explore-categories-heading', t('exploreCategoriesHeading'));
  safeSetText('explore-categories-sub', t('exploreCategoriesSub'));

  // Emergency Page
  safeSetText('emergency-heading', t('emergencyHeading'));
  safeSetText('emergency-sub', t('emergencySub'));
  safeSetText('em-live-badge-text', t('liveSupportBadge'));
  safeSetText('em-c1-title', t('emAmbulance'));
  safeSetText('em-c1-sub', t('emAmbulanceSub'));
  safeSetText('em-c2-title', t('emPharmacy'));
  safeSetText('em-c2-sub', t('emPharmacySub'));
  safeSetText('em-c3-title', t('emGas'));
  safeSetText('em-c3-sub', t('emGasSub'));
  safeSetText('em-c4-title', t('emElectrician'));
  safeSetText('em-c4-sub', t('emElectricianSub'));
  safeSetText('em-c5-title', t('emPlumber'));
  safeSetText('em-c5-sub', t('emPlumberSub'));
  safeSetText('em-c6-title', t('emDoctor'));
  safeSetText('em-c6-sub', t('emDoctorSub'));
  safeSetText('national-hotlines-heading', t('nationalHotlinesHeading'));

  // Community Page
  safeSetText('community-heading', t('communityHeading'));
  safeSetText('community-sub', t('communitySub'));
  safeSetText('lbl-ask-question-btn', t('askQuestionBtn'));
  safeSetText('lbl-scope-area', `📍 ${t('scopeMyArea')} (${appState.currentArea.split(',')[0]})`);
  safeSetText('lbl-scope-all', `🇧🇩 ${t('scopeAllBd')}`);
  safeSetText('cf-all', t('filterAllPosts'));
  safeSetText('cf-help', t('filterHelpNeeded'));
  safeSetText('cf-recs', t('filterRecommendations'));
  safeSetText('cf-sec', t('filterSecurity'));
  safeSetText('cf-event', t('filterEventsTag'));

  // Profile
  safeSetText('prof-heading', t('profHeading'));
  safeSetText('ptab-citizen-text', t('profTabCitizen'));
  safeSetText('ptab-pro-text', t('profTabPro'));
  safeSetText('prof-cit-name', currentLang === 'bn' ? appState.user.name : appState.user.nameEn);
  safeSetText('prof-cit-phone', t('profCitPhone'));
  safeSetText('prof-cit-area', t('profCitArea'));
  safeSetText('prof-lbl-points', t('profCitPoints'));
  safeSetText('prof-lbl-recs', t('profCitRecs'));
  safeSetText('prof-lbl-inq', t('profCitInq'));
  safeSetText('prof-bookings-heading', t('profBookingsHeading'));
  safeSetText('prof-pro-name', t('profProName'));
  safeSetText('prof-pro-phone', t('profProPhone'));
  safeSetText('prof-pro-nid-val', t('profProNid'));
  safeSetText('prof-lbl-rating', t('profProRating'));
  safeSetText('prof-lbl-jobs', t('profProJobs'));
  safeSetText('prof-lbl-exp', t('profProExp'));
  safeSetText('prof-pro-jobs-heading', t('profProOrdersHeading'));
  safeSetText('demo-switcher-label', t('demoSwitcherLabel'));
  safeSetText('demo-cit-text', t('demoCitText'));
  safeSetText('demo-pro-text', t('demoProText'));
  safeSetText('demo-guest-text', t('demoGuestText'));
  safeSetText('prof-logout-text', t('logoutBtn'));

  // Footer (Single attribution only)
  safeSetText('footer-tagline', t('footerTagline'));
  safeSetText('footer-credit', `Developed by <a href="https://github.com/Shreyalien" target="_blank" rel="noopener" class="author-direct-link">Shreya</a>`);
  safeSetText('footer-copy-text', `© 2026 Porshi (পড়শী) · Open Source Project · Developed by <a href="https://github.com/Shreyalien" target="_blank" rel="noopener">Shreya</a>`);
}

function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = text;
  }
}

// --------------------------------------------------------------------------
// 3. MULTI-VIEW ROUTER & NAVIGATION
// --------------------------------------------------------------------------
function initViewRouting() {
  const navBtns = document.querySelectorAll('.desktop-nav-links .d-nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const viewId = btn.getAttribute('data-view');
      switchView(viewId);
    });
  });

  const brandTrigger = document.getElementById('brand-home-trigger');
  if (brandTrigger) {
    brandTrigger.addEventListener('click', () => switchView('view-home'));
  }

  const accountBtn = document.getElementById('account-btn');
  if (accountBtn) {
    accountBtn.addEventListener('click', () => {
      if (!appState.user.isLoggedIn) {
        openModal('guest-restricted-modal');
      } else {
        switchView('view-profile-page');
      }
    });
  }

  const navLoginBtn = document.getElementById('nav-login-btn');
  if (navLoginBtn) {
    navLoginBtn.addEventListener('click', () => openModal('auth-modal'));
  }

  const seeAllCatsBtn = document.getElementById('see-all-cats-btn');
  if (seeAllCatsBtn) {
    seeAllCatsBtn.addEventListener('click', () => switchView('view-categories'));
  }

  // Hero Search in Homepage
  const homeSearchBtn = document.getElementById('home-search-btn');
  const homeSearchInput = document.getElementById('home-search-input');
  if (homeSearchBtn && homeSearchInput) {
    const handleHomeSearch = () => {
      const query = homeSearchInput.value.trim();
      appState.searchQuery = query;
      const mainInput = document.getElementById('main-search-input');
      if (mainInput) mainInput.value = query;
      switchView('view-app-main');
      filterAndSortListings();
    };

    homeSearchBtn.addEventListener('click', handleHomeSearch);
    homeSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleHomeSearch();
    });
  }

  const homeLoginBtn = document.getElementById('home-login-btn');
  if (homeLoginBtn) {
    homeLoginBtn.addEventListener('click', () => openModal('auth-modal'));
  }

  const homeGuestBtn = document.getElementById('home-guest-btn');
  if (homeGuestBtn) {
    homeGuestBtn.addEventListener('click', () => switchView('view-app-main'));
  }
}

function switchView(viewId) {
  appState.currentView = viewId;

  document.querySelectorAll('.view-container').forEach(view => {
    view.classList.remove('active');
  });

  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('.desktop-nav-links .d-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-view') === viewId);
  });
}

// --------------------------------------------------------------------------
// 4. NOTIFICATION SYSTEM
// --------------------------------------------------------------------------
function initNotifications() {
  const notifBtn = document.getElementById('notif-btn');
  const notifDropdown = document.getElementById('notif-dropdown');
  const markAllBtn = document.getElementById('notif-mark-all-read');

  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!notifDropdown.contains(e.target) && !notifBtn.contains(e.target)) {
        notifDropdown.classList.add('hidden');
      }
    });
  }

  if (markAllBtn) {
    markAllBtn.addEventListener('click', () => {
      NOTIFICATIONS.forEach(n => n.unread = false);
      renderNotifications();
      showToast('All notifications marked as read');
    });
  }

  document.querySelectorAll('.notif-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.notif-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderNotifications(btn.getAttribute('data-filter'));
    });
  });

  renderNotifications();
}

function renderNotifications(filter = 'all') {
  const listContainer = document.getElementById('notif-list');
  const badge = document.getElementById('notif-badge');
  if (!listContainer) return;

  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;
  if (badge) {
    if (unreadCount > 0 && appState.user.isLoggedIn) {
      badge.textContent = unreadCount;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  if (!appState.user.isLoggedIn || NOTIFICATIONS.length === 0) {
    listContainer.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 12px;">${t('notifEmpty')}</div>`;
    return;
  }

  let filtered = NOTIFICATIONS;
  if (filter !== 'all') {
    filtered = NOTIFICATIONS.filter(n => n.type === filter);
  }

  listContainer.innerHTML = filtered.map(item => `
    <div class="notif-item ${item.unread ? 'unread' : ''}" data-id="${item.id}" onclick="handleNotifClick('${item.id}', '${item.type}')">
      <div class="notif-icon-box ${item.bg}">
        <span class="material-symbols-outlined">${item.icon}</span>
      </div>
      <div class="notif-content">
        <h5>${currentLang === 'bn' ? item.titleBn : item.title}</h5>
        <p>${currentLang === 'bn' ? item.descBn : item.desc}</p>
        <span class="notif-time">${item.time}</span>
      </div>
    </div>
  `).join('');
}

window.handleNotifClick = function(id, type) {
  const notif = NOTIFICATIONS.find(n => n.id === id);
  if (notif) notif.unread = false;
  renderNotifications();

  const dropdown = document.getElementById('notif-dropdown');
  if (dropdown) dropdown.classList.add('hidden');

  if (type === 'booking') {
    switchView('view-profile-page');
  } else if (type === 'community') {
    switchView('view-community-page');
  } else {
    switchView('view-app-main');
  }
};

// --------------------------------------------------------------------------
// 5. MAIN DIRECTORY, SEARCH, FILTERS & SORTING
// --------------------------------------------------------------------------
function initDirectory() {
  const mainSearchInput = document.getElementById('main-search-input');
  const heroSearchBtn = document.getElementById('hero-search-btn');

  if (mainSearchInput && heroSearchBtn) {
    const doSearch = () => {
      appState.searchQuery = mainSearchInput.value.trim();
      filterAndSortListings();
    };
    heroSearchBtn.addEventListener('click', doSearch);
    mainSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') doSearch();
    });
    mainSearchInput.addEventListener('input', () => {
      appState.searchQuery = mainSearchInput.value.trim();
      filterAndSortListings();
    });
  }

  // Dashboard Add Service Button
  const dashAddBtn = document.getElementById('dash-add-btn');
  if (dashAddBtn) {
    dashAddBtn.addEventListener('click', () => {
      if (!appState.user.isLoggedIn) {
        openModal('guest-restricted-modal');
      } else {
        openModal('add-listing-modal');
      }
    });
  }

  // Popular Search Chips
  document.querySelectorAll('.dash-popular-searches .pop-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const cat = chip.getAttribute('data-cat');
      appState.currentCategoryFilter = cat;
      appState.searchQuery = '';
      if (mainSearchInput) mainSearchInput.value = '';
      highlightSidebarCat(cat);
      filterAndSortListings();
    });
  });

  // Quick Category Bar Row (Top 6)
  document.querySelectorAll('.quick-category-cards-row .q-cat-card').forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.getAttribute('data-cat');
      if (cat) {
        appState.currentCategoryFilter = cat;
        appState.searchQuery = '';
        highlightSidebarCat(cat);
        filterAndSortListings();
      }
    });
  });

  // Left Sidebar Category Group Filter
  document.querySelectorAll('.sidebar-cat-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-cat');
      appState.currentCategoryFilter = cat;
      highlightSidebarCat(cat);
      filterAndSortListings();
    });
  });

  // Verification Type Checkboxes
  const chkProVerified = document.getElementById('chk-pro-verified');
  const chkCommAdded = document.getElementById('chk-comm-added');
  if (chkProVerified) {
    chkProVerified.addEventListener('change', () => {
      appState.filterProVerified = chkProVerified.checked;
      filterAndSortListings();
    });
  }
  if (chkCommAdded) {
    chkCommAdded.addEventListener('change', () => {
      appState.filterCommAdded = chkCommAdded.checked;
      filterAndSortListings();
    });
  }

  // Radius Slider
  const radiusSlider = document.getElementById('radius-slider');
  const radiusVal = document.getElementById('radius-val');
  if (radiusSlider && radiusVal) {
    radiusSlider.addEventListener('input', () => {
      appState.maxDistanceKm = parseInt(radiusSlider.value, 10);
      radiusVal.textContent = `${appState.maxDistanceKm} km`;
      filterAndSortListings();
    });
  }

  // Availability Checkbox
  const chkAvailNow = document.getElementById('chk-avail-now');
  const chkAvailToday = document.getElementById('chk-avail-today');
  if (chkAvailNow) {
    chkAvailNow.addEventListener('change', () => {
      appState.availOnlyNow = chkAvailNow.checked;
      filterAndSortListings();
    });
  }
  if (chkAvailToday) {
    chkAvailToday.addEventListener('change', () => {
      appState.availToday = chkAvailToday.checked;
      filterAndSortListings();
    });
  }

  // Rating Filter Chips
  document.querySelectorAll('.rating-filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const val = parseFloat(chip.getAttribute('data-rating'));
      if (chip.classList.contains('active')) {
        chip.classList.remove('active');
        appState.minRating = 0;
      } else {
        document.querySelectorAll('.rating-filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        appState.minRating = val;
      }
      filterAndSortListings();
    });
  });

  // Price Filters
  const priceMin = document.getElementById('price-min');
  const priceMax = document.getElementById('price-max');
  const handlePriceChange = () => {
    appState.minPrice = priceMin.value ? parseFloat(priceMin.value) : null;
    appState.maxPrice = priceMax.value ? parseFloat(priceMax.value) : null;
    filterAndSortListings();
  };
  if (priceMin && priceMax) {
    priceMin.addEventListener('input', handlePriceChange);
    priceMax.addEventListener('input', handlePriceChange);
  }

  // Sort Select Dropdown
  const sortSelect = document.getElementById('dash-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      appState.currentSort = sortSelect.value;
      filterAndSortListings();
    });
  }

  // Filter Reset Link
  const resetLink = document.getElementById('filter-reset-link');
  if (resetLink) {
    resetLink.addEventListener('click', () => {
      appState.currentCategoryFilter = 'all';
      appState.searchQuery = '';
      appState.minRating = 0;
      appState.minPrice = null;
      appState.maxPrice = null;
      appState.maxDistanceKm = 25;
      appState.availOnlyNow = false;
      appState.availToday = false;
      appState.filterProVerified = true;
      appState.filterCommAdded = true;

      if (mainSearchInput) mainSearchInput.value = '';
      if (priceMin) priceMin.value = '';
      if (priceMax) priceMax.value = '';
      if (radiusSlider) radiusSlider.value = 25;
      if (radiusVal) radiusVal.textContent = '25 km';
      if (chkAvailNow) chkAvailNow.checked = false;
      if (chkAvailToday) chkAvailToday.checked = false;
      if (chkProVerified) chkProVerified.checked = true;
      if (chkCommAdded) chkCommAdded.checked = true;
      document.querySelectorAll('.rating-filter-chip').forEach(c => c.classList.remove('active'));

      highlightSidebarCat('all');
      filterAndSortListings();
      showToast('Filters reset');
    });
  }

  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      showToast('All available specialists loaded');
    });
  }

  renderListings();
  renderTopRated();
}

function highlightSidebarCat(cat) {
  document.querySelectorAll('.sidebar-cat-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-cat') === cat);
  });
}

function filterAndSortListings() {
  renderListings();
}

function getFilteredListings() {
  return INITIAL_LISTINGS.filter(item => {
    // Verification filter
    if (item.verificationType === 'pro_verified' && !appState.filterProVerified) return false;
    if (item.verificationType === 'community_added' && !appState.filterCommAdded) return false;

    // Category match
    if (appState.currentCategoryFilter !== 'all') {
      if (item.category !== appState.currentCategoryFilter && item.categoryGroup !== appState.currentCategoryFilter) {
        return false;
      }
    }

    // Search query match
    if (appState.searchQuery) {
      const q = appState.searchQuery.toLowerCase();
      const match = item.name.toLowerCase().includes(q) ||
                    item.workerName.toLowerCase().includes(q) ||
                    item.tags.toLowerCase().includes(q) ||
                    item.description.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Distance match
    if (item.distanceKm > appState.maxDistanceKm) return false;

    // Availability match
    if (appState.availOnlyNow && item.availability !== 'now') return false;
    if (appState.availToday && item.availability !== 'now' && item.availability !== 'today') return false;

    // Rating match
    if (appState.minRating > 0 && item.rating < appState.minRating) return false;

    // Price match
    if (appState.minPrice !== null && item.priceValue < appState.minPrice) return false;
    if (appState.maxPrice !== null && item.priceValue > appState.maxPrice) return false;

    return true;
  }).sort((a, b) => {
    if (appState.currentSort === 'rating') return b.rating - a.rating;
    if (appState.currentSort === 'upvotes') return b.upvotes - a.upvotes;
    if (appState.currentSort === 'price_low') return a.priceValue - b.priceValue;
    return 0;
  });
}

function renderListings() {
  const container = document.getElementById('listings');
  const countLabel = document.getElementById('results-count-num');
  if (!container) return;

  const listings = getFilteredListings();

  if (countLabel) {
    countLabel.textContent = `${t('resultsShowingNear')} (${listings.length} ${t('qCatServicesSuffix')})`;
  }

  if (listings.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; padding: 40px 20px; text-align: center; background: var(--panel); border: 1px solid var(--panel-border); border-radius: 18px;">
        <span class="material-symbols-outlined" style="font-size: 44px; color: var(--text-dim); margin-bottom: 10px;">search_off</span>
        <h4 style="font-size: 15px; margin-bottom: 4px;">No Specialists Found</h4>
        <p style="font-size: 12.5px; color: var(--text-muted);">Try adjusting your category filter, distance radius, or search keywords.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = listings.map(item => {
    const isPro = item.verificationType === 'pro_verified';

    return `
      <div class="worker-card" data-id="${item._id}">
        <div class="worker-card-top">
          <img src="${item.avatar}" alt="${item.name}" class="worker-avatar" />
          <div class="worker-details">
            <div class="worker-badge-row">
              <span class="cat-pill-badge">${item.category.replace('_', ' ').toUpperCase()}</span>
              ${isPro ? `
                <span class="verified-nid-badge"><span class="material-symbols-outlined" style="font-size:11px;">verified</span> NID Verified</span>
              ` : `
                <span class="community-rec-badge"><span class="material-symbols-outlined" style="font-size:11px;">recommend</span> Neighbor Recommended</span>
              `}
            </div>
            <h3 class="worker-title">${item.name}</h3>
            <p class="worker-subname">${item.workerName}</p>
            <div class="worker-meta-row">
              <span class="rating-star">★ ${item.rating}</span>
              <span>(${item.reviewsCount} reviews)</span>
              <span>· ${item.distanceKm} km</span>
            </div>
          </div>
        </div>
        
        <div class="worker-tags-box">
          ${item.tags}
        </div>

        <div class="worker-card-footer">
          <div class="worker-price-tag">${item.priceText}</div>
          <div class="worker-action-btns">
            <button class="btn-card-call" onclick="handleCardCall('${item.phone}', '${item.name}')">
              <span class="material-symbols-outlined">call</span>
              <span>${appState.user.isLoggedIn ? t('callDirect') : 'Call 🔒'}</span>
            </button>
            <button class="btn-card-view" onclick="openWorkerDetails('${item._id}')">
              <span>${t('viewProfileBtn')}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.handleCardCall = function(phone, name) {
  if (!appState.user.isLoggedIn) {
    openModal('guest-restricted-modal');
  } else {
    window.location.href = `tel:${phone}`;
  }
};

function renderTopRated() {
  const container = document.getElementById('top-rated-container');
  if (!container) return;

  const topItems = INITIAL_LISTINGS.slice(0, 3);
  container.innerHTML = topItems.map(item => `
    <div class="top-rated-item">
      <img src="${item.avatar}" alt="${item.name}" class="tr-avatar" />
      <div class="tr-info">
        <h5>${item.name}</h5>
        <span class="tr-rating">★ ${item.rating} (${item.reviewsCount})</span>
        <p class="tr-tags">${item.tags.split('•')[0]}</p>
        <span class="tr-price">${item.priceText}</span>
      </div>
      <button class="tr-call-btn" onclick="handleCardCall('${item.phone}', '${item.name}')" title="Call Specialist">
        <span class="material-symbols-outlined">call</span>
      </button>
    </div>
  `).join('');
}

// --------------------------------------------------------------------------
// 6. 40+ CATEGORIES PAGE VIEW
// --------------------------------------------------------------------------
function initCategoriesPage() {
  document.querySelectorAll('#cat-group-tabs .cat-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#cat-group-tabs .cat-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCategoriesGrid(btn.getAttribute('data-group'));
    });
  });

  const catSearch = document.getElementById('cat-page-search');
  if (catSearch) {
    catSearch.addEventListener('input', () => {
      renderCategoriesGrid('all', catSearch.value.trim().toLowerCase());
    });
  }

  renderCategoriesGrid();
}

function renderCategoriesGrid(groupFilter = 'all', searchQuery = '') {
  const container = document.getElementById('categories-grid');
  if (!container) return;

  updateCategoryCounts();

  let list = ALL_CATEGORIES_DATA;
  if (groupFilter !== 'all') {
    list = list.filter(c => c.group === groupFilter);
  }
  if (searchQuery) {
    list = list.filter(c => c.nameEn.toLowerCase().includes(searchQuery) || c.nameBn.includes(searchQuery));
  }

  container.innerHTML = list.map(item => `
    <div class="category-tile" onclick="selectCategoryFromPage('${item.id}')">
      <div class="category-tile-icon">
        <span class="material-symbols-outlined">${item.icon}</span>
      </div>
      <h4>${currentLang === 'bn' ? item.nameBn : item.nameEn}</h4>
      <p>${item.count} ${t('qCatServicesSuffix')}</p>
    </div>
  `).join('');
}

window.selectCategoryFromPage = function(catId) {
  appState.currentCategoryFilter = catId;
  highlightSidebarCat(catId);
  switchView('view-app-main');
  filterAndSortListings();
};

// --------------------------------------------------------------------------
// 7. COMMUNITY & DISCUSSION FORUM VIEW (MY AREA vs ALL BD)
// --------------------------------------------------------------------------
function initCommunityPage() {
  const scopeMyArea = document.getElementById('cscope-my-area');
  const scopeAllBd = document.getElementById('cscope-all-bd');

  if (scopeMyArea && scopeAllBd) {
    scopeMyArea.addEventListener('click', () => {
      scopeMyArea.classList.add('active');
      scopeAllBd.classList.remove('active');
      appState.communityScope = 'my_area';
      renderCommunityPosts();
    });

    scopeAllBd.addEventListener('click', () => {
      scopeAllBd.classList.add('active');
      scopeMyArea.classList.remove('active');
      appState.communityScope = 'all_bd';
      renderCommunityPosts();
    });
  }

  document.querySelectorAll('.community-filters-row .comm-filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.community-filters-row .comm-filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCommunityPosts(btn.getAttribute('data-filter'));
    });
  });

  const openNewPostBtn = document.getElementById('open-new-post-btn');
  if (openNewPostBtn) {
    openNewPostBtn.addEventListener('click', () => {
      if (!appState.user.isLoggedIn) {
        openModal('guest-restricted-modal');
      } else {
        openModal('new-post-modal');
      }
    });
  }

  const submitPostBtn = document.getElementById('npm-submit');
  if (submitPostBtn) {
    submitPostBtn.addEventListener('click', () => {
      const title = document.getElementById('npm-title').value.trim();
      const desc = document.getElementById('npm-description').value.trim();
      const cat = document.getElementById('npm-category').value;
      const area = document.getElementById('npm-area').value.trim() || 'Dhanmondi, Dhaka';
      const err = document.getElementById('npm-error');

      if (!title || !desc) {
        if (err) err.textContent = 'Please provide both title and details.';
        return;
      }
      if (err) err.textContent = '';

      const newPost = {
        _id: 'p_' + Date.now(),
        authorName: appState.user.name,
        authorAvatar: getCleanAvatar('RakibHasanPoster', 'b6e3f4'),
        area: area,
        category: cat,
        categoryNameBn: cat === 'help' ? 'জরুরি সাহায্য' : (cat === 'security' ? 'নিরাপত্তা' : 'পরামর্শ'),
        title: title,
        titleBn: title,
        content: desc,
        contentBn: desc,
        timeAgo: 'Just now',
        upvotes: 1,
        userUpvoted: true,
        comments: []
      };

      COMMUNITY_POSTS.unshift(newPost);
      closeModal('new-post-modal');
      renderCommunityPosts();
      showToast('Discussion published to community feed!');
    });
  }

  renderCommunityPosts();
}

function renderCommunityPosts(filter = 'all') {
  const container = document.getElementById('community-posts-feed');
  if (!container) return;

  let posts = COMMUNITY_POSTS;

  // Filter by Scope (My Area vs All BD)
  if (appState.communityScope === 'my_area') {
    const areaKeyword = appState.currentArea.split(',')[0].trim().toLowerCase();
    posts = posts.filter(p => p.area.toLowerCase().includes(areaKeyword));
  }

  if (filter !== 'all') {
    posts = posts.filter(p => p.category === filter);
  }

  if (posts.length === 0) {
    container.innerHTML = `
      <div style="padding: 30px; text-align: center; background: var(--panel); border: 1px solid var(--panel-border); border-radius: 16px;">
        <span class="material-symbols-outlined" style="font-size: 38px; color: var(--text-dim); margin-bottom: 8px;">forum</span>
        <h4 style="font-size: 14px; margin-bottom: 3px;">No discussions found in this area yet</h4>
        <p style="font-size: 12px; color: var(--text-muted);">Be the first neighbor to ask a question or share a local recommendation!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = posts.map(post => `
    <div class="community-post-card" id="post-${post._id}">
      <div class="post-author-row">
        <div class="post-author-left">
          <img src="${post.authorAvatar}" alt="${post.authorName}" class="post-avatar" />
          <div>
            <h5 class="post-author-name">${post.authorName}</h5>
            <span class="post-meta-area">${post.area} · ${post.timeAgo}</span>
          </div>
        </div>
        <span class="post-type-tag">${currentLang === 'bn' ? post.categoryNameBn : post.category.toUpperCase()}</span>
      </div>

      <h4 class="post-title">${currentLang === 'bn' ? post.titleBn : post.title}</h4>
      <p class="post-body-text">${currentLang === 'bn' ? post.contentBn : post.content}</p>

      <div class="post-actions-bar">
        <button class="post-action-btn ${post.userUpvoted ? 'active' : ''}" onclick="handleCommunityUpvote('${post._id}')">
          <span class="material-symbols-outlined">thumb_up</span>
          <span>${t('upvotePostBtn')} (${post.upvotes})</span>
        </button>
        <button class="post-action-btn" onclick="toggleCommentsThread('${post._id}')">
          <span class="material-symbols-outlined">chat_bubble</span>
          <span>${post.comments.length} ${t('commentCountText')}</span>
        </button>
      </div>

      <!-- Thread Comments -->
      <div class="post-comments-thread" id="comments-${post._id}">
        ${post.comments.map(c => `
          <div class="comment-item">
            <div class="comment-content">
              <h6>${c.author}</h6>
              <p>${c.text}</p>
            </div>
          </div>
        `).join('')}

        <div class="comment-input-row">
          <input type="text" class="comment-input-box" id="cinput-${post._id}" placeholder="${t('postCommentPlaceholder')}" onkeydown="handleCommentKey(event, '${post._id}')" />
          <button class="btn btn-primary" style="padding: 5px 12px; font-size: 11.5px;" onclick="addComment('${post._id}')">${t('sendReplyBtn')}</button>
        </div>
      </div>
    </div>
  `).join('');
}

window.handleCommunityUpvote = function(postId) {
  if (!appState.user.isLoggedIn) {
    openModal('guest-restricted-modal');
    return;
  }
  const post = COMMUNITY_POSTS.find(p => p._id === postId);
  if (post) {
    if (post.userUpvoted) {
      post.upvotes -= 1;
      post.userUpvoted = false;
    } else {
      post.upvotes += 1;
      post.userUpvoted = true;
    }
    renderCommunityPosts();
  }
};

window.toggleCommentsThread = function(postId) {
  const thread = document.getElementById(`comments-${postId}`);
  if (thread) {
    thread.classList.toggle('hidden');
  }
};

window.handleCommentKey = function(e, postId) {
  if (e.key === 'Enter') {
    addComment(postId);
  }
};

window.addComment = function(postId) {
  if (!appState.user.isLoggedIn) {
    openModal('guest-restricted-modal');
    return;
  }
  const input = document.getElementById(`cinput-${postId}`);
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  const post = COMMUNITY_POSTS.find(p => p._id === postId);
  if (post) {
    post.comments.push({
      author: appState.user.name,
      text: text
    });
    input.value = '';
    renderCommunityPosts();
    showToast('Comment posted successfully');
  }
};

// --------------------------------------------------------------------------
// 8. PROFILE & DASHBOARDS VIEW (CITIZEN vs SERVICE PRO DUAL ARCHITECTURE)
// --------------------------------------------------------------------------
function initProfilePage() {
  const tabCitizen = document.getElementById('prof-tab-citizen');
  const tabPro = document.getElementById('prof-tab-pro');
  const viewCitizen = document.getElementById('prof-view-citizen');
  const viewPro = document.getElementById('prof-view-pro');

  if (tabCitizen && tabPro && viewCitizen && viewPro) {
    tabCitizen.addEventListener('click', () => {
      tabCitizen.classList.add('active');
      tabPro.classList.remove('active');
      viewCitizen.classList.remove('hidden');
      viewPro.classList.add('hidden');
    });

    tabPro.addEventListener('click', () => {
      tabPro.classList.add('active');
      tabCitizen.classList.remove('active');
      viewPro.classList.remove('hidden');
      viewCitizen.classList.add('hidden');
    });
  }

  // Demo Switcher
  const btnCit = document.getElementById('demo-citizen-btn');
  const btnPro = document.getElementById('demo-pro-btn');
  const btnGuest = document.getElementById('demo-guest-btn');

  if (btnCit && btnPro && btnGuest) {
    btnCit.addEventListener('click', () => {
      appState.user.role = 'citizen';
      appState.user.hasServiceListing = false; // Pure citizen, single portal only
      appState.user.isLoggedIn = true;
      appState.user.name = 'রাকিব হাসান';
      appState.user.nameEn = 'Rakib Hasan';
      appState.user.phone = '01700-000000';
      highlightDemoBtn(btnCit);
      updateAuthUI();
      renderProfile();
      renderListings();
      showToast('Switched to Citizen Profile: Rakib Hasan (Consumer)');
    });

    btnPro.addEventListener('click', () => {
      appState.user.role = 'pro';
      appState.user.hasServiceListing = true; // Service pro with double portal
      appState.user.isLoggedIn = true;
      appState.user.name = 'মোঃ রহিম (Rahim Electric)';
      appState.user.nameEn = 'Md. Rahim (Rahim Electric)';
      appState.user.phone = '01712-458823';
      highlightDemoBtn(btnPro);
      updateAuthUI();
      renderProfile();
      renderListings();
      showToast('Switched to Service Pro Dashboard: Md. Rahim (Electrician)');
    });

    btnGuest.addEventListener('click', () => {
      appState.user.isLoggedIn = false;
      highlightDemoBtn(btnGuest);
      updateAuthUI();
      renderListings();
      switchView('view-app-main');
      showToast('Guest Mode Activated (Contact numbers locked)');
    });
  }

  const logoutBtn = document.getElementById('prof-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      appState.user.isLoggedIn = false;
      updateAuthUI();
      renderListings();
      switchView('view-home');
      showToast('Logged out successfully');
    });
  }

  renderProfile();
}

function updateAuthUI() {
  const accountBtn = document.getElementById('account-btn');
  const navLoginBtn = document.getElementById('nav-login-btn');
  const userChipName = document.getElementById('user-chip-name');
  const userChipAvatar = document.getElementById('header-user-avatar');

  if (appState.user.isLoggedIn) {
    if (accountBtn) accountBtn.classList.remove('hidden');
    if (navLoginBtn) navLoginBtn.classList.add('hidden');
    if (userChipName) userChipName.textContent = appState.user.name;
    if (userChipAvatar) {
      userChipAvatar.src = appState.user.role === 'pro'
        ? getCleanAvatar('RahimProWorker', 'ffd5dc')
        : getCleanAvatar('RakibHasanUser', 'b6e3f4');
    }
  } else {
    if (accountBtn) accountBtn.classList.add('hidden');
    if (navLoginBtn) navLoginBtn.classList.remove('hidden');
  }
}

function highlightDemoBtn(activeBtn) {
  document.querySelectorAll('.demo-btns-row .chip-btn').forEach(b => b.classList.remove('active'));
  activeBtn.classList.add('active');
}

function renderProfile() {
  const modeTabsContainer = document.getElementById('profile-mode-tabs-container');
  const viewCitizen = document.getElementById('prof-view-citizen');
  const viewPro = document.getElementById('prof-view-pro');

  if (appState.user.hasServiceListing) {
    // Pro worker has access to both Citizen view & Pro dashboard
    if (modeTabsContainer) modeTabsContainer.classList.remove('hidden');
  } else {
    // Pure citizen user (Rakib Hasan) has ONLY ONE single clean dashboard
    if (modeTabsContainer) modeTabsContainer.classList.add('hidden');
    if (viewCitizen) viewCitizen.classList.remove('hidden');
    if (viewPro) viewPro.classList.add('hidden');
  }

  // Render Citizen Bookings with Rate Worker action
  const citList = document.getElementById('prof-bookings-list');
  if (citList) {
    citList.innerHTML = appState.user.bookings.map(b => `
      <div class="booking-item-card">
        <div class="booking-item-info">
          <h5>${b.serviceName}</h5>
          <p>Date: ${b.date} · Slot: ${b.time}</p>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="status-badge ${b.status}">${b.statusText}</span>
          ${b.rated ? `
            <span style="font-size:11px; color:#fbbf24; font-weight:700;">Rated: ★ ${b.myRating}</span>
          ` : `
            <button class="btn btn-outline" style="padding: 4px 10px; font-size: 11px; border-color: var(--primary); color: var(--primary);" onclick="openRateWorkerModal('${b.workerId}', '${b.serviceName}', '${b.id}')">
              <span class="material-symbols-outlined" style="font-size:14px;">rate_review</span>
              <span>Rate Worker</span>
            </button>
          `}
        </div>
      </div>
    `).join('');
  }

  // Render Pro Specialist Orders
  const proList = document.getElementById('prof-pro-jobs-list');
  if (proList) {
    proList.innerHTML = appState.user.proOrders.map(order => `
      <div class="booking-item-card">
        <div class="booking-item-info">
          <h5>Client: ${order.clientName}</h5>
          <p>📍 ${order.area} — Problem: ${order.problem}</p>
        </div>
        <div style="display: flex; gap: 6px;">
          ${order.status === 'pending' ? `
            <button class="btn btn-primary" style="padding: 4px 9px; font-size: 11px;" onclick="acceptProOrder('${order.id}')">Accept</button>
            <button class="btn btn-outline" style="padding: 4px 9px; font-size: 11px;" onclick="declineProOrder('${order.id}')">Decline</button>
          ` : `
            <span class="status-badge confirmed">In Progress</span>
          `}
        </div>
      </div>
    `).join('');
  }
}

window.acceptProOrder = function(orderId) {
  const o = appState.user.proOrders.find(item => item.id === orderId);
  if (o) {
    o.status = 'confirmed';
    renderProfile();
    showToast(`Order accepted for ${o.clientName}`);
  }
};

window.declineProOrder = function(orderId) {
  appState.user.proOrders = appState.user.proOrders.filter(item => item.id !== orderId);
  renderProfile();
  showToast('Order request declined');
};

// --------------------------------------------------------------------------
// 9. RATE & REVIEW WORKER MODAL (FOR CITIZENS)
// --------------------------------------------------------------------------
let activeReviewBookingId = null;

window.openRateWorkerModal = function(workerId, workerName, bookingId) {
  if (!appState.user.isLoggedIn) {
    openModal('guest-restricted-modal');
    return;
  }

  activeReviewBookingId = bookingId;
  appState.reviewTargetWorker = workerId;

  const targetLabel = document.getElementById('rv-target-worker');
  if (targetLabel) targetLabel.innerHTML = `Giving rating for: <strong>${workerName}</strong>`;

  openModal('review-modal');
};

// --------------------------------------------------------------------------
// 10. MODALS & POPUPS SYSTEM
// --------------------------------------------------------------------------
function initModals() {
  const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.addEventListener('click', closeAllModals);
  }

  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close');
      closeModal(modalId);
    });
  });

  const areaPill = document.getElementById('area-pill');
  const dashLocBtn = document.getElementById('dash-loc-selector-btn');
  if (areaPill) areaPill.addEventListener('click', () => openModal('area-modal'));
  if (dashLocBtn) dashLocBtn.addEventListener('click', () => openModal('area-modal'));

  const grLoginBtn = document.getElementById('gr-login-btn');
  if (grLoginBtn) {
    grLoginBtn.addEventListener('click', () => {
      closeModal('guest-restricted-modal');
      openModal('auth-modal');
    });
  }

  // Star Rating Picker
  let chosenRating = 5;
  const starSpans = document.querySelectorAll('#star-picker span');
  starSpans.forEach(star => {
    star.addEventListener('click', () => {
      chosenRating = parseInt(star.getAttribute('data-value'), 10);
      starSpans.forEach(s => {
        const val = parseInt(s.getAttribute('data-value'), 10);
        s.classList.toggle('active', val <= chosenRating);
      });
    });
  });

  // Submit Review Modal
  const rvSubmit = document.getElementById('rv-submit');
  if (rvSubmit) {
    rvSubmit.addEventListener('click', () => {
      const comment = document.getElementById('rv-comment').value.trim();
      const name = document.getElementById('rv-name').value.trim() || appState.user.name;
      const err = document.getElementById('rv-error');

      if (!comment) {
        if (err) err.textContent = 'Please write a short comment about your experience.';
        return;
      }
      if (err) err.textContent = '';

      // Update worker reviews if targeted
      if (appState.reviewTargetWorker) {
        const worker = INITIAL_LISTINGS.find(l => l._id === appState.reviewTargetWorker);
        if (worker) {
          worker.reviews.unshift({
            reviewerName: name,
            rating: chosenRating,
            comment: comment
          });
          worker.reviewsCount += 1;
        }
      }

      // Update booking state in citizen profile
      if (activeReviewBookingId) {
        const bk = appState.user.bookings.find(b => b.id === activeReviewBookingId);
        if (bk) {
          bk.rated = true;
          bk.myRating = chosenRating;
        }
      }

      closeModal('review-modal');
      renderProfile();
      renderListings();
      showToast('Thank you! Rating & review submitted.');
    });
  }

  // Login Modal Tabs
  const authTabLogin = document.getElementById('auth-tab-login');
  const authTabSignup = document.getElementById('auth-tab-signup');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  if (authTabLogin && authTabSignup && loginForm && signupForm) {
    authTabLogin.addEventListener('click', () => {
      authTabLogin.classList.add('active');
      authTabSignup.classList.remove('active');
      loginForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
    });

    authTabSignup.addEventListener('click', () => {
      authTabSignup.classList.add('active');
      authTabLogin.classList.remove('active');
      signupForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
    });

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      appState.user.isLoggedIn = true;
      updateAuthUI();
      closeModal('auth-modal');
      renderListings();
      showToast('Logged in successfully!');
    });

    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      signupForm.classList.add('hidden');
      document.getElementById('verify-form').classList.remove('hidden');
    });

    const verifyForm = document.getElementById('verify-form');
    if (verifyForm) {
      verifyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        appState.user.isLoggedIn = true;
        updateAuthUI();
        closeModal('auth-modal');
        renderListings();
        showToast('Account verified and logged in!');
      });
    }

    const autofillBtn = document.getElementById('ve-autofill-btn');
    if (autofillBtn) {
      autofillBtn.addEventListener('click', () => {
        const codeInput = document.getElementById('ve-code');
        if (codeInput) codeInput.value = '123456';
      });
    }
  }

  // Booking Modal Confirm Button
  const bookConfirmBtn = document.getElementById('bm-confirm-btn');
  if (bookConfirmBtn) {
    bookConfirmBtn.addEventListener('click', () => {
      const date = document.getElementById('bm-date').value;
      const address = document.getElementById('bm-address').value.trim();
      const err = document.getElementById('bm-error');

      if (!date || !address) {
        if (err) err.textContent = 'Please fill in service date and address.';
        return;
      }
      if (err) err.textContent = '';

      if (appState.selectedListing) {
        appState.user.bookings.unshift({
          id: 'b_' + Date.now(),
          workerId: appState.selectedListing._id,
          serviceName: appState.selectedListing.name,
          date: date,
          time: document.getElementById('bm-time').value,
          status: 'confirmed',
          statusText: 'Confirmed',
          rated: false
        });
      }

      closeModal('booking-modal');
      renderProfile();
      showToast('Service appointment booked successfully!');
    });
  }

  // Add New Listing Submit
  const alSubmitBtn = document.getElementById('al-submit');
  if (alSubmitBtn) {
    alSubmitBtn.addEventListener('click', () => {
      const name = document.getElementById('al-name').value.trim();
      const wName = document.getElementById('al-worker-name').value.trim();
      const phone = document.getElementById('al-phone').value.trim();
      const cat = document.getElementById('al-category').value || 'electrician';
      const nid = document.getElementById('al-nid').value.trim();
      const err = document.getElementById('al-error');

      if (!name || !phone) {
        if (err) err.textContent = 'Please provide business name and mobile number.';
        return;
      }

      // If registered with valid NID, user becomes a service owner
      if (nid) {
        appState.user.hasServiceListing = true;
      }

      INITIAL_LISTINGS.unshift({
        _id: 'l_' + Date.now(),
        name: name,
        workerName: wName || name,
        avatar: getCleanAvatar(name, 'b6e3f4'),
        category: cat,
        categoryGroup: 'home_services',
        verificationType: nid ? 'pro_verified' : 'community_added',
        addedBy: appState.user.name,
        area: document.getElementById('al-area').value.trim() || 'Dhanmondi, Dhaka',
        distanceKm: 1.0,
        availability: 'now',
        tags: document.getElementById('al-tags').value.trim() || 'General Services',
        address: document.getElementById('al-area').value.trim() || 'Dhaka',
        phone: phone,
        whatsapp: phone.replace(/[^0-9]/g, ''),
        description: document.getElementById('al-description').value.trim() || 'Experienced specialist.',
        priceText: document.getElementById('al-price').value.trim() || '৳300 থেকে',
        priceValue: 300,
        rating: 5.0,
        reviewsCount: 1,
        experience: '5+ Years Exp.',
        jobsCount: '100+ Jobs',
        nidNumber: nid || 'Unverified Community Specialist',
        upvotes: 1,
        reviews: []
      });

      closeModal('add-listing-modal');
      updateCategoryCounts();
      renderListings();
      renderCategoriesGrid();
      renderProfile();
      showToast('Service published to Porshi directory!');
    });
  }

  const alCatSelect = document.getElementById('al-category');
  if (alCatSelect) {
    alCatSelect.innerHTML = ALL_CATEGORIES_DATA.map(c => `
      <option value="${c.id}">${c.nameEn} (${c.nameBn})</option>
    `).join('');
  }
}

function openModal(modalId) {
  const overlay = document.getElementById('overlay');
  const modal = document.getElementById(modalId);
  if (overlay && modal) {
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('hidden');
  
  const anyOpen = document.querySelectorAll('.modal-sheet:not(.hidden)').length > 0;
  if (!anyOpen) {
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.classList.add('hidden');
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-sheet').forEach(m => m.classList.add('hidden'));
  const overlay = document.getElementById('overlay');
  if (overlay) overlay.classList.add('hidden');
}

// --------------------------------------------------------------------------
// 11. WORKER DETAIL SHEET & ACTIONS
// --------------------------------------------------------------------------
window.openWorkerDetails = function(listingId) {
  const item = INITIAL_LISTINGS.find(l => l._id === listingId);
  if (!item) return;

  appState.selectedListing = item;

  document.getElementById('l-worker-avatar').src = item.avatar;
  document.getElementById('l-badge').textContent = item.category.replace('_', ' ').toUpperCase();
  
  const verifBadge = document.getElementById('l-verif-badge');
  if (verifBadge) {
    if (item.verificationType === 'pro_verified') {
      verifBadge.className = 'verified-nid-badge';
      verifBadge.innerHTML = `<span class="material-symbols-outlined" style="font-size:11px;">verified</span> NID Verified`;
    } else {
      verifBadge.className = 'community-rec-badge';
      verifBadge.innerHTML = `<span class="material-symbols-outlined" style="font-size:11px;">recommend</span> Neighbor Recommended`;
    }
  }

  document.getElementById('l-name').textContent = item.name;
  document.getElementById('l-real-name').innerHTML = `Specialist: <strong>${item.workerName}</strong>`;
  document.getElementById('l-meta').textContent = `${item.area} · ${item.experience} · ${item.jobsCount}`;
  
  // Mask phone for guests
  const phoneDisplay = appState.user.isLoggedIn ? item.phone : `${item.phone.substring(0, 5)}-•••••• 🔒 (Log in to view)`;
  document.getElementById('l-phone-number').textContent = phoneDisplay;

  document.getElementById('l-description').textContent = item.description;
  document.getElementById('l-address').textContent = item.address;
  document.getElementById('l-price').textContent = item.priceText;

  // Direct Call Action
  document.getElementById('l-call-btn').onclick = (e) => {
    e.preventDefault();
    if (!appState.user.isLoggedIn) {
      openModal('guest-restricted-modal');
    } else {
      window.location.href = `tel:${item.phone}`;
    }
  };

  // WhatsApp Action
  document.getElementById('l-whatsapp-btn').onclick = (e) => {
    e.preventDefault();
    if (!appState.user.isLoggedIn) {
      openModal('guest-restricted-modal');
    } else {
      window.open(`https://wa.me/88${item.whatsapp}`, '_blank');
    }
  };

  // Copy Action
  document.getElementById('l-copy-btn').onclick = () => {
    if (!appState.user.isLoggedIn) {
      openModal('guest-restricted-modal');
    } else {
      navigator.clipboard.writeText(item.phone);
      showToast(t('numberCopied'));
    }
  };

  // Upvote Button
  document.getElementById('l-upvote-text').textContent = `${t('trustButton')} · ${item.upvotes}`;
  document.getElementById('l-upvote').onclick = () => {
    if (!appState.user.isLoggedIn) {
      openModal('guest-restricted-modal');
      return;
    }
    item.upvotes += 1;
    document.getElementById('l-upvote-text').textContent = `${t('trustedDone')} · ${item.upvotes}`;
    showToast('Upvoted trust for ' + item.name);
  };

  // Book Service Trigger
  document.getElementById('l-book-btn').onclick = () => {
    if (!appState.user.isLoggedIn) {
      openModal('guest-restricted-modal');
    } else {
      closeModal('listing-modal');
      openBookingModal(item);
    }
  };

  // Write Review Trigger
  document.getElementById('l-review-btn').onclick = () => {
    if (!appState.user.isLoggedIn) {
      openModal('guest-restricted-modal');
    } else {
      closeModal('listing-modal');
      openRateWorkerModal(item._id, item.name, null);
    }
  };

  // Reviews List
  const reviewsContainer = document.getElementById('l-reviews');
  if (reviewsContainer) {
    if (item.reviews && item.reviews.length > 0) {
      reviewsContainer.innerHTML = item.reviews.map(r => `
        <div class="review-item">
          <div class="review-item-header">
            <span>${r.reviewerName}</span>
            <span style="color:#fbbf24;">★ ${r.rating}</span>
          </div>
          <p class="review-item-text">${r.comment}</p>
        </div>
      `).join('');
    } else {
      reviewsContainer.innerHTML = `<p style="font-size:12px; color:var(--text-muted);">${t('noReviewsYet')}</p>`;
    }
  }

  openModal('listing-modal');
};

function openBookingModal(item) {
  document.getElementById('bm-service-name').textContent = item.name;
  document.getElementById('bm-provider-name').textContent = `Specialist: ${item.workerName}`;
  document.getElementById('bm-price-estimate').textContent = `Starting from: ${item.priceText}`;
  openModal('booking-modal');
}

// --------------------------------------------------------------------------
// 12. REALISTIC INTERACTIVE RADAR SERVICE MAP
// --------------------------------------------------------------------------
function initServiceMap() {
  const zoomIn = document.getElementById('radar-zoom-in');
  const zoomOut = document.getElementById('radar-zoom-out');
  const radarPins = document.querySelectorAll('.radar-map-box .map-pin');

  radarPins.forEach(pin => {
    pin.addEventListener('click', () => {
      const listingId = pin.getAttribute('data-id');
      if (listingId) {
        openWorkerDetails(listingId);
      }
    });
  });

  let scale = 1;
  if (zoomIn && zoomOut) {
    zoomIn.addEventListener('click', () => {
      scale = Math.min(scale + 0.15, 1.5);
      applyMapZoom(scale);
    });
    zoomOut.addEventListener('click', () => {
      scale = Math.max(scale - 0.15, 0.85);
      applyMapZoom(scale);
    });
  }
}

function applyMapZoom(scale) {
  const streetGrid = document.querySelector('.radar-street-grid');
  if (streetGrid) {
    streetGrid.style.transform = `scale(${scale})`;
    streetGrid.style.transition = 'transform 0.3s ease';
  }
}

// --------------------------------------------------------------------------
// 13. BANGLADESH ADMINISTRATIVE LOCATIONS CASCADE
// --------------------------------------------------------------------------
function initBangladeshCascade() {
  const divSelect = document.getElementById('am-division');
  const distSelect = document.getElementById('am-district');
  const upazSelect = document.getElementById('am-upazila');
  const submitBtn = document.getElementById('am-submit');

  if (!divSelect || !distSelect || !upazSelect) return;

  const BD_DATA = window.BANGLADESH_LOCATIONS || {
    divisions: [
      { id: 'dhaka', name: 'Dhaka (ঢাকা)' },
      { id: 'chittagong', name: 'Chittagong (চট্টগ্রাম)' },
      { id: 'sylhet', name: 'Sylhet (সিলেট)' },
      { id: 'rajshahi', name: 'Rajshahi (রাজশাহী)' }
    ],
    districts: {
      dhaka: [
        { id: 'dhaka_city', name: 'Dhaka City' },
        { id: 'gazipur', name: 'Gazipur' }
      ],
      chittagong: [
        { id: 'ctg_city', name: 'Chittagong City' }
      ]
    },
    upazilas: {
      dhaka_city: ['Dhanmondi', 'Mirpur', 'Gulshan', 'Uttara', 'Mohammadpur', 'Banani'],
      ctg_city: ['Panchlaish', 'Agrabad', 'GEC', 'Nasirabad']
    }
  };

  divSelect.innerHTML = BD_DATA.divisions.map(d => `<option value="${d.id}">${d.name}</option>`).join('');

  const updateDistricts = () => {
    const div = divSelect.value;
    const dists = BD_DATA.districts[div] || [{ id: 'dhaka_city', name: 'Dhaka City' }];
    distSelect.innerHTML = dists.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
    updateUpazilas();
  };

  const updateUpazilas = () => {
    const dist = distSelect.value;
    const upazs = BD_DATA.upazilas[dist] || ['Dhanmondi', 'Mirpur', 'Uttara'];
    upazSelect.innerHTML = upazs.map(u => `<option value="${u}">${u}</option>`).join('');
  };

  divSelect.addEventListener('change', updateDistricts);
  distSelect.addEventListener('change', updateUpazilas);
  updateDistricts();

  document.querySelectorAll('.quick-areas-chips .chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-val');
      setLocation(val);
      closeModal('area-modal');
    });
  });

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const loc = `${upazSelect.value}, ${distSelect.options[distSelect.selectedIndex].text}`;
      setLocation(loc);
      closeModal('area-modal');
    });
  }
}

function setLocation(locName) {
  appState.currentArea = locName;
  const currentAreaLabel = document.getElementById('current-area-label');
  const dashLocText = document.getElementById('dash-loc-text');
  const summaryAreaName = document.getElementById('summary-area-name');
  const scopeAreaLabel = document.getElementById('lbl-scope-area');

  if (currentAreaLabel) currentAreaLabel.textContent = locName;
  if (dashLocText) dashLocText.textContent = locName;
  if (summaryAreaName) summaryAreaName.textContent = locName;
  if (scopeAreaLabel) scopeAreaLabel.textContent = `📍 ${t('scopeMyArea')} (${locName.split(',')[0]})`;

  renderCommunityPosts();
  showToast(`Location set to: ${locName}`);
}

// --------------------------------------------------------------------------
// 14. TOAST NOTIFICATION HELPER
// --------------------------------------------------------------------------
function showToast(msg) {
  const toast = document.getElementById('toast');
  const text = document.getElementById('toast-text');
  if (toast && text) {
    text.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  }
}