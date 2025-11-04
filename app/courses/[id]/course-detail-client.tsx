'use client'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
    ArrowLeft,
    Award,
    BookOpen,
    CheckCircle,
    Clock,
    Download,
    Heart,
    Monitor,
    Play,
    Share2,
    Smartphone,
    Star,
    Users
} from 'lucide-react'
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
  duration: string
  category: string
  isFree: boolean
  createdAt: string
  approvalStatus: string
  User: {
    id: string
    name: string
    email: string
  }
  Module: Array<{
    id: string
    title: string
    description: string
    videoUrl: string
    resources: string
    orderIndex: number
  }>
  _count?: {
    enrollments: number
    feedbacks: number
  }
  averageRating?: number
}

interface Review {
  id: string
  studentName: string
  rating: number
  comment: string
  date: string
}

interface CourseDetailClientProps {
  readonly courseId: string
}

export default function CourseDetailClient({ courseId }: CourseDetailClientProps) {
  const [course, setCourse] = useState<Course | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEnrolled, setIsEnrolled] = useState(false)
  
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    fetchCourseDetails()
    checkEnrollmentStatus()
  }, [courseId])

  const fetchCourseDetails = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/courses/${courseId}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch course details')
      }
      
      setCourse(data)
      
      // Mock reviews data (you can replace with actual API call)
      setReviews([
        {
          id: '1',
          studentName: 'John Smith',
          rating: 5,
          comment: 'Excellent course! Very well structured and easy to follow. The instructor explains everything clearly.',
          date: '2 days ago'
        },
        {
          id: '2',
          studentName: 'Sarah Johnson',
          rating: 4,
          comment: 'Great content and practical examples. Would recommend to anyone looking to learn this topic.',
          date: '1 week ago'
        },
        {
          id: '3',
          studentName: 'Michael Chen',
          rating: 5,
          comment: 'Outstanding course! The best investment I made this year. Highly practical and informative.',
          date: '2 weeks ago'
        }
      ])
    } catch (error) {
      console.error('Error fetching course details:', error)
      setError('Failed to load course details. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const checkEnrollmentStatus = async () => {
    if (!session) return
    
    try {
      const response = await fetch('/api/student/courses')
      const data = await response.json()
      
      if (response.ok && data.enrolledCourses) {
        const enrolled = data.enrolledCourses.some((c: any) => c.id === courseId)
        setIsEnrolled(enrolled)
      }
    } catch (error) {
      console.error('Error checking enrollment status:', error)
    }
  }

  const handleEnroll = () => {
    if (!session) {
      router.push('/login')
      return
    }
    router.push(`/courses/${courseId}/enroll`)
  }

  const handleGoToCourse = () => {
    router.push(`/courses/${courseId}/enrolled`)
  }

  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `₹${price.toLocaleString()}`
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const courseIncludes = [
    { icon: Monitor, text: 'Full lifetime access' },
    { icon: Smartphone, text: 'Access on mobile and TV' },
    { icon: Download, text: 'Downloadable resources' },
    { icon: Award, text: 'Certificate of completion' },
  ]



  if (isLoading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading course details...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !course) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error || 'Course not found'}
            </div>
            <Button onClick={() => router.push('/courses')}>
              Back to Courses
            </Button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.push('/courses')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Course Video/Image */}
              <Card className="mb-6">
                <CardContent className="p-0">
                  <div className="relative rounded-lg overflow-hidden bg-gray-900">
                    <Image
                      src={course.thumbnail || '/placeholder.svg'}
                      alt={course.title}
                      width={800}
                      height={450}
                      className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="rounded-full p-4">
                        <Play className="h-8 w-8 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Course Info */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {course.title}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  {course.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">
                      {course.averageRating || 4.8}
                    </span>
                    <span className="ml-1">
                      ({course._count?.feedbacks || 1234} reviews)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{course._count?.enrollments || 5678} students</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{course.duration || 'Variable duration'}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-600">Created by </span>
                  <span className="font-medium text-blue-600">
                    {course.User.name}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Course Content
                  </CardTitle>
                  <CardDescription>
                    {course.Module?.length || 0} modules • {course.duration || 'Variable duration'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.Module && course.Module.length > 0 ? (
                      course.Module.map((module) => (
                        <div key={module.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{module.title}</h3>
                            <span className="text-sm text-gray-500">
                              Module {module.orderIndex + 1}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{module.description}</p>
                          {module.videoUrl && (
                            <div className="flex items-center mt-2 text-sm text-blue-600">
                              <Play className="h-4 w-4 mr-1" />
                              Video Lesson
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No modules available for this course.</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Student Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="mr-2 h-5 w-5" />
                    Student Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {review.studentName.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium">{review.studentName}</h4>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex items-center mb-2">
                              {renderStars(review.rating)}
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  {/* Preview Video Button */}
                  <Button variant="outline" className="w-full mb-4">
                    <Play className="mr-2 h-4 w-4" />
                    Preview This Course
                  </Button>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900">
                      {formatPrice(course.price)}
                    </div>
                    {course.price > 0 && (
                      <div className="text-sm text-gray-500 line-through">
                        ₹{(course.price * 1.5).toLocaleString()}
                      </div>
                    )}
                  </div>

                  {/* Enroll/Purchase Buttons */}
                  {isEnrolled && (
                    <Button 
                      onClick={handleGoToCourse}
                      className="w-full mb-4 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Go to Course
                    </Button>
                  )}
                  
                  {!isEnrolled && course.isFree && (
                    <Button 
                      onClick={handleEnroll}
                      className="w-full mb-4 bg-blue-600 hover:bg-blue-700"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Enroll Now
                    </Button>
                  )}
                  
                  {!isEnrolled && !course.isFree && (
                    <>
                      <Button 
                        onClick={handleEnroll}
                        className="w-full mb-4 bg-purple-600 hover:bg-purple-700"
                      >
                        Add to Cart
                      </Button>
                      {/* Buy Now Button */}
                      <Button variant="outline" className="w-full mb-4">
                        Buy Now
                      </Button>
                    </>
                  )}

                  {!course.isFree && (
                    <div className="text-center text-sm text-gray-500 mb-6">
                      30-Day Money-Back Guarantee
                    </div>
                  )}

                  <Separator className="my-4" />

                  {/* This course includes */}
                  <div>
                    <h3 className="font-medium mb-3">This course includes:</h3>
                    <div className="space-y-2">
                      {courseIncludes.map((item) => (
                        <div key={item.text} className="flex items-center text-sm">
                          <item.icon className="h-4 w-4 mr-2 text-gray-600" />
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Share and Wishlist */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Heart className="h-4 w-4 mr-1" />
                      Wishlist
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}