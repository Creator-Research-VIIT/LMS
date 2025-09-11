"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Play, Clock, Award, Search, Star, Download } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StudentCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const enrolledCourses = [
    {
      id: 1,
      title: "Complete React Development Course",
      instructor: "John Smith",
      category: "Web Development",
      progress: 65,
      totalLessons: 45,
      completedLessons: 29,
      totalDuration: "42 hours",
      completedDuration: "27 hours",
      nextLesson: "React Hooks Deep Dive",
      thumbnail: "/react-course-thumbnail.png",
      enrolledDate: "2024-01-10",
      lastAccessed: "2024-01-20",
      rating: 4.8,
      status: "in-progress",
      certificate: false,
    },
    {
      id: 2,
      title: "Advanced Python Programming",
      instructor: "Sarah Johnson",
      category: "Programming",
      progress: 32,
      totalLessons: 38,
      completedLessons: 12,
      totalDuration: "38 hours",
      completedDuration: "12 hours",
      nextLesson: "Object-Oriented Programming",
      thumbnail: "/python-course-thumbnail.png",
      enrolledDate: "2024-01-15",
      lastAccessed: "2024-01-19",
      rating: 4.9,
      status: "in-progress",
      certificate: false,
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Mike Chen",
      category: "Design",
      progress: 78,
      totalLessons: 25,
      completedLessons: 19,
      totalDuration: "25 hours",
      completedDuration: "19 hours",
      nextLesson: "Prototyping with Figma",
      thumbnail: "/ui-ux-course-thumbnail.png",
      enrolledDate: "2024-01-05",
      lastAccessed: "2024-01-18",
      rating: 4.7,
      status: "in-progress",
      certificate: false,
    },
    {
      id: 4,
      title: "HTML & CSS Basics",
      instructor: "Tom Wilson",
      category: "Web Development",
      progress: 100,
      totalLessons: 20,
      completedLessons: 20,
      totalDuration: "15 hours",
      completedDuration: "15 hours",
      nextLesson: null,
      thumbnail: "/html-css-course.png",
      enrolledDate: "2023-12-15",
      lastAccessed: "2024-01-02",
      rating: 4.6,
      status: "completed",
      certificate: true,
    },
    {
      id: 5,
      title: "JavaScript Fundamentals",
      instructor: "Anna Lee",
      category: "Programming",
      progress: 100,
      totalLessons: 30,
      completedLessons: 30,
      totalDuration: "28 hours",
      completedDuration: "28 hours",
      nextLesson: null,
      thumbnail: "/javascript-course.png",
      enrolledDate: "2023-12-20",
      lastAccessed: "2024-01-08",
      rating: 4.8,
      status: "completed",
      certificate: true,
    },
  ]

  const wishlistCourses = [
    {
      id: 6,
      title: "Data Science with Machine Learning",
      instructor: "Emily Davis",
      category: "Data Science",
      price: 99.99,
      originalPrice: 179.99,
      rating: 4.6,
      reviews: 1089,
      students: 12340,
      duration: "55 hours",
      thumbnail: "/data-science-course-thumbnail.png",
      addedDate: "2024-01-18",
    },
    {
      id: 7,
      title: "Mobile App Development with Flutter",
      instructor: "Alex Rodriguez",
      category: "Mobile Development",
      price: 84.99,
      originalPrice: 159.99,
      rating: 4.5,
      reviews: 567,
      students: 4230,
      duration: "48 hours",
      thumbnail: "/flutter-course-thumbnail.png",
      addedDate: "2024-01-16",
    },
  ]

  const certificates = [
    {
      id: 1,
      courseTitle: "HTML & CSS Basics",
      instructor: "Tom Wilson",
      completedDate: "2024-01-02",
      certificateId: "CERT-HTML-001",
    },
    {
      id: 2,
      courseTitle: "JavaScript Fundamentals",
      instructor: "Anna Lee",
      completedDate: "2024-01-08",
      certificateId: "CERT-JS-002",
    },
  ]

  const filteredCourses = enrolledCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || course.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="student" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Learning</h1>
          <p className="text-gray-600 mt-2">Track your progress and continue learning</p>
        </div>

        <Tabs defaultValue="enrolled" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-96">
            <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="enrolled" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Courses</p>
                      <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">In Progress</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {enrolledCourses.filter((c) => c.status === "in-progress").length}
                      </p>
                    </div>
                    <Play className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {enrolledCourses.filter((c) => c.status === "completed").length}
                      </p>
                    </div>
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Hours</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {enrolledCourses.reduce((acc, course) => {
                          const hours = Number.parseInt(course.completedDuration.split(" ")[0])
                          return acc + hours
                        }, 0)}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search your courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Courses List */}
            <div className="space-y-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-64 h-48 md:h-auto">
                        <img
                          src={course.thumbnail || "/placeholder.svg"}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="secondary">{course.category}</Badge>
                              <Badge variant={getStatusColor(course.status)}>
                                {course.status === "in-progress" ? "In Progress" : "Completed"}
                              </Badge>
                              {course.certificate && <Badge className="bg-green-100 text-green-800">Certified</Badge>}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                            <p className="text-gray-600 mb-4">by {course.instructor}</p>

                            <div className="space-y-3">
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-gray-700">Progress</span>
                                  <span className="text-sm text-gray-600">{course.progress}%</span>
                                </div>
                                <Progress value={course.progress} className="h-2" />
                              </div>

                              <div className="flex items-center space-x-6 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <BookOpen className="h-4 w-4 mr-1" />
                                  <span>
                                    {course.completedLessons}/{course.totalLessons} lessons
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>
                                    {course.completedDuration} / {course.totalDuration}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                                  <span>{course.rating}</span>
                                </div>
                              </div>

                              {course.nextLesson && <p className="text-sm text-blue-600">Next: {course.nextLesson}</p>}
                            </div>
                          </div>

                          <div className="flex flex-col space-y-2 ml-4">
                            {course.status === "completed" ? (
                              <>
                                <Button size="sm">
                                  <Award className="h-4 w-4 mr-2" />
                                  View Certificate
                                </Button>
                                <Button size="sm" variant="outline">
                                  Review Course
                                </Button>
                              </>
                            ) : (
                              <>
                                <Link href={`/courses/${course.id}/learn`}>
                                  <Button size="sm">
                                    <Play className="h-4 w-4 mr-2" />
                                    Continue
                                  </Button>
                                </Link>
                                <Button size="sm" variant="outline">
                                  <Download className="h-4 w-4 mr-2" />
                                  Resources
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
                <CardDescription>Courses you want to take later</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {wishlistCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <img
                          src={course.thumbnail || "/placeholder.svg"}
                          alt={course.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <Badge variant="secondary" className="mb-2">
                            {course.category}
                          </Badge>
                          <h4 className="font-semibold text-gray-900 mb-2">{course.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>

                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span>
                                {course.rating} ({course.reviews})
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{course.duration}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-gray-900">${course.price}</span>
                              <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button size="sm" className="flex-1">
                              Enroll Now
                            </Button>
                            <Button size="sm" variant="outline">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Certificates</CardTitle>
                <CardDescription>Certificates earned from completed courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Award className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{cert.courseTitle}</h4>
                          <p className="text-sm text-gray-600">by {cert.instructor}</p>
                          <p className="text-xs text-gray-500">
                            Completed on {new Date(cert.completedDate).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">Certificate ID: {cert.certificateId}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline">
                          Share
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
