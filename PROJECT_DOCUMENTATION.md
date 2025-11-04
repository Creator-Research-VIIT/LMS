# Learning Management System (LMS) - Project Documentation

**Project Name:** LMS  
**Repository:** Creator-Research-VIIT/LMS  
**Current Version:** v1.3.0  
**Last Updated:** October 8, 2025  
**Technology Stack:** Next.js 15, TypeScript, NextAuth.js, Prisma, PostgreSQL, Tailwind CSS  

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features & Capabilities](#-features--capabilities)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Authentication System](#-authentication-system)
- [User Roles & Permissions](#-user-roles--permissions)
- [Development Setup](#-development-setup)
- [Deployment Guide](#-deployment-guide)
- [Testing Procedures](#-testing-procedures)
- [Troubleshooting](#-troubleshooting)
- [Contributing Guidelines](#-contributing-guidelines)

---

## 🎯 Project Overview

### Mission Statement
A comprehensive Learning Management System designed to facilitate online education with role-based access control, course management, and seamless user experience across multiple authentication providers.

### Key Objectives
- **Multi-Role Support:** Admin, Teacher, and Student roles with distinct capabilities
- **Secure Authentication:** Multiple login methods with email verification
- **Course Management:** Teachers can create and manage courses
- **Student Learning:** Enrolled students can access course materials and track progress
- **Modern UI/UX:** Responsive design with dark/light theme support
- **Production Ready:** Deployed on Vercel with PostgreSQL database

### Project Timeline
- **Started:** Initial development phase
- **Current Phase:** Authentication & Dashboard Enhancement
- **Next Phase:** Advanced Course Management & Analytics

---

## ✨ Features & Capabilities

### 👨‍💼 Admin Features
- **User Management:** Approve/reject teacher applications
- **System Oversight:** Monitor all courses and user activities
- **Analytics Dashboard:** View system-wide statistics and metrics
- **Teacher Approval:** Review and approve teacher registrations
- **Course Moderation:** Oversee all courses created by teachers

### 👨‍🏫 Teacher Features
- **Course Creation:** Create courses with titles, descriptions, and content links
- **Course Management:** Edit, update, and manage existing courses
- **Student Analytics:** View enrollment statistics and student progress
- **Approval Status:** Track application approval status
- **Profile Management:** Update personal information and credentials

### 👨‍🎓 Student Features
- **Course Browsing:** Explore available courses and view details
- **Course Enrollment:** Enroll in courses of interest
- **Learning Progress:** Track completion and progress through courses
- **Profile Management:** Update personal learning preferences
- **Course Access:** Access enrolled course materials and resources

### 🔐 Authentication Features
- **Multiple Providers:** Email/Password, Google OAuth, GitHub OAuth
- **Email Verification:** Secure email verification system
- **Role-Based Access:** Automatic redirection based on user roles
- **Secure Sessions:** JWT-based session management
- **Password Security:** Bcrypt encryption for password storage

### 🎨 UI/UX Features
- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **Theme Support:** Dark and light mode toggle
- **Modern Components:** shadcn/ui component library
- **Accessibility:** WCAG compliant design patterns
- **Loading States:** Smooth loading indicators and transitions

---

## 🛠 Technology Stack

### Frontend
- **Framework:** Next.js 15.4.4 (App Router)
- **Language:** TypeScript 5.6.3
- **Styling:** Tailwind CSS 3.4.17
- **UI Components:** shadcn/ui, Radix UI primitives
- **Icons:** Lucide React
- **State Management:** React hooks and context

### Backend
- **Runtime:** Node.js with Next.js API routes
- **Authentication:** NextAuth.js 4.24.10
- **Database ORM:** Prisma 6.1.0
- **Database:** PostgreSQL (Neon Cloud)
- **Email Service:** Gmail SMTP integration
- **Password Hashing:** bcrypt 5.1.1

### Development Tools
- **Package Manager:** pnpm
- **Linting:** ESLint with Next.js configuration
- **Type Checking:** TypeScript strict mode
- **Version Control:** Git with GitHub
- **Deployment:** Vercel with automatic deployments

### External Services
- **Database Hosting:** Neon PostgreSQL
- **Deployment Platform:** Vercel
- **Email Service:** Gmail SMTP
- **OAuth Providers:** Google, GitHub
- **CDN:** Vercel Edge Network

---

## 🏗 Architecture

### Application Structure
```
LMS/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard routes
│   ├── teacher/           # Teacher dashboard routes
│   ├── student/           # Student dashboard routes
│   ├── api/               # API routes and endpoints
│   ├── login/             # Authentication pages
│   └── ...                # Other pages and layouts
├── components/            # Reusable React components
│   ├── ui/                # shadcn/ui components
│   ├── admin/             # Admin-specific components
│   └── ...                # Other component categories
├── lib/                   # Utility libraries
│   ├── auth.ts            # NextAuth configuration
│   ├── prisma.ts          # Database client
│   └── utils.ts           # Helper functions
├── prisma/                # Database schema and migrations
│   ├── schema.prisma      # Database schema definition
│   └── migrations/        # Database migration files
└── types/                 # TypeScript type definitions
```

### Data Flow Architecture
```
[Client] ↔ [Next.js App Router] ↔ [API Routes] ↔ [Prisma ORM] ↔ [PostgreSQL]
    ↕                                   ↕
[NextAuth.js] ← → [JWT Tokens] ← → [Middleware]
```

### Authentication Flow
```
User Login → NextAuth Provider → JWT Creation → Middleware Validation → Role-Based Redirect
```

---

## 🗄 Database Schema

### Core Models

#### User Model
```prisma
model User {
  id              String          @id @default(cuid())
  email           String          @unique
  name            String?
  password        String?
  role            Role            @default(STUDENT)
  approvalStatus  ApprovalStatus  @default(PENDING)
  emailVerified   DateTime?
  image           String?
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt
  
  // Relations
  accounts        Account[]
  sessions        Session[]
  courses         Course[]        // Courses created (for teachers)
  enrollments     Enrollment[]    // Course enrollments (for students)
  
  @@map("users")
}
```

#### Course Model
```prisma
model Course {
  id              String          @id @default(cuid())
  title           String
  description     String?
  thumbnail       String?
  price           Decimal?
  status          CourseStatus    @default(DRAFT)
  approvalStatus  ApprovalStatus  @default(PENDING)
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt
  
  // Relations
  teacher         User            @relation(fields: [teacherId], references: [id])
  teacherId       String
  enrollments     Enrollment[]
  
  @@map("courses")
}
```

#### Enrollment Model
```prisma
model Enrollment {
  id          String      @id @default(cuid())
  enrolledAt  DateTime    @default(now())
  progress    Int         @default(0)
  completed   Boolean     @default(false)
  
  // Relations
  student     User        @relation(fields: [studentId], references: [id])
  studentId   String
  course      Course      @relation(fields: [courseId], references: [id])
  courseId    String
  
  @@unique([studentId, courseId])
  @@map("enrollments")
}
```

### Enums
```prisma
enum Role {
  ADMIN
  TEACHER
  STUDENT
}

enum ApprovalStatus {
  PENDING
  APPROVED
  REJECTED
}

enum CourseStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

---

## 🔌 API Documentation

### Authentication Endpoints

#### POST `/api/register`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "TEACHER"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "user": {
    "id": "user_id",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "TEACHER"
  }
}
```

#### POST `/api/auth/verify-email`
Verify user email address.

**Request Body:**
```json
{
  "token": "verification_token"
}
```

### Course Management Endpoints

#### GET `/api/courses`
Get all published courses (public access).

**Response:**
```json
{
  "success": true,
  "courses": [
    {
      "id": "course_id",
      "title": "Full Stack Development",
      "description": "Complete web development course",
      "thumbnail": "https://example.com/image.jpg",
      "price": 99.99,
      "teacher": {
        "name": "Jane Smith"
      }
    }
  ]
}
```

#### POST `/api/courses`
Create a new course (Teacher only).

**Request Body:**
```json
{
  "title": "Full Stack Development",
  "description": "Complete web development course covering HTML, CSS, JS, React, Node.js",
  "thumbnail": "https://youtube.com/playlist?list=...",
  "price": 0
}
```

#### GET `/api/courses/teacher`
Get courses created by the authenticated teacher.

**Response:**
```json
{
  "success": true,
  "courses": [
    {
      "id": "course_id",
      "title": "My Course",
      "approvalStatus": "APPROVED",
      "enrollmentCount": 25,
      "createdAt": "2025-10-08T10:00:00Z"
    }
  ]
}
```

### Admin Endpoints

#### GET `/api/teachers`
Get all teacher applications (Admin only).

**Response:**
```json
{
  "success": true,
  "teachers": [
    {
      "id": "teacher_id",
      "name": "John Doe",
      "email": "john@example.com",
      "approvalStatus": "PENDING",
      "createdAt": "2025-10-08T10:00:00Z"
    }
  ]
}
```

#### POST `/api/teachers/approve`
Approve or reject teacher application (Admin only).

**Request Body:**
```json
{
  "teacherId": "teacher_id",
  "action": "approve" // or "reject"
}
```

### Debug Endpoints

#### GET `/api/auth/debug`
Get authentication status and user information.

#### GET `/api/debug-middleware`
Debug middleware token validation and routing.

---

## 🔐 Authentication System

### NextAuth.js Configuration

#### Providers Configured
1. **Credentials Provider:** Email/password authentication
2. **Google OAuth:** Google account integration
3. **GitHub OAuth:** GitHub account integration

#### JWT Strategy
- **Token Storage:** Secure HTTP-only cookies
- **Token Content:** User ID, email, role, approval status
- **Token Expiration:** Configurable session timeout
- **Token Refresh:** Automatic refresh handling

#### Session Management
- **Session Strategy:** JWT-based sessions
- **Session Callbacks:** Role and approval status injection
- **Session Persistence:** Cross-tab synchronization

### Security Features

#### Password Security
- **Hashing:** bcrypt with salt rounds
- **Validation:** Minimum complexity requirements
- **Storage:** Never store plain text passwords

#### Email Verification
- **Token Generation:** Cryptographically secure tokens
- **Token Expiration:** Time-limited verification
- **Single Use:** Tokens invalidated after use

#### Role-Based Access Control
- **Middleware Protection:** Route-level access control
- **API Protection:** Endpoint-level role validation
- **Frontend Guards:** Component-level access control

---

## 👥 User Roles & Permissions

### Admin Role
**Capabilities:**
- ✅ Access admin dashboard
- ✅ View all users and courses
- ✅ Approve/reject teacher applications
- ✅ Moderate course content
- ✅ View system analytics
- ✅ Manage user accounts

**Restricted Access:**
- ❌ Cannot create courses directly
- ❌ Cannot enroll in courses as student

### Teacher Role
**Capabilities:**
- ✅ Access teacher dashboard
- ✅ Create and manage courses
- ✅ View student enrollments
- ✅ Track course analytics
- ✅ Update course content

**Restricted Access:**
- ❌ Cannot access admin functions
- ❌ Cannot approve other teachers
- ❌ Course creation requires admin approval

### Student Role
**Capabilities:**
- ✅ Browse available courses
- ✅ Enroll in courses
- ✅ Access course materials
- ✅ Track learning progress
- ✅ Update profile information

**Restricted Access:**
- ❌ Cannot create courses
- ❌ Cannot access teacher/admin dashboards
- ❌ Cannot view other students' progress

---

## 🚀 Development Setup

### Prerequisites
- **Node.js:** Version 18.0 or higher
- **pnpm:** Package manager (recommended)
- **PostgreSQL:** Database (local or cloud)
- **Git:** Version control

### Environment Variables
Create a `.env` file with the following variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/lms_db"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
EMAIL_FROM="your-email@gmail.com"
```

### Installation Steps

1. **Clone Repository:**
```bash
git clone https://github.com/Creator-Research-VIIT/LMS.git
cd LMS
```

2. **Install Dependencies:**
```bash
pnpm install
```

3. **Database Setup:**
```bash
# Generate Prisma client
pnpm prisma generate

# Run database migrations
pnpm prisma migrate dev

# Seed database (optional)
pnpm prisma db seed
```

4. **Start Development Server:**
```bash
pnpm dev
```

5. **Access Application:**
- Open http://localhost:3000
- Create admin account for initial setup

### Development Commands

```bash
# Development
pnpm dev                    # Start development server
pnpm build                  # Build for production
pnpm start                  # Start production server
pnpm lint                   # Run ESLint

# Database
pnpm prisma studio          # Open Prisma Studio
pnpm prisma migrate dev     # Create and apply migration
pnpm prisma generate        # Generate Prisma client
pnpm prisma db push         # Push schema changes

# Testing
pnpm test                   # Run test suite (when available)
```

---

## 🌐 Deployment Guide

### Vercel Deployment

#### Prerequisites
- Vercel account
- GitHub repository connected
- Neon PostgreSQL database

#### Environment Variables (Production)
Add these to Vercel environment variables:

```bash
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="production-secret-key"
NEXTAUTH_URL="https://your-app.vercel.app"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="..."
SMTP_PASS="..."
EMAIL_FROM="..."
```

#### Deployment Steps

1. **Connect Repository:**
   - Link GitHub repository to Vercel
   - Configure build settings (Next.js preset)

2. **Set Environment Variables:**
   - Add all required environment variables
   - Ensure NEXTAUTH_URL matches deployment URL

3. **Database Migration:**
   - Run migrations in production environment
   - Seed initial admin user if needed

4. **Deploy:**
   - Push to main branch for automatic deployment
   - Monitor deployment logs for issues

#### Post-Deployment Verification

- [ ] Authentication flows work correctly
- [ ] Database connections are stable
- [ ] Email verification is functional
- [ ] All user roles can access their dashboards
- [ ] OAuth providers are working
- [ ] HTTPS certificates are valid

### Manual Deployment (Alternative)

For other platforms (Railway, DigitalOcean, etc.):

1. **Build Application:**
```bash
pnpm build
```

2. **Set Environment Variables:**
   - Configure all required variables on platform

3. **Database Setup:**
   - Run migrations: `pnpm prisma migrate deploy`
   - Generate client: `pnpm prisma generate`

4. **Start Production Server:**
```bash
pnpm start
```

---

## 🧪 Testing Procedures

### Manual Testing Checklist

#### Authentication Testing
- [ ] **Registration Flow:**
  - [ ] Email/password registration
  - [ ] Email verification process
  - [ ] Role selection works correctly
  - [ ] Duplicate email handling

- [ ] **Login Flow:**
  - [ ] Email/password login
  - [ ] Google OAuth login
  - [ ] GitHub OAuth login
  - [ ] Remember me functionality
  - [ ] Invalid credentials handling

- [ ] **Role-Based Access:**
  - [ ] Admin redirects to `/admin`
  - [ ] Teacher redirects to `/teacher`
  - [ ] Student redirects to `/student`
  - [ ] Unauthorized access blocked

#### Course Management Testing
- [ ] **Teacher Functions:**
  - [ ] Course creation form
  - [ ] Course listing and management
  - [ ] Course editing capabilities
  - [ ] Course approval workflow

- [ ] **Student Functions:**
  - [ ] Course browsing
  - [ ] Course enrollment
  - [ ] Access to enrolled courses
  - [ ] Progress tracking

- [ ] **Admin Functions:**
  - [ ] Teacher approval process
  - [ ] Course moderation
  - [ ] User management
  - [ ] System analytics

#### UI/UX Testing
- [ ] **Responsive Design:**
  - [ ] Mobile devices (320px+)
  - [ ] Tablet devices (768px+)
  - [ ] Desktop devices (1024px+)

- [ ] **Theme Support:**
  - [ ] Light theme functionality
  - [ ] Dark theme functionality
  - [ ] Theme persistence

- [ ] **Accessibility:**
  - [ ] Keyboard navigation
  - [ ] Screen reader compatibility
  - [ ] Color contrast compliance

### Performance Testing
- [ ] **Page Load Times:**
  - [ ] Homepage < 2 seconds
  - [ ] Dashboard pages < 3 seconds
  - [ ] API responses < 1 second

- [ ] **Database Performance:**
  - [ ] Query optimization
  - [ ] Connection pooling
  - [ ] Migration performance

### Security Testing
- [ ] **Authentication Security:**
  - [ ] JWT token validation
  - [ ] Session security
  - [ ] Password hashing
  - [ ] OAuth integration security

- [ ] **Authorization Testing:**
  - [ ] Role-based access control
  - [ ] API endpoint protection
  - [ ] Middleware security

---

## 🔧 Troubleshooting

### Common Issues

#### Authentication Issues

**Problem:** "Redirect loop on login"
**Solution:** 
1. Check middleware `publicRoutes` includes dashboard routes
2. Verify NEXTAUTH_URL matches deployment URL
3. Clear browser cookies and session storage

**Problem:** "OAuth login fails"
**Solution:**
1. Verify OAuth client IDs and secrets
2. Check redirect URLs in OAuth provider settings
3. Ensure NEXTAUTH_URL is correctly configured

#### Database Issues

**Problem:** "Database connection failed"
**Solution:**
1. Verify DATABASE_URL format and credentials
2. Check database server availability
3. Ensure Prisma client is generated

**Problem:** "Migration errors"
**Solution:**
1. Check for schema conflicts
2. Reset database if in development
3. Run migrations step by step

#### Deployment Issues

**Problem:** "Build fails on Vercel"
**Solution:**
1. Check TypeScript errors locally
2. Verify all dependencies are listed
3. Check build logs for specific errors

**Problem:** "Environment variables not working"
**Solution:**
1. Verify variable names match exactly
2. Check variable visibility (build vs runtime)
3. Restart deployment after changes

### Debug Tools

#### Development Debugging
```bash
# Enable debug mode
DEBUG=* pnpm dev

# Check database connection
pnpm prisma studio

# Verify environment variables
node -e "console.log(process.env)"
```

#### Production Debugging
- Use `/api/auth/debug` endpoint for auth status
- Use `/api/debug-middleware` for middleware issues
- Check Vercel deployment logs
- Monitor database query logs

### Getting Help

1. **Check Documentation:** Review this guide and API docs
2. **Search Issues:** Look through GitHub issues
3. **Create Issue:** Submit detailed bug report
4. **Contact Team:** Reach out to development team

---

## 🤝 Contributing Guidelines

### Development Workflow

1. **Fork Repository:**
   - Create personal fork of the repository
   - Clone fork to local development environment

2. **Create Feature Branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes:**
   - Follow existing code style and patterns
   - Add tests for new functionality
   - Update documentation as needed

4. **Test Changes:**
   - Run full test suite
   - Test in development environment
   - Verify no breaking changes

5. **Submit Pull Request:**
   - Create detailed PR description
   - Reference related issues
   - Request code review

### Code Standards

#### TypeScript Standards
- Use strict TypeScript configuration
- Define proper types for all functions
- Avoid `any` type usage
- Use meaningful variable names

#### React Standards
- Use functional components with hooks
- Implement proper error boundaries
- Follow React best practices
- Use TypeScript for prop definitions

#### Database Standards
- Use Prisma schema best practices
- Create proper migrations
- Maintain referential integrity
- Document schema changes

### Documentation Requirements

#### Code Documentation
- Comment complex business logic
- Document API endpoints
- Explain configuration options
- Provide usage examples

#### Update Requirements
- Update README for new features
- Update API documentation
- Update troubleshooting guide
- Update version changelog

---

## 📚 Additional Resources

### External Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Guide](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Internal Resources
- [Authentication Deployment Report](./AUTHENTICATION_DEPLOYMENT_REPORT.md)
- [Upgrade Log](./UPGRADE_LOG.md)
- [API Testing Guide](./POSTMAN_TESTING_GUIDE.md)
- [Database Setup Guide](./NEON_SETUP.md)

### Community
- GitHub Issues: Report bugs and request features
- Discussions: Ask questions and share ideas
- Wiki: Community-maintained documentation

---

**Document Version:** 1.0  
**Last Updated:** October 8, 2025  
**Next Review:** After major feature additions  
**Maintained By:** Development Team