# FeedbackHub — Full-Stack Feedback Collector

A modern full-stack feedback collection and management application built to fulfill the assignment requirements, featuring clean modular code, responsive UI, rich search & filtering capabilities, and MongoDB persistence.

---

## 📁 File Structure & Best Practices

```
feedback-collector/
├── client/                      # React 19 Frontend (Vite)
│   ├── src/
│   │   ├── assets/              # Static styling assets & images
│   │   ├── components/          # Reusable UI components
│   │   │   ├── FeedbackForm.jsx # Feedback submission form with rating & validation
│   │   │   ├── FeedbackList.jsx # Moderation table with search & filtering
│   │   │   ├── FeedbackItem.jsx # Individual feedback entry row with sentiment badge
│   │   │   ├── ModalComponent.jsx # Delete confirmation modal dialog
│   │   │   ├── ItemCard.jsx     # Product card for catalog
│   │   │   ├── Navbar.jsx       # Customer top navigation bar
│   │   │   └── Sidebar.jsx      # Admin dashboard sidebar navigation
│   │   ├── pages/               # Page-level views
│   │   │   ├── CustomerCatalogPage.jsx # Product catalog & reviews entry
│   │   │   ├── FeedbackFormPage.jsx    # "Share your thoughts" feedback form
│   │   │   ├── AdminDashboardPage.jsx  # Admin moderation workspace with metrics
│   │   │   └── AdminAddItemPage.jsx    # Admin page to add new catalog items
│   │   ├── services/
│   │   │   └── FeedbackService.js      # Centralized API service for all requests
│   │   ├── utils/
│   │   │   ├── dateUtils.js            # Date formatting and relative time calculations
│   │   │   └── sentimentUtils.js       # Sentiment badge logic and initials generator
│   │   ├── App.jsx              # Root layout and view router
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Responsive styles matching Stitch designs
│   └── vite.config.js
│
└── server/                      # Node.js + Express Backend
    ├── src/
    │   ├── config/
    │   │   └── db.js            # MongoDB connection
    │   ├── controllers/
    │   │   ├── feedbackController.js # Feedback CRUD, search & stats
    │   │   └── itemController.js     # Catalog items retrieval & auto-seeding
    │   ├── models/
    │   │   ├── Feedback.js      # Feedback schema (name, email, message, rating, item)
    │   │   └── Item.js          # Catalog item schema
    │   └── routes/
    │       ├── feedbackRoutes.js# /api/feedback routes
    │       └── itemRoutes.js    # /api/items routes
    ├── server.js                # Server entry point
    └── package.json
```

---

## ✨ Features & Requirements

- ✅ **Feedback Form**: Collects name, email, feedback message, star rating (1-5), and associated product item with validation.
- ✅ **List of Feedback Entries**: Interactive moderation table displaying customer avatar, sentiment pills, item badges, message snippets, and relative timestamps.
- ✅ **Keyword & Date Filtering**: Search feedback by user name, message, email, or item; filter by date (`YYYY-MM-DD`); filter by sentiment (All, Excellent, Good, Needs Review).
- ✅ **Delete with Confirmation Modal**: `ModalComponent` prompts the administrator before permanently removing any feedback entry.
- ✅ **Product Catalog & Quick Feedback**: Browse catalog items with category filters and click "Give Feedback" to review specific products.
- ✅ **Admin Add Item**: Form to publish new products into the catalog with live completeness tracker.
- ✅ **JSDoc & Inline Comments**: JSDoc annotations on all functions with descriptive parameters and return types.

---

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd server
npm install
```

Create or verify `.env` file inside `server/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start backend:
```bash
npm run dev
# or: node server.js
```
The server will run on `http://localhost:5000` and automatically connect to MongoDB.

### 2. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/feedback` | Submit feedback (`name`, `email`, `message`, `rating`, `itemName`) |
| `GET` | `/api/feedback` | List feedback (query params: `keyword`, `date`, `rating`, `sentiment`, `item`) |
| `DELETE` | `/api/feedback/:id` | Delete feedback by ID |
| `GET` | `/api/feedback/stats` | Summary statistics (total count, average rating, sentiment counts) |
| `GET` | `/api/items` | List catalog items (auto-seeds defaults if empty) |
| `POST` | `/api/items` | Create new catalog item |
