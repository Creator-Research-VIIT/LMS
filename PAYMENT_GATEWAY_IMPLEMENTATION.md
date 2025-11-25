# Payment Gateway Implementation - SkillUP!! LMS

## 🎯 Overview

The LMS implements a **Razorpay payment gateway integration** for processing course enrollment payments. The system supports both free and paid courses with a complete payment lifecycle from order creation to enrollment.

---

## 📊 Payment Flow Architecture

```
User clicks "Enroll Now" 
    ↓
PaymentButton Component validates session
    ↓
POST /api/payments/create-order → Create Razorpay Order
    ↓
Razorpay Modal Opens (Checkout JS)
    ↓
User completes payment
    ↓
Razorpay returns: order_id, payment_id, signature
    ↓
POST /api/payments/verify → Verify signature + Create enrollment
    ↓
✅ Enrollment created + Course access granted
```

---

## 🔧 Core Components

### 1. **Payment Button Component** (`components/payment-button.tsx`)

**Purpose:** Frontend entry point for payment flow

**Features:**
- ✅ Session validation (redirects to login if needed)
- ✅ Free course detection (direct enrollment without payment)
- ✅ Razorpay modal integration
- ✅ Error handling and user feedback
- ✅ Loading states with spinner
- ✅ Responsive pricing display

**Key Props:**
```typescript
interface PaymentButtonProps {
  courseId: string           // Which course to enroll in
  courseName: string         // Display name
  price: number              // Price in rupees
  isFree?: boolean           // Skip payment if true
  onSuccess?: () => void     // Callback after enrollment
  className?: string         // Styling
  size?: 'default' | 'sm' | 'lg'
}
```

**Flow:**
1. User clicks "Enroll Now" button
2. If not authenticated → redirect to login
3. If free course → direct enrollment via API
4. If paid course → create Razorpay order
5. Razorpay modal opens with pre-filled user details
6. After payment → verify signature on backend
7. On success → redirect to course page

---

### 2. **Order Creation API** (`app/api/payments/create-order/route.ts`)

**Endpoint:** `POST /api/payments/create-order`

**Purpose:** Create a Razorpay order for payment

**Request:**
```json
{
  "courseId": "course_123"
}
```

**Logic:**
1. ✅ Authenticate user (via NextAuth session)
2. ✅ Check if already enrolled (prevent duplicate payment)
3. ✅ Fetch course details (verify existence, get price)
4. ✅ Handle free courses (auto-enroll without Razorpay)
5. ✅ Convert price to paise (₹500 = 50000 paise)
6. ✅ Create Razorpay order via SDK
7. ✅ Store payment record in database (status: PENDING)

**Response (Paid Course):**
```json
{
  "success": true,
  "orderId": "order_1234567890",
  "paymentId": "pay_1234567890",
  "amount": 500,
  "currency": "INR",
  "courseName": "React Mastery",
  "studentEmail": "user@example.com",
  "studentName": "John Doe"
}
```

**Response (Free Course):**
```json
{
  "success": true,
  "isFree": true,
  "message": "Enrolled successfully in free course",
  "enrollment": { ... }
}
```

**Database Recording:**
```prisma
// Creates Payment record with PENDING status
{
  studentId: "user_123"
  courseId: "course_123"
  amount: 500
  currency: "INR"
  razorpayOrderId: "order_1234567890"
  status: "PENDING"
  createdAt: now
}
```

---

### 3. **Payment Verification API** (`app/api/payments/verify/route.ts`)

**Endpoint:** `POST /api/payments/verify`

**Purpose:** Verify payment signature and create enrollment

**Request:**
```json
{
  "razorpay_order_id": "order_1234567890",
  "razorpay_payment_id": "pay_1234567890",
  "razorpay_signature": "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d"
}
```

**Security Verification:**
```
Signature Verification = HMAC-SHA256(
  razorpay_order_id|razorpay_payment_id,
  RAZORPAY_KEY_SECRET
)
```

**Logic:**
1. ✅ Verify user authentication
2. ✅ Validate all required payment fields present
3. ✅ **Critical: Verify HMAC-SHA256 signature** (prevent tampering)
4. ✅ Find payment record by razorpay_order_id
5. ✅ Verify payment belongs to current user (ownership check)
6. ✅ Update payment status to SUCCESS
7. ✅ Create Enrollment record
8. ✅ Initialize CourseProgress tracking
9. ✅ Grant immediate course access

