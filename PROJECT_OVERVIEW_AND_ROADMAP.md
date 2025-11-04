# LMS — Project Overview, Tech Stack, and Roadmap

This document summarizes what’s implemented so far in the LMS project, how it’s structured, and what’s planned next. It also includes the full tech stack (with versions) gathered from the repository.


## 1) Executive Summary

A modern Learning Management System built with Next.js (App Router) featuring multi-role access (Student/Teacher/Admin), secure authentication (NextAuth), PostgreSQL via Prisma, and a comprehensive quiz system. The platform supports user registration, email verification, role-based dashboards, course management, student enrollments, quizzes with scoring/attempt limits, and middleware-based protection.


## 2) Current Capabilities (Implemented)

- Authentication & Authorization
  - Email/password auth with NextAuth Credentials provider
  - OAuth provider scaffolding for Google/GitHub (env-ready and UI flows included)
  - JWT-based sessions, session augmentation with role and user id
  - Role-Based Access Control (RBAC) using centralized `middleware.ts` for Admin/Teacher/Student
  - Protected routes: `/admin`, `/teacher`, `/student` with redirects based on role

- Email & Verification
  - Nodemailer-based email delivery configured via environment variables
  - OTP/verification flows for registration and teacher approvals (see `verify-email/`, `TEACHER_APPROVAL_GUIDE.md`)
  - Template-able sender details and ENV-driven SMTP configuration

- User & Role Flows
  - Registration and login pages
  - Role selection and teacher approval pipeline
  - Post-login redirects by role

- Course & Enrollment
  - Course browsing UI (`app/courses/*`)
  - Client/Server component integration with Suspense (`app/courses/page.tsx` → `courses-client`)
  - Enrollment models and related queries in Prisma schema

- Quiz System
  - Database models for quizzes, questions, attempts (branch name indicates full integration)
  - API scaffolding and server-side scoring patterns ready under `app/api/` (per project scope)
  - Analytics-ready schema for computing per-question and per-quiz results

- Dashboards
  - Student, Teacher, and Admin sections scaffolded under `app/student`, `app/teacher`, and `app/admin`
  - Role-based widgets and pages for quick navigation and data visualization

- UI/UX
  - Tailwind-based design system with Radix UI components
  - Theme support (dark/light) via `next-themes`
  - Reusable UI primitives in `components/ui` and `components/ui2`

- Database, Tooling, and Scripts
  - Prisma schema and migrations under `prisma/`
  - Seed scripts (`prisma/seed.ts` and `seed.js`) and helpers (`check-seed.ts`)
  - DB utility scripts: `start-with-db-check.js`, `setup-cloud-db.js`, `update-neon-connection.js`
  - Setup guides for Neon/PostgreSQL and local environment: `NEON_SETUP.md`, `POSTGRESQL_SETUP.md`, `QUICK_SETUP.md`


## 3) Architecture Overview

- Next.js App Router
  - Server Components for secure reads and SEO
  - Client Components for interactivity and mutations
  - Suspense boundaries to improve perceived performance

- API Layer (Route Handlers)
  - RESTful endpoints under `app/api/*`
  - Consistent error codes (400/401/403/404/409/500 recommended)
  - Input validation with Zod on the server

- Database Layer
  - PostgreSQL with Prisma ORM
  - Normalized schema with relations for Courses, Enrollments, Quizzes, Attempts, and Role-based flows
  - Migrations tracked under `prisma/migrations/*`

- Authentication & RBAC
  - NextAuth configured in `lib/auth.ts`
  - Types augmented in `types/next-auth.d.ts`
  - Centralized access control in `middleware.ts`

- Email/Notifications
  - SMTP via Nodemailer (`lib/email.ts`)
  - ENV-driven configuration for local/production


## 4) Tech Stack (Versions from package.json)

- Core
  - Next.js: 15.4.4
  - React: ^18.3.1, React DOM: ^18.3.1
  - TypeScript: ^5

- Styling & UI
  - Tailwind CSS: ^4.1.13, PostCSS: ^8.5.6, Autoprefixer: ^10.4.21
  - Radix UI (multiple packages for components)
  - class-variance-authority: ^0.7.1, clsx: ^2.1.1
  - next-themes: ^0.4.6

- Forms & Validation
  - react-hook-form: ^7.60.0
  - @hookform/resolvers: ^3.10.0
  - zod: ^4.0.16

- Data & Charts
  - date-fns: 4.1.0
  - recharts: 2.15.4

- Auth
  - next-auth: ^4.24.11
  - @auth/prisma-adapter: ^2.10.0

- Database & ORM
  - Prisma: ^6.14.0 (dev), @prisma/client: ^6.14.0

- Server/Utils
  - axios: ^1.11.0
  - node-fetch: ^3.3.2
  - bcrypt: ^6.0.0 / bcryptjs: ^3.0.2 (choose one in usage)
  - nodemailer: ^6.10.1

- Dev Tooling
  - tsx: ^4.20.6
  - ESLint (via Next.js), Type definitions for Node/React

- Tailwind & Animations
  - tailwind-merge: ^2.5.5
  - tailwindcss-animate: ^1.0.7
  - tw-animate-css: 1.3.3

