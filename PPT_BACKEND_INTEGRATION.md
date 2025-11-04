# 🎓 LMS Backend & Integration – PPT Content (Markdown)

This file provides slide-by-slide content focused on the backend architecture and frontend–backend integration of your LMS project. It’s structured for direct conversion into slides.

---

## Slide 1 — Title & Scope

### LMS: Backend Architecture and Integration Deep Dive

- Focus: Backend services, data modeling, authentication/authorization, API contracts, performance, and how the frontend integrates with backend.
- Codebase context:
  - Framework: Next.js (App Router)
  - ORM/DB: Prisma + PostgreSQL (Neon suggested)
  - Auth: NextAuth
  - Mail: Nodemailer
  - Repo paths used here: `prisma/schema.prisma`, `lib/prisma.ts`, `lib/auth.ts`, `lib/email.ts`, `middleware.ts`, `app/api/*`, `types/next-auth.d.ts`.

---

## Slide 2 — High-Level System Architecture

### Components & Data Flow

- Client UI (Next.js App Router)
- API Layer (Next.js route handlers under `app/api`)
- Auth Layer (NextAuth: credentials + OAuth ready)
- Database Layer (PostgreSQL via Prisma)
- Email Service (Nodemailer for OTP/notifications)
- Middleware (role-based guards in `middleware.ts`)

Data path examples:
- UI → `fetch('/api/courses')` → Route Handler → Prisma Client → PostgreSQL → JSON Response
- UI → Login → NextAuth callbacks → JWT/session propagation → Middleware checks by role
- Registration → Email OTP → Verification → Activate account

---

## Slide 3 — Database Modeling (Prisma + PostgreSQL)

### Core Entities (Representative)

- Users and Auth:
  - `User`, `Account`, `Session`, `VerificationToken` (NextAuth compatibility)
- Learning Domain:
  - `Course`, `Enrollment`, `Quiz`, `Question`, `QuizAttempt`, `QuestionAttempt`
- Operations/Workflow:
  - `TeacherApplication` (pending/approved), `EmailVerification/OTP` if modeled

Design notes:
- Normalized relations, foreign keys, and cascading rules.
- Composite unique constraints where applicable (e.g., one enrollment per student per course).
- Indexes for frequent filters (e.g., `courseId`, `teacherId`, `status`).

Migrations:
- Versioned under `prisma/migrations/` ensuring reproducible schema updates.

---

## Slide 4 — Prisma Usage & Data Access Layer

### Contracts and Error Modes

- Input: Validated DTOs from API handlers
- Actions: `findMany`, `findUnique`, `create`, `update`, `delete`, `aggregate`
- Errors: Unique constraint violations, FK errors, timeouts, null/empty sets
- Success Criteria: Correct type-safe results, minimal round-trips, no N+1

Code patterns (representative):
- Centralized client: `lib/prisma.ts` exports singleton PrismaClient
- Query shape: narrow `select/include` to avoid over-fetch
- Transactions: `prisma.$transaction([...])` for multi-step updates
- Pagination: `take/skip/orderBy` with stable cursors for large lists

---

## Slide 5 — Authentication & Authorization

### NextAuth Integration (Backend)

- Providers: Credentials ready; OAuth (Google/GitHub) can be enabled
- Callbacks: Extend JWT/session with `role` and `userId`
- Sessions: JWT-based by default; secure cookies in production
- Types: `types/next-auth.d.ts` augments `Session` and `JWT` for role typing

### Role-Based Access

- `middleware.ts` guards route segments: `/admin`, `/teacher`, `/student`
- Public vs protected routes list for bypass
- Redirects based on role after login

Contract:
- Input: Credentials or OAuth code
- Output: Auth cookies/JWT; session includes `{ user: { id, role, ... } }`
- Errors: Invalid credentials, unverified email, insufficient role

---

## Slide 6 — Email & OTP Verification Flow

### Backend Flow

1) Register user → create user record (status: pending/needs_verification)
2) Generate OTP/token → store (DB) with expiry
3) Send email via `lib/email.ts` (Nodemailer)
4) User submits OTP → verify token & expiry → activate account

Operational notes:
- SMTP configuration via env (see Slide 12)
- Timeouts/retry strategy for production SMTP
- Template-based emails with text fallback

Edge cases:
- Expired OTP → issue new OTP
- Multiple requests → last token wins
- Delivery failures → log & expose safe error

---

## Slide 7 — API Design (Route Handlers)

### Structure

- Pathing under `app/api/*`: cohesive resources, REST-style operations
- Methods: GET (read), POST (create), PATCH/PUT (update), DELETE (delete)
- AuthZ: Guard at handler top; fail fast for non-permitted roles

Example Contracts (illustrative):
- `GET /api/courses`
  - Query: `?q=string&category=...&page=...&limit=...`
  - Response: `{ data: Course[], page, total }`
- `POST /api/courses`
  - Body: `{ title, description, price, category, ... }`
  - Auth: Teacher/Admin
  - Response: `{ id, ...course }`
- `POST /api/quizzes/:id/submit`
  - Body: `{ answers: { questionId, value }[] }`
  - Validates attempt limits and time windows
  - Response: `{ score, max, percentage, breakdown }`

Error conventions:
- 400 invalid input, 401 unauthenticated, 403 unauthorized, 404 not found, 409 conflict, 500 server
- JSON error envelope: `{ error: { code, message } }`

---

## Slide 8 — Quiz Engine (Backend Services)

### Core Logic

- Question types: MCQ, True/False, Short text (extensible)
- Scoring:
  - Per-question points, correctness evaluation
  - Weighted scoring support
