# LMS Project - Phase 9: Payment Integration System
**Date:** November 2025 (Planned)  
**Branch:** feature/payment-integration  
**Status:** 📋 Planned  
**Prerequisites:** Phases 1-8 completed

---

## 📋 Phase Overview

This phase will implement a comprehensive payment system for paid courses, including secure payment processing, subscription management, refunds, and revenue tracking. The system will support multiple payment gateways and ensure PCI compliance.

## 🎯 Objectives
- Integrate secure payment gateway (Stripe/Razorpay)
- Implement course pricing and discount system
- Add subscription and one-time payment options
- Create secure checkout process
- Build revenue analytics dashboard
- Implement refund and cancellation system
- Ensure PCI DSS compliance

---

## 🔧 Technical Implementation Plan

### **1. Database Schema Updates**

#### **Payment-Related Models**
```prisma
model Course {
  // Existing fields...
  price           Decimal?        @db.Decimal(10,2)
  currency        String          @default("USD")
  paymentType     PaymentType     @default(FREE)
  discountPrice   Decimal?        @db.Decimal(10,2)
  discountExpiry  DateTime?
  
  // Relations
  payments        Payment[]
  subscriptions   Subscription[]
}

model Payment {
  id              String          @id @default(cuid())
  userId          String
  courseId        String
  amount          Decimal         @db.Decimal(10,2)
  currency        String          @default("USD")
  status          PaymentStatus
  paymentMethod   PaymentMethod
  transactionId   String          @unique
  gatewayResponse Json?
  createdAt       DateTime        @default(now())
  refundedAt      DateTime?
  refundAmount    Decimal?        @db.Decimal(10,2)
  
  // Relations
  user            User            @relation(fields: [userId], references: [id])
  course          Course          @relation(fields: [courseId], references: [id])
  refunds         Refund[]
  
  @@map("payments")
}

model Subscription {
  id              String          @id @default(cuid())
  userId          String
  courseId        String?         // null for platform subscription
  planType        SubscriptionPlan
  status          SubscriptionStatus
  startDate       DateTime
  endDate         DateTime?
  amount          Decimal         @db.Decimal(10,2)
  currency        String          @default("USD")
  stripeSubId     String?         @unique
  razorpaySubId   String?         @unique
  createdAt       DateTime        @default(now())
  cancelledAt     DateTime?
  
  // Relations
  user            User            @relation(fields: [userId], references: [id])
  course          Course?         @relation(fields: [courseId], references: [id])
  
  @@map("subscriptions")
}

model Refund {
  id              String          @id @default(cuid())
  paymentId       String
  amount          Decimal         @db.Decimal(10,2)
  reason          String
  status          RefundStatus
  processedAt     DateTime?
  gatewayRefundId String?
  createdAt       DateTime        @default(now())
  
  // Relations
  payment         Payment         @relation(fields: [paymentId], references: [id])
  
  @@map("refunds")
}

model Discount {
  id              String          @id @default(cuid())
  code            String          @unique
  type            DiscountType
  value           Decimal         @db.Decimal(10,2)
  courseId        String?         // null for platform-wide
  maxUses         Int?
  usedCount       Int             @default(0)
  validFrom       DateTime
  validUntil      DateTime
  isActive        Boolean         @default(true)
  createdAt       DateTime        @default(now())
  
  // Relations
  course          Course?         @relation(fields: [courseId], references: [id])
  usages          DiscountUsage[]
  
  @@map("discounts")
}

model DiscountUsage {
  id              String          @id @default(cuid())
  discountId      String
  userId          String
  paymentId       String
  usedAt          DateTime        @default(now())
  
  // Relations
  discount        Discount        @relation(fields: [discountId], references: [id])
  user            User            @relation(fields: [userId], references: [id])
  payment         Payment         @relation(fields: [paymentId], references: [id])
  
  @@unique([discountId, userId])
  @@map("discount_usages")
}

enum PaymentType {
  FREE
  ONE_TIME
  SUBSCRIPTION
}

enum PaymentStatus {
  PENDING
  SUCCESS
  FAILED
  CANCELLED
  REFUNDED
  PARTIALLY_REFUNDED
}

enum PaymentMethod {
  STRIPE_CARD
  STRIPE_BANK
  RAZORPAY_CARD
  RAZORPAY_UPI
  RAZORPAY_NETBANKING
  PAYPAL
}

enum SubscriptionPlan {
  MONTHLY
  QUARTERLY
  YEARLY
  LIFETIME
}

enum SubscriptionStatus {
  ACTIVE
  CANCELLED
  EXPIRED
  PAUSED
}

enum RefundStatus {
  PENDING
  APPROVED
  REJECTED
  PROCESSED
}

enum DiscountType {
  PERCENTAGE
  FIXED_AMOUNT
}
```

