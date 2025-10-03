'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Clock, CreditCard, Loader2, Star, Users } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  price: number
  teacher: {
    id: string
    name: string
  }
  contents?: Array<{
    id: string
    title: string
    type: string
    orderIndex: number
  }>
  _count?: {
    enrollments: number
    contents: number
  }
  averageRating?: number
}

interface CourseEnrollClientProps {
  readonly courseId: string
}

export default function CourseEnrollClient({ courseId }: CourseEnrollClientProps) {
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [error, setError] = useState('')
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
  
  const router = useRouter()
  const { data: session } = useSession()

  const getButtonContent = () => {
    if (!course || !session) return null;
    
    if (isEnrolling) {
      return (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          {course.price === 0 ? 'Enrolling...' : 'Processing...'}
        </>
      );
    }
    
    if (isAlreadyEnrolled) {
      return (
        <>
          <CheckCircle className="h-4 w-4 mr-2" />
          Already Enrolled
        </>
      );
    }
    
    return (
      <>
        <CreditCard className="h-4 w-4 mr-2" />
        {course.price === 0 ? 'Enroll Now' : `Enroll for $${course.price}`}
      </>
    );
  };

  useEffect(() => {
    if (!session) {
      router.push('/login')
      return
    }
    fetchCourse()
    checkEnrollmentStatus()
  }, [courseId, session])

  const fetchCourse = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/courses/${courseId}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch course details')
      }
      
      setCourse(data.course)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const checkEnrollmentStatus = async () => {
    if (!session) return
    
    try {
      const response = await fetch(`/api/enrollments/check?courseId=${courseId}`)
      const data = await response.json()
      setIsAlreadyEnrolled(data.enrolled)
    } catch (err) {
      console.error('Failed to check enrollment status:', err)
    }
  }

  const handleEnroll = async () => {
    if (!course || !session || isAlreadyEnrolled) return
    
    try {
      setIsEnrolling(true)
      setError('')
      
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: course.id,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to enroll in course')
      }
      
      router.push(`/courses/${courseId}/enrolled`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsEnrolling(false)
    }
  }

  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `$${price.toFixed(2)}`
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect to login
  }

  if (error && !course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Course not found</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Course Details */}
          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={course.thumbnail || '/placeholder.jpg'}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle className="text-2xl">{course.title}</CardTitle>
                <CardDescription className="text-base">
                  by {course.teacher.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">{course.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {course._count?.enrollments || 0} students
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {course._count?.contents || 0} lessons
                  </div>
                  {course.averageRating && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                      {course.averageRating.toFixed(1)} rating
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enrollment Card */}
          <div>
            <Card className="shadow-lg sticky top-8">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-blue-600">
                  {formatPrice(course.price)}
                </CardTitle>
                <CardDescription>
                  {course.price === 0 ? 'Free course' : 'One-time payment'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}
                
                <Button 
                  onClick={handleEnroll}
                  disabled={isEnrolling || isAlreadyEnrolled}
                  className="w-full"
                  size="lg"
                >
                  {getButtonContent()}
                </Button>
                
                {isAlreadyEnrolled && (
                  <div className="text-center">
                    <Button 
                      variant="outline" 
                      onClick={() => router.push(`/courses/${courseId}`)}
                      className="w-full"
                    >
                      Go to Course
                    </Button>
                  </div>
                )}
                
                <div className="text-xs text-gray-500 text-center">
                  <p>30-day money-back guarantee</p>
                  <p>Full lifetime access</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
