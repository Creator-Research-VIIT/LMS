# Vercel Environment Variables Configuration Guide

## Required Environment Variables for Production

### Authentication
NEXTAUTH_SECRET="your-production-secret-here-use-openssl-rand-base64-32"
NEXTAUTH_URL="https://your-vercel-app-url.vercel.app"

### Database
DATABASE_URL="your-production-database-url-here"

### Email (Gmail SMTP)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
EMAIL_FROM="Your App <your-email@gmail.com>"

### OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

## Vercel Deployment Notes

1. **NEXTAUTH_URL**: MUST match your Vercel deployment URL exactly
   - Development: http://localhost:3000
   - Production: https://your-app-name.vercel.app

2. **NEXTAUTH_SECRET**: Generate a strong secret:
   ```bash
   openssl rand -base64 32
   ```

3. **Database Connection**: Ensure your database accepts connections from Vercel IPs

4. **OAuth Redirect URIs**: Update in Google/GitHub console to match your Vercel URL

## Troubleshooting Login Issues

1. Check Vercel Function Logs for authentication errors
2. Verify DATABASE_URL connection in production
3. Ensure NEXTAUTH_URL matches deployment domain exactly
4. Check that all environment variables are set in Vercel dashboard