### **2. Payment Gateway Integration**

#### **Stripe Integration**
```typescript
// lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function createPaymentIntent(
  amount: number,
  currency: string,
  courseId: string,
  userId: string
) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency: currency.toLowerCase(),
    metadata: {
      courseId,
      userId,
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return paymentIntent;
}

export async function createSubscription(
  customerId: string,
  priceId: string,
  courseId?: string
) {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{
      price: priceId,
    }],
    metadata: {
      courseId: courseId || 'platform',
    },
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  });

  return subscription;
}
```

#### **Razorpay Integration**
```typescript
// lib/razorpay.ts
import Razorpay from 'razorpay';

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function createRazorpayOrder(
  amount: number,
  currency: string,
  courseId: string,
  userId: string
) {
  const order = await razorpay.orders.create({
    amount: Math.round(amount * 100), // Convert to paise
    currency: currency.toUpperCase(),
    notes: {
      courseId,
      userId,
    },
  });

  return order;
}

export async function createRazorpaySubscription(
  planId: string,
  customerId: string,
  totalCount: number
) {
  const subscription = await razorpay.subscriptions.create({
    plan_id: planId,
    customer_notify: 1,
    total_count: totalCount,
    notes: {
      customerId,
    },
  });

  return subscription;
}
```

### **3. Payment API Endpoints**

#### **Course Purchase Endpoint**
```typescript
// app/api/payments/purchase/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { stripe, createPaymentIntent } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { courseId, paymentMethod, discountCode } = await req.json();

    // Validate course
    const course = await prisma.course.findFirst({
      where: {
        id: courseId,
        isApproved: true,
        paymentType: { not: 'FREE' }
      }
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Check if already purchased
    const existingPayment = await prisma.payment.findFirst({
      where: {
        userId: session.user.id,
        courseId,
        status: 'SUCCESS'
      }
    });

    if (existingPayment) {
      return NextResponse.json({ error: 'Course already purchased' }, { status: 400 });
    }

    let finalAmount = course.price;
    let discountUsed = null;

    // Apply discount if provided
    if (discountCode) {
      const discount = await prisma.discount.findFirst({
        where: {
          code: discountCode,
          isActive: true,
          validFrom: { lte: new Date() },
          validUntil: { gte: new Date() },
          OR: [
            { courseId: courseId },
            { courseId: null } // Platform-wide discount
          ]
        }
      });

      if (discount && (discount.maxUses === null || discount.usedCount < discount.maxUses)) {
        if (discount.type === 'PERCENTAGE') {
          finalAmount = finalAmount * (1 - discount.value / 100);
        } else {
          finalAmount = Math.max(0, finalAmount - discount.value);
        }
        discountUsed = discount;
      }
    }

    // Create payment intent based on method
    let paymentData;
    if (paymentMethod === 'stripe') {
      paymentData = await createPaymentIntent(
        finalAmount,
        course.currency,
        courseId,
        session.user.id
      );
    } else if (paymentMethod === 'razorpay') {
      const { createRazorpayOrder } = await import('@/lib/razorpay');
      paymentData = await createRazorpayOrder(
        finalAmount,
        course.currency,
        courseId,
        session.user.id
      );
    }

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        userId: session.user.id,
        courseId,
        amount: finalAmount,
        currency: course.currency,
        status: 'PENDING',
        paymentMethod: paymentMethod === 'stripe' ? 'STRIPE_CARD' : 'RAZORPAY_CARD',
        transactionId: paymentData.id,
        gatewayResponse: paymentData
      }
    });

    // Record discount usage
    if (discountUsed) {
      await prisma.discountUsage.create({
        data: {
          discountId: discountUsed.id,
          userId: session.user.id,
          paymentId: payment.id
        }
      });

      await prisma.discount.update({
        where: { id: discountUsed.id },
        data: { usedCount: { increment: 1 } }
      });
    }

    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      clientSecret: paymentData.client_secret || paymentData.id,
      amount: finalAmount,
      currency: course.currency
    });

  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}
```

