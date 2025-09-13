"use client"

import { BookOpen, Clock, CheckCircle, Play, Star } from "lucide-react"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Sample course data
const courses = [
  {
    id: 1,
    title: "React Basics",
    description: "Learn the fundamentals of React development",
    progress: 75,
    status: "In Progress",
    thumbnail: "/react-development-course-thumbnail-with-modern-ui.jpg",
    duration: "8 hours",
    lessons: 24,
    rating: 4.8,
    instructor: "Sarah Johnson",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Master advanced JavaScript concepts and patterns",
    progress: 100,
    status: "Completed",
    thumbnail: "/javascript-programming-course-with-code-snippets.jpg",
    duration: "12 hours",
    lessons: 36,
    rating: 4.9,
    instructor: "Mike Chen",
  },
  {
    id: 3,
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js",
    progress: 30,
    status: "In Progress",
    thumbnail: "/node-js-backend-development-server-architecture.jpg",
    duration: "15 hours",
    lessons: 42,
    rating: 4.7,
    instructor: "Alex Rodriguez",
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    description: "Create beautiful and user-friendly interfaces",
    progress: 0,
    status: "Not Started",
    thumbnail: "/ui-ux-design-principles-with-modern-interface-elem.jpg",
    duration: "10 hours",
    lessons: 28,
    rating: 4.6,
    instructor: "Emma Davis",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "In Progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "Not Started":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return <CheckCircle className="w-4 h-4" />
    case "In Progress":
      return <Clock className="w-4 h-4" />
    case "Not Started":
      return <Play className="w-4 h-4" />
    default:
      return <Clock className="w-4 h-4" />
  }
}

export default function MyCoursesPage() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center gap-2 px-2 py-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="font-semibold text-lg">LearnHub</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <BookOpen className="w-4 h-4" />
                    <span>My Courses</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Star className="w-4 h-4" />
                    <span>Favorites</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <CheckCircle className="w-4 h-4" />
                    <span>Completed</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-6 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-semibold text-balance">My Courses</h1>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Courses</p>
                      <p className="text-2xl font-bold">{courses.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold">{courses.filter((c) => c.status === "Completed").length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                      <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">In Progress</p>
                      <p className="text-2xl font-bold">{courses.filter((c) => c.status === "In Progress").length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <Card
                  key={course.id}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up overflow-hidden"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className={getStatusColor(course.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(course.status)}
                            <span className="text-xs font-medium">{course.status}</span>
                          </div>
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <div className="flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg text-balance group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground text-pretty">{course.description}</p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{course.duration}</span>
                      <span>•</span>
                      <span>{course.lessons} lessons</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2 transition-all duration-500" />
                    </div>

                    <p className="text-xs text-muted-foreground">Instructor: {course.instructor}</p>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Button
                      asChild
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      variant={course.status === "Completed" ? "outline" : "default"}
                    >
                      <Link href={`/courses/${course.id}`}>
                        <Play className="w-4 h-4 mr-2" />
                        {course.status === "Completed"
                          ? "Review Course"
                          : course.status === "In Progress"
                            ? "Continue Learning"
                            : "Start Course"}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
