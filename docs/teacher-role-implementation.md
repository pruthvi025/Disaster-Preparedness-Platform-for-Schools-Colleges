# Teacher Role Implementation

## Overview
This document outlines the implementation of Teacher role support in the Surakshya Sarthi disaster preparedness platform.

## Frontend Changes

### 1. Signup Form (`components/auth/SignupForm.tsx`)
- **Conditional Field Rendering**: Student-specific fields (Age, Zone, District, UDISE Code, School, etc.) are now only shown when "Student" role is selected
- **Teacher Fields**: When "Teacher" role is selected, only basic fields are shown:
  - Full Name
  - Email
  - Mobile Number
  - Password
  - Confirm Password
- **Enhanced Validation**: Role-based validation ensures required fields are only validated for the appropriate role

### 2. Login Form (`components/auth/LoginForm.tsx`)
- **Role-based Authentication**: Validates user role matches selected role during login
- **Enhanced Error Handling**: Provides specific error messages for role mismatches
- **Proper Redirects**: Redirects to appropriate dashboard based on user role

### 3. Teacher Dashboard (`app/teacher/dashboard/page.tsx`)
- **New Route**: `/teacher/dashboard` with placeholder content
- **Navigation Guards**: Prevents non-teachers from accessing teacher dashboard
- **Responsive Design**: Matches existing design theme with teacher-specific content
- **Quick Actions**: Placeholder for future teacher features (class management, assignments, etc.)

### 4. Role Selector (`components/auth/RoleSelector.tsx`)
- **Three Roles**: Student, Teacher, Admin (Admin maps to Teacher for now)
- **Visual Feedback**: Clear indication of selected role

## Backend Changes

### 1. Enhanced Auth Client (`lib/auth-client.ts`)
- **Role-based Signup**: `signUpWithEmail` now accepts role and role-specific data
- **User Metadata**: Stores role and additional user information in Supabase user metadata
- **Profile Management**: Updates profiles table with role-specific information

### 2. Database Schema Requirements

#### Users Table (Supabase Auth)
```sql
-- User metadata should include:
{
  "full_name": "string",
  "role": "student|teacher|admin",
  "mobile": "string",
  "age": "string", -- only for students
  "district": "string", -- only for students
  "udise_code": "string", -- only for students
  "school_name": "string", -- only for students
  "school_category": "string", -- only for students
  "zone": "string" -- only for students
}
```

#### Profiles Table
```sql
CREATE TABLE profiles (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  role TEXT CHECK (role IN ('student', 'teacher', 'admin')),
  mobile TEXT,
  age TEXT,
  district TEXT,
  udise_code TEXT,
  school_name TEXT,
  school_category TEXT,
  zone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Authentication Flow

### Signup Flow
1. User selects role (Student/Teacher/Admin)
2. Form shows appropriate fields based on role
3. Data is sent to `signUpWithEmail` with role information
4. User metadata is stored in Supabase Auth
5. Profile record is created/updated in profiles table
6. User is redirected to appropriate dashboard

### Login Flow
1. User selects role and enters credentials
2. `signInWithEmail` authenticates user
3. System validates user role matches selected role
4. Auth context is updated with user information
5. User is redirected to appropriate dashboard

## Navigation Guards

### Teacher Dashboard Access
- Only users with `role: 'teacher'` can access `/teacher/dashboard`
- Non-teachers are redirected to home page
- Loading state shown while checking authentication

### Cross-Role Prevention
- Students cannot access teacher dashboard
- Teachers cannot access student dashboard
- Role validation happens on both frontend and backend

## Demo Credentials

### Teacher Login
- **Email**: `teacher@demo.com`
- **Password**: `password123`
- **Role**: Teacher

### Student Login
- **Email**: `student@demo.com`
- **Password**: `password123`
- **Role**: Student

## Future Enhancements

### Teacher Dashboard Features (To Be Implemented)
1. **Class Management**: Create and manage classes
2. **Student Progress**: Track individual student progress
3. **Assignment Creation**: Create and assign tasks
4. **Analytics**: View class performance metrics
5. **Communication**: Send messages to students/parents

### Backend API Endpoints (To Be Created)
1. `POST /api/auth/signup` - Role-based user registration
2. `POST /api/auth/login` - Role-based authentication
3. `GET /api/teacher/classes` - Get teacher's classes
4. `POST /api/teacher/assignments` - Create assignments
5. `GET /api/teacher/students` - Get class students

## Testing

### Manual Testing Checklist
- [ ] Teacher signup with minimal fields
- [ ] Student signup with all fields
- [ ] Teacher login redirects to teacher dashboard
- [ ] Student login redirects to student dashboard
- [ ] Role validation prevents cross-role access
- [ ] Responsive design works on mobile/desktop
- [ ] Error handling for invalid credentials
- [ ] Error handling for role mismatches

### Test Scenarios
1. **Teacher Signup**: Select Teacher role, fill only required fields, verify redirect
2. **Student Signup**: Select Student role, fill all fields including school info, verify redirect
3. **Role Mismatch**: Try to login as Teacher with Student credentials, verify error
4. **Cross-Role Access**: Try to access teacher dashboard as student, verify redirect

## Security Considerations

1. **Role Validation**: Always validate user role on both frontend and backend
2. **JWT Tokens**: Include role information in JWT tokens
3. **Database RLS**: Implement Row Level Security for role-based data access
4. **API Protection**: Protect teacher-specific endpoints with role validation

## Deployment Notes

1. **Database Migration**: Run profile table creation script
2. **Environment Variables**: Ensure Supabase configuration is correct
3. **Role Metadata**: Update existing users with role information if needed
4. **Testing**: Verify all authentication flows work in production