#### **Payment Confirmation Endpoint**
```typescript
// app/api/payments/confirm/route.ts
export async function POST(req: NextRequest) {
  try {
    const { paymentId, paymentIntentId, status } = await req.json();

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: { course: true, user: true }
    });

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // Update payment status
    await prisma.payment.update({
      where: { id: paymentId },
      data: { 
        status: status === 'succeeded' ? 'SUCCESS' : 'FAILED',
        gatewayResponse: { paymentIntentId, status }
      }
    });

    if (status === 'succeeded') {
      // Create enrollment
      await prisma.enrollment.create({
        data: {
          studentId: payment.userId,
          courseId: payment.courseId,
          enrolledAt: new Date()
        }
      });

      // Send confirmation email
      await sendPaymentConfirmationEmail(
        payment.user.email,
        payment.course.title,
        payment.amount,
        payment.currency
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Payment confirmation error:', error);
    return NextResponse.json(
      { error: 'Failed to confirm payment' },
      { status: 500 }
    );
  }
}
```

### **4. Frontend Payment Components**

#### **Checkout Component**
```tsx
// components/payments/checkout.tsx
'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutProps {
  course: {
    id: string;
    title: string;
    price: number;
    currency: string;
  };
  onSuccess: () => void;
}

function CheckoutForm({ course, onSuccess }: CheckoutProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [finalAmount, setFinalAmount] = useState(course.price);

  const applyDiscount = async () => {
    try {
      const response = await fetch('/api/payments/validate-discount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: course.id, discountCode })
      });

      const data = await response.json();
      
      if (data.success) {
        setFinalAmount(data.finalAmount);
        setDiscountApplied(true);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to apply discount');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) return;
    
    setLoading(true);
    setError(null);

    try {
      // Create payment intent
      const response = await fetch('/api/payments/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: course.id,
          paymentMethod: 'stripe',
          discountCode: discountApplied ? discountCode : undefined
        })
      });

      const { clientSecret, paymentId } = await response.json();

      // Confirm payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
          }
        }
      );

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
      } else if (paymentIntent.status === 'succeeded') {
        // Confirm payment on backend
        await fetch('/api/payments/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentId,
            paymentIntentId: paymentIntent.id,
            status: 'succeeded'
          })
        });

        onSuccess();
      }

    } catch (err) {
      setError('Payment processing failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Complete Purchase</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">{course.title}</h3>
            <div className="flex justify-between items-center mt-2">
              <span>Price:</span>
              <span className={discountApplied ? 'line-through text-gray-500' : 'font-semibold'}>
                {course.currency} {course.price}
              </span>
            </div>
            {discountApplied && (
              <div className="flex justify-between items-center">
                <span>Final Price:</span>
                <span className="font-semibold text-green-600">
                  {course.currency} {finalAmount}
                </span>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="discount">Discount Code (Optional)</Label>
            <div className="flex gap-2">
              <Input
                id="discount"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter discount code"
                disabled={discountApplied}
              />
              <Button
                type="button"
                variant="outline"
                onClick={applyDiscount}
                disabled={!discountCode || discountApplied}
              >
                Apply
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Card Details</Label>
              <div className="border rounded-md p-3 mt-1">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={!stripe || loading}
            >
              {loading ? 'Processing...' : `Pay ${course.currency} ${finalAmount}`}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

export function Checkout({ course, onSuccess }: CheckoutProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm course={course} onSuccess={onSuccess} />
    </Elements>
  );
}
```