- Icons & Fonts
  - lucide-react: ^0.454.0
  - geist: ^1.3.1


## 5) Key Files & Folders (Where Things Live)

- App Router & Pages: `app/`
  - Auth flows: `app/login`, `app/register`, `app/verify-email`
  - Role sections: `app/admin`, `app/teacher`, `app/student`
  - Courses: `app/courses/*` with `page.tsx` using `<Suspense>` and a client component
  - APIs: `app/api/*` for server-side endpoints

- Libraries: `lib/`
  - `auth.ts` (NextAuth config)
  - `prisma.ts` (Prisma client singleton)
  - `email.ts` (Nodemailer helpers)
  - `db-utils.ts`, `utils.ts`, `redirects.ts`

- Database & Seeding: `prisma/`
  - `schema.prisma`, `migrations/*`, `seed.ts`, `seed.js`

- Middleware & Types
  - `middleware.ts` (RBAC and public routes)
  - `types/next-auth.d.ts` (type augmentation)

- Components & Hooks
  - `components/` shared UI, admin/role-specific, and theme provider
  - `hooks/useAuth.ts`, `hooks/use-toast.ts`

- Guides & Setup
  - `QUICK_SETUP.md`, `POSTGRESQL_SETUP.md`, `NEON_SETUP.md`, `TEACHER_APPROVAL_GUIDE.md`, `API_DOCUMENTATION.md`, `POSTMAN_TESTING_GUIDE.md`


## 6) Data Model (High-Level)

Typical relations (based on LMS domain and schema organization):

- User (role: ADMIN | TEACHER | STUDENT)
  - Courses (created by Teacher)
  - Enrollments (Student ↔ Course)
  - QuizAttempts, QuestionAttempts (Student assessment)
  - Verification/OTP and Applications (teacher approval)

- Course
  - Quizzes → Questions
  - Enrollments → Progress metrics

- Quiz & Attempts
  - Tracks attempt count, timing, and score computation


## 7) Frontend ↔ Backend Integration

- Secure reads with Server Components where appropriate (avoid exposing sensitive data on the client)
- Mutating actions via API routes under `app/api/*`
- Client Components use `fetch`/`react-hook-form` + toasts for UX feedback
- Suspense used to separate server-fetching boundaries from interactive client UI (`app/courses/page.tsx` → `courses-client`)


## 8) Testing & Quality

- Postman testing guide and auth test scripts in repo
- Seed scripts for generating test data quickly
- Linting via `next lint`, Prisma validation via `prisma generate`
- Database checks: `db:check`, reset: `db:reset`, Studio: `db:studio`


## 9) Deployment & Configuration

- Environment Variables (from `env.example`)
  - Database: `DATABASE_URL`
  - NextAuth: `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
  - Email (SMTP): `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM`, `ADMIN_EMAIL`
  - OAuth (optional): `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`

- Notes
  - Ensure production `.env` values are set on the platform (e.g., Vercel)
  - Run Prisma migrations before first boot on a fresh database
  - For Neon: enable pooling, update connection string via `update-neon-connection.js`


## 10) Roadmap (Planned Enhancements)

- Short Term (Next 1–2 sprints)
  - Harden quiz submission APIs with more question types and full analytics payloads
  - Add rate limiting and stricter input validation on sensitive endpoints
  - Improve dashboards with richer course and student performance widgets
  - Add email templates and resend flows for OTP/approvals

- Medium Term (Quarter)
  - Advanced search and filtering (full-text, multi-field facets, saved filters)
  - Teacher revenue and payout reporting (if within scope)
  - Discussion/comments on courses and quizzes
  - Bulk operations for admins (user/course moderation)

- Long Term
  - AI-powered course recommendations and personalized learning paths
  - Live classes (WebRTC) and real-time interactions
  - Native mobile apps (React Native) with offline content
  - Enterprise features (multi-tenant, SSO, audit logs)
  - Background jobs with a queue for email/analytics at scale


## 11) How to Run Locally (Quick Reference)

1) Install dependencies
2) Configure `.env` from `env.example`
3) Start database (local PostgreSQL or Neon connection)
4) Generate Prisma client & run migrations
5) Seed the database (optional)
6) Start dev server

Scripts from `package.json`:
- `dev`: run Next.js dev server
- `build`: `prisma generate && next build`
- `start`: run production server
- `db:reset`: reset DB with Prisma Migrate
- `db:studio`: open Prisma Studio
- `dev:safe`: start with DB health check (`start-with-db-check.js`)


## 12) Notes & References

- Branch: `feature/comprehensive-quiz-system-deployment-ready`
- Key docs: `API_DOCUMENTATION.md`, `POSTMAN_TESTING_GUIDE.md`, `NEON_SETUP.md`, `POSTGRESQL_SETUP.md`, `TEACHER_APPROVAL_GUIDE.md`, `QUICK_SETUP.md`
- Code highlights: `middleware.ts`, `lib/auth.ts`, `lib/email.ts`, `lib/prisma.ts`, `app/api/*`, `prisma/schema.prisma`

---

This overview is tailored to your current repository. If you want, I can generate a condensed 1–2 page version for submission or create slide-ready sections directly from this document.
