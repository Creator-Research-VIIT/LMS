# Slide — Innovative Solutions / Problem Solving (Repo-Accurate)

These challenges and solutions reflect the actual tech and code in this LMS project (Next.js App Router, NextAuth, Prisma + PostgreSQL/Neon, Nodemailer, middleware-based RBAC). Copy this slide into your main PPT.

---

## Challenge 1: OTP/Email delivery failing in production (Vercel)

- Symptom: OTP emails work locally but fail or time out in production.
- Root causes:
  - Missing/incorrect SMTP env vars on Vercel
  - Tight SMTP timeouts or TLS mismatch
  - Gmail App Password/2FA not configured
- Solution:
  - Hardened Nodemailer transporter with TLS + generous timeouts, clear logging
  - Verified envs (`EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM`)
  - Documented deployment steps and `.env` alignment
- Where in repo:
  - `lib/email.ts` (transporter + send logic)
  - `env.example`, `setup-env.js`
  - Guides: `QUICK_SETUP.md`, `POSTMAN_TESTING_GUIDE.md`

---

## Challenge 2: Centralized RBAC across App Router routes

- Symptom: Scattered role checks causing inconsistent access and redirects for Admin/Teacher/Student.
- Root causes:
  - Mixed client/server checks
  - No single source of truth for public vs protected routes
- Solution:
  - Centralized `middleware.ts` with public route allowlist and role-guarded segments
  - NextAuth JWT augmented with `role` and `id`; typed via `types/next-auth.d.ts`
  - Post-login redirects by role (admin → `/admin`, etc.)
- Where in repo:
  - `middleware.ts`, `lib/auth.ts`, `types/next-auth.d.ts`

---

## Challenge 3: Prisma performance (N+1, slow joins, large lists)

- Symptom: Slow course/enrollment/quiz queries and analytics joins.
- Root causes:
  - N+1 query patterns, unindexed columns, over-fetching
- Solution:
  - Replace loops with `include/select` queries; strict projection
  - Add indexes and composites in Prisma schema; unique constraints for integrity
  - Pagination with `take/skip/orderBy` and transactions for multi-step writes
  - Neon PostgreSQL with pooling for stable connections
- Where in repo:
  - `prisma/schema.prisma`, `prisma/migrations/*`, `lib/prisma.ts`
  - Setup docs/scripts: `NEON_SETUP.md`, `POSTGRESQL_SETUP.md`, `update-neon-connection.js`

---

## Challenge 4: Consistent quiz scoring and attempt control

- Symptom: Mixed question types, time windows, and attempt limits led to edge-case bugs.
- Root causes:
  - Scoring scattered client-side; weak server enforcement
- Solution:
  - Server-side scoring in API: persist `QuizAttempt` + `QuestionAttempt` and compute breakdown atomically
  - Enforce time and max-attempts before write; return typed analytics payload
- Where in repo:
  - `prisma/schema.prisma` (Quiz, Question, QuizAttempt, QuestionAttempt)
  - `app/api/quizzes/*` (handlers), analytics helpers (if present)

---

## Challenge 5: Server/Client component boundaries and UX loading states

- Symptom: Data leakage risks when fetching from client; clunky loading UX.
- Root causes:
  - Over-fetching on client for protected reads; ad-hoc loading states
- Solution:
  - Use Server Components for secure reads; Client Components for mutations
  - Suspense boundaries with spinners; optimistic updates + toasts for actions
- Where in repo:
  - `app/courses/page.tsx` (Suspense + client handoff)
  - `hooks/use-toast.ts`, components under `components/ui`/`ui2`

---

## Challenge 6: OAuth redirect mismatches across envs

- Symptom: OAuth works locally but fails on deployment (callback URL errors).
- Root causes:
  - `NEXTAUTH_URL` mismatch; provider console misconfiguration
- Solution:
  - Parameterized envs per environment; verified provider callbacks
  - Consolidated callback handling in `lib/auth.ts`
- Where in repo:
  - `lib/auth.ts`, `env.example`, environment setup guides

---

## Challenge 7: Migration/seed drift between local and Neon

- Symptom: Drift when switching between local DB and Neon; missing data for tests.
- Root causes:
  - Unapplied migrations; stale seed scripts; changed URLs
- Solution:
  - Consistent `prisma migrate` workflow; robust seeders (`seed.ts`) with idempotent guards
  - Helper scripts for env/DB checks before start
- Where in repo:
  - `prisma/migrations/*`, `prisma/seed.ts|seed.js`
  - `start-with-db-check.js`, `setup-cloud-db.js`, `update-neon-connection.js`

---

## Challenge 8: Safe public routes for verification and auth flows

- Symptom: Lockouts or bypasses when verify/login/register routes were misclassified.
- Root causes:
  - Overly broad protection in middleware; missing public allowlist
- Solution:
  - Explicit public routes (`/login`, `/register`, `/verify-email`, `/api/auth/*`) and strict token checks server-side
- Where in repo:
  - `middleware.ts`, `app/api/auth/*`, `app/verify-email/*`

---

### Presenter Notes

- Keep the focus on input/output contracts and where the logic lives.
- Reference file paths to show production readiness and traceability.
- Emphasize server-side enforcement for auth, scoring, and data integrity.
