"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Grid, List, Star, Users, Clock, BookOpen, Heart } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const courses = [
    {
      id: 1,
      title: "Complete React Development Course",
      instructor: "John Smith",
      category: "Web Development",
      level: "Intermediate",
      price: 89.99,
      originalPrice: 199.99,
      rating: 4.8,
      reviews: 1234,
      students: 15420,
      duration: "42 hours",
      lessons: 156,
      thumbnail: "/react-course-thumbnail.png",
      description: "Master React from basics to advanced concepts including hooks, context, and modern patterns.",
      bestseller: true,
      updated: "2024-01-15",
    },
    {
      id: 2,
      title: "Advanced Python Programming",
      instructor: "Sarah Johnson",
      category: "Programming",
      level: "Advanced",
      price: 79.99,
      originalPrice: 149.99,
      rating: 4.9,
      reviews: 856,
      students: 8920,
      duration: "38 hours",
      lessons: 142,
      thumbnail: "/python-course-thumbnail.png",
      description: "Deep dive into Python with advanced topics like decorators, metaclasses, and async programming.",
      bestseller: false,
      updated: "2024-01-10",
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Mike Chen",
      category: "Design",
      level: "Beginner",
      price: 69.99,
      originalPrice: 129.99,
      rating: 4.7,
      reviews: 642,
      students: 5680,
      duration: "25 hours",
      lessons: 89,
      thumbnail: "/ui-ux-course-thumbnail.png",
      description: "Learn the principles of user interface and user experience design from scratch.",
      bestseller: false,
      updated: "2024-01-12",
    },
    {
      id: 4,
      title: "Data Science with Machine Learning",
      instructor: "Emily Davis",
      category: "Data Science",
      level: "Intermediate",
      price: 99.99,
      originalPrice: 179.99,
      rating: 4.6,
      reviews: 1089,
      students: 12340,
      duration: "55 hours",
      lessons: 198,
      thumbnail: "/data-science-course-thumbnail.png",
      description: "Complete data science course covering statistics, machine learning, and Python libraries.",
      bestseller: true,
      updated: "2024-01-08",
    },
    {
      id: 5,
      title: "Mobile App Development with Flutter",
      instructor: "Alex Rodriguez",
      category: "Mobile Development",
      level: "Intermediate",
      price: 84.99,
      originalPrice: 159.99,
      rating: 4.5,
      reviews: 567,
      students: 4230,
      duration: "48 hours",
      lessons: 167,
      thumbnail: "/flutter-course-thumbnail.png",
      description: "Build beautiful cross-platform mobile apps using Flutter and Dart programming language.",
      bestseller: false,
      updated: "2024-01-20",
    },
    {
      id: 6,
      title: "Digital Marketing Masterclass",
      instructor: "Lisa Wang",
      category: "Marketing",
      level: "Beginner",
      price: 59.99,
      originalPrice: 119.99,
      rating: 4.4,
      reviews: 892,
      students: 7650,
      duration: "32 hours",
      lessons: 124,
      thumbnail: "/digital-marketing-course-thumbnail.png",
      description: "Master digital marketing strategies including SEO, social media, and content marketing.",
      bestseller: false,
      updated: "2024-01-05",
    },
  ]

  const categories = [
    "Web Development",
    "Programming",
    "Design",
    "Data Science",
    "Mobile Development",
    "Marketing",
    "Business",
    "Photography",
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter
    const matchesLevel = levelFilter === "all" || course.level === levelFilter

    let matchesPrice = true
    if (priceFilter === "free") matchesPrice = course.price === 0
    else if (priceFilter === "paid") matchesPrice = course.price > 0
    else if (priceFilter === "under50") matchesPrice = course.price < 50
    else if (priceFilter === "50to100") matchesPrice = course.price >= 50 && course.price <= 100
    else if (priceFilter === "over100") matchesPrice = course.price > 100

    return matchesSearch && matchesCategory && matchesLevel && matchesPrice
  })

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.students - a.students
      case "rating":
        return b.rating - a.rating
      case "newest":
        return new Date(b.updated).getTime() - new Date(a.updated).getTime()
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      default:
        return 0
    }
  })

  const CourseCard = ({ course }: { course: (typeof courses)[0] }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="relative">
          <img src={course.thumbnail || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
          {course.bestseller && (
            <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">Bestseller</Badge>
          )}
          <Button size="sm" variant="ghost" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              {course.category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {course.level}
            </Badge>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
          <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>

          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="font-medium">{course.rating}</span>
              <span className="ml-1">({course.reviews})</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{course.duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">${course.price}</span>
              {course.originalPrice > course.price && (
                <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
              )}
            </div>
            <Link href={`/courses/${course.id}`}>
              <Button size="sm">View Course</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const CourseListItem = ({ course }: { course: (typeof courses)[0] }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="flex">
          <div className="relative w-64 h-40">
            <img
              src={course.thumbnail || "/placeholder.svg"}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            {course.bestseller && (
              <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">Bestseller</Badge>
            )}
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  {course.category}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {course.level}
                </Badge>
              </div>
              <Button size="sm" variant="ghost">
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-2">by {course.instructor}</p>
            <p className="text-gray-600 mb-4">{course.description}</p>

            <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium">{course.rating}</span>
                <span className="ml-1">({course.reviews} reviews)</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{course.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                <span>{course.lessons} lessons</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">${course.price}</span>
                {course.originalPrice > course.price && (
                  <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
                )}
              </div>
              <Link href={`/courses/${course.id}`}>
                <Button>View Course</Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Explore Courses</h1>
          <p className="text-gray-600 mt-2">Discover your next learning adventure</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search courses, instructors, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filter Row */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="under50">Under $50</SelectItem>
                    <SelectItem value="50to100">$50 - $100</SelectItem>
                    <SelectItem value="over100">Over $100</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Courses Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {sortedCourses.map((course) => (
              <CourseListItem key={course.id} course={course} />
            ))}
          </div>
        )}

        {sortedCourses.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setCategoryFilter("all")
                  setLevelFilter("all")
                  setPriceFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
