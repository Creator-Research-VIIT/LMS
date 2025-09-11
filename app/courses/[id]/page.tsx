"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  Users,
  Clock,
  BookOpen,
  Award,
  Play,
  Download,
  Share2,
  Heart,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  PlayCircle,
  FileText,
  Globe,
  Smartphone,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [expandedSections, setExpandedSections] = useState<{ [key: number]: boolean }>({})

  // Mock course data - in real app, this would be fetched based on params.id
  const course = {
    id: Number.parseInt(params.id),
    title: "Complete React Development Course",
    subtitle: "Master React from basics to advanced concepts including hooks, context, and modern patterns",
    instructor: {
      name: "John Smith",
      title: "Senior Full Stack Developer",
      avatar: "/instructor-avatar.png",
      rating: 4.8,
      students: 25420,
      courses: 12,
      bio: "John is a senior full-stack developer with over 8 years of experience building web applications. He has worked at companies like Google and Facebook, and now teaches programming to help others break into tech.",
    },
    category: "Web Development",
    level: "Intermediate",
    price: 89.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 1234,
    students: 15420,
    duration: "42 hours",
    lessons: 156,
    language: "English",
    lastUpdated: "January 2024",
    thumbnail: "/react-course-thumbnail.png",
    previewVideo: "/course-preview.mp4",
    description: `This comprehensive React course will take you from beginner to advanced level. You'll learn modern React development including hooks, context API, state management, and best practices used in production applications.

Perfect for developers who want to master React and build professional web applications. No prior React experience required - we'll start from the basics and work our way up to advanced concepts.`,
    whatYouWillLearn: [
      "Build modern React applications from scratch",
      "Master React Hooks including useState, useEffect, and custom hooks",
      "Understand React Context API for state management",
      "Learn React Router for navigation",
      "Implement authentication and authorization",
      "Work with APIs and handle asynchronous operations",
      "Deploy React applications to production",
      "Follow React best practices and patterns",
    ],
    requirements: [
      "Basic knowledge of HTML, CSS, and JavaScript",
      "Familiarity with ES6+ JavaScript features",
      "A computer with internet connection",
      "Code editor (VS Code recommended)",
    ],
    targetAudience: [
      "Web developers who want to learn React",
      "JavaScript developers looking to expand their skills",
      "Students preparing for React developer roles",
      "Anyone interested in modern web development",
    ],
    bestseller: true,
    certificate: true,
    mobileAccess: true,
    lifetime: true,
  }

  const curriculum = [
    {
      id: 1,
      title: "Getting Started with React",
      lessons: 8,
      duration: "2h 30m",
      lectures: [
        { id: 1, title: "Introduction to React", duration: "15:30", type: "video", preview: true },
        { id: 2, title: "Setting up Development Environment", duration: "20:45", type: "video", preview: false },
        { id: 3, title: "Your First React Component", duration: "18:20", type: "video", preview: true },
        { id: 4, title: "Understanding JSX", duration: "22:15", type: "video", preview: false },
        { id: 5, title: "Props and Components", duration: "25:30", type: "video", preview: false },
        { id: 6, title: "Exercise: Building a Profile Card", duration: "30:00", type: "exercise", preview: false },
        { id: 7, title: "React Developer Tools", duration: "12:45", type: "video", preview: false },
        { id: 8, title: "Section Quiz", duration: "10:00", type: "quiz", preview: false },
      ],
    },
    {
      id: 2,
      title: "React Hooks Deep Dive",
      lessons: 12,
      duration: "4h 15m",
      lectures: [
        { id: 9, title: "Introduction to Hooks", duration: "18:30", type: "video", preview: false },
        { id: 10, title: "useState Hook", duration: "25:45", type: "video", preview: false },
        { id: 11, title: "useEffect Hook", duration: "32:20", type: "video", preview: false },
        { id: 12, title: "useContext Hook", duration: "28:15", type: "video", preview: false },
        // ... more lectures
      ],
    },
    {
      id: 3,
      title: "State Management",
      lessons: 10,
      duration: "3h 45m",
      lectures: [
        { id: 20, title: "Understanding State", duration: "20:30", type: "video", preview: false },
        { id: 21, title: "Context API", duration: "35:45", type: "video", preview: false },
        // ... more lectures
      ],
    },
    {
      id: 4,
      title: "React Router",
      lessons: 8,
      duration: "2h 50m",
      lectures: [],
    },
    {
      id: 5,
      title: "Advanced Patterns",
      lessons: 15,
      duration: "5h 20m",
      lectures: [],
    },
  ]

  const reviews = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "/user-avatar-1.png",
      },
      rating: 5,
      date: "2024-01-15",
      comment:
        "Excellent course! John explains everything clearly and the projects are really practical. I went from knowing nothing about React to building my own applications.",
      helpful: 24,
    },
    {
      id: 2,
      user: {
        name: "Mike Chen",
        avatar: "/user-avatar-2.png",
      },
      rating: 5,
      date: "2024-01-10",
      comment:
        "Best React course I've taken. The instructor is knowledgeable and the content is up-to-date with the latest React features. Highly recommended!",
      helpful: 18,
    },
    {
      id: 3,
      user: {
        name: "Emily Davis",
        avatar: "/user-avatar-3.png",
      },
      rating: 4,
      date: "2024-01-08",
      comment:
        "Great course overall. Some sections could be a bit more detailed, but the practical projects make up for it. Good value for money.",
      helpful: 12,
    },
  ]

  const relatedCourses = [
    {
      id: 2,
      title: "Advanced JavaScript ES6+",
      instructor: "Anna Lee",
      price: 79.99,
      rating: 4.7,
      students: 8920,
      thumbnail: "/javascript-course.png",
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      instructor: "Tom Wilson",
      price: 94.99,
      rating: 4.6,
      students: 6540,
      thumbnail: "/nodejs-course.png",
    },
  ]

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const getLectureIcon = (type: string) => {
    switch (type) {
      case "video":
        return <PlayCircle className="h-4 w-4" />
      case "exercise":
        return <FileText className="h-4 w-4" />
      case "quiz":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <PlayCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
                {course.bestseller && <Badge className="bg-orange-500 hover:bg-orange-600">Bestseller</Badge>}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{course.subtitle}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="ml-1">({course.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.duration} total</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{course.lessons} lectures</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  <span>{course.language}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-8">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} alt={course.instructor.name} />
                  <AvatarFallback>
                    {course.instructor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">Created by {course.instructor.name}</p>
                  <p className="text-sm text-gray-600">{course.instructor.title}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600">Last updated {course.lastUpdated}</p>
            </div>

            {/* Course Content Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About this course</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{course.description}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What you'll learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {course.whatYouWillLearn.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {course.requirements.map((req, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-gray-400 mt-2">•</span>
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Who this course is for</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {course.targetAudience.map((audience, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-gray-400 mt-2">•</span>
                            <span className="text-gray-700">{audience}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Content</CardTitle>
                    <CardDescription>
                      {curriculum.length} sections • {curriculum.reduce((acc, section) => acc + section.lessons, 0)}{" "}
                      lectures • {course.duration} total length
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {curriculum.map((section) => (
                        <div key={section.id} className="border rounded-lg">
                          <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                          >
                            <div className="flex items-center space-x-3">
                              {expandedSections[section.id] ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                              <div>
                                <h4 className="font-medium text-gray-900">{section.title}</h4>
                                <p className="text-sm text-gray-600">
                                  {section.lessons} lectures • {section.duration}
                                </p>
                              </div>
                            </div>
                          </button>

                          {expandedSections[section.id] && section.lectures.length > 0 && (
                            <div className="border-t">
                              {section.lectures.map((lecture) => (
                                <div
                                  key={lecture.id}
                                  className="flex items-center justify-between p-4 pl-12 hover:bg-gray-50"
                                >
                                  <div className="flex items-center space-x-3">
                                    {getLectureIcon(lecture.type)}
                                    <span className="text-gray-700">{lecture.title}</span>
                                    {lecture.preview && (
                                      <Badge variant="outline" className="text-xs">
                                        Preview
                                      </Badge>
                                    )}
                                  </div>
                                  <span className="text-sm text-gray-500">{lecture.duration}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage
                          src={course.instructor.avatar || "/placeholder.svg"}
                          alt={course.instructor.name}
                        />
                        <AvatarFallback className="text-2xl">
                          {course.instructor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.instructor.name}</h3>
                        <p className="text-lg text-gray-600 mb-4">{course.instructor.title}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="font-medium">{course.instructor.rating}</span>
                            </div>
                            <p className="text-sm text-gray-600">Instructor Rating</p>
                          </div>
                          <div className="text-center">
                            <div className="font-medium mb-1">{course.instructor.students.toLocaleString()}</div>
                            <p className="text-sm text-gray-600">Students</p>
                          </div>
                          <div className="text-center">
                            <div className="font-medium mb-1">{course.instructor.courses}</div>
                            <p className="text-sm text-gray-600">Courses</p>
                          </div>
                          <div className="text-center">
                            <div className="font-medium mb-1">5+</div>
                            <p className="text-sm text-gray-600">Years Experience</p>
                          </div>
                        </div>

                        <p className="text-gray-700 leading-relaxed">{course.instructor.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                    <CardDescription>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-500 mr-1" />
                          <span className="text-lg font-medium">{course.rating}</span>
                        </div>
                        <span className="text-gray-600">({course.reviews.toLocaleString()} reviews)</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Rating Breakdown */}
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1 w-16">
                              <span className="text-sm">{rating}</span>
                              <Star className="h-3 w-3 text-yellow-500" />
                            </div>
                            <Progress value={rating === 5 ? 75 : rating === 4 ? 20 : 5} className="flex-1" />
                            <span className="text-sm text-gray-600 w-12">
                              {rating === 5 ? "75%" : rating === 4 ? "20%" : "5%"}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Individual Reviews */}
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <div key={review.id} className="border-b pb-6 last:border-b-0">
                            <div className="flex items-start space-x-4">
                              <Avatar>
                                <AvatarImage src={review.user.avatar || "/placeholder.svg"} alt={review.user.name} />
                                <AvatarFallback>
                                  {review.user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h4 className="font-medium text-gray-900">{review.user.name}</h4>
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-500">
                                    {new Date(review.date).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-gray-700 mb-3">{review.comment}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <button className="hover:text-gray-700">Helpful ({review.helpful})</button>
                                  <button className="hover:text-gray-700">Report</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Related Courses */}
            <Card>
              <CardHeader>
                <CardTitle>Students also bought</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedCourses.map((relatedCourse) => (
                    <div key={relatedCourse.id} className="flex space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                      <img
                        src={relatedCourse.thumbnail || "/placeholder.svg"}
                        alt={relatedCourse.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{relatedCourse.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">by {relatedCourse.instructor}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-sm">{relatedCourse.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500">({relatedCourse.students})</span>
                          </div>
                          <span className="font-medium">${relatedCourse.price}</span>
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
            <div className="sticky top-8 space-y-6">
              {/* Course Preview */}
              <Card>
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Button
                      size="lg"
                      className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/90 hover:bg-white text-gray-900"
                    >
                      <Play className="h-6 w-6 ml-1" />
                    </Button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-3xl font-bold text-gray-900">${course.price}</span>
                      <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
                      <Badge variant="destructive" className="text-xs">
                        55% OFF
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-6">
                      <Button size="lg" className="w-full">
                        Enroll Now
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => setIsWishlisted(!isWishlisted)}
                      >
                        <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
                        {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                      </Button>
                    </div>

                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-600">30-Day Money-Back Guarantee</p>
                    </div>

                    <div className="space-y-3 text-sm">
                      <h4 className="font-medium text-gray-900">This course includes:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{course.duration} on-demand video</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Download className="h-4 w-4 text-gray-500" />
                          <span>Downloadable resources</span>
                        </div>
                        {course.mobileAccess && (
                          <div className="flex items-center space-x-2">
                            <Smartphone className="h-4 w-4 text-gray-500" />
                            <span>Access on mobile and TV</span>
                          </div>
                        )}
                        {course.lifetime && (
                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4 text-gray-500" />
                            <span>Full lifetime access</span>
                          </div>
                        )}
                        {course.certificate && (
                          <div className="flex items-center space-x-2">
                            <Award className="h-4 w-4 text-gray-500" />
                            <span>Certificate of completion</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-6 pt-6 border-t">
                      <Button size="sm" variant="ghost" className="flex-1">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button size="sm" variant="ghost" className="flex-1">
                        Gift this course
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
