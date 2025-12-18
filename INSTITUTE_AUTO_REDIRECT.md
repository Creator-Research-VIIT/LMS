# Institute Auto-Redirect Implementation

## ✅ Changes Implemented

### 1. **Updated Auth Configuration** (`lib/auth.ts`)
- Added `instituteId` to user selection in credentials provider
- Added `instituteId` to JWT token for both OAuth and credentials users
- Added `instituteId` to session object

### 2. **Updated Middleware** (`middleware.ts`)
- Added institute redirect logic for authenticated users on auth pages
- Added institute redirect logic for home page access
- Institute users are now prioritized and redirected to `/institute` page
- Added `/institute` to public routes list

## 🔄 How It Works Now

### **Login Flow for Institute Users:**

```
User logs in with institute email (e.g., ayush.22211400@viit.ac.in)
         ↓
Auth system checks database
         ↓
User has instituteId = "viit_institute_id" ✅
         ↓
JWT token includes: { role: "STUDENT", instituteId: "xxx" }
         ↓
Session includes instituteId
         ↓
Middleware detects instituteId in token
         ↓
✨ AUTO-REDIRECT to /institute page ✨
         ↓
User lands on Institute Portal Dashboard
```

### **Login Flow for Non-Institute Users:**

```
User logs in with regular email (e.g., student@lms.com)
         ↓
Auth system checks database
         ↓
User has instituteId = null ❌
         ↓
JWT token includes: { role: "STUDENT", instituteId: null }
         ↓
Middleware uses role-based redirect
         ↓
Redirect based on role:
  - ADMIN → /admin
  - TEACHER → /teacher
  - STUDENT → /student
  - CHARITY → /charity
```

## 🧪 Testing Instructions

### **Test Case 1: Institute User Login**

1. **Login with:**
   - Email: `ayush.22211400@viit.ac.in`
   - Password: [user's password]

2. **Expected Result:**
   - ✅ Login successful
   - ✅ Auto-redirect to `/institute` page
   - ✅ See VIIT institute dashboard

### **Test Case 2: Regular User Login**

1. **Login with:**
   - Email: `student@lms.com`
   - Password: [user's password]

2. **Expected Result:**
   - ✅ Login successful
   - ✅ Redirect to `/student` page (role-based)
   - ✅ See regular student dashboard

### **Test Case 3: Access Home Page as Institute User**

1. **Already logged in as institute user**
2. **Navigate to:** `http://localhost:3000/`

3. **Expected Result:**
   - ✅ Auto-redirect to `/institute`

### **Test Case 4: New Registration with Institute Email**

1. **Register with email:** `newstudent@viit.ac.in`
2. **Complete registration**

3. **Expected Result:**
   - ✅ User auto-assigned to VIIT institute
   - ✅ Login redirects to `/institute` page

## 📊 Current Institute Users

| User | Email | Role | Institute | Redirect |
|------|-------|------|-----------|----------|
| ayush | ayush.22211400@viit.ac.in | STUDENT | VIIT | `/institute` ✅ |
| Tanmay | tanmay.22210437@viit.ac.in | TEACHER | VIIT | `/institute` ✅ |
| Admin User | admin@lms.com | ADMIN | None | `/admin` |
| Jane Student | student@lms.com | STUDENT | None | `/student` |

## 🔑 Session Data Structure

```typescript
// Institute User Session
{
  user: {
    id: "user_xxx",
    email: "ayush.22211400@viit.ac.in",
    name: "ayush",
    role: "STUDENT",
    instituteId: "institute_id_xxx" // ✅ Present
  }
}

// Regular User Session
{
  user: {
    id: "user_yyy",
    email: "student@lms.com",
    name: "Jane Student",
    role: "STUDENT",
    instituteId: null // ❌ Not present
  }
}
```

## 🎯 Priority Logic

The middleware now follows this priority:

1. **Institute Check** (Highest Priority)
   - If `instituteId` exists → Redirect to `/institute`

2. **Role Check** (Fallback)
   - If no `instituteId`:
     - ADMIN → `/admin`
     - TEACHER → `/teacher`
     - STUDENT → `/student`
     - CHARITY → `/charity`

## 🚀 Next Steps

To test the implementation:

1. ✅ Server is running on `http://localhost:3000`
2. ✅ Logout if currently logged in
3. ✅ Login with `ayush.22211400@viit.ac.in`
4. ✅ You should auto-redirect to `/institute` page

## 📝 Notes

- Institute detection happens automatically based on email domain during registration
- Existing users with institute emails have been auto-assigned to their institutes
- Non-institute users continue to use role-based routing
- Institute users can still access regular student/teacher pages if needed (no restriction, just default redirect)

---

**Implementation Date:** December 16, 2025  
**Status:** ✅ Complete and Ready for Testing
