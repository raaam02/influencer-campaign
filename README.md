# 🧩 Influencer Campaign Management System

A full-stack **Influencer Campaign Management System** built with **Laravel 10** (Backend API) and **React + TypeScript + shadcn/ui** (Frontend).  
This project allows brands to manage marketing campaigns, assign influencers, and track engagement — with a focus on clean code, scalable architecture, and smooth UI/UX.

---

## 🚀 Features

### 🖥️ Frontend (React + TypeScript + shadcn/ui)
- 📋 **Campaign Management** — create, view, and assign influencers to campaigns  
- 🎯 **Influencer Directory** — search and filter influencers by platform, category, or min followers  
- ✨ **Polished UI/UX** — responsive, consistent design system using `shadcn/ui`  
- 🔄 **Smart State Management** — reusable hooks for fetching and updating data  
- ⚙️ **Dark/Light Mode** with animated theme toggle  
- ⚡ **Real-Time Feedback** — toast notifications, skeleton loaders, and error states  

### ⚙️ Backend (Laravel 10)
- 🧱 **Models & Relationships**
  - `Campaign` ↔ `Influencer` (many-to-many)
  - Includes pivot table `campaign_influencer`
- 🧮 **Automatic Calculations**
  - Total influencers and total followers for each campaign
- 🧹 **Validation & Data Integrity**
  - Ensures `end_date > start_date`
  - Prevents duplicate influencer assignments
- ✉️ **Queued Email Simulation**
  - Laravel Job dispatches when influencers are assigned
- ⏰ **Scheduled Task**
  - Marks campaigns as “completed” automatically when the end date passes

---

## 🧰 Tech Stack

**Backend:**
- Laravel 10  
- MySQL (or SQLite for local testing)  
- Laravel Queues (database driver)  
- Laravel Scheduler (for cron job)  

**Frontend:**
- React + TypeScript (Vite)  
- shadcn/ui + TailwindCSS  
- Axios for API requests  
- Sonner for toasts  

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/influencer-campaign.git
cd influencer-campaign
```

### 2️⃣ Backend Setup
```bash
cd api
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

---

## API Endpoints

| Method   | Endpoint                     | Description                                                                  |
| -------- | ---------------------------- | ---------------------------------------------------------------------------- |
| **POST** | `/api/campaigns`             | Create a new campaign                                                        |
| **GET**  | `/api/campaigns`             | List all campaigns (with influencers + totals)                               |
| **GET**  | `/api/influencers`           | List influencers (supports filters: `platform`, `category`, `min_followers`) |
| **POST** | `/api/campaigns/{id}/assign` | Assign one or more influencers to a campaign                                 |


--- 

### 🧩 Filtering Examples
```bash
GET /api/influencers?platform=youtube&min_followers=10000
```

---

### ✉️ Queue Job — Simulated Email Sending

```bash
SendAssignedEmailJob::dispatch($influencer, $campaign);
```

#### It currently logs messages like:
```bash
📩 Simulated email sent to influencer 'John Doe' for campaign 'Winter Launch'.
```

---

### ⏰ Scheduled Command — Auto-Complete Campaigns

```bash
php artisan campaigns:mark-completed
```

### 💅 Frontend Highlights

- Beautiful, consistent layout with navbar, hero section, and themed pages
- Campaign and influencer cards with stats and badges
- Skeleton loaders for seamless UX
- Rich filtering, sorting, and refresh functionality
- Theme toggle (Light / Dark / System) with smooth animations

---

## Current Status

| Area                           | Status                                |
| ------------------------------ | ------------------------------------- |
| Laravel API                    | ✅ Complete                            |
| React Frontend                 | ✅ Complete                            |
| Influencer Filters             | ✅ Platform + Category + Min Followers |
| Campaign Creation & Assignment | ✅ Functional                          |
| Email Queue Job                | ✅ Simulated & Ready for Real          |
| Scheduled Command              | ✅ Tested & Works                      |
| UI/UX                          | ✅ Polished and Consistent             |

---

# 👨‍💻 Author
##### Ramdyal Prajapati (Ram)
💼 Full Stack Developer
📧 [prajapatiram983@gmail.com](mailto:prajapatiram983@gmail.com)
