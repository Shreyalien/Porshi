<div align="center">

# 🏘️ Porshi (পড়শী)

### আপনার পাশে, আপনার জন্য · Bangladesh's Verified Neighborhood Services Directory & Community Platform

<br/>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-porshi.onrender.com-00C7B7?style=for-the-badge&logo=render&logoColor=white)](https://porshi.onrender.com)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_ODM-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![CSS3](https://img.shields.io/badge/CSS3-Design_System-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License: MIT](https://img.shields.io/badge/License-MIT-3B82F6?style=for-the-badge)](LICENSE)

<br/>

> **A full-stack, hyper-local civic services directory and mutual-aid web platform engineered to connect Bangladeshi citizens directly with 40+ categories of verified doorstep technicians, healthcare practitioners, tutors, and 24/7 emergency hotlines without intermediaries or broker commissions.**

<br/>

<p align="center">
  <a href="https://porshi.onrender.com" target="_blank">
    <img src="banner.png" alt="Porshi Platform Hero Showcase" width="100%" style="border-radius: 16px; box-shadow: 0 12px 36px rgba(0,0,0,0.3);" />
  </a>
</p>

<br/>

[🌐 Live Application](https://porshi.onrender.com) · [✨ Key Features](#-key-features) · [🏗️ Architecture](#%EF%B8%8F-system-architecture) · [🗄️ Database Schemas](#%EF%B8%8F-database-schemas-mongodb) · [🔌 API Reference](#-api-endpoints-reference) · [🚀 Getting Started](#-getting-started) · [📄 License](#-license)

</div>

---

## 📖 Overview

In urban and semi-urban Bangladesh, discovering reliable and verified household service specialists (electricians, plumbers, AC technicians, appliance mechanics, home tutors, emergency ambulance drivers, or local health practitioners) heavily depends on unverified word-of-mouth or exploitative third-party middlemen.

**Porshi (পড়শী)** is an open-source, community-driven civic platform developed to solve this challenge through:
- **Direct, Zero-Commission Access**: Connects consumers with local specialists directly via phone, WhatsApp, or instant appointment bookings.
- **Dual-Tier Verification**: Distinguishes certified National ID (NID) verified professionals from community-recommended local providers.
- **Privacy-First Data Protection**: Unrestricted guest directory browsing with direct telephone numbers and active discussions secured behind verified authentication.
- **24/7 Life Support & Emergency Hub**: Immediate one-click access to ambulances, medical oxygen, 24/7 pharmacies, LPG gas delivery, and toll-free national emergency services (999, 333, 109, 16263).

🔗 **Live Deployment:** [https://porshi.onrender.com](https://porshi.onrender.com)

---

## ✨ Key Features

### 1. 🔍 Geospatial 40+ A-Z Service Directory
- **Multi-Parameter Search & Filter Engine**: Radial proximity filter (1 km to 25 km), category groups (*Home Services, Repairs & Tech, Health & Care, Education, Transportation, Lifestyle & Events*), rating thresholds (★ 3.0+ / 4.0+), and dynamic price range queries.
- **Interactive Proximity Radar**: Visual map scanner plotting nearby neighborhood technicians around the user's selected administrative division/thana.
- **Real-Time Dynamic Search**: Instant client-side keyword matching across specialist names, sub-skills, service descriptions, and trade tags.

### 2. ⚡ 24/7 Rapid Emergency Response Hub
- Direct contact access for **Emergency Ambulance (ICU & Oxygen)**, **24/7 Pharmacy Home Delivery**, **15-Minute LPG Gas Cylinder Dispatch**, **Emergency Electrician (Short Circuit / DB Board Fix)**, **Plumber / Pipe Burst Fix**, and **Local Practitioner & First Aid**.
- Integrated national emergency shortcuts: `999` (Police, Fire, Ambulance), `333` (National Citizen Helpdesk), `109` (Women & Child Protection), and `16263` (Shastho Batayan Health Hotline).

### 3. 💬 Neighborhood Community Discussions & Forum
- **Dual Geographic Scopes**: Filter discussions strictly within **My Area** (e.g., *Dhanmondi, Mirpur, Uttara, Chittagong*) or broadcast across **All Bangladesh**.
- **Categorized Civic Threads**: *Emergency Help (জরুরি সাহায্য)*, *Recommendations (পরামর্শ / কারিগরের খোঁজ)*, *Neighborhood Safety (নিরাপত্তা)*, and *Local Events (এলাকার ইভেন্ট)*.
- **Community Interaction**: Post upvoting, collapsible discussion threads, and neighborly advice sharing.

### 4. 👥 Dual Role Workspaces (Citizen Consumer vs Service Pro)
- **Citizen Dashboard**: Manage service appointments, track status milestones (*Pending, Confirmed, Completed*), earn citizen participation points, and submit post-service worker reviews and star ratings.
- **Service Pro Dashboard**: Control panel for verified specialists to accept or decline incoming customer requests, review job locations, and inspect performance analytics.

### 5. 🌐 Full Internationalization (i18n) & Modern Theming
- **Zero-Reload Bilingual Switching**: Full runtime dictionary translation between **English (EN)** and **বাংলা (বাং)**.
- **Adaptive Day & Night Theme**: Deep navy dark theme and clean light theme with CSS drop-shadow filters ensuring calligraphy brand visibility across all devices.

---

## 🏗️ System Architecture

```
Porshi/
├── backend/
│   ├── config/             # Database connection & environment configuration
│   ├── models/             # Mongoose schemas (User, Listing, Post)
│   ├── routes/             # RESTful API route controllers
│   │   ├── auth.js         # JWT Authentication, registration & sessions
│   │   ├── listings.js     # Directory search, worker profiles & reviews
│   │   └── posts.js        # Community threads, comments & upvotes
│   ├── seed.js             # Automated database population script
│   └── server.js           # Express application entry point & static SPA host
│
├── frontend/
│   ├── assets/             # Brand logos, calligraphy PNGs, and artwork
│   ├── bangladesh-data.js  # 8 Divisions, 64 Districts, and Upazilas dataset
│   ├── i18n.js             # Bilingual dictionary (English & Bengali translation matrix)
│   ├── index.html          # Semantic HTML5 Single Page Application
│   ├── script.js           # State management, view router & modal controllers
│   └── style.css           # Modern CSS3 design system with responsive variables
│
├── .gitignore              # Git ignore configuration
├── LICENSE                 # MIT License
├── package.json            # Project dependencies & runtime scripts
└── README.md               # Documentation & deployment guide
```

---

## 🗄️ Database Schemas (MongoDB / Mongoose)

### User Entity (`User.js`)
```javascript
{
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['citizen', 'pro'], default: 'citizen' },
  area: { type: String, required: true },
  points: { type: Number, default: 100 },
  hasServiceListing: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}
```

### Specialist Listing Entity (`Listing.js`)
```javascript
{
  name: { type: String, required: true },
  workerName: { type: String, required: true },
  category: { type: String, required: true, index: true },
  categoryGroup: { type: String, required: true },
  verificationType: { type: String, enum: ['pro_verified', 'community_added'], default: 'community_added' },
  nidNumber: { type: String, default: null },
  phone: { type: String, required: true },
  whatsapp: { type: String },
  area: { type: String, required: true, index: true },
  priceText: { type: String, default: '৳300 থেকে' },
  priceValue: { type: Number, default: 300 },
  rating: { type: Number, default: 5.0 },
  reviewsCount: { type: Number, default: 0 },
  upvotes: { type: Number, default: 0 },
  reviews: [
    {
      reviewerName: String,
      rating: Number,
      comment: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}
```

### Community Discussion Entity (`Post.js`)
```javascript
{
  authorName: { type: String, required: true },
  area: { type: String, required: true, index: true },
  category: { type: String, enum: ['help', 'recommendation', 'security', 'event'], default: 'recommendation' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  comments: [
    {
      author: String,
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
}
```

---

## 🔌 API Endpoints Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new Citizen or Service Specialist account | Public |
| `POST` | `/api/auth/login` | Authenticate user via Mobile Number & Password | Public |
| `GET` | `/api/auth/me` | Fetch authenticated user profile & active booking list | Private |

### 🛠️ Service Specialists Directory (`/api/listings`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/listings` | Query specialists with category, radius, rating & price filters | Public |
| `GET` | `/api/listings/:id` | Fetch detailed worker profile, reviews & masked phone number | Public |
| `POST` | `/api/listings` | Publish new specialist listing (with optional NID verification) | Authenticated |
| `POST` | `/api/listings/:id/review` | Submit star rating (1–5 ★) and feedback comment | Authenticated |
| `POST` | `/api/listings/:id/upvote` | Cast community trust upvote for a specialist | Authenticated |

### 💬 Community Discussion Board (`/api/posts`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/posts` | Retrieve neighborhood feed by area scope (*My Area* vs *All BD*) | Public |
| `POST` | `/api/posts` | Create new discussion topic (*Help, Recommendation, Event*) | Authenticated |
| `POST` | `/api/posts/:id/comment` | Add reply to community discussion thread | Authenticated |
| `POST` | `/api/posts/:id/upvote` | Upvote helpful community advice | Authenticated |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [MongoDB](https://www.mongodb.com/) (Local Community Server or MongoDB Atlas cluster)
- Modern Web Browser (Chrome, Firefox, Safari, Edge)

### 1. Clone the Repository
```bash
git clone https://github.com/Shreyalien/Porshi.git
cd Porshi
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/porshi
JWT_SECRET=porshi_super_secure_jwt_token_key_2026
```

### 4. Seed Initial Data (Optional)
```bash
npm run seed
```

### 5. Start the Application
```bash
# Start local production server
npm start

# Or start development mode with hot reload
npm run dev
```

Open **`http://localhost:5000`** in your browser to view the application.

---

## ⚡ Default Demo Credentials

| Parameter | Value |
| :--- | :--- |
| **Demo Mobile Number** | `01700000000` |
| **Demo Password** | `123456` |
| **Demo OTP Code** | `123456` *(One-Click Autofill Enabled)* |
| **Citizen Profile** | *Rakib Hasan (Consumer)* |
| **Service Pro** | *Md. Rahim (Rahim Electric Service)* |

---

## 🛡️ Security & Privacy

- **Contact Number Protection**: Direct phone numbers and WhatsApp links are protected from automated scrapers in Guest Mode and only unveiled to authenticated users.
- **NID Verification Badge**: Specialists submitting verified National ID credentials receive a prominent `🛡️ NID Verified` trust badge.
- **Resilient Fallback Architecture**: The server operates with or without an active MongoDB connection, providing smooth standalone evaluation.

---

## 👩‍💻 Author & Maintainer

Developed with ❤️ for the citizens of Bangladesh by:

**Shreya**
- GitHub: [@Shreyalien](https://github.com/Shreyalien)
- Project: [Porshi (পড়শী)](https://github.com/Shreyalien/Porshi)
- Live: [porshi.onrender.com](https://porshi.onrender.com)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.