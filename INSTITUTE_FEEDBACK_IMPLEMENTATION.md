# Institute Management & Feedback System - Implementation Summary

## ✅ Features Implemented

### 1. **Institute Management System**

#### Database Schema
- **Institute Model** with fields:
  - `name` - Institute name
  - `domain` - Email domain (e.g., viit.ac.in)
  - `description`, `address`, `phone`, `email`, `website`
  - `logo` - Institute logo URL
  - `established` - Year established
  - `isActive` - Status flag
  - Relations to `User` model

- **User Model Updated**:
  - Added `instituteId` field
  - Auto-links users to institute based on email domain

#### Admin APIs

**GET /api/admin/institutes**
- List all institutes with pagination
- Search by name or domain
- Returns user count per institute

**POST /api/admin/institutes**
- Create new institute
- Validates domain uniqueness
- Required: name, domain

**GET /api/admin/institutes/[id]**
- Get single institute details
- Includes recent users from institute

**PUT /api/admin/institutes/[id]**
- Update institute details
- Validates domain changes

**DELETE /api/admin/institutes/[id]**
- Delete institute
- Prevents deletion if users are linked

#### Auto-Assignment Feature
- **Registration Enhancement**: When users register, system automatically:
  1. Extracts email domain (e.g., `ayush@viit.ac.in` → `viit.ac.in`)
  2. Searches for matching institute in database
  3. Links user to institute automatically
  4. Works for both students and teachers

---

### 2. **Feedback System**

#### Database Schema  
- **Enhanced Feedback Model**:
  - `userId` - Student who gave feedback
  - `courseId` - Course feedback (optional)
  - `teacherId` - Teacher feedback (optional)
  - `rating` - 1 to 5 stars
  - `comment` - Feedback text
  - `type` - Enum: COURSE or TEACHER
  - `createdAt`, `updatedAt` timestamps

#### Student APIs

**POST /api/student/feedback**
- Submit course or teacher feedback
- Validates enrollment for course feedback
- Required: rating (1-5), comment, type
- Only students can submit

**GET /api/student/feedback**
- Get user's submitted feedbacks
- Filter by type (COURSE or TEACHER)
- Returns with course details

**GET /api/courses/[id]/feedback**
- Get all feedbacks for a course
- Calculates average rating
- Returns feedback count and stats
- Public endpoint (no auth required)

---

## 📊 Sample Data

### Institutes Seeded
1. **Vishwakarma Institute of Information Technology**
   - Domain: `viit.ac.in`
   - Complete contact info and details

2. **Vishwakarma Institute of Technology**
   - Domain: `vit.edu`
   - Complete contact info and details

---

## 🔧 How It Works

### Institute Assignment Flow
```
User registers with email: ayush@viit.ac.in
         ↓
System extracts domain: viit.ac.in
         ↓
Searches Institute table for domain
         ↓
Finds: "Vishwakarma Institute of Information Technology"
         ↓
Links user.instituteId to institute.id
         ↓
User automatically belongs to VIIT
```

### Feedback Submission Flow
```
Student enrolls in course
         ↓
Completes course/modules
         ↓
Submits feedback (rating + comment)
         ↓
System validates enrollment
         ↓
Creates feedback record
         ↓
Feedback visible to teachers and in course details
```

---

## 🚀 API Usage Examples

### Admin: Create Institute
```javascript
POST /api/admin/institutes
{
  "name": "MIT College",
  "domain": "mit.edu",
  "description": "Premier technology institute",
  "address": "123 Main St, City",
  "phone": "+1-555-0100",
  "email": "info@mit.edu",
  "website": "https://mit.edu",
  "established": "1861"
}
```

### Student: Submit Course Feedback
```javascript
POST /api/student/feedback
{
  "courseId": "cm...",
  "rating": 5,
  "comment": "Excellent course! Learned a lot about React.",
  "type": "COURSE"
}
```

### Student: Submit Teacher Feedback
```javascript
POST /api/student/feedback
{
  "teacherId": "cm...",
  "rating": 4,
  "comment": "Great teaching style, very clear explanations.",
  "type": "TEACHER"
}
```

### Get Course Feedback
```javascript
GET /api/courses/[courseId]/feedback

Response:
{
  "feedbacks": [
    {
      "id": "...",
      "rating": 5,
      "comment": "Amazing course!",
      "createdAt": "2025-12-16T...",
      "User": {
        "id": "...",
        "name": "Ayush"
      }
    }
  ],
  "stats": {
    "total": 15,
    "averageRating": 4.6
  }
}
```

---

## 📝 Database Changes

### New Tables
- `Institute` - Stores institute information
- `FeedbackType` enum - COURSE | TEACHER

### Modified Tables
- `User` - Added `instituteId` (optional, auto-assigned)
- `Feedback` - Enhanced with `teacherId`, `type`, `updatedAt`

### Migration Applied
```bash
npx prisma db push  # ✅ Completed
```

---

## 🎯 Next Steps (UI Components Needed)

### Admin Dashboard
1. **Institutes Management Page** (`/admin/institutes`)
   - List all institutes with search
   - Add new institute button
   - Edit/Delete actions
   - View user count per institute

2. **Institute Form Component**
   - Create/Edit institute modal
   - Form validation
   - Domain uniqueness check

### Student Dashboard
1. **Feedback Form Component**
   - Star rating selector
   - Comment textarea
   - Course/Teacher selector
   - Submit button

2. **My Feedbacks Page** (`/student/my-feedbacks`)
   - List all submitted feedbacks
   - Filter by type (Course/Teacher)
   - Edit/Delete own feedback

3. **Course Feedback Display**
   - Show feedbacks on course detail page
   - Display average rating
   - Star rating visualization
   - Paginated feedback list

---

## 🔐 Security & Validation

### Implemented
- ✅ Admin-only access for institute management
- ✅ Student-only feedback submission
- ✅ Enrollment verification for course feedback
- ✅ Rating range validation (1-5)
- ✅ Comment required validation
- ✅ Domain uniqueness check
- ✅ Prevent institute deletion with linked users

---

## 📦 Files Created/Modified

### New API Routes
- `app/api/admin/institutes/route.ts`
- `app/api/admin/institutes/[id]/route.ts`
- `app/api/student/feedback/route.ts`
- `app/api/courses/[id]/feedback/route.ts`

### Modified Files
- `prisma/schema.prisma` - Added Institute, updated Feedback and User models
- `app/api/register/route.ts` - Added auto-institute assignment

### Utility Scripts
- `seed-institutes.js` - Seed sample institutes

---

## 🧪 Testing

### Test Registration with Institute Domain
```bash
# Register with VIIT email
POST /api/register
{
  "name": "Test Student",
  "email": "test@viit.ac.in",
  "password": "test123",
  "role": "STUDENT"
}
# User will be auto-linked to VIIT institute
```

### Test Feedback Submission
1. Enroll in a course
2. POST to `/api/student/feedback` with courseId
3. GET from `/api/courses/[id]/feedback` to verify

---

## 🎉 Summary

✅ **Institute Management**: Fully functional backend with CRUD APIs  
✅ **Auto-Assignment**: Email domain-based institute linking  
✅ **Feedback System**: Course and teacher feedback with ratings  
✅ **Database**: Schema updated and migrated  
✅ **Sample Data**: VIIT and VIT institutes seeded  
✅ **APIs**: Complete REST endpoints for all operations  
✅ **Security**: Role-based access control implemented  

🔄 **Remaining**: UI components for admin institute management and student feedback forms
