## 401 Error on Student Dashboard API Calls - Troubleshooting Guide

### Problem
After deployment, the student dashboard shows 401 errors when calling:
- `/api/student/stats`
- `/api/student/assignments`
- `/api/student/courses`
- `/api/student/notifications`

Even though the user IS authenticated (they can see the student page).

### Root Cause
Session/authentication token is not being passed from the browser to these API endpoints. This happens when:

1. **NEXTAUTH_SECRET is not set in production** - Sessions cannot be verified
2. **NEXTAUTH_SECRET differs between builds** - New builds can't read old sessions
3. **Cookie settings are too strict** - Cookies aren't being sent with API requests
4. **Build-time environment variables** - NextAuth credentials not properly configured

### Solution

#### Step 1: Verify NEXTAUTH_SECRET is Set
```bash
# Check if NEXTAUTH_SECRET is in your production environment
# For Vercel: Settings > Environment Variables
# For Docker/VPS: Check .env or environment variables
```

**Critical**: `NEXTAUTH_SECRET` should be a random string (generated once and never changed):
```bash
# Generate if needed:
openssl rand -base64 32
```

#### Step 2: Check Environment Variables
Ensure these are set in production:
```
NEXTAUTH_SECRET=<your-secret>
NEXTAUTH_URL=<your-deployment-url>  # e.g., https://lms.example.com
GOOGLE_CLIENT_ID=<value>
GOOGLE_CLIENT_SECRET=<value>
GITHUB_CLIENT_ID=<value>
GITHUB_CLIENT_SECRET=<value>
DATABASE_URL=<your-database-connection>
NEXT_PUBLIC_API_URL=<your-api-url>  # if needed
```

#### Step 3: Verify in Deployment
Visit this diagnostic endpoint on your deployed instance:
```
https://your-deployment.com/api/diag/auth-session
```

**Expected output if working:**
```json
{
  "sessionExists": true,
  "sessionData": {
    "user": {
      "id": "...",
      "email": "...",
      "role": "STUDENT"
    }
  }
}
```

**If showing false:**
```json
{
  "sessionExists": false,
  "message": "❌ No session - check NEXTAUTH_SECRET and cookie settings"
}
```

#### Step 4: Force Rebuild and Redeploy
After setting environment variables:
1. Trigger a new deployment (don't use cached build)
2. Clear browser cookies
3. Log out and log back in
4. Test the API calls

### For Vercel Deployment
1. Go to Project Settings > Environment Variables
2. Add/update `NEXTAUTH_SECRET` 
3. Go to Deployments, redeploy (or push to git to trigger)
4. Clear deployment cache if available
5. Wait for rebuild to complete

### For Manual Deployment (Docker/VPS)
1. Update `.env` file with correct `NEXTAUTH_SECRET`
2. Restart the application
3. Clear any browser cookies
4. Test

### Quick Test
After fixing, test in browser console:
```javascript
fetch('/api/diag/auth-session')
  .then(r => r.json())
  .then(d => console.log(d));
```

Should show `"sessionExists": true` if fixed.

---
**Note**: After confirming this is fixed, remove/disable the `/api/diag/auth-session` endpoint for security.
