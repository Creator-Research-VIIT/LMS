'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { BookOpen, Clock, Filter, IndianRupee, Loader2, Search, Star, Users } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  price: number
  teacherId: string
  createdAt: string
  approvalStatus: string
  User: {
    id: string
    name: string
  }
  _count?: {
    enrollments: number
    feedbacks: number
  }
  averageRating?: number
}

export default function CoursesPageClient() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'price-low' | 'price-high' | 'popular'>('newest')
  const [error, setError] = useState('')
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()

  // Initialize from URL parameters
  useEffect(() => {
    const urlSearch = searchParams.get('search')
    const urlCategory = searchParams.get('category')
    
    if (urlSearch) {
      setSearchTerm(urlSearch)
    }
    
    if (urlCategory) {
      // For category filtering, we'll search for course titles/descriptions that match the category
      setSearchTerm(urlCategory)
    }
  }, [searchParams])

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    filterAndSortCourses()
  }, [courses, searchTerm, priceFilter, sortBy])

  const fetchCourses = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/courses')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch courses')
      }
      
      setCourses(data.courses || [])
    } catch (error) {
      console.error('Error fetching courses:', error)
      setError('Failed to load courses. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const filterAndSortCourses = () => {
    let filtered = [...courses]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.User.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Price filter
    if (priceFilter === 'free') {
      filtered = filtered.filter(course => course.price === 0)
    } else if (priceFilter === 'paid') {
      filtered = filtered.filter(course => course.price > 0)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'popular':
          return (b._count?.enrollments || 0) - (a._count?.enrollments || 0)
        default:
          return 0
      }
    })

    setFilteredCourses(filtered)
  }

  const handleViewDetails = (courseId: string) => {
    router.push(`/courses/${courseId}`)
  }

  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `₹${price.toFixed(2)}`
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
          <Button onClick={fetchCourses} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Courses</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover amazing courses from expert instructors and enhance your skills
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Price Filter */}
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Prices</option>
            <option value="free">Free Only</option>
            <option value="paid">Paid Only</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>

          {/* Results count */}
          <div className="flex items-center text-gray-600">
            <Filter className="h-4 w-4 mr-2" />
            {filteredCourses.length} courses found
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="group hover:shadow-lg transition-shadow duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.jpg';
                  }}
                />
                <div className="absolute top-3 right-3">
                  <Badge variant={course.price === 0 ? "secondary" : "default"}>
                    {formatPrice(course.price)}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </CardTitle>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  <span>by {course.User.name}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <CardDescription className="line-clamp-3 mb-4">
                  {course.description}
                </CardDescription>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    <span>{course.averageRating?.toFixed(1) || 'New'}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{course._count?.enrollments || 0} students</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{new Date(course.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center font-bold text-lg">
                    <IndianRupee className="h-5 w-5 mr-1 text-green-600" />
                    <span className={course.price === 0 ? 'text-green-600' : 'text-gray-900'}>
                      {formatPrice(course.price)}
                    </span>
                  </div>
                  <Button 
                    onClick={() => handleViewDetails(course.id)}
                    className="px-6"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Call to Action for Teachers */}
      {session?.user?.role === 'TEACHER' && (
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Teach?</h3>
          <p className="text-blue-100 mb-6">
            Share your expertise with thousands of learners worldwide
          </p>
          <Button 
            variant="secondary" 
            onClick={() => router.push('/teacher')}
            className="px-8"
          >
            Create Your Course
          </Button>
        </div>
      )}
    </div>
  )
}