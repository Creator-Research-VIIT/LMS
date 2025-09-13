"use client"

import { useAuth } from "@/components/auth-context"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, Clock, TrendingUp, Award, Bell } from "lucide-react"



const courses = [
  {
    id: 1,
    title: "Advanced Mathematics",
    progress: 75,
    nextClass: "Today, 2:00 PM",
    instructor: "Dr. Smith",
    color: "bg-chart-1",
  },
  {
    id: 2,
    title: "Computer Science Fundamentals",
    progress: 60,
    nextClass: "Tomorrow, 10:00 AM",
    instructor: "Prof. Johnson",
    color: "bg-chart-2",
  },
  {
    id: 3,
    title: "Physics Laboratory",
    progress: 90,
    nextClass: "Friday, 3:00 PM",
    instructor: "Dr. Williams",
    color: "bg-chart-3",
  },
]

const assignments = [
  { id: 1, title: "Math Problem Set 5", due: "2 days", priority: "high" },
  { id: 2, title: "CS Project Proposal", due: "1 week", priority: "medium" },
  { id: 3, title: "Physics Lab Report", due: "3 days", priority: "high" },
]

const notifications = [
  { id: 1, message: "New assignment posted in Advanced Mathematics", time: "2 hours ago" },
  { id: 2, message: "Grade updated for CS Fundamentals Quiz", time: "1 day ago" },
  { id: 3, message: "Reminder: Physics Lab tomorrow at 3 PM", time: "2 days ago" },
]

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <Sidebar>
      <div className="animate-fade-in">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Welcome back, {user?.name}! 👋</h1>
          <p className="text-muted-foreground">
            Ready to continue your learning journey? Here's what's happening today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">+2 from last semester</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assignments Due</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 due this week</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">A-</div>
              <p className="text-xs text-muted-foreground">+0.2 from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2">
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Enrolled Courses
                </CardTitle>
                <CardDescription>Your current courses and progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="p-4 border border-border rounded-lg hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">{course.instructor}</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${course.color}`} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.nextClass}
                      </div>
                      <Button size="sm" variant="outline">
                        View Course
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Assignments */}
            <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Assignments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{assignment.title}</p>
                      <p className="text-xs text-muted-foreground">Due in {assignment.due}</p>
                    </div>
                    <Badge variant={assignment.priority === "high" ? "destructive" : "secondary"}>
                      {assignment.priority}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <Card className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievement Badge */}
            <Card
              className="animate-slide-up bg-gradient-to-br from-primary/10 to-secondary/10"
              style={{ animationDelay: "0.6s" }}
            >
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Great Progress!</h3>
                <p className="text-sm text-muted-foreground">
                  You've completed 75% of your courses this semester. Keep it up!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Sidebar>
  )
}
    