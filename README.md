# Surakshya Sarthi - Disaster Preparedness Platform

A gamified disaster preparedness learning platform built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## 🎯 Phase 1: Setup & Onboarding UI

✅ **UI/UX Complete** - Static forms and layouts ready

### Features Implemented

- **Modern Design**: Vercel/Notion-inspired minimal UI with Indigo + Gray palette
- **Responsive Layout**: Mobile-friendly design with Tailwind CSS
- **Smooth Animations**: Framer Motion for subtle fade-in and hover effects
- **Navigation**: Clean top navigation bar with site branding
- **Form UI**: Styled input fields, dropdowns, and buttons (no functionality yet)

### Pages Created

1. **`/admin/register-school`** - School registration form
   - School name input
   - Address input
   - Register button
   - Success/error message placeholder

2. **`/onboarding/profile-setup`** - User profile setup form
   - Display name input
   - Role dropdown (Admin/Teacher/Student)
   - Continue button
   - Success/error message placeholder

3. **`/student/dashboard`** - Student learning dashboard
   - Progress tracking with XP bars and levels
   - Badge collection system
   - Mission cards with status indicators
   - Daily streak tracking
   - Gamified learning interface

4. **`/student/avatar`** - Avatar creator for students
   - Character customization with live preview
   - Body type, hair, outfit, and accessory options
   - Color pickers with Tailwind color palette
   - Randomize and save functionality
   - Playful, Duolingo-inspired UI

5. **`/student/innovation-hub`** - Community idea sharing platform
   - Idea submission form with validation
   - Community voting system (upvote/downvote)
   - Featured ideas with special highlighting
   - Status badges (Trending, Featured, New, Popular)
   - Community engagement metrics

6. **`/student/training-arena`** - Gamified safety training system
   - Interactive quiz system with multiple choice questions
   - XP-based leveling and progress tracking
   - Category cards with progress rings and lock states
   - Training categories: Fire Safety, Earthquake Drill, First Aid
   - Achievement badges and completion rewards

7. **`/student/emergency-contacts`** - Emergency contact management system
   - Contact card-based grid with CRUD functionality
   - ICE (In Case of Emergency) primary contact designation
   - Multiple communication channels (Call, SMS, WhatsApp, Location)
   - SOS emergency button with location sharing
   - Medical notes and important information display

8. **`/`** - Landing page with navigation to all forms

## Supabase Connection Status

✅ **Connected Successfully**

- **Project URL**: https://jwvznpiqvlhflnmyuhme.supabase.co
- **Status**: Active and accessible

## 🚀 Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file in the project root with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://jwvznpiqvlhflnmyuhme.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3dnpucGlxdmxoZmxubXl1aG1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNzU2OTAsImV4cCI6MjA3Mzk1MTY5MH0.5VyFFLUqbf2eu6Jj7ArYeDbRXoDEwWYKNy_gdP4T8Qc
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

4. **View the Application**
   Visit `http://localhost:3000` to see the beautiful UI!

## 🏗️ Project Structure

```
app/
├── globals.css          # Global styles with Tailwind
├── layout.tsx          # Root layout with navigation
├── page.tsx            # Landing page
├── admin/
│   └── register-school/
│       └── page.tsx    # School registration form
├── onboarding/
│   └── profile-setup/
│       └── page.tsx    # Profile setup form
└── student/
    ├── dashboard/
    │   └── page.tsx    # Student learning dashboard
    ├── avatar/
    │   └── page.tsx    # Avatar creator for students
    ├── innovation-hub/
    │   └── page.tsx    # Innovation Hub for students
    ├── training-arena/
    │   └── page.tsx    # Training Arena for students
    ├── emergency-contacts/
    │   └── page.tsx    # Emergency Contacts for students

components/
├── Navigation.tsx       # Top navigation bar
├── ui/                 # Reusable UI components
├── dashboard/          # Dashboard and emergency contact components
├── avatar/             # Avatar creator components
├── innovation/         # Innovation Hub components
└── training/           # Training Arena components

lib/
└── supabase.js         # Supabase client (legacy)
```

## 🎨 Design System

- **Colors**: Indigo primary (#6366f1), Gray secondary
- **Typography**: Inter font family
- **Components**: Rounded cards, subtle shadows, smooth transitions
- **Animations**: Fade-in on load, hover effects, button interactions
- **Layout**: Centered cards, responsive grid, mobile-first

## 📱 Responsive Design

- Mobile-first approach with Tailwind breakpoints
- Flexible card layouts that adapt to screen size
- Touch-friendly button sizes and spacing
- Optimized typography scaling

## 🔄 Next Steps

1. **Add Form Functionality**: Connect forms to Supabase
2. **Authentication**: Implement user registration/login
3. **Database Schema**: Create tables for schools, users, and courses
4. **Gamification**: Add progress tracking, badges, and achievements
5. **Content Management**: Build admin dashboard for course creation

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Ready for Vercel