**Database Updates:**
```prisma
// Update Payment record
{
  razorpayPaymentId: "pay_1234567890"
  razorpaySignature: "9ef4dffbfd84f1318f..."
  status: "SUCCESS"
  updatedAt: now
}

// Create Enrollment record
{
  id: "user_123_course_123"
  studentId: "user_123"
  courseId: "course_123"
  isPaid: true
  paymentId: "pay_1234567890"
}

// Create initial CourseProgress
{
  id: "user_123_course_123"
  studentId: "user_123"
  courseId: "course_123"
  completedLessons: 0
  totalLessons: 0
  progressPercent: 0
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "enrollment": {
    "id": "user_123_course_123",
    "studentId": "user_123",
    "courseId": "course_123",
    "isPaid": true
  },
  "payment": {
    "id": "pay_1234567890",
    "status": "SUCCESS"
  }
}
```

---

### 4. **Payment History API** (`app/api/payments/history/route.ts`)

**Endpoint:** `GET /api/payments/history`

**Purpose:** Fetch student's payment transaction history

**Logic:**
1. ✅ Authenticate user
2. ✅ Query all payments for current student
3. ✅ Include course details (title, thumbnail)
4. ✅ Sort by creation date (newest first)
5. ✅ Format response with readable data

**Response:**
```json
{
  "success": true,
  "payments": [
    {
      "id": "pay_1234567890",
      "courseId": "course_123",
      "courseName": "React Mastery",
      "courseThumbnail": "https://...",
      "amount": 500,
      "currency": "INR",
      "status": "SUCCESS",
      "razorpayPaymentId": "pay_1234567890",
      "createdAt": "2025-11-25T10:30:00Z",
      "updatedAt": "2025-11-25T10:35:00Z"
    }
  ]
}
```

---

### 5. **Razorpay Library** (`lib/razorpay.ts`)

**Purpose:** Razorpay SDK wrapper with security functions

**Key Functions:**

#### `createRazorpayOrder(options)`
```typescript
interface RazorpayOrderOptions {
  amount: number              // In paise (e.g., 50000 for ₹500)
  currency?: string           // Default: 'INR'
  receipt?: string            // Custom receipt ID
  notes?: Record<string, any> // Custom metadata
}

// Usage:
const order = await createRazorpayOrder({
  amount: 50000,              // ₹500
  currency: 'INR',
  receipt: 'receipt_user_course_123',
  notes: {
    courseId: 'course_123',
    studentId: 'user_123',
    courseName: 'React Mastery'
  }
});
```

#### `verifyRazorpaySignature(options)` ⚙️ **CRITICAL**
```typescript
interface RazorpayPaymentVerifyOptions {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string  // Sent from Razorpay
}

// Internal verification:
const hash = HMAC-SHA256(
  `${order_id}|${payment_id}`,
  RAZORPAY_KEY_SECRET
);
const isValid = hash === razorpay_signature;
```

**Security Details:**
- ✅ Uses HMAC-SHA256 cryptographic hashing
- ✅ Signature cannot be forged without secret key
- ✅ Prevents man-in-the-middle attacks
- ✅ Server-side verification (frontend cannot bypass)

---

## 💾 Database Schema

```prisma
model Payment {
  id                  String   @id @default(cuid())
  studentId           String
  courseId            String
  
  // Amount Details
  amount              Decimal  @db.Decimal(10,2)
  currency            String   @default("INR")
  
  // Razorpay Details
  razorpayOrderId     String   @unique
  razorpayPaymentId   String?
  razorpaySignature   String?
  
  // Status Tracking
  status              String   @default("PENDING")  // PENDING | SUCCESS | FAILED
  
  // Timestamps
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
  
  // Relations
  Course              Course   @relation(fields: [courseId], references: [id])
  Student             User     @relation(fields: [studentId], references: [id])
  Enrollment          Enrollment[]
  
  @@map("payments")
}

model Enrollment {
  id                  String   @id
  studentId           String
  courseId            String
  
  // Payment & Access
  isPaid              Boolean  @default(false)
  paymentId           String?
  
  // Timestamps
  enrolledAt          DateTime @default(now())
  
  // Relations
  Student             User     @relation(fields: [studentId], references: [id])
  Course              Course   @relation(fields: [courseId], references: [id])
  Payment             Payment? @relation(fields: [paymentId], references: [id])
  
  @@unique([studentId, courseId])
  @@map("enrollments")
}
```

---

## 🔑 Environment Variables Required

