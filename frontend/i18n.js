// ==========================================================================
// Porshi 🌸 পড়শী — Internationalization (i18n) Bilingual Dictionary
// English (en) & Bengali (bn) Full Translations
// Developed by Shreya (github.com/Shreyalien)
// ==========================================================================

let currentLang = 'en';

const TRANSLATIONS = {
  en: {
    // Brand & Header
    brandTagline: 'আপনার পাশে, আপনার জন্য',
    navHome: 'Home',
    navDirectory: 'Directory',
    navCategories: 'A-Z Categories',
    navEmergency: 'Emergency 24/7',
    navCommunity: 'Community Feed',
    navLogin: 'Log In',
    notifEmpty: 'No new notifications.',
    
    // Landing / Hero
    heroNetworkBadge: "BANGLADESH'S COMMUNITY SERVICE NETWORK",
    landingSlogan: 'আপনার পাশে, আপনার জন্য',
    landingSubtext: 'Your trusted neighborhood directory for 40+ verified A-Z daily services, experienced technicians, tutors, and 24/7 emergency support across Bangladesh.',
    landingSearchPlaceholder: 'Search electrician, plumber, AC service, tutor...',
    searchBtn: 'Search',
    landingCtaLogin: 'Log In / Register',
    landingCtaExplore: 'Explore Guest',
    landingGuestNotice: '💡 Guest mode allows category and service browsing. Direct contact numbers are unlocked upon logging in',

    // Stats
    statProsLabel: 'Registered Specialists',
    statCatsLabel: 'Active Service Categories',
    statDistrictsLabel: 'Districts Across BD',
    statFreeLabel: 'Direct & Free Connection',

    // 4 Quick Feature Pills
    featPill1Title: 'Verified',
    featPill1Desc: 'Trusted specialists',
    featPill2Title: 'All Bangladesh',
    featPill2Desc: 'Search beyond your area',
    featPill3Title: 'Clear Booking',
    featPill3Desc: 'Request → confirm → complete',
    featPill4Title: '24/7 Emergency',
    featPill4Desc: 'Six essential hotlines',

    // 4 Core Pillars
    pillar1Title: '🛡️ Verified Specialists',
    pillar1Desc: 'All service providers are verified with National ID and genuine customer reviews.',
    pillar2Title: '📍 Near Your Location',
    pillar2Desc: 'Quick doorstep service right in your neighborhood and locality.',
    pillar3Title: '৳ Transparent Pricing',
    pillar3Desc: 'Clear upfront service rates with no hidden commissions or extra charges.',
    pillar4Title: '🎧 24/7 Live Assistance',
    pillar4Desc: 'Emergency ambulances, gas cylinders & on-demand help anytime.',

    // Showcase
    showcase1Title: 'বিশ্বস্ত সেবা, নির্ভর প্রতিবেশী',
    showcase1Sub: 'Better Homes · Stronger Communities',
    showcase2Title: 'পাশে আছি, সেবায় পাশে',
    showcase2Sub: '"ভালো মানুষেরাই গড়ে তোলে ভালো এলাকা"',

    // 4 Steps
    howItWorksHeading: 'How Porshi Works (4 Simple Steps)',
    howItWorksSub: 'Getting household tasks done has never been this easy & secure:',
    step1Title: '1. Search Service',
    step1Desc: 'Select your needed service category or search by keyword.',
    step2Title: '2. Choose Specialist',
    step2Desc: 'Check ratings, distance, verified NID badge, and reviews.',
    step3Title: '3. Book / Contact',
    step3Desc: 'Schedule appointment or call/WhatsApp directly.',
    step4Title: '4. Get Service Done',
    step4Desc: 'Specialist arrives at your doorstep to complete the job.',

    // Dashboard & Directory
    dashHeroTitle: 'Find Trusted Services <span class="gradient-signature-text">Near You</span>',
    dashHeroSub: '40+ verified categories · Connect directly with local specialists across Bangladesh.',
    searchPlaceholder: 'Search services (e.g., electrician, plumber, AC, doctor, tutor)...',
    searchBtnText: 'Search',
    popSearchesLabel: 'Popular:',
    resultsShowingNear: 'Showing specialists',
    qCatServicesSuffix: 'Specialists',
    sortByLabel: 'Sort by:',
    loadMoreServices: 'Load More Services',
    callDirect: 'Call Direct',
    viewProfileBtn: 'View Profile',
    trustButton: 'Upvote Trust',
    trustedDone: 'Upvoted',
    numberCopied: 'Mobile number copied to clipboard!',
    noReviewsYet: 'No customer reviews yet. Be the first to review!',

    // Quick Categories
    qCatElectrician: 'Electrician',
    qCatPlumber: 'Plumber',
    qCatAc: 'AC Service',
    qCatTutor: 'Home Tutor',
    qCatCleaning: 'Home Cleaning',
    qCatSeeAll: '40+ Categories',
    qCatExploreAll: 'Explore All',

    // Sidebar Filters
    filtersTitle: 'Filters',
    filterReset: 'Reset',
    filterCategoryTitle: 'Category Group',
    filterAllCats: 'All Categories',
    filterHomeServices: 'Home Services',
    filterRepairs: 'Repairs & Tech',
    filterHealth: 'Health & Care',
    filterEducation: 'Education & Learning',
    filterTransportation: 'Transportation',
    filterEvents: 'Lifestyle & Events',
    filterRadiusTitle: 'Location Radius',
    filterAvailTitle: 'Availability',
    availToday: 'Today',
    filterRatingsTitle: 'Ratings',
    filterPriceTitle: 'Price Range',

    // Right Sidebar
    serviceMapTitle: 'Service Map',
    topRatedTitle: 'Top Rated Near You',
    viewAllTopRated: 'View All',
    becomeProviderTitle: 'Become a Service Provider',
    becomeProviderSub: 'Join verified specialists and grow your local service business.',
    joinNowBtn: 'Join Now',

    // 40+ Categories Page
    exploreCategoriesHeading: 'Explore 40+ A-Z Categories',
    exploreCategoriesSub: 'Browse everyday household, repair, and emergency specialists across Bangladesh',

    // Emergency 24/7 Page
    emergencyHeading: '⚡ Instant & Emergency Assistance (24/7)',
    emergencySub: 'Direct verified contacts and rapid emergency services across Bangladesh',
    liveSupportBadge: '24/7 Live',
    emAmbulance: 'Emergency Ambulance',
    emAmbulanceSub: 'ICU & Oxygen Support',
    emPharmacy: '24/7 Pharmacy',
    emPharmacySub: 'Urgent Medicines & Delivery',
    emGas: 'LPG Gas Cylinder',
    emGasSub: 'Delivery in 15-20 mins',
    emElectrician: 'Emergency Electrician',
    emElectricianSub: 'Short Circuit & DB Board Fix',
    emPlumber: 'Plumber & Water Lines',
    emPlumberSub: 'Leakage & Motor Fix',
    emDoctor: 'Local Health Doctor',
    emDoctorSub: 'Palli Chikitshok & First Aid',
    nationalHotlinesHeading: 'National Emergency Hotlines (Toll-Free)',

    // Community Page
    communityHeading: '💬 Neighborhood Community Discussions',
    communitySub: 'Ask questions, share recommendations, and discuss local neighborhood needs',
    askQuestionBtn: '+ Ask Question / Start Discussion',
    scopeMyArea: 'My Area',
    scopeAllBd: 'All Bangladesh',
    filterAllPosts: 'All Discussions',
    filterHelpNeeded: 'Help Needed',
    filterRecommendations: 'Recommendations',
    filterSecurity: 'Neighborhood Safety',
    filterEventsTag: 'Local Events',
    upvotePostBtn: 'Upvote',
    commentCountText: 'Replies',
    postCommentPlaceholder: 'Write your neighborly reply...',
    sendReplyBtn: 'Reply',

    // Profile Page
    profHeading: 'User Profile & Settings',
    profTabCitizen: 'Citizen Profile',
    profTabPro: 'Service Pro Dashboard',
    profCitPhone: 'Mobile: 01700-000000 · Citizen / Consumer',
    profCitArea: 'Area: Dhanmondi, Dhaka',
    profCitPoints: 'Citizen Points',
    profCitRecs: 'Recommended',
    profCitInq: 'Questions Asked',
    profBookingsHeading: 'My Booked Services & Worker Reviews',
    profProName: 'Rahim Electric Service (Md. Rahim)',
    profProPhone: 'Mobile: 01712-458823 · Service Specialist',
    profProNid: '1994********34 (Verified)',
    profProRating: 'Average Rating',
    profProJobs: 'Completed Jobs',
    profProExp: 'Experience',
    profProOrdersHeading: 'Client Bookings & Job Orders',
    demoSwitcherLabel: '⚡ Quick Switch Demo Account:',
    demoCitText: 'Rakib Hasan (Citizen / Customer)',
    demoProText: 'Md. Rahim (Service Pro / Electrician)',
    demoGuestText: 'Guest Mode (Browse Only)',
    logoutBtn: 'Log Out',

    // Footer
    footerTagline: 'Verified Neighborhood Services & Community Platform across Bangladesh'
  },

  bn: {
    // Brand & Header
    brandTagline: 'আপনার পাশে, আপনার জন্য',
    navHome: 'হোম',
    navDirectory: 'ডিরেক্টরি',
    navCategories: 'সকল ক্যাটাগরি',
    navEmergency: 'জরুরি সেবা ২৪/৭',
    navCommunity: 'কমিউনিটি ফোরাম',
    navLogin: 'লগইন',
    notifEmpty: 'কোনো নতুন নোটিফিকেশন নেই।',

    // Landing / Hero
    heroNetworkBadge: 'বাংলাদেশের বিশ্বস্ত পাড়া-মহল্লা সার্ভিস নেটওয়ার্ক',
    landingSlogan: 'আপনার পাশে, আপনার জন্য',
    landingSubtext: 'বাংলাদেশের সকল এলাকায় ৪০+ ভেরিফায়েড দৈনন্দিন সেবা, অভিজ্ঞ কারিগর, গৃহশিক্ষক ও ২৪/৭ জরুরি সহায়তার বিশ্বস্ত ঠিকানা।',
    landingSearchPlaceholder: 'ইলেকট্রিশিয়ান, প্লাম্বার, এসি সার্ভিস, টিউটর খুঁজুন...',
    searchBtn: 'খুঁজুন',
    landingCtaLogin: 'লগইন / রেজিস্টার',
    landingCtaExplore: 'গেস্ট মোডে দেখুন',
    landingGuestNotice: '💡 গেস্ট মোডে ক্যাটাগরি ও সার্ভিস ব্রাউজ করা যাবে। লগইন করলে সরাসরি মোবাইল নম্বর আনলক হবে',

    // Stats
    statProsLabel: 'নিবন্ধিত কারিগর ও সেবা',
    statCatsLabel: 'সক্রিয় সার্ভিস ক্যাটাগরি',
    statDistrictsLabel: 'জেলায় বিস্তৃত নেটওয়ার্ক',
    statFreeLabel: 'সরাসরি ও সম্পূর্ণ ফ্রি যোগাযোগ',

    // 4 Quick Feature Pills
    featPill1Title: 'ভেরিফায়েড',
    featPill1Desc: 'এনআইডি যাচাইকৃত কারিগর',
    featPill2Title: 'সারাদেশে',
    featPill2Desc: 'যেকোনো জেলায় সেবা সন্ধান',
    featPill3Title: 'সহজ বুকিং',
    featPill3Desc: 'আবেদন → নিশ্চিত → সেবা গ্রহণ',
    featPill4Title: '২৪/৭ জরুরি',
    featPill4Desc: '৬টি সার্বক্ষণিক হটলাইন',

    // 4 Core Pillars
    pillar1Title: '🛡️ ভেরিফাইড কারিগর',
    pillar1Desc: 'সকল সেবাদাতার জাতীয় পরিচয়পত্র (NID) ও গ্রাহক রিভিউ যাচাইকৃত।',
    pillar2Title: '📍 আপনার কাছেই',
    pillar2Desc: 'আপনার পাড়া ও মহল্লায় দ্রুততম সময়ে দোরগোড়ায় সেবা।',
    pillar3Title: '৳ স্পষ্ট ও ন্যায্য মূল্য',
    pillar3Desc: 'কোনো অতিরিক্ত কমিশন বা লুকানো চার্জ ছাড়া সরাসরি নির্ধারিত রেট।',
    pillar4Title: '🎧 ২৪/৭ লাইভ সহায়তা',
    pillar4Desc: 'জরুরি অ্যাম্বুলেন্স, গ্যাস সিলিন্ডার ও যেকোনো মুহূর্তে তাৎক্ষণিক সমাধান।',

    // Showcase
    showcase1Title: 'বিশ্বস্ত সেবা, নির্ভর প্রতিবেশী',
    showcase1Sub: 'Better Homes · Stronger Communities',
    showcase2Title: 'পাশে আছি, সেবায় পাশে',
    showcase2Sub: '"ভালো মানুষেরাই গড়ে তোলে ভালো এলাকা"',

    // 4 Steps
    howItWorksHeading: 'কীভাবে পড়শী কাজ করে (৪টি সহজ ধাপ)',
    howItWorksSub: 'বাড়ির যেকোনো কাজ করানো এখন অত্যন্ত সহজ ও নিরাপদ:',
    step1Title: '১. সেবা নির্বাচন করুন',
    step1Desc: 'আপনার প্রয়োজনীয় ক্যাটাগরি বা কাজের নাম দিয়ে সার্চ করুন।',
    step2Title: '২. কারিগর পছন্দ করুন',
    step2Desc: 'রেটিং, দূরত্ব, এনআইডি ব্যাজ ও রিভিউ দেখে কারিগর বেছে নিন।',
    step3Title: '৩. বুকিং বা কল করুন',
    step3Desc: 'সুবিধাজনক সময়ে অ্যাপয়েন্টমেন্ট নিন বা সরাসরি কল/হোয়াটসঅ্যাপ করুন।',
    step4Title: '৪. সেবা সম্পন্ন ও রেটিং',
    step4Desc: 'কারিগর দোরগোড়ায় এসে কাজ শেষ করবেন। কাজ শেষে রেটিং দিন।',

    // Dashboard & Directory
    dashHeroTitle: 'আপনার এলাকায় বিশ্বস্ত কারিগর <span class="gradient-signature-text">খুঁজে নিন</span>',
    dashHeroSub: '৪০+ ভেরিফাইড ক্যাটাগরি · বাংলাদেশের যেকোনো প্রান্তে স্থানীয় কারিগরদের সাথে সরাসরি যোগাযোগ।',
    searchPlaceholder: 'সার্ভিস খুঁজুন (যেমন: ইলেকট্রিশিয়ান, প্লাম্বার, এসি, পল্লী ডাক্তার, টিউটর)...',
    searchBtnText: 'সার্চ',
    popSearchesLabel: 'জনপ্রিয়:',
    resultsShowingNear: 'প্রদর্শিত কারিগর তালিকা',
    qCatServicesSuffix: 'জন কারিগর',
    sortByLabel: 'ক্রমানুসার:',
    loadMoreServices: 'আরও সেবা দেখুন',
    callDirect: 'সরাসরি কল',
    viewProfileBtn: 'প্রোফাইল দেখুন',
    trustButton: 'আস্থা প্রকাশ (আপভোট)',
    trustedDone: 'আপভোট দিয়েছেন',
    numberCopied: 'মোবাইল নম্বর কপি করা হয়েছে!',
    noReviewsYet: 'এখনো কোনো রিভিউ দেওয়া হয়নি। প্রথম রিভিউটি আপনি দিন!',

    // Quick Categories
    qCatElectrician: 'ইলেকট্রিশিয়ান',
    qCatPlumber: 'প্লাম্বার',
    qCatAc: 'এসি সার্ভিস',
    qCatTutor: 'গৃহশিক্ষক',
    qCatCleaning: 'ঘর পরিচ্ছন্নতা',
    qCatSeeAll: '৪০+ ক্যাটাগরি',
    qCatExploreAll: 'সবগুলো দেখুন',

    // Sidebar Filters
    filtersTitle: 'ফিল্টারসমূহ',
    filterReset: 'রিসেট',
    filterCategoryTitle: 'ক্যাটাগরি গ্রুপ',
    filterAllCats: 'সকল ক্যাটাগরি',
    filterHomeServices: 'গৃহস্থালি সেবা',
    filterRepairs: 'মেরামত ও টেক',
    filterHealth: 'স্বাস্থ্য ও চিকিৎসা',
    filterEducation: 'শিক্ষা ও টিউটর',
    filterTransportation: 'যাতায়াত ও গাড়ি',
    filterEvents: 'লাইফস্টাইল ও ইভেন্ট',
    filterRadiusTitle: 'এলাকার দূরত্ব (ব্যাসার্ধ)',
    filterAvailTitle: 'উপলব্ধতা',
    availToday: 'আজকের মধ্যেই',
    filterRatingsTitle: 'স্টার রেটিং',
    filterPriceTitle: 'মূল্য সীমা (৳)',

    // Right Sidebar
    serviceMapTitle: 'সার্ভিস রাডার ম্যাপ',
    topRatedTitle: 'এলাকার সেরা রেটেড কারিগর',
    viewAllTopRated: 'সকল দেখুন',
    becomeProviderTitle: 'সেবাদাতা হিসেবে যোগ দিন',
    becomeProviderSub: 'পড়শী নেটওয়ার্কে যোগ দিয়ে আপনার কাজের সুযোগ বৃদ্ধি করুন।',
    joinNowBtn: 'যোগ দিন',

    // 40+ Categories Page
    exploreCategoriesHeading: '৪০+ সার্ভিস ক্যাটাগরি ঘুরে দেখুন',
    exploreCategoriesSub: 'দৈনন্দিন গৃহস্থালি, ইলেকট্রনিক মেরামত ও জরুরি চিকিৎসকদের তালিকা',

    // Emergency 24/7 Page
    emergencyHeading: '⚡ তাৎক্ষণিক ও জরুরি সহায়তা (২৪/৭)',
    emergencySub: 'সরাসরি ভেরিফায়েড নম্বর এবং জরুরি অ্যাম্বুলেন্স ও ফার্মেসি সেবা',
    liveSupportBadge: '২৪/৭ লাইভ',
    emAmbulance: 'জরুরি অ্যাম্বুলেন্স',
    emAmbulanceSub: 'আইসিইউ ও অক্সিজেন সুবিধা',
    emPharmacy: '২৪/৭ ফার্মেসি',
    emPharmacySub: 'জরুরি ওষুধ ও হোম ডেলিভারি',
    emGas: 'এলপিজি গ্যাস সিলিন্ডার',
    emGasSub: '১৫-২০ মিনিটে হোম ডেলিভারি',
    emElectrician: 'জরুরি ইলেকট্রিশিয়ান',
    emElectricianSub: 'শর্ট সার্কিট ও ডিবি বোর্ড মেরামত',
    emPlumber: 'প্লাম্বার ও পানি লাইন',
    emPlumberSub: 'পাইপ লিকেজ ও মোটর সমস্যা',
    emDoctor: 'পল্লী চিকিৎসক ও ফার্স্ট এইড',
    emDoctorSub: 'ড্রেসিং, প্রেশার ও জরুরি প্রাথমিক চিকিৎসা',
    nationalHotlinesHeading: 'জাতীয় জরুরি টোল-ফ্রি হটলাইনসমূহ',

    // Community Page
    communityHeading: '💬 পাড়া-মহল্লা কমিউনিটি ফোরাম',
    communitySub: 'এলাকার যেকোনো প্রয়োজনে প্রশ্ন করুন, পরামর্শ দিন ও কারিগরের খোঁজ নিন',
    askQuestionBtn: '+ প্রশ্ন বা আলোচনা শুরু করুন',
    scopeMyArea: 'আমার এলাকা',
    scopeAllBd: 'সারা বাংলাদেশ',
    filterAllPosts: 'সকল আলোচনা',
    filterHelpNeeded: 'জরুরি সাহায্য',
    filterRecommendations: 'পরামর্শ ও সুপারিশ',
    filterSecurity: 'নিরাপত্তা ও সতর্কতা',
    filterEventsTag: 'এলাকার ইভেন্ট',
    upvotePostBtn: 'সহমত / আপভোট',
    commentCountText: 'টি মন্তব্য',
    postCommentPlaceholder: 'প্রতিবেশী হিসেবে আপনার মন্তব্য লিখুন...',
    sendReplyBtn: 'উত্তর দিন',

    // Profile Page
    profHeading: 'ইউজার প্রোফাইল ও সেটিংস',
    profTabCitizen: 'নাগরিক প্রোফাইল',
    profTabPro: 'সার্ভিস প্রো ড্যাশবোর্ড',
    profCitPhone: 'মোবাইল: 01700-000000 · সাধারণ নাগরিক / সেবাগ্রহীতা',
    profCitArea: 'এলাকা: ধানমন্ডি, ঢাকা',
    profCitPoints: 'নাগরিক পয়েন্ট',
    profCitRecs: 'সুপারিশ করেছেন',
    profCitInq: 'প্রশ্ন করেছেন',
    profBookingsHeading: 'আমার বুকিং ইতিহাস ও কারিগর রেটিং',
    profProName: 'রহিম ইলেকট্রিক সার্ভিস (মোঃ রহিম)',
    profProPhone: 'মোবাইল: 01712-458823 · টেকনিশিয়ান / সার্ভিস প্রো',
    profProNid: '১৯৯৪********৩৪ (ভেরিফাইড)',
    profProRating: 'গড় রেটিং',
    profProJobs: 'সম্পন্ন কাজ',
    profProExp: 'কাজের অভিজ্ঞতা',
    profProOrdersHeading: 'গ্রাহকদের বুকিং ও কাজের অর্ডারসমূহ',
    demoSwitcherLabel: '⚡ ডেমো অ্যাকাউন্ট পরিবর্তন করুন:',
    demoCitText: 'রাকিব হাসান (নাগরিক / কাস্টমার)',
    demoProText: 'মোঃ রহিম (সার্ভিস প্রো / কারিগর)',
    demoGuestText: 'গেস্ট মোড (লগআউট অবস্থা)',
    logoutBtn: 'লগআউট',

    // Footer
    footerTagline: 'বাংলাদেশের বিশ্বস্ত পাড়া-মহল্লা সার্ভিস নেটওয়ার্ক'
  }
};

function t(key) {
  if (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) {
    return TRANSLATIONS[currentLang][key];
  }
  if (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) {
    return TRANSLATIONS['en'][key];
  }
  return key;
}
