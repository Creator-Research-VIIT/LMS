import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Award, TrendingUp, Play, Calendar, Star, ChevronRight, Target } from "lucide-react"
import Link from "next/link"

export default function StudentDashboardPage() {
  const stats = [
    {
      title: "Courses Enrolled",
      value: "12",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Hours Learned",
      value: "47",
      icon: Clock,
      color: "text-green-600",
    },
    {
      title: "Certificates",
      value: "3",
      icon: Award,
      color: "text-purple-600",
    },
    {
      title: "Streak Days",
      value: "15",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  const currentCourses = [
    {
      id: 1,
      title: "Complete React Development Course",
      instructor: "John Smith",
      progress: 65,
      totalLessons: 45,
      completedLessons: 29,
      nextLesson: "React Hooks Deep Dive",
      thumbnail: "/react-course-thumbnail.png",
      category: "Web Development",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Advanced Python Programming",
      instructor: "Sarah Johnson",
      progress: 32,
      totalLessons: 38,
      completedLessons: 12,
      nextLesson: "Object-Oriented Programming",
      thumbnail: "/python-course-thumbnail.png",
      category: "Programming",
      rating: 4.9,
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Mike Chen",
      progress: 78,
      totalLessons: 25,
      completedLessons: 19,
      nextLesson: "Prototyping with Figma",
      thumbnail: "/ui-ux-course-thumbnail.png",
      category: "Design",
      rating: 4.7,
    },
  ]

  const recentActivity = [
    {
      type: "completed",
      message: "Completed lesson: JavaScript ES6 Features",
      course: "Complete React Development Course",
      time: "2 hours ago",
    },
    {
      type: "started",
      message: "Started new course: Advanced Python Programming",
      course: "Advanced Python Programming",
      time: "1 day ago",
    },
    {
      type: "certificate",
      message: "Earned certificate for HTML & CSS Basics",
      course: "Web Development Fundamentals",
      time: "3 days ago",
    },
    {
      type: "milestone",
      message: "Reached 50% completion milestone",
      course: "Complete React Development Course",
      time: "5 days ago",
    },
  ]

  const recommendedCourses = [
    {
      id: 4,
      title: "Data Science with Machine Learning",
      instructor: "Emily Davis",
      rating: 4.6,
      students: 1089,
      price: "$89.99",
      thumbnail: "/data-science-course-thumbnail.png",
    },
    {
      id: 5,
      title: "Mobile App Development with Flutter",
      instructor: "Alex Rodriguez",
      rating: 4.5,
      students: 567,
      price: "$79.99",
      thumbnail: "/flutter-course-thumbnail.png",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="student" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600 mt-2">Continue your learning journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Continue Learning</CardTitle>
                  <CardDescription>Pick up where you left off</CardDescription>
                </div>
                <Link href="/student/courses">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {currentCourses.map((course) => (
                    <div key={course.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{course.title}</h4>
                        <p className="text-sm text-gray-600">by {course.instructor}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <Progress value={course.progress} className="w-24" />
                            <span className="text-sm text-gray-600">{course.progress}%</span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {course.completedLessons}/{course.totalLessons} lessons
                          </span>
                        </div>
                        <p className="text-sm text-blue-600 mt-1">Next: {course.nextLesson}</p>
                      </div>
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Continue
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your learning progress and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-gray-900">{activity.message}</p>
                        <p className="text-sm text-gray-600">{activity.course}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            {/* Learning Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Learning Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Weekly Goal</span>
                      <span className="text-sm text-gray-600">5/7 days</span>
                    </div>
                    <Progress value={71} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Monthly Hours</span>
                      <span className="text-sm text-gray-600">18/25 hours</span>
                    </div>
                    <Progress value={72} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Course Completion</span>
                      <span className="text-sm text-gray-600">2/3 courses</span>
                    </div>
                    <Progress value={67} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Courses */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recommended</CardTitle>
                  <CardDescription>Courses you might like</CardDescription>
                </div>
                <Link href="/courses">
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedCourses.map((course) => (
                    <div key={course.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-32 rounded-lg object-cover mb-3"
                      />
                      <h4 className="font-medium text-gray-900 mb-1">{course.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm">{course.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">({course.students})</span>
                        </div>
                        <span className="font-medium text-gray-900">{course.price}</span>
                      </div>
                      <Button size="sm" className="w-full mt-3">
                        Enroll Now
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Live Q&A Session</p>
                      <p className="text-xs text-gray-600">React Development - Today 3:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Assignment Due</p>
                      <p className="text-xs text-gray-600">Python Project - Tomorrow</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New Course Release</p>
                      <p className="text-xs text-gray-600">Advanced JavaScript - Jan 25</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