```env
# Razorpay API Keys
RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxx"          # Public key for frontend
RAZORPAY_KEY_SECRET="xxxxxxxxxxxxxxxx"             # Secret key for server

# Frontend (publicly safe, no secrets)
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxx"
```

---

## 🔐 Security Features

### 1. **HMAC-SHA256 Signature Verification**
- Prevents payment tampering
- Server-side validation only
- Cannot be bypassed from frontend

### 2. **User Ownership Verification**
```typescript
if (payment.studentId !== session.user.id) {
  return 403; // Unauthorized
}
```
- Prevents cross-user payment verification
- Each user can only verify their own payments

### 3. **Duplicate Enrollment Prevention**
```typescript
const existing = await prisma.enrollment.findFirst({
  where: { studentId, courseId }
});
if (existing) return 400; // Already enrolled
```
- Prevents double-enrollment
- Prevents multiple payments for same course

### 4. **Session Authentication**
- All payment APIs require NextAuth session
- Unauthenticated requests return 401
- Prevents unauthorized API access

### 5. **Amount Validation**
- Amount in paise verified server-side
- Cannot be modified on frontend
- Prevents underpayment attacks

---

## 📱 User Experience Flow

### **Free Course Enrollment:**
```
User on course page
  ↓
Clicks "Enroll Free"
  ↓
/api/payments/create-order called
  ↓
API detects isFree=true
  ↓
Auto-creates enrollment
  ↓
Instant redirect to course content
✅ No Razorpay modal shown
```

### **Paid Course Enrollment:**
```
User on course page
  ↓
Clicks "Enroll Now - ₹500"
  ↓
If not logged in → redirect to /login
  ↓
/api/payments/create-order called
  ↓
Razorpay order created (status: PENDING)
  ↓
Razorpay Checkout modal opens
  ↓
User enters UPI/Card/NetBanking details
  ↓
Razorpay processes payment
  ↓
Success → Returns to app with signature
  ↓
/api/payments/verify called
  ↓
Signature verified (HMAC-SHA256)
  ↓
Enrollment created
  ↓
User redirected to /courses/{id}?success=true
✅ Instant course access
```

---

## 🧪 Payment Testing

### Test Scenarios:

**1. Free Course:**
```javascript
const courseId = "free_course_123"; // isFree: true in DB
// Expected: Direct enrollment, no Razorpay modal
```

**2. Paid Course - Success:**
```javascript
const courseId = "paid_course_123";
// Use Razorpay test card: 4111111111111111
// Expected: Payment success → enrollment created
```

**3. Paid Course - Failure:**
```javascript
// Use invalid test card
// Expected: Payment failed error message
```

**4. Duplicate Payment:**
```javascript
// Try enrolling same course twice
// Expected: 400 error "Already enrolled"
```

---

## 🚀 Deployment Checklist

- [ ] Set `RAZORPAY_KEY_ID` in production env
- [ ] Set `RAZORPAY_KEY_SECRET` in production env
- [ ] Set `NEXT_PUBLIC_RAZORPAY_KEY_ID` in production env
- [ ] Verify Razorpay Webhook (optional, for async updates)
- [ ] Test payment flow end-to-end
- [ ] Monitor payment success rate
- [ ] Set up payment alerts/monitoring
- [ ] Document refund process

---

## 📊 Payment Statistics

**Accessible via:**
- `/api/admin/payments` - Admin payment dashboard
- Payment history in student profile
- Course revenue analytics (for teachers)

---

## 🔄 Future Enhancements

- [ ] Webhook support for async payment confirmation
- [ ] Refund processing system
- [ ] Subscription/recurring payments
- [ ] Multiple payment gateways (Stripe, PayPal)
- [ ] Payment analytics dashboard
- [ ] Invoice generation
- [ ] Tax calculation per region
- [ ] Discount codes/coupons integration

---

## 📞 Support & Debugging

**Common Issues:**

1. **"Payment verification failed"**
   - Signature mismatch
   - Check RAZORPAY_KEY_SECRET is correct
   - Verify order_id, payment_id match

2. **"Already enrolled in this course"**
   - User trying to enroll twice
   - Check enrollment table for existing record

3. **Razorpay modal not appearing**
   - Check NEXT_PUBLIC_RAZORPAY_KEY_ID set
   - Verify script loads: checkout.razorpay.com
   - Check browser console for errors

4. **Payment created but enrollment missing**
   - Check verify endpoint was called
   - Verify signature was valid
   - Check database for pending payments

---

**Implementation Date:** November 2025  
**Status:** ✅ Production Ready
