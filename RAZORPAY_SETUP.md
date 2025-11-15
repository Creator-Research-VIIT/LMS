# Razorpay Payment Integration Setup Guide

## Overview
This LMS platform now includes Razorpay integration for payment processing. Students can purchase paid courses with secure payment processing.

## Prerequisites
- Razorpay account (signup at https://razorpay.com)
- API keys from Razorpay Dashboard

## Step 1: Get Razorpay API Keys

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Login to your account
3. Navigate to **Settings** → **API Keys**
4. Copy your **Key ID** and **Key Secret**
   - **Key ID**: Your public key (starts with `rzp_`)
   - **Key Secret**: Your secret key (keep this secure!)

## Step 2: Configure Environment Variables

Add the following to your `.env` or `.env.local` file:

```env
# Razorpay API Keys
RAZORPAY_KEY_ID=your_key_id_here
RAZORPAY_KEY_SECRET=your_key_secret_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_public_key_id_here
```

**Important**: 
- `RAZORPAY_KEY_SECRET` should NEVER be exposed to the frontend - it's server-side only
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` is the public key and is safe to use in the browser

## Step 3: Update Course Pricing

In the teacher dashboard, when creating or updating a course:
- Set `isFree` to `false` for paid courses
- Set the `price` field to the course price in INR (₹)

## Step 4: Test Payment Flow

### Free Courses
- Click "Enroll Free" button
- Student is immediately enrolled without payment

### Paid Courses
1. Click "Enroll Now - ₹[price]" button
2. Razorpay payment modal opens
3. Enter payment details (test cards available in sandbox)
4. Payment is processed
5. Upon success, student is enrolled and redirected to course

### Test Cards (Sandbox Mode)

Use these test cards during development:

**Successful Payment:**
- Card: 4111 1111 1111 1111
- Expiry: Any future date (e.g., 12/25)
- CVV: Any 3 digits (e.g., 123)

**Failed Payment:**
- Card: 4242 4242 4242 4242
- Expiry: Any future date
- CVV: Any 3 digits

## Step 5: Verify Setup

1. Start your development server: `npm run dev`
2. Create a test course with a price
3. Try to enroll in the course
4. Verify the Razorpay modal appears
5. Use test card to complete payment
6. Check that enrollment is created in database

## Database Schema

### Payment Model
```prisma
model Payment {
  id                String   @id @default(cuid())
  studentId         String
  courseId          String
  amount            Float
  currency          String   @default("INR")
  razorpayOrderId   String   @unique
  razorpayPaymentId String?  @unique
  razorpaySignature String?
  status            PaymentStatus @default(PENDING)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  User              User     @relation(fields: [studentId], references: [id], onDelete: Cascade)
  Course            Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  Enrollment        Enrollment[]
}

enum PaymentStatus {
  PENDING
  SUCCESS
  FAILED
  CANCELLED
}
```

### Enrollment Updates
- `Enrollment.isPaid`: Boolean flag indicating if payment was made/course was free
- `Enrollment.paymentId`: Reference to the Payment record (nullable)

## API Endpoints

### Create Order
**POST** `/api/payments/create-order`

Request:
```json
{
  "courseId": "course-123"
}
```

Response (Paid Course):
```json
{
  "success": true,
  "orderId": "order_...",
  "paymentId": "...",
  "amount": 500,
  "currency": "INR",
  "courseName": "Python Basics",
  "studentEmail": "student@example.com",
  "studentName": "John Doe"
}
```

Response (Free Course):
```json
{
  "success": true,
  "message": "Enrolled successfully in free course",
  "enrollment": {...},
  "isFree": true
}
```

### Verify Payment
**POST** `/api/payments/verify`

Request:
```json
{
  "razorpay_order_id": "order_...",
  "razorpay_payment_id": "pay_...",
  "razorpay_signature": "signature_..."
}
```

Response:
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "enrollment": {...},
  "payment": {...}
}
```

### Payment History
**GET** `/api/payments/history`

Response:
```json
{
  "success": true,
  "payments": [
    {
      "id": "payment-id",
      "courseId": "course-123",
      "courseName": "Python Basics",
      "amount": 500,
      "currency": "INR",
      "status": "SUCCESS",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## Frontend Components

### PaymentButton Component
Located in `/components/payment-button.tsx`

Usage:
```tsx
<PaymentButton
  courseId="course-123"
  courseName="Python Basics"
  price={500}
  isFree={false}
  onSuccess={() => console.log('Payment successful')}
/>
```

Features:
- Automatic Razorpay modal integration
- Signature verification on backend
- Error handling and user feedback
- Automatic enrollment after successful payment
- Support for both free and paid courses

## Security Considerations

1. **Signature Verification**: All payments are verified using Razorpay's HMAC-SHA256 signature
2. **Server-Side Verification**: Payment verification happens on the server with the secret key
3. **User Validation**: Payments are linked to authenticated users only
4. **Session Management**: All payment endpoints require valid NextAuth sessions
5. **Environment Variables**: Secret keys are never exposed to the frontend

## Webhook Integration (Optional)

For production, you may want to setup Razorpay webhooks for:
- Real-time payment status updates
- Failed payment notifications
- Refund processing

Configure webhooks in Razorpay Dashboard → Settings → Webhooks

## Troubleshooting

### Payment Modal Not Appearing
- Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set correctly
- Check browser console for errors
- Ensure Razorpay script loads: https://checkout.razorpay.com/v1/checkout.js

### Signature Verification Failing
- Verify `RAZORPAY_KEY_SECRET` matches exactly
- Check server logs for signature comparison
- Ensure no extra spaces or characters in the secret

### Payments Not Being Recorded
- Check database connection
- Verify Payment and Enrollment models are created
- Check server logs for database errors
- Ensure course exists before creating payment

### Test Payments Not Working
- Use valid test card numbers
- Verify you're in sandbox mode (check Razorpay dashboard)
- Check if test mode is enabled in environment

## Production Checklist

- [ ] Update Razorpay credentials to live keys
- [ ] Remove test cards from documentation
- [ ] Setup error monitoring (e.g., Sentry)
- [ ] Configure Razorpay webhooks
- [ ] Setup email notifications for payments
- [ ] Test refund process
- [ ] Setup payment reconciliation job
- [ ] Configure production database backups
- [ ] Setup SSL/HTTPS certificate
- [ ] Configure CORS for Razorpay domain

## Support

For Razorpay documentation and support:
- [Razorpay Docs](https://razorpay.com/docs)
- [Razorpay Support](https://support.razorpay.com)
