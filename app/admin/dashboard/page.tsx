import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, DollarSign, TrendingUp, Plus, MoreHorizontal, Eye, Edit } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  const stats = [
    {
      title: "Total Students",
      value: "12,543",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Courses",
      value: "1,247",
      change: "+8%",
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: "+23%",
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "Completion Rate",
      value: "87%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  const recentCourses = [
    {
      id: 1,
      title: "Complete React Development Course",
      instructor: "John Smith",
      students: 1234,
      revenue: "$12,450",
      status: "published",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Advanced Python Programming",
      instructor: "Sarah Johnson",
      students: 856,
      revenue: "$8,560",
      status: "published",
      rating: 4.9,
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Mike Chen",
      students: 642,
      revenue: "$6,420",
      status: "draft",
      rating: 4.7,
    },
    {
      id: 4,
      title: "Data Science with Machine Learning",
      instructor: "Emily Davis",
      students: 1089,
      revenue: "$10,890",
      status: "published",
      rating: 4.6,
    },
  ]

  const recentUsers = [
    {
      id: 1,
      name: "Alex Thompson",
      email: "alex@example.com",
      role: "Student",
      joinDate: "2024-01-15",
      courses: 3,
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@example.com",
      role: "Instructor",
      joinDate: "2024-01-10",
      courses: 12,
    },
    {
      id: 3,
      name: "David Wilson",
      email: "david@example.com",
      role: "Student",
      joinDate: "2024-01-12",
      courses: 1,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="admin" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your learning platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Courses */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Courses</CardTitle>
                <CardDescription>Latest course activity and performance</CardDescription>
              </div>
              <Link href="/admin/courses">
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Course
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{course.title}</h4>
                      <p className="text-sm text-gray-600">by {course.instructor}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-500">{course.students} students</span>
                        <span className="text-sm text-gray-500">★ {course.rating}</span>
                        <Badge variant={course.status === "published" ? "default" : "secondary"}>{course.status}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{course.revenue}</p>
                      <div className="flex items-center space-x-1 mt-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Users */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>New registrations and user activity</CardDescription>
              </div>
              <Link href="/admin/users">
                <Button size="sm" variant="outline">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={user.role === "Instructor" ? "default" : "secondary"}>{user.role}</Badge>
                          <span className="text-xs text-gray-500">{user.courses} courses</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{user.joinDate}</p>
                      <Button size="sm" variant="ghost" className="mt-1">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/admin/courses/new">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center bg-transparent"
                >
                  <Plus className="h-6 w-6 mb-2" />
                  Create Course
                </Button>
              </Link>
              <Link href="/admin/users">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center bg-transparent"
                >
                  <Users className="h-6 w-6 mb-2" />
                  Manage Users
                </Button>
              </Link>
              <Link href="/admin/analytics">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center bg-transparent"
                >
                  <TrendingUp className="h-6 w-6 mb-2" />
                  View Analytics
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center bg-transparent"
                >
                  <BookOpen className="h-6 w-6 mb-2" />
                  Platform Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