- Attempts:
  - Max attempts, cool-downs, timestamps
  - Server-side timing enforcement

Data workflow:
- Load quiz + questions (ordered)
- Validate answers → compute correctness
- Persist `QuizAttempt` + `QuestionAttempt`
- Compute aggregates and return analytics payload

Edge cases:
- Late submissions → reject by policy
- Partial saves (network drop) → resume tokens
- Content updates mid-attempt → lock quiz revision

---

## Slide 9 — Performance & Reliability

### Database & Queries

- Index frequently filtered columns
- Avoid N+1 via `include/select`
- Use transactions for multi-record updates
- Pagination + stable ordering for lists

### Connection/Infra

- Neon PostgreSQL with pooling recommended
- Efficient PrismaClient usage to avoid cold-start overhead

### API & Runtime

- Validate inputs early; short-circuit failures
- Stream large lists or use incremental rendering where applicable
- Log slow queries; instrument key paths

Success metrics:
- Latency p95 under target, error rate low, DB CPU/IO within budget

---

## Slide 10 — Frontend ↔ Backend Integration Patterns

### In App Router

- Server Components (SC):
  - May fetch data directly (server-only) or via route handlers
  - Good for SEO-important resources and secure data reads
- Client Components (CC):
  - Use `fetch('/api/...')` or `useEffect` for interactions
  - Optimistic UI with toasts via `hooks/use-toast.ts`

Example (from `app/courses/page.tsx`):
- Server boundary uses `<Suspense>` to wrap `CoursesPageClient`
- Client component performs data fetching from `/api/courses` and renders UI

Integration tips:
- Keep mutations in CC via API routes
- Prefer SC for protected reads when possible (no client exposure)
- Co-locate minimal data fetching with the component that needs it

---

## Slide 11 — Security, Validation, and Middleware

### Security Layers

- Middleware role checks in `middleware.ts`
- Auth checks at handler-level (defense in depth)
- Strict cookie settings in production
- Sanitize all user inputs and HTML

### Validation

- Enforce required fields, types, and boundaries
- Server-side validation is authoritative; client validation is UX

### Logging & Observability

- Log auth events, errors, and external service failures
- Correlate request IDs across logs when practical

---

## Slide 12 — Configuration & Deployment

### Environment Variables (representative)

- App/Auth:
  - `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
- Database:
  - `DATABASE_URL` (Neon connection string)
- Email SMTP:
  - `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM`

Deployment notes:
- Use `.env.example` as reference; don’t commit secrets
- Ensure production SMTP works (timeouts, TLS)
- Run Prisma migrations before first boot in new env
- Health checks and rollbacks via platform tooling (e.g., Vercel)

---

## Slide 13 — Testing & Tooling

### What to Test

- Auth flows: registration, login, OTP, role redirects
- API endpoints: input validation, status codes, error shapes
- Quiz: scoring correctness, attempt limits, timing
- Courses: CRUD, filtering, pagination

Repo helpers:
- Postman/guide files: `POSTMAN_TESTING_GUIDE.md`
- Auth test scripts: `test-auth*.js`, `test-register.js`
- Seeders: `prisma/seed.ts` (and `seed.js`) for test data

---

## Slide 14 — Contracts Snapshot (Quick Copy)

### Example: Create Course

- Input (POST `/api/courses`):
  - `{ title: string; description: string; price?: number; category?: string; imageUrl?: string; }`
- Output:
  - `201` `{ id: string; title; description; ... }`
- Errors:
  - `400` invalid data, `401/403` auth failures, `409` duplicate

### Example: Submit Quiz

- Input (POST `/api/quizzes/:id/submit`):
  - `{ answers: { questionId: string; value: string | string[] | boolean }[] }`
- Output:
  - `{ score: number; max: number; percentage: number; breakdown: { questionId; isCorrect; earned; possible }[] }`
- Errors:
  - `400` malformed, `403` limit exceeded, `409` out-of-window, `404` not found

---

## Slide 15 — Risks, Edge Cases, and Next Steps

Risks & Mitigations:
- Email deliverability in production → strong SMTP config, retries, logging
- Race conditions on attempts → use transactions + row-level checks
- N+1 regressions → code review checklists, include/select policies
- Secret leakage → environment management, CI scanning

Next steps:
- Add rate limiting per IP/user for sensitive endpoints
- Introduce background jobs for email/analytics (queue)
- Extend question types and randomized banks
- Add E2E tests for core flows

---

## Slide 16 — Appendix: File Map (Backend Relevant)

- `prisma/schema.prisma` — Schema & relations
- `prisma/migrations/*` — Versioned DDL changes
- `lib/prisma.ts` — Prisma client singleton
- `lib/auth.ts` — NextAuth configuration & callbacks
- `lib/email.ts` — Nodemailer transporters & templates
- `middleware.ts` — RBAC route guards
- `app/api/*` — API route handlers (REST)
- `types/next-auth.d.ts` — Session/JWT type augmentation

---

## Presenter Notes (Optional)

- Keep emphasis on contracts: inputs, outputs, error codes
- Mention concrete repo files to build credibility
- Use the `courses` page Suspense integration as a simple FE→BE example
- Highlight OTP + RBAC + quiz scoring as “hard” systems you solved

---

## How to Use

- Convert this markdown to slides (PowerPoint/Google Slides/Marp) and customize placeholders where needed.
- Replace any bracketed placeholders with your details if you add them.
- You can also merge selected slides into your broader presentation as a backend-focused section.
