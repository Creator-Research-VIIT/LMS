import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Code,
  Palette,
  BarChart3,
  Smartphone,
  Megaphone,
  Briefcase,
  Camera,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

export default function CategoriesPage() {
  const categories = [
    {
      id: 1,
      name: "Web Development",
      description: "Build modern websites and web applications",
      icon: Code,
      courseCount: 245,
      color: "bg-blue-100 text-blue-600",
      popular: true,
    },
    {
      id: 2,
      name: "Programming",
      description: "Learn programming languages and software development",
      icon: BookOpen,
      courseCount: 189,
      color: "bg-green-100 text-green-600",
      popular: true,
    },
    {
      id: 3,
      name: "Design",
      description: "UI/UX design, graphic design, and creative skills",
      icon: Palette,
      courseCount: 156,
      color: "bg-purple-100 text-purple-600",
      popular: true,
    },
    {
      id: 4,
      name: "Data Science",
      description: "Analytics, machine learning, and data visualization",
      icon: BarChart3,
      courseCount: 98,
      color: "bg-orange-100 text-orange-600",
      popular: true,
    },
    {
      id: 5,
      name: "Mobile Development",
      description: "iOS, Android, and cross-platform app development",
      icon: Smartphone,
      courseCount: 87,
      color: "bg-indigo-100 text-indigo-600",
      popular: false,
    },
    {
      id: 6,
      name: "Marketing",
      description: "Digital marketing, SEO, and social media strategies",
      icon: Megaphone,
      courseCount: 134,
      color: "bg-pink-100 text-pink-600",
      popular: false,
    },
    {
      id: 7,
      name: "Business",
      description: "Entrepreneurship, management, and business skills",
      icon: Briefcase,
      courseCount: 167,
      color: "bg-yellow-100 text-yellow-600",
      popular: false,
    },
    {
      id: 8,
      name: "Photography",
      description: "Photography techniques, editing, and visual storytelling",
      icon: Camera,
      courseCount: 76,
      color: "bg-red-100 text-red-600",
      popular: false,
    },
  ]

  const popularCategories = categories.filter((cat) => cat.popular)
  const otherCategories = categories.filter((cat) => !cat.popular)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Categories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover courses across various fields and find your passion. From technology to creative arts, we have
            something for everyone.
          </p>
        </div>

        {/* Popular Categories */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Popular Categories</h2>
            <Badge variant="secondary">Most Enrolled</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.color}`}>
                      <category.icon className="h-6 w-6" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{category.courseCount} courses</span>
                    <Link href={`/courses?category=${encodeURIComponent(category.name)}`}>
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                        Explore
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Categories */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Categories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${category.color}`}>
                      <category.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                      <p className="text-gray-600 mb-2">{category.description}</p>
                      <span className="text-sm text-gray-500">{category.courseCount} courses available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link href={`/courses?category=${encodeURIComponent(category.name)}`}>
                        <Button size="sm">
                          Explore
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
              <p className="text-xl mb-8 opacity-90">Join thousands of students already learning on our platform</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/student/register">
                  <Button size="lg" variant="secondary">
                    Get Started for Free
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    Browse All Courses
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
