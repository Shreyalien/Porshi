// বাংলাদেশ প্রশাসনিক অঞ্চল ও এলাকা সংক্রান্ত ডেটাবেস
// Bangladesh Administrative Divisions, Districts, Upazilas, and Local Areas Data

const BANGLADESH_LOCATIONS = {
  divisions: [
    {
      id: 'dhaka',
      name_en: 'Dhaka',
      name_bn: 'ঢাকা',
      districts: [
        {
          id: 'dhaka_city',
          name_en: 'Dhaka (Metro/District)',
          name_bn: 'ঢাকা (মেট্রো/জেলা)',
          upazilas: [
            {
              id: 'dhanmondi',
              name_en: 'Dhanmondi',
              name_bn: 'ধানমন্ডি',
              areas: ['রোড ১-৩২', 'সাত মসজিদ রোড', 'ঝিগাতলা', 'শংকর', 'সোবহানবাগ', 'কলাবাগান']
            },
            {
              id: 'mirpur',
              name_en: 'Mirpur',
              name_bn: 'মিরপুর',
              areas: ['মিরপুর ১', 'মিরপুর ২', 'মিরপুর ৬', 'মিরপুর ১০', 'মিরপুর ১১', 'মিরপুর ১২', 'মিরপুর ১৪', 'পল্লবী', 'কাজীপাড়া', 'শেওড়াপাড়া']
            },
            {
              id: 'uttara',
              name_en: 'Uttara',
              name_bn: 'উত্তরা',
              areas: ['সেক্টর ১-১৮', 'আজমপুর', 'জসীমউদ্দীন', 'আব্দুল্লাহপুর', 'দিয়াবাড়ী']
            },
            {
              id: 'gulshan',
              name_en: 'Gulshan',
              name_bn: 'গুলশান',
              areas: ['গুলশান ১', 'গুলশান ২', 'শাহজাদপুর', 'নিক নিকেতন', 'পুলিশ প্লাজা']
            },
            {
              id: 'banani',
              name_en: 'Banani',
              name_bn: 'বনানী',
              areas: ['ব্লক এ-এফ', 'রোড ১১', 'চেয়ারম্যান বাড়ি', 'কাকলী']
            },
            {
              id: 'mohammadpur',
              name_en: 'Mohammadpur',
              name_bn: 'মোহাম্মদপুর',
              areas: ['টাউন হল', 'নূরজাহান রোড', 'রিং রোড', 'কাটাসুর', 'নবোদয় হাউজিং', 'বসিলা', 'জাপান গার্ডেন সিটি']
            },
            {
              id: 'badda',
              name_en: 'Badda',
              name_bn: 'বাড্ডা',
              areas: ['উত্তর বাড্ডা', 'মধ্য বাড্ডা', 'দক্ষিণ বাড্ডা', 'মেরুল বাড্ডা', 'আফতাবনগর']
            },
            {
              id: 'khilgaon',
              name_en: 'Khilgaon',
              name_bn: 'খিলগাঁও',
              areas: ['তালতলা', 'খিলগাঁও বাজার', 'তিলপাপাড়া', 'গোড়ান', 'সিপাহীবাগ']
            },
            {
              id: 'malibagh',
              name_en: 'Malibagh',
              name_bn: 'মালিবাগ',
              areas: ['মালিবাগ মোড়', 'চৌধুরীপাড়া', 'মৌচাক', 'শান্তিনগর', 'রাজারবাগ']
            },
            {
              id: 'bashundhara',
              name_en: 'Bashundhara R/A',
              name_bn: 'বসুন্ধরা আ/এ',
              areas: ['ব্লক এ-এম', 'আই ব্লক', 'এভারকেয়ার সংলগ্ন', 'অ্যাপোলো রোড']
            },
            {
              id: 'old_dhaka',
              name_en: 'Old Dhaka',
              name_bn: 'পুরান ঢাকা',
              areas: ['লালবাগ', 'চকবাজার', 'ওয়ারী', 'সূত্রাপুর', 'নাজিরাবাজার', 'সদরঘাট', 'গেণ্ডারিয়া']
            },
            {
              id: 'motijheel',
              name_en: 'Motijheel',
              name_bn: 'মতিঝিল',
              areas: ['দিলকুশা', 'দৈনিক বাংলা', 'ফকিরাপুল', 'আরামবাগ', 'কমলাপুর']
            },
            {
              id: 'ramna',
              name_en: 'Ramna / Shahbagh',
              name_bn: 'রমনা / শাহবাগ',
              areas: ['শাহবাগ', 'কাঁটাবন', 'হাতিরপুল', 'সেগুনবাগিচা', 'কাকরাইল', 'বেইলি রোড']
            }
          ]
        },
        {
          id: 'gazipur',
          name_en: 'Gazipur',
          name_bn: 'গাজীপুর',
          upazilas: [
            { id: 'gazipur_sadar', name_en: 'Gazipur Sadar / Joydebpur', name_bn: 'গাজীপুর সদর / জয়দেবপুর', areas: ['চৌরাস্তা', 'শিববাড়ী', 'বোর্ড বাজার', 'টঙ্গী'] },
            { id: 'kaliakair', name_en: 'Kaliakair', name_bn: 'কালিয়াকৈর', areas: ['সফিপুর', 'মৌচাক'] },
            { id: 'sreepur', name_en: 'Sreepur', name_bn: 'শ্রীপুর', areas: ['মাওনা', 'শ্রীপুর বাজার'] }
          ]
        },
        {
          id: 'narayanganj',
          name_en: 'Narayanganj',
          name_bn: 'নারায়ণগঞ্জ',
          upazilas: [
            { id: 'narayanganj_sadar', name_en: 'Narayanganj Sadar', name_bn: 'নারায়ণগঞ্জ সদর', areas: ['চাষাড়া', '২ নং রেলগেট', 'কালীরবাজার'] },
            { id: 'fatullah', name_en: 'Fatullah', name_bn: 'ফতুল্লা', areas: ['শিবু মার্কেট', 'পোস্তগোলা সংলগ্ন'] },
            { id: 'sonargaon', name_en: 'Sonargaon', name_bn: 'সোনারগাঁও', areas: ['মোগরাপাড়া', 'পানাম সিটি'] }
          ]
        }
      ]
    },
    {
      id: 'chittagong',
      name_en: 'Chattogram',
      name_bn: 'চট্টগ্রাম',
      districts: [
        {
          id: 'ctg_city',
          name_en: 'Chattogram City',
          name_bn: 'চট্টগ্রাম সিটি',
          upazilas: [
            { id: 'panchlaish', name_en: 'Panchlaish / GEC', name_bn: 'পাঁচলাইশ / জিইসি', areas: ['জিইসি মোড়', 'প্রবর্তক', 'নাসিরাবাদ', 'খুলশী'] },
            { id: 'kotwali_ctg', name_en: 'Kotwali', name_bn: 'কোতোয়ালী', areas: ['আন্দরকিল্লা', 'চকবাজার', 'নিউমার্কেট', 'চেরাগী পাহাড়'] },
            { id: 'halishahar', name_en: 'Halishahar / Agrabad', name_bn: 'হালিশহর / আগ্রাবাদ', areas: ['আগ্রাবাদ সি/এ', 'হালিশহর ব্লক এ-এল', 'বড়েপুল'] }
          ]
        },
        {
          id: 'coxsbazar',
          name_en: "Cox's Bazar",
          name_bn: 'কক্সবাজার',
          upazilas: [
            { id: 'cox_sadar', name_en: "Cox's Bazar Sadar", name_bn: 'কক্সবাজার সদর', areas: ['কলাতলী', 'লাবণী পয়েন্ট', 'ঝাউতলা', 'পানবাজার'] }
          ]
        },
        {
          id: 'cumilla',
          name_en: 'Cumilla',
          name_bn: 'কুমিল্লা',
          upazilas: [
            { id: 'cumilla_sadar', name_en: 'Cumilla Adarsha Sadar', name_bn: 'কুমিল্লা আদর্শ সদর', areas: ['কান্দিরপাড়', 'টমছম ব্রিজ', 'শাসনগাছা', 'বাদুরতলা'] }
          ]
        }
      ]
    },
    {
      id: 'khulna',
      name_en: 'Khulna',
      name_bn: 'খুলনা',
      districts: [
        {
          id: 'khulna_city',
          name_en: 'Khulna City',
          name_bn: 'খুলনা সিটি',
          upazilas: [
            { id: 'khulna_sadar', name_en: 'Khulna Sadar', name_bn: 'খুলনা সদর', areas: ['ডাকবাংলো', 'শিববাড়ি মোড়', 'রয়েল মোড়', 'সোনাডাঙ্গা', 'খালিশপুর', 'দৌলতপুর'] }
          ]
        },
        {
          id: 'narail',
          name_en: 'Narail',
          name_bn: 'নড়াইল',
          upazilas: [
            { id: 'narail_sadar', name_en: 'Narail Sadar', name_bn: 'নড়াইল সদর', areas: ['রূপগঞ্জ বাজার', 'আদালত চত্বর', 'মেইন বাস স্ট্যান্ড', 'ভিক্টোরিয়া কলেজ সংলগ্ন'] },
            { id: 'lohagara', name_en: 'Lohagara', name_bn: 'লোহাগড়া', areas: ['লোহাগড়া বাজার', 'লক্ষ্মীপাশা'] },
            { id: 'kalia', name_en: 'Kalia', name_bn: 'কালিয়া', areas: ['কালিয়া বাজার'] }
          ]
        },
        {
          id: 'jashore',
          name_en: 'Jashore',
          name_bn: 'যশোর',
          upazilas: [
            { id: 'jashore_sadar', name_en: 'Jashore Sadar', name_bn: 'যশোর সদর', areas: ['দড়াটানা', 'মুড়লি মোড়', 'পালবাড়ি', 'গোপালগঞ্জ মোড়'] }
          ]
        }
      ]
    },
    {
      id: 'sylhet',
      name_en: 'Sylhet',
      name_bn: 'সিলেট',
      districts: [
        {
          id: 'sylhet_city',
          name_en: 'Sylhet City',
          name_bn: 'সিলেট সিটি',
          upazilas: [
            { id: 'sylhet_sadar', name_en: 'Sylhet Sadar', name_bn: 'সিলেট সদর', areas: ['জিন্দা বাজার', 'চৌহাট্টা', 'আম্বরখানা', 'উপশহর', 'কুমারপাড়া', 'মীরাবাজার'] }
          ]
        }
      ]
    },
    {
      id: 'rajshahi',
      name_en: 'Rajshahi',
      name_bn: 'রাজশাহী',
      districts: [
        {
          id: 'rajshahi_city',
          name_en: 'Rajshahi City',
          name_bn: 'রাজশাহী সিটি',
          upazilas: [
            { id: 'boalia', name_en: 'Boalia / Sadar', name_bn: 'বোয়ালিয়া / সদর', areas: ['সাহেব বাজার', 'জিরো পয়েন্ট', 'মতিহার', 'লক্ষ্মীপুর', 'তালাইমারী'] }
          ]
        },
        {
          id: 'bogura',
          name_en: 'Bogura',
          name_bn: 'বগুড়া',
          upazilas: [
            { id: 'bogura_sadar', name_en: 'Bogura Sadar', name_bn: 'বগুড়া সদর', areas: ['সাতমাথা', 'বনানী মোড়', 'ঠনঠনিয়া'] }
          ]
        }
      ]
    },
    {
      id: 'barisal',
      name_en: 'Barishal',
      name_bn: 'বরিশাল',
      districts: [
        {
          id: 'barisal_city',
          name_en: 'Barishal City',
          name_bn: 'বরিশাল সিটি',
          upazilas: [
            { id: 'barisal_sadar', name_en: 'Barishal Sadar', name_bn: 'বরিশাল সদর', areas: ['সদর রোড', 'নথুল্লাবাদ', 'রূপাতলী', 'চকবাজার'] }
          ]
        }
      ]
    },
    {
      id: 'rangpur',
      name_en: 'Rangpur',
      name_bn: 'রংপুর',
      districts: [
        {
          id: 'rangpur_city',
          name_en: 'Rangpur City',
          name_bn: 'রংপুর সিটি',
          upazilas: [
            { id: 'rangpur_sadar', name_en: 'Rangpur Sadar', name_bn: 'রংপুর সদর', areas: ['জাহাজ কোম্পানি মোড়', 'পায়রা চত্বর', 'মেডিকেল মোড়', 'মডার্ন মোড়'] }
          ]
        }
      ]
    },
    {
      id: 'mymensingh',
      name_en: 'Mymensingh',
      name_bn: 'ময়মনসিংহ',
      districts: [
        {
          id: 'mymensingh_city',
          name_en: 'Mymensingh City',
          name_bn: 'ময়মনসিংহ সিটি',
          upazilas: [
            { id: 'mymensingh_sadar', name_en: 'Mymensingh Sadar', name_bn: 'ময়মনসিংহ সদর', areas: ['গাঙ্গিনার পাড়', 'নতুন বাজার', 'টাউন হল', 'কৃষি বিশ্ববিদ্যালয় এলাকা'] }
          ]
        }
      ]
    }
  ]
};