#### **Payment Success Component**
```tsx
// components/payments/payment-success.tsx
'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PaymentSuccessProps {
  courseId: string;
  paymentId: string;
}

export function PaymentSuccess({ courseId, paymentId }: PaymentSuccessProps) {
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    fetchPaymentDetails();
  }, [paymentId]);

  const fetchPaymentDetails = async () => {
    try {
      const response = await fetch(`/api/payments/${paymentId}`);
      const data = await response.json();
      setPaymentDetails(data);
    } catch (error) {
      console.error('Failed to fetch payment details:', error);
    }
  };

  const downloadReceipt = async () => {
    try {
      const response = await fetch(`/api/payments/${paymentId}/receipt`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${paymentId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to download receipt:', error);
    }
  };

  if (!paymentDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full max-w-md mx-auto text-center">
      <CardHeader>
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <CardTitle className="text-green-600">Payment Successful!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-gray-600">
            You have successfully enrolled in:
          </p>
          <p className="font-semibold text-lg">{paymentDetails.course.title}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between">
            <span>Amount Paid:</span>
            <span className="font-semibold">
              {paymentDetails.currency} {paymentDetails.amount}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Transaction ID:</span>
            <span className="text-sm text-gray-600">{paymentDetails.transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span>Date:</span>
            <span className="text-sm text-gray-600">
              {new Date(paymentDetails.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Button onClick={downloadReceipt} variant="outline" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
          
          <Button 
            onClick={() => window.location.href = `/student/courses/${courseId}`}
            className="w-full"
          >
            Start Learning
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

## 📊 Key Features to Deliver

### ✅ **Payment Processing**
- [ ] Stripe integration for card payments
- [ ] Razorpay integration for Indian payments
- [ ] PayPal integration (optional)
- [ ] Secure checkout process
- [ ] Payment confirmation system

### ✅ **Course Pricing**
- [ ] Free and paid course support
- [ ] One-time and subscription pricing
- [ ] Discount codes and coupons
- [ ] Dynamic pricing updates
- [ ] Multi-currency support

### ✅ **Revenue Management**
- [ ] Transaction tracking and logging
- [ ] Revenue analytics dashboard
- [ ] Payout management for teachers
- [ ] Tax calculation and reporting
- [ ] Financial reporting tools

### ✅ **Refund System**
- [ ] Automated refund processing
- [ ] Refund policy enforcement
- [ ] Partial refund support
- [ ] Refund tracking and reporting
- [ ] Customer refund requests

### ✅ **Security & Compliance**
- [ ] PCI DSS compliance
- [ ] Secure payment data handling
- [ ] Fraud detection and prevention
- [ ] Payment encryption
- [ ] Audit trail maintenance

---

## 🧪 Testing Strategy

### **Payment Testing**
```javascript
// tests/payment.test.js
describe('Payment System', () => {
  test('should create payment intent successfully', async () => {
    const paymentIntent = await createPaymentIntent(
      99.99,
      'USD',
      'course-123',
      'user-456'
    );
    
    expect(paymentIntent.amount).toBe(9999); // In cents
    expect(paymentIntent.currency).toBe('usd');
  });

  test('should apply discount correctly', async () => {
    const response = await request(app)
      .post('/api/payments/validate-discount')
      .send({
        courseId: 'course-123',
        discountCode: 'SAVE20'
      });

    expect(response.body.success).toBe(true);
    expect(response.body.finalAmount).toBe(79.99); // 20% off $99.99
  });

  test('should handle payment confirmation', async () => {
    const response = await request(app)
      .post('/api/payments/confirm')
      .send({
        paymentId: 'payment-123',
        paymentIntentId: 'pi_test_123',
        status: 'succeeded'
      });

    expect(response.body.success).toBe(true);
    
    // Verify enrollment was created
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        studentId: 'user-456',
        courseId: 'course-123'
      }
    });
    
    expect(enrollment).toBeTruthy();
  });
});
```

---

## 📚 Documentation Requirements

### **Payment Integration Guide**
- Setup instructions for Stripe and Razorpay
- Environment variable configuration
- Webhook setup and testing
- Security best practices

### **API Documentation**
- Payment endpoint specifications
- Request/response examples
- Error handling documentation
- Webhook payload formats

### **User Guides**
- Course purchase flow for students
- Refund request process
- Payment method management
- Receipt and invoice access

---

## 🔄 Migration Steps

### **Database Migration**
```bash
# Create and run payment system migration
npx prisma migrate dev --name add-payment-system
npx prisma generate
```

### **Environment Variables**
```env
# Stripe Configuration
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Razorpay Configuration
RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="..."
RAZORPAY_WEBHOOK_SECRET="..."

# PayPal Configuration (Optional)
PAYPAL_CLIENT_ID="..."
PAYPAL_CLIENT_SECRET="..."
PAYPAL_ENVIRONMENT="sandbox" # or "production"
```

---

## 📈 Success Metrics

### **Payment Performance**
- Payment success rate > 95%
- Checkout abandonment rate < 15%
- Average payment processing time < 3 seconds
- Refund processing time < 24 hours

### **Business Metrics**
- Course revenue tracking
- Conversion rate optimization
- Customer lifetime value
- Churn rate monitoring

---

**Phase 9 Status: 📋 PLANNED**  
**Estimated Duration:** 3-4 weeks  
**Prerequisites:** Complete Phases 1-8  
**Next Phase:** Phase 10 - Advanced Analytics & Reporting