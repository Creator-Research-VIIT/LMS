import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, BookOpen, DollarSign, Calendar, Download } from "lucide-react"

export default function AdminAnalyticsPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$124,563",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "New Students",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Course Completions",
      value: "856",
      change: "-2.1%",
      trend: "down",
      icon: BookOpen,
    },
    {
      title: "Active Courses",
      value: "1,247",
      change: "+15.3%",
      trend: "up",
      icon: TrendingUp,
    },
  ]

  const topCourses = [
    {
      title: "Complete React Development Course",
      students: 1234,
      revenue: "$12,450",
      completion: 87,
    },
    {
      title: "Advanced Python Programming",
      students: 856,
      revenue: "$8,560",
      completion: 92,
    },
    {
      title: "Data Science with Machine Learning",
      students: 1089,
      revenue: "$10,890",
      completion: 78,
    },
    {
      title: "UI/UX Design Fundamentals",
      students: 642,
      revenue: "$6,420",
      completion: 85,
    },
  ]

  const recentActivity = [
    {
      type: "enrollment",
      message: "152 new student enrollments today",
      time: "2 hours ago",
    },
    {
      type: "completion",
      message: "89 course completions this week",
      time: "4 hours ago",
    },
    {
      type: "revenue",
      message: "$2,340 in new revenue today",
      time: "6 hours ago",
    },
    {
      type: "instructor",
      message: "3 new instructor applications",
      time: "8 hours ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="admin" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-2">Track your platform's performance and growth</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 days
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
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
                    <div className="flex items-center mt-1">
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                      )}
                      <span className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Performing Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Courses</CardTitle>
              <CardDescription>Courses with highest enrollment and revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCourses.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{course.title}</h4>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-600">{course.students} students</span>
                        <span className="text-sm text-gray-600">{course.completion}% completion</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{course.revenue}</p>
                      <Badge variant="secondary" className="mt-1">
                        #{index + 1}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest platform activity and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-gray-900">{activity.message}</p>
                      <p className="text-sm text-gray-600 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart Placeholder */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue trends and projections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Revenue chart would be displayed here</p>
                <p className="text-sm text-gray-500 mt-2">Integration with charting library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
