'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { getRoleBasedDashboard } from '@/lib/redirects'

export default function VerifyEmailClient() {
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isResending, setIsResending] = useState(false)
  
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
      
      if (data.success) {
        setIsSuccess(true)
        setMessage('Email verified successfully! Redirecting...')
        
        // Fetch user details to determine redirect
        try {
          const userResponse = await fetch(`/api/user/${userId}`)
          const userData = await userResponse.json()
          
          if (userData.user) {
            const redirectPath = getRoleBasedDashboard(userData.user.role, userData.user.approvalStatus)
            
            setTimeout(() => {
              router.push(redirectPath)
            }, 2000)
          } else {
            // Fallback to generic dashboard
            setTimeout(() => {
              router.push('/dashboard')
            }, 2000)
          }
        } catch (userError) {
          console.error('Failed to fetch user details:', userError)
          // Fallback to generic dashboard
          setTimeout(() => {
            router.push('/dashboard')
          }, 2000)
        }
      } else {
        setMessage(data.error || 'Verification failed')
      }
    } catch (error) {
      console.error('Verify email error:', error)
      setMessage('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleResend = async () => {
    if (!userId) return
    
    setIsResending(true)
    
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setMessage('Verification email resent successfully!')
      } else {
        setMessage(data.error || 'Failed to resend email')
      }
    } catch (error) {
      console.error('Resend email error:', error)
      setMessage('Failed to resend email. Please try again.')
    } finally {
      setIsResending(false)
    }
  }
  
  if (!userId || !email) {
    return null
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a 6-digit verification code to <br />
            <span className="font-medium text-gray-900">{email}</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {isSuccess ? (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Email Verified!</h3>
              <p className="text-gray-600">You will be redirected to your dashboard shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Code
                </label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                  required
                />
              </div>
              
              {message && (
                <Alert variant={isSuccess ? "default" : "destructive"}>
                  {isSuccess ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
              
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify Email'
                )}
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Didn't receive the code?{' '}
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isResending}
                    className="font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50"
                  >
                    {isResending ? 'Resending...' : 'Resend'}
                  </button>
                </p>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}