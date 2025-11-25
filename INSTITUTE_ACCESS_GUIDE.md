# Institute Access Guide

This guide explains how to reach the Institute Portal and how to set up institute-only access so that only users with approved institute email domains can register, sign in, and use institute pages.

## Who can access

- When institute mode is enabled, only emails from the allowed domains (for example, `@college.edu`) can:
  - Register new accounts
  - Sign in (Credentials and OAuth)
  - Access the Institute Portal (`/institute`) and institute APIs
- Admin users are always allowed (bypass the domain check).

## Where is the Institute Portal?

- Direct URL: `/institute`
  - Example (local): `http://localhost:3000/institute`
  - If you are not signed in, you will be redirected to `/login` first.
  - If institute mode is enabled and your email domain is not allowed, you will be redirected back to `/login?error=instituteAccess`.

## Enable institute-only mode

1) Set environment variables (local `.env` or Vercel Project Settings → Environment Variables):

```
INSTITUTE_ACCESS_ENABLED=true
INSTITUTE_ALLOWED_DOMAINS=college.edu,eduinstitute.edu
```

- `INSTITUTE_ACCESS_ENABLED` toggles the feature on/off.
- `INSTITUTE_ALLOWED_DOMAINS` is a comma-separated list of domains without `@`.
- See `env.example` for a reference.

2) Restart the app after changing environment variables so changes take effect.

## How institute members register

- Share these two links with your institute community:
  - Sign up: `/signup` (or `/register` if you prefer that flow)
  - Portal: `/institute`
- Steps for a student/teacher:
  1. Go to `/signup` and fill in name, email, password, and role.
  2. Use your institute email (for example, `user@college.edu`).
  3. Submit. If institute-only mode is enabled and your domain is allowed, registration will succeed and an email OTP is sent.
  4. Enter the OTP on the verification page to verify your email.
  5. After verification, sign in and you’ll be able to access `/institute`.

Notes:
- Teachers may require admin approval depending on the project’s approval workflow (role `TEACHER` starts as `pending`).
- Non-institute emails are blocked from registering when institute mode is enabled.

## Signing in

- Credentials login is allowed only for approved institute domains (admins bypass).
- OAuth (Google/GitHub):
  - Existing users: allowed only if their stored email domain is on the allowlist (admins bypass).
  - New users: blocked if their OAuth email domain is not allowed.

## Email verification (OTP)

- After registration, a 6-digit OTP is emailed to the user.
- OTP must be entered on the verification page to complete email verification.
- If the code expires or is lost, use the "resend verification" option.

## Troubleshooting

- "Access restricted to institute members" (or `/login?error=instituteAccess`)
  - Ensure `INSTITUTE_ACCESS_ENABLED=true` and `INSTITUTE_ALLOWED_DOMAINS` includes the email’s domain (e.g., `college.edu`).
  - Remove the `@` in domain entries; use `college.edu`, not `@college.edu`.
  - Restart the app after changing envs.

- OTP email not arriving
  - Verify SMTP envs (EMAIL_HOST/PORT/USER/PASS/FROM) and that your email service permits SMTP.
  - In production, check your host’s logs for mail delivery errors.

- Admin access required
  - Admins are always allowed regardless of domain; assign the `ADMIN` role via the database or your admin tools.

## Disabling institute-only mode

- Set `INSTITUTE_ACCESS_ENABLED=false` (or remove it) and restart the app.
- Registration and login will be open to any email domain (subject to other checks like OTP verification, teacher approval, etc.).

## Optional: Institute-specific courses

- By default, the Institute Portal shows general course info. If you want courses to be strictly tied to a specific institute, you can:
  - Add an `instituteDomain` (or `instituteId`) field to the `Course` model.
  - Filter institute pages/APIs by that field to show only relevant courses.
  - If you’d like, ask for a ready-to-apply schema change and filters.

---

If you need help setting the env vars on Vercel or tailoring the portal to a specific institute’s branding/content, let me know and I’ll wire it up.
