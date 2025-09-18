# Email Configuration Setup Guide

To enable actual email sending for OTP verification, you need to configure email settings in your `.env.local` file.

## Gmail Setup (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Navigate to Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Add to `.env.local`**:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_FROM="LearnHub <your-gmail@gmail.com>"
```

## Other Email Providers

### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
EMAIL_FROM="LearnHub <your-email@outlook.com>"
```

### Custom SMTP
```env
EMAIL_HOST=your-smtp-host.com
EMAIL_PORT=587
EMAIL_USER=your-username
EMAIL_PASS=your-password
EMAIL_FROM="LearnHub <noreply@yourcompany.com>"
```

## Development Mode

If no email configuration is provided, the system will:
- Log OTP codes to the console
- Still function normally for development
- Show a warning about missing email configuration

## Testing Email Setup

1. Add your email configuration to `.env.local`
2. Restart your development server
3. Try registering with a real email address
4. Check both your email inbox and console logs

## Security Notes

- Never commit `.env.local` to version control
- Use app passwords instead of your main account password
- Consider using environment-specific email accounts for development

## Production Setup

For production, consider using:
- **SendGrid** - Professional email service
- **AWS SES** - Amazon's email service  
- **Mailgun** - Developer-friendly email API
- **Postmark** - Transactional email service

These services offer better deliverability, analytics, and scaling options than SMTP.