// Helper lookup functions
const LocationHelper = {
  getDivisions(lang = 'bn') {
    return BANGLADESH_LOCATIONS.divisions.map(d => ({
      id: d.id,
      name: lang === 'bn' ? d.name_bn : d.name_en
    }));
  },

  getDistricts(divisionId, lang = 'bn') {
    const div = BANGLADESH_LOCATIONS.divisions.find(d => d.id === divisionId);
    if (!div) return [];
    return div.districts.map(dist => ({
      id: dist.id,
      name: lang === 'bn' ? dist.name_bn : dist.name_en
    }));
  },

  getUpazilas(districtId, lang = 'bn') {
    for (const div of BANGLADESH_LOCATIONS.divisions) {
      const dist = div.districts.find(d => d.id === districtId);
      if (dist) {
        return dist.upazilas.map(u => ({
          id: u.id,
          name: lang === 'bn' ? u.name_bn : u.name_en,
          areas: u.areas || []
        }));
      }
    }
    return [];
  },

  getAreas(upazilaId) {
    for (const div of BANGLADESH_LOCATIONS.divisions) {
      for (const dist of div.districts) {
        const upz = dist.upazilas.find(u => u.id === upazilaId);
        if (upz) return upz.areas || [];
      }
    }
    return [];
  },

  findUpazilaByName(name) {
    if (!name) return null;
    const clean = name.trim().toLowerCase();
    for (const div of BANGLADESH_LOCATIONS.divisions) {
      for (const dist of div.districts) {
        for (const upz of dist.upazilas) {
          if (upz.name_bn.toLowerCase().includes(clean) ||
              upz.name_en.toLowerCase().includes(clean) ||
              clean.includes(upz.name_bn.toLowerCase()) ||
              clean.includes(upz.name_en.toLowerCase()) ||
              (upz.areas && upz.areas.some(a => a.toLowerCase().includes(clean) || clean.includes(a.toLowerCase())))) {
            return {
              division: div,
              district: dist,
              upazila: upz
            };
          }
        }
      }
    }
    return null;
  },

  getAllAreaSuggestions(lang = 'bn') {
    const list = [];
    for (const div of BANGLADESH_LOCATIONS.divisions) {
      for (const dist of div.districts) {
        for (const upz of dist.upazilas) {
          const upzName = lang === 'bn' ? upz.name_bn : upz.name_en;
          list.push(upzName);
          if (upz.areas) {
            upz.areas.forEach(a => list.push(`${a} (${upzName})`));
          }
        }
      }
    }
    return Array.from(new Set(list));
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BANGLADESH_LOCATIONS, LocationHelper };
}
