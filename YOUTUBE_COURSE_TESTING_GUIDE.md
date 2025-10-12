# 🎬 YouTube Course Integration & Testing Guide

## ✅ **What's Been Added**

### 1. **YouTube URL in Course Creation Form**
- **Location**: Teacher Dashboard → Create Course
- **New Field**: YouTube Playlist/Video URL (required)
- **Accepts**: YouTube playlist URLs or individual video URLs
- **Example URLs**:
  - Playlist: `https://www.youtube.com/playlist?list=PLZlA0Gpn_vH9w2gvhsKuNWOSsHOHMnR6v`
  - Video: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

### 2. **Course Viewing Page**
- **Route**: `/course/[id]` 
- **Features**:
  - Embedded YouTube player for enrolled students
  - Course information and enrollment status
  - Enrollment button for non-enrolled users
  - Responsive design with sidebar

### 3. **Database Schema Update**
- Added `youtubeUrl` field to Course model
- Optional field (can be null)
- Stores YouTube playlist or video URLs

### 4. **API Endpoints**
- `GET /api/courses/[id]` - Get course details (includes YouTube URL)
- `GET /api/courses/[id]/enrollment` - Check enrollment status
- `POST /api/courses/[id]/enroll` - Enroll in course

## 🧪 **Complete Testing Workflow**

### **Step 1: Create Course with YouTube URL**

1. **Login as Teacher**:
   ```
   http://localhost:3000/login
   ```

2. **Go to Teacher Dashboard**:
   ```
   http://localhost:3000/teacher
   ```

3. **Create New Course**:
   - Click "Create Course" button
   - Fill in all fields including **YouTube URL**:
     - Title: "Complete JavaScript Masterclass"
     - Description: "Learn JavaScript from basics to advanced"
     - Thumbnail: Any image URL
     - **YouTube URL**: `https://www.youtube.com/playlist?list=PLZlA0Gpn_vH9w2gvhsKuNWOSsHOHMnR6v`
     - Price: 49.99
   - Submit course (will be pending approval)

### **Step 2: Approve Course as Admin**

1. **Login as Admin**:
   ```
   http://localhost:3000/admin
   ```

2. **Approve Course**:
   - Go to "Pending" section in sidebar
   - Find your course in "Pending Course Submissions"
   - Click "Approve" button
   - Course is now live and available for enrollment

### **Step 3: Test Course Viewing (Not Enrolled)**

1. **Login as Student**:
   ```
   http://localhost:3000/login
   ```

2. **Access Course Page**:
   ```
   http://localhost:3000/course/[COURSE-ID]
   ```
   *(Replace [COURSE-ID] with actual course ID from database)*

3. **What You'll See**:
   - Course title and description
   - Instructor information
   - "Enroll to Access Course Content" message
   - Enrollment button with price

### **Step 4: Enroll in Course**

1. **Click "Enroll Now" Button**
   - Course price will be displayed
   - Click to enroll (free enrollment for testing)
   - Success message should appear

### **Step 5: Test Course Viewing (Enrolled)**

1. **Refresh the course page**
2. **What You'll See**:
   - ✅ "Enrolled" status indicator
   - **Embedded YouTube player** with course content
   - Full course description
   - Course information sidebar

## 🔍 **Quick Testing URLs**

### **Method 1: Use Sample Data (Recommended)**

1. **Add Test Data**:
   ```bash
   cd "c:\Users\Ayush\Desktop\LMS@\LMS"
   node test-admin-dashboard.js
   ```

2. **Login as Admin** and approve the sample courses

3. **Get Course IDs** from admin dashboard or database

4. **Test Course Pages**:
   ```
   http://localhost:3000/course/[COURSE-ID-1]
   http://localhost:3000/course/[COURSE-ID-2]
   ```

### **Method 2: Direct Database Query**

If you want to find course IDs quickly:

1. **Check approved courses**:
   ```
   http://localhost:3000/api/courses
   ```
   This will return all approved courses with their IDs

2. **Use the ID in course URL**:
   ```
   http://localhost:3000/course/[ID-FROM-API]
   ```

## 🎯 **Expected Behavior**

### **For Non-Enrolled Users**:
- ❌ Cannot see YouTube videos
- ✅ Can see course description and details
- ✅ Can see enrollment button
- ✅ Can enroll in course

### **For Enrolled Users**:
- ✅ Can see embedded YouTube player
- ✅ Videos play directly in the page
- ✅ Full access to course content
- ✅ Enrollment status shows "Enrolled"

### **YouTube Player Features**:
- ✅ Full screen support
- ✅ Playlist navigation (if playlist URL)
- ✅ Standard YouTube controls (play, pause, volume, etc.)
- ✅ Responsive design (works on mobile/tablet)

## 🔧 **Troubleshooting**

### **Issue**: Course not showing up
- **Solution**: Make sure course is approved by admin
- **Check**: Course `approvalStatus` should be "APPROVED"

### **Issue**: YouTube video not loading
- **Solution**: Verify YouTube URL is correct and public
- **Check**: URL should be accessible without login

### **Issue**: Enrollment not working
- **Solution**: Make sure you're logged in as a STUDENT role
- **Check**: Only students can enroll in courses

### **Issue**: "Course not found" error
- **Solution**: Verify course ID exists and is approved
- **Check**: Use `/api/courses` to see available courses

## 📱 **Mobile Testing**

The course viewer is responsive and works on:
- ✅ Desktop (full sidebar layout)
- ✅ Tablet (responsive grid)
- ✅ Mobile (stacked layout)

## 🎉 **Summary**

You now have a complete course system with:
1. **Teachers can add YouTube URLs** when creating courses
2. **Courses require admin approval** before being visible
3. **Students can browse and enroll** in approved courses
4. **Enrolled students can watch** embedded YouTube content
5. **Responsive design** that works on all devices

**Test the full workflow**: Create Course → Admin Approval → Student Enrollment → Video Viewing!