'use client'

import { Button } from '@/components/ui/button'
import { AlertCircle, Loader2, Lock } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface PaymentButtonProps {
  courseId: string
  courseName: string
  price: number
  isFree?: boolean
  onSuccess?: () => void
  className?: string
  size?: 'default' | 'sm' | 'lg'
}

export function PaymentButton({
  courseId,
  courseName,
  price,
  isFree = false,
  onSuccess,
  className = '',
  size = 'default',
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { data: session, status } = useSession()

  const handlePayment = async () => {
    try {
      setLoading(true)
      setError(null)

      if (status === 'unauthenticated') {
        router.push('/login?callbackUrl=/courses')
        return
      }

      // Step 1: Create order
      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      })

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json()
        throw new Error(errorData.error || 'Failed to create payment order')
      }

      const orderData = await orderResponse.json()

      // If free course, enrollment is created immediately
      if (orderData.isFree) {
        setLoading(false)
        router.push(`/courses/${courseId}`)
        onSuccess?.()
        return
      }

      // Step 2: Initialize Razorpay
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          order_id: orderData.orderId,
          amount: orderData.amount * 100, // Convert to paise
          currency: 'INR',
          name: 'EduLearn',
          description: `Enrollment: ${courseName}`,
          image: '/placeholder-logo.png',
          prefill: {
            name: orderData.studentName || '',
            email: orderData.studentEmail || '',
            contact: '',
          },
          handler: async (response: any) => {
            try {
              // Step 3: Verify payment on backend
              const verifyResponse = await fetch('/api/payments/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              })

              if (!verifyResponse.ok) {
                const errorData = await verifyResponse.json()
                throw new Error(
                  errorData.error || 'Payment verification failed'
                )
              }

              setLoading(false)
              router.push(`/courses/${courseId}?success=true`)
              onSuccess?.()
            } catch (err) {
              const message = err instanceof Error ? err.message : 'Verification failed'
              setError(message)
              setLoading(false)
            }
          },
          modal: {
            ondismiss: () => {
              setLoading(false)
              setError('Payment cancelled')
            },
          },
        }

        const razorpay = new (window as any).Razorpay(options)
        razorpay.open()
        setLoading(false)
      }
      document.body.appendChild(script)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Payment failed'
      setError(message)
      setLoading(false)
    }
  }

  if (price === 0 || isFree) {
    return (
      <Button
        onClick={handlePayment}
        disabled={loading || status === 'loading'}
        className={className}
        size={size}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Enrolling...
          </>
        ) : (
          <>
            <Lock className="h-4 w-4 mr-2" />
            Enroll Free
          </>
        )}
      </Button>
    )
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={handlePayment}
        disabled={loading || status === 'loading'}
        className={`w-full bg-blue-600 hover:bg-blue-700 ${className}`}
        size={size}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Lock className="h-4 w-4 mr-2" />
            Enroll Now - ₹{price.toLocaleString('en-IN')}
          </>
        )}
      </Button>
      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  )
}
