"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, Star, Clock, Users, Trash2, ShoppingCart } from "lucide-react"
import Image from "next/image"

export default function StudentWishlist() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("added")

  const wishlistCourses = [
    {
      id: 1,
      title: "Advanced React Patterns",
      instructor: "Sarah Johnson",
      rating: 4.8,
      students: 12500,
      duration: "8 hours",
      price: 89.99,
      originalPrice: 129.99,
      thumbnail: "/react-course-thumbnail.png",
      category: "Web Development",
      level: "Advanced",
      addedDate: "2024-01-15",
    },
    {
      id: 2,
      title: "Machine Learning with Python",
      instructor: "Dr. Michael Chen",
      rating: 4.9,
      students: 8900,
      duration: "12 hours",
      price: 94.99,
      originalPrice: 149.99,
      thumbnail: "/python-course-thumbnail.png",
      category: "Data Science",
      level: "Intermediate",
      addedDate: "2024-01-10",
    },
    {
      id: 3,
      title: "AWS Cloud Architecture",
      instructor: "David Wilson",
      rating: 4.7,
      students: 15600,
      duration: "10 hours",
      price: 79.99,
      originalPrice: 119.99,
      thumbnail: "/aws-cloud-architecture.png",
      category: "Cloud Computing",
      level: "Intermediate",
      addedDate: "2024-01-08",
    },
    {
      id: 4,
      title: "UI/UX Design Masterclass",
      instructor: "Emma Rodriguez",
      rating: 4.6,
      students: 9800,
      duration: "15 hours",
      price: 69.99,
      originalPrice: 99.99,
      thumbnail: "/ui-ux-design-course.png",
      category: "Design",
      level: "Beginner",
      addedDate: "2024-01-05",
    },
  ]

  const removeFromWishlist = (courseId: number) => {
    // Handle remove from wishlist
    console.log("Removing course:", courseId)
  }

  const addToCart = (courseId: number) => {
    // Handle add to cart
    console.log("Adding to cart:", courseId)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">Courses you want to take later</p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search wishlist courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="added">Recently Added</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Wishlist Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{wishlistCourses.length}</div>
                <div className="text-sm text-gray-600">Total Courses</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${wishlistCourses.reduce((sum, course) => sum + course.price, 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Total Value</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  ${wishlistCourses.reduce((sum, course) => sum + (course.originalPrice - course.price), 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Total Savings</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {wishlistCourses.reduce((sum, course) => sum + Number.parseInt(course.duration), 0)}h
                </div>
                <div className="text-sm text-gray-600">Total Duration</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistCourses.map((course) => (
            <Card key={course.id} className="group hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => removeFromWishlist(course.id)}
                >
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </Button>
                <Badge className="absolute bottom-2 left-2" variant="secondary">
                  {course.category}
                </Badge>
              </div>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-sm text-gray-600">by {course.instructor}</p>

                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                    <Badge variant="outline" className="text-xs">
                      {course.level}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">${course.price}</span>
                      <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1" onClick={() => addToCart(course.id)}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => removeFromWishlist(course.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {wishlistCourses.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-4">Start adding courses you're interested in!</p>
              <Button>Browse Courses</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
