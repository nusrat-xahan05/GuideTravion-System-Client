# GuideTravion – Frontend

## Project Overview
GuideTravion is a role-based tour booking platform frontend where tourists can explore tours, book guides, make secure payments, and leave reviews after completing tours. The system is designed to work seamlessly with the GuideTravion Backend API.

This frontend focuses on a clean user experience, role-based access, and a smooth **Booking → Payment → Review&Rating** journey.

---

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, ShadCN
- **Animation:** Framer Motion
- **State & Data Fetching:** Server Actions + Fetch API
- **Authentication:** JWT-based (handled via backend)
- **UI Components:** Custom reusable components
- **Icons:** Lucide React

---

## Key Features

### 1. Role-Based System
The application supports multiple roles:
- **Tourist (User)**
  - Create Wishlist
  - Browse tours
  - Book tours
  - Make payments
  - Leave reviews and rating after tour completion
- **Guide**
  - Create and manage tours
  - View bookings related to their tours
- **Admin**
  - Approve/reject guides
  - Manage tours and users
  - Monitor platform activity

---

### 2. Tour Management
- Tour listing with search, filter, and sorting
- Division-based tour browsing
- Dynamic tour details page
- Guide information displayed with tours

---

### 3. Booking → Payment → Review Flow

#### Booking Flow
1. User selects a tour
2. Checks availability
3. Creates a booking
4. Booking status becomes **PENDING**

#### Payment Flow
1. User completes payment (SSLCommerz)
2. Payment status becomes **PAID**
3. Booking status becomes **CONFIRMED**

#### Review Flow
1. After tour end date
2. Cron job marks booking as **COMPLETED**
3. User can submit rating & review
4. Tour and guide ratings are updated

---

### 4. Authentication Flow
- JWT-based authentication
- Token stored securely (HTTP-only cookie or headers)
- Protected routes based on roles
- Automatic redirect if unauthorized

---

### 5. Division-wise Tour Statistics
- Displays all divisions (fixed list)
- Shows total tours per division
- Divisions with no tours show **0**
- Clickable division cards redirect to filtered tours

---

### 6. Cron Jobs (Backend Dependent)
Although handled in the backend, the frontend depends on these:
- **Booking Completion Cron**
  - Marks bookings as COMPLETED after end date
- **Booking Expiry Cron**
  - Expires unpaid bookings

---

## Project Setup Instructions

### 1. Clone the Repository
```bash
git clone <frontend-repo-url>
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

The app will be available at:
```
http://localhost:3000
```

---

## API Dependency
This frontend requires the **GuideTravion Backend** to be running.
Make sure:
- MongoDB is connected
- Backend server is running
- Cron jobs are active

---

## UX & UI Highlights
- Responsive layout
- Animated division cards using Framer Motion
- Clean booking tables
- Professional dialog modals for booking & guide details

---

## Future Improvements
- Advanced analytics dashboard
- Push notifications
- Multi-language support

---
