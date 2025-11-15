import Razorpay from 'razorpay';

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error('RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set in environment variables');
}

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export interface RazorpayOrderOptions {
  amount: number; // Amount in paise (e.g., 50000 for ₹500)
  currency?: string;
  receipt?: string;
  notes?: Record<string, any>;
}

export interface RazorpayPaymentVerifyOptions {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

/**
 * Create a Razorpay order for payment
 */
export async function createRazorpayOrder(options: RazorpayOrderOptions) {
  try {
    const order = await razorpay.orders.create({
      amount: options.amount,
      currency: options.currency || 'INR',
      receipt: options.receipt || `receipt_${Date.now()}`,
      notes: options.notes || {},
    });
    return order;
  } catch (error) {
    console.error('❌ Error creating Razorpay order:', error);
    throw error;
  }
}

/**
 * Verify Razorpay payment signature
 */
export function verifyRazorpaySignature(options: RazorpayPaymentVerifyOptions): boolean {
  try {
    const crypto = require('crypto');
    
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    const data = `${options.razorpay_order_id}|${options.razorpay_payment_id}`;
    
    shasum.update(data);
    const digest = shasum.digest('hex');
    
    const isSignatureValid = digest === options.razorpay_signature;
    
    if (isSignatureValid) {
      console.log('✅ Razorpay signature verified successfully');
    } else {
      console.warn('❌ Razorpay signature verification failed');
    }
    
    return isSignatureValid;
  } catch (error) {
    console.error('❌ Error verifying Razorpay signature:', error);
    return false;
  }
}

/**
 * Fetch payment details from Razorpay
 */
export async function fetchRazorpayPayment(paymentId: string) {
  try {
    const payment = await razorpay.payments.fetch(paymentId);
    return payment;
  } catch (error) {
    console.error('❌ Error fetching Razorpay payment:', error);
    throw error;
  }
}
