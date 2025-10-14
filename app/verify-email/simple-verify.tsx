'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SimpleVerifyEmail() {
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const email = searchParams.get('email')
  
  useEffect(() => {
    if (!userId || !email) {
      router.push('/signup')
    }
  }, [userId, email, router])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!userId || otp.length !== 6) {
      setMessage('Please enter a valid 6-digit OTP code')
      return
    }
    
    setIsLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, otp }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setIsSuccess(true)
        setMessage('Email verified successfully! Redirecting to your dashboard...')
        
        // Determine redirect URL based on user role
        let redirectUrl = '/student' // Default to student dashboard
        
        if (data.user) {
          switch (data.user.role) {
            case 'ADMIN':
              redirectUrl = '/admin'
              break
            case 'TEACHER':
              redirectUrl = data.user.approvalStatus === 'approved' ? '/teacher' : '/teacher-approval'
              break
            case 'STUDENT':
              redirectUrl = '/student'
              break
          }
        }
        
        // Use window.location for more reliable redirect
        setTimeout(() => {
          window.location.href = redirectUrl
        }, 2000)
      } else {
        setMessage(data.error || 'Verification failed')
      }
    } catch (error) {
      console.error('Verification error:', error)
      setMessage('Network error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleResend = async () => {
    if (!userId) return
    
    setIsLoading(true)
    try {
      const response = await fetch(`/api/auth/verify-email?userId=${userId}`)
      const data = await response.json()
      
      if (response.ok) {
        setMessage('New verification code sent! Check your email.')
      } else {
        setMessage(data.error || 'Failed to resend code')
      }
    } catch (error) {
      setMessage('Failed to resend code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  if (!userId || !email) {
    return <div>Redirecting...</div>
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Verify Your Email
          </h1>
          <p className="text-gray-600">
            We've sent a 6-digit code to <strong>{email}</strong>
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit code"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={6}
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>
        
        {message && (
          <div className={`mt-4 p-3 rounded-md text-sm ${
            isSuccess ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResend}
            disabled={isLoading}
            className="text-blue-600 hover:text-blue-500 text-sm font-medium disabled:opacity-50"
          >
            Resend Code
          </button>
        </div>
        
        <div className="mt-4 text-center">
          <button
            onClick={() => router.push('/signup')}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← Back to Signup
          </button>
        </div>
      </div>
    </div>
  )
}