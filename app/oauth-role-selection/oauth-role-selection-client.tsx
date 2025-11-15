'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, User, GraduationCap, BookOpen, AlertCircle, Github } from 'lucide-react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

export default function OAuthRoleSelectionClient() {
  const [selectedRole, setSelectedRole] = useState<'STUDENT' | 'TEACHER' | 'ADMIN' | 'CHARITY' | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const email = searchParams.get('email')
  const name = searchParams.get('name')
  const provider = searchParams.get('provider')
  const image = searchParams.get('image')
  
  useEffect(() => {
    if (!email || !name || !provider) {
      router.push('/signup')
    }
  }, [email, name, provider, router])
  
  const handleRoleSelection = async () => {
    if (!selectedRole || !email || !name || !provider) return
    
    setIsLoading(true)
    setError('')
    
    try {
      // Create user with OAuth data and selected role
      const response = await fetch('/api/oauth-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          provider,
          image,
          role: selectedRole,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        setError(data.error || 'Registration failed')
        return
      }
      
      // Now sign in the user with OAuth
      const signInResult = await signIn(provider, {
        redirect: false,
        callbackUrl: data.redirectUrl || '/dashboard'
      })
      
      if (signInResult?.error) {
        setError('Registration successful but sign in failed. Please try signing in manually.')
      } else if (signInResult?.ok) {
        router.push(data.redirectUrl || '/dashboard')
      }
      
    } catch (error) {
      console.error('OAuth registration error:', error)
      setError('An error occurred during registration')
    } finally {
      setIsLoading(false)
    }
  }
  
  const getProviderIcon = () => {
    switch (provider) {
      case 'google':
        return '🌐'
      case 'github':
        return <Github className="w-6 h-6" />
      default:
        return '🔗'
    }
  }
  
  const getProviderName = () => {
    switch (provider) {
      case 'google':
        return 'Google'
      case 'github':
        return 'GitHub'
      default:
        return provider
    }
  }
  
  if (!email || !name || !provider) {
    return null
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 text-2xl font-bold text-gray-900 dark:text-white">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span>LearnHub</span>
          </div>
        </div>

        {/* Role Selection Card */}
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              {getProviderIcon()}
            </div>
            <CardTitle className="text-2xl font-bold">Choose Your Role</CardTitle>
            <CardDescription>
              Complete your {getProviderName()} registration by selecting your role
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* User Info */}
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              {image ? (
                <Image
                  src={image}
                  alt={name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900">{name}</p>
                <p className="text-sm text-gray-600">{email}</p>
              </div>
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {/* Role Selection */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Select your role:</h3>
              
              {/* Student Role */}
              <button
                type="button"
                className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                  selectedRole === 'STUDENT'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedRole('STUDENT')}
              >
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Student</h4>
                    <p className="text-sm text-gray-600">Learn and take courses</p>
                  </div>
                </div>
              </button>
              
              {/* Teacher Role */}
              <button
                type="button"
                className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                  selectedRole === 'TEACHER'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedRole('TEACHER')}
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Teacher</h4>
                    <p className="text-sm text-gray-600">Create and manage courses</p>
                    <p className="text-xs text-orange-600 mt-1">Requires admin approval</p>
                  </div>
                </div>
              </button>

              {/* Charity Role */}
              <button
                type="button"
                className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                  selectedRole === 'CHARITY'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedRole('CHARITY')}
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Charity</h4>
                    <p className="text-sm text-gray-600">Access sponsorship tools and impact</p>
                  </div>
                </div>
              </button>
            </div>
            
            <Button
              onClick={handleRoleSelection}
              disabled={!selectedRole || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                `Continue as ${selectedRole?.toLowerCase() || 'selected role'}`
              )}
            </Button>
            
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => router.push('/signup')}
                disabled={isLoading}
              >
                Use different signup method
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}