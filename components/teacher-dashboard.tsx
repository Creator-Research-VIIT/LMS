"use client"

import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    ArrowLeft,
    BarChart3,
    BookOpen,
    ClipboardList,
    CreditCard,
    DollarSign,
    Eye,
    EyeOff,
    FileText,
    Gift,
    LogOut,
    MessageSquare,
    Plus,
    Settings,
    Star,
    Trash2,
    User,
    Users,
    Video,
} from "lucide-react"
import { signOut } from "next-auth/react"
import { useEffect, useState } from "react"

interface QuizQuestion {
  id: string
  question: string
  options: {
    A: string
    B: string
    C: string
    D: string
  }
  correctAnswer: "A" | "B" | "C" | "D"
}

interface Quiz {
  title: string
  questions: QuizQuestion[]
}

interface Course {
  id?: string
  title: string
  description?: string
  thumbnail?: string
  price?: number
  approvalStatus?: "PENDING" | "APPROVED" | "REJECTED"
  status?: string
  modules?: number
  duration?: string
  students?: number
  completion?: number
  revenue?: string
  rating?: number
  createdAt?: string
}

export function TeacherDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [showAddQuiz, setShowAddQuiz] = useState(false)
  const [showCreateCourse, setShowCreateCourse] = useState(false)
  const [showEditCourse, setShowEditCourse] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [quiz, setQuiz] = useState<Quiz>({ title: "", questions: [] })
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>({
    id: "1",
    question: "",
    options: { A: "", B: "", C: "", D: "" },
    correctAnswer: "A",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  
  // Course form state
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    thumbnail: "",
    price: "",
    duration: "",
    category: "",
    isFree: false,
    modules: [] as Array<{
      title: string
      description: string
      videoUrl: string
      resources: string
    }>
  })

  const [realCourses, setRealCourses] = useState<Course[]>([])

  // Fetch real courses data
  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses/teacher')
      if (response.ok) {
        const data = await response.json()
        setRealCourses(data.courses || [])
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  const getBadgeStyle = (course: Course) => {
    if (course.approvalStatus === "APPROVED") return "bg-green-100 text-green-800"
    if (course.approvalStatus === "PENDING") return "bg-yellow-100 text-yellow-800"
    if (course.approvalStatus === "REJECTED") return "bg-red-100 text-red-800"
    return course.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "students", label: "Students", icon: Users },
    { id: "modules", label: "Course Modules", icon: FileText },
    { id: "examinations", label: "Examinations", icon: ClipboardList },
    { id: "payment", label: "Payment Gateway", icon: CreditCard },
    { id: "feedback", label: "Feedback", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const dashboardStats = [
    { title: "Total Students", value: "590", icon: Users, bgColor: "bg-blue-50", iconColor: "text-blue-600" },
    { title: "Active Courses", value: "3", icon: BookOpen, bgColor: "bg-green-50", iconColor: "text-green-600" },
    {
      title: "Total Revenue",
      value: "₹30,140",
      icon: DollarSign,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    { title: "Avg. Rating", value: "4.7", icon: Star, bgColor: "bg-purple-50", iconColor: "text-purple-600" },
  ]

  const recentActivities = [
    {
      icon: Video,
      text: 'New video uploaded to "Advanced React Development"',
      time: "2 hours ago",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Users,
      text: "15 new students enrolled this week",
      time: "1 day ago",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: MessageSquare,
      text: "New feedback received from Alice Johnson",
      time: "2 days ago",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ]

  const students = [
    { name: "Alice Johnson", progress: 92, lastActive: "2 hours ago", discountEligible: true },
    { name: "Bob Smith", progress: 76, lastActive: "1 day ago", discountEligible: false },
    { name: "Carol Davis", progress: 88, lastActive: "3 hours ago", discountEligible: true },
    { name: "David Wilson", progress: 45, lastActive: "2 days ago", discountEligible: false },
    { name: "Eva Brown", progress: 94, lastActive: "1 hour ago", discountEligible: true },
  ]

  const questionTypes = [
    { type: "Multiple Choice (MCQ)", count: "12 questions created", color: "text-blue-600" },
    { type: "Fill in the Blanks", count: "8 questions created", color: "text-green-600" },
    { type: "Match the Column", count: "5 questions created", color: "text-orange-600" },
    { type: "Objective", count: "10 questions created", color: "text-purple-600" },
  ]

  const courses: Course[] = [
    {
      id: "1",
      title: "Advanced React Development",
      description: "Learn advanced React concepts and patterns",
      modules: 12,
      duration: "8.5 hours",
      students: 245,
      completion: 78,
      revenue: "₹12450",
      rating: 4.8,
      status: "active",
      approvalStatus: "APPROVED"
    },
    {
      id: "2", 
      title: "Machine Learning Fundamentals",
      description: "Introduction to ML algorithms and applications",
      modules: 15,
      duration: "12.3 hours",
      students: 189,
      completion: 65,
      revenue: "₹9890",
      rating: 4.6,
      status: "active",
      approvalStatus: "APPROVED"
    },
    {
      id: "3",
      title: "UI/UX Design Principles",
      description: "Design principles for modern user interfaces",
      modules: 10,
      duration: "6.2 hours",
      students: 156,
      completion: 45,
      revenue: "₹7800",
      rating: 4.7,
      status: "disabled",
      approvalStatus: "PENDING"
    },
  ]

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Message Display */}
      {message && (
        <div className={`p-4 rounded mb-4 ${message.includes('success') 
          ? 'bg-green-100 text-green-700' 
          : 'bg-red-100 text-red-700'
        }`}>
          <div className="flex justify-between items-center">
            <span>{message}</span>
            <button 
              onClick={() => setMessage("")}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${activity.iconBg}`}>
                  <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Student Progress</h2>
        <Button className="bg-green-600 hover:bg-green-700">Apply Discounts</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Student Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.map((student, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-500">Last active: {student.lastActive}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{student.progress}%</div>
                    <div className="text-sm text-gray-500">Progress</div>
                    <div className="w-32 mt-2">
                      <Progress value={student.progress} className="h-2" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {student.discountEligible && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <Gift className="h-3 w-3 mr-1" />
                        Discount Eligible
                      </Badge>
                    )}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Course creation handlers
  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: courseForm.title,
          description: courseForm.description,
          thumbnail: courseForm.thumbnail,
          price: courseForm.isFree ? 0 : parseFloat(courseForm.price),
          duration: courseForm.duration,
          category: courseForm.category,
          isFree: courseForm.isFree,
          modules: courseForm.modules
        }),
      })

      if (response.ok) {
        await response.json()
        setMessage("Course submitted for admin approval! You will be notified once it's reviewed.")
        setCourseForm({ 
          title: "", 
          description: "", 
          thumbnail: "", 
          price: "", 
          duration: "",
          category: "",
          isFree: false,
          modules: []
        })
        setShowCreateCourse(false)
        await fetchCourses() // Refresh courses list
      } else {
        const error = await response.json()
        setMessage(error.message || "Failed to create course")
      }
    } catch (error) {
      setMessage("An error occurred while creating the course")
    } finally {
      setLoading(false)
    }
  }

  const handleCourseInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setCourseForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const addModule = () => {
    setCourseForm(prev => ({
      ...prev,
      modules: [...prev.modules, {
        title: "",
        description: "",
        videoUrl: "",
        resources: ""
      }]
    }))
  }

  const removeModule = (index: number) => {
    setCourseForm(prev => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== index)
    }))
  }

  const updateModule = (index: number, field: string, value: string) => {
    setCourseForm(prev => ({
      ...prev,
      modules: prev.modules.map((module, i) => 
        i === index ? { ...module, [field]: value } : module
      )
    }))
  }

  const startEditCourse = async (course: Course) => {
    try {
      // Fetch course details with modules
      const response = await fetch(`/api/courses/${course.id}`)
      if (response.ok) {
        const courseData = await response.json()
        
        setEditingCourse(course)
        setCourseForm({
          title: courseData.title || '',
          description: courseData.description || '',
          thumbnail: courseData.thumbnail || '',
          price: courseData.price?.toString() || '0',
          duration: courseData.duration || '',
          category: courseData.category || '',
          isFree: courseData.isFree || courseData.price === 0,
          modules: courseData.Module || []
        })
        setShowEditCourse(true)
      }
    } catch (error) {
      console.error('Error fetching course details:', error)
      setMessage('Failed to load course details')
    }
  }

  const handleEditCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCourse) return

    setLoading(true)
    setMessage("")

    try {
      const response = await fetch(`/api/courses/${editingCourse.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: courseForm.title,
          description: courseForm.description,
          thumbnail: courseForm.thumbnail,
          price: courseForm.isFree ? 0 : parseFloat(courseForm.price),
          duration: courseForm.duration,
          category: courseForm.category,
          isFree: courseForm.isFree,
          modules: courseForm.modules
        }),
      })

      if (response.ok) {
        await response.json()
        setMessage("Course updated successfully!")
        setCourseForm({ 
          title: "", 
          description: "", 
          thumbnail: "", 
          price: "", 
          duration: "",
          category: "",
          isFree: false,
          modules: []
        })
        setShowEditCourse(false)
        setEditingCourse(null)
        await fetchCourses() // Refresh courses list
      } else {
        const error = await response.json()
        setMessage(error.message || "Failed to update course")
      }
    } catch (error) {
      setMessage("An error occurred while updating the course")
    } finally {
      setLoading(false)
    }
  }

  // Course creation form component
  const renderCreateCourseForm = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setShowCreateCourse(false)} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">Create New Course</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
        </CardHeader>
        <CardContent>
          {message && (
            <div className={`p-4 rounded mb-4 ${message.includes('success') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}
          
          <form onSubmit={handleCourseSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Course Title *</Label>
              <Input
                id="title"
                name="title"
                value={courseForm.title}
                onChange={handleCourseInputChange}
                placeholder="Enter course title"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Course Description *</Label>
              <textarea
                id="description"
                name="description"
                value={courseForm.description}
                onChange={handleCourseInputChange}
                placeholder="Enter course description"
                className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="thumbnail">Thumbnail URL</Label>
              <Input
                id="thumbnail"
                name="thumbnail"
                value={courseForm.thumbnail}
                onChange={handleCourseInputChange}
                placeholder="Enter thumbnail image URL"
                type="url"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={courseForm.duration}
                  onChange={handleCourseInputChange}
                  placeholder="e.g., 8.5 hours"
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={courseForm.category}
                  onChange={handleCourseInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select category</option>
                  <option value="programming">Programming</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="business">Business</option>
                  <option value="data-science">Data Science</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isFree"
                name="isFree"
                checked={courseForm.isFree}
                onChange={handleCourseInputChange}
                className="rounded"
              />
              <Label htmlFor="isFree">Make this course free (for testing)</Label>
            </div>
            
            {!courseForm.isFree && (
              <div>
                <Label htmlFor="price">Course Price (₹) *</Label>
                <Input
                  id="price"
                  name="price"
                  value={courseForm.price}
                  onChange={handleCourseInputChange}
                  placeholder="Enter course price"
                  type="number"
                  min="0"
                  step="0.01"
                  required={!courseForm.isFree}
                />
              </div>
            )}
            
            {/* Modules Section */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-semibold">Course Modules</Label>
                <Button type="button" onClick={addModule} variant="outline" size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Module
                </Button>
              </div>
              
              {courseForm.modules.length === 0 ? (
                <p className="text-gray-500 text-center py-4 border-2 border-dashed rounded-lg">
                  No modules yet. Add your first module to get started.
                </p>
              ) : (
                <div className="space-y-4">
                  {courseForm.modules.map((module, index) => (
                    <Card key={index} className="relative">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Module {index + 1}</CardTitle>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeModule(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <Label htmlFor={`module-title-${index}`}>Module Title *</Label>
                          <Input
                            id={`module-title-${index}`}
                            value={module.title}
                            onChange={(e) => updateModule(index, 'title', e.target.value)}
                            placeholder="e.g., Introduction to React"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`module-description-${index}`}>Description</Label>
                          <textarea
                            id={`module-description-${index}`}
                            value={module.description}
                            onChange={(e) => updateModule(index, 'description', e.target.value)}
                            placeholder="What will students learn in this module?"
                            className="w-full p-2 border border-gray-300 rounded-md min-h-[80px]"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`module-video-${index}`}>YouTube Video URL *</Label>
                          <Input
                            id={`module-video-${index}`}
                            value={module.videoUrl}
                            onChange={(e) => updateModule(index, 'videoUrl', e.target.value)}
                            placeholder="https://youtube.com/watch?v=... or hosted video URL"
                            type="url"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`module-resources-${index}`}>Resources (Optional)</Label>
                          <Input
                            id={`module-resources-${index}`}
                            value={module.resources}
                            onChange={(e) => updateModule(index, 'resources', e.target.value)}
                            placeholder="PDF links, additional resources, etc."
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
                {loading ? 'Creating...' : 'Create Course'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowCreateCourse(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )

  // Edit course form component
  const renderEditCourseForm = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => {
          setShowEditCourse(false)
          setEditingCourse(null)
        }} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">
          Edit Course: {editingCourse?.title}
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
        </CardHeader>
        <CardContent>
          {message && (
            <div className={`p-4 rounded mb-4 ${message.includes('success') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}
          
          <form onSubmit={handleEditCourseSubmit} className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Course Title *</Label>
              <Input
                id="edit-title"
                name="title"
                value={courseForm.title}
                onChange={handleCourseInputChange}
                placeholder="Enter course title"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="edit-description">Course Description *</Label>
              <textarea
                id="edit-description"
                name="description"
                value={courseForm.description}
                onChange={handleCourseInputChange}
                placeholder="Enter course description"
                className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="edit-thumbnail">Thumbnail URL</Label>
              <Input
                id="edit-thumbnail"
                name="thumbnail"
                value={courseForm.thumbnail}
                onChange={handleCourseInputChange}
                placeholder="Enter thumbnail image URL"
                type="url"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-duration">Duration</Label>
                <Input
                  id="edit-duration"
                  name="duration"
                  value={courseForm.duration}
                  onChange={handleCourseInputChange}
                  placeholder="e.g., 8.5 hours"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <select
                  id="edit-category"
                  name="category"
                  value={courseForm.category}
                  onChange={handleCourseInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select category</option>
                  <option value="programming">Programming</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="business">Business</option>
                  <option value="data-science">Data Science</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-isFree"
                name="isFree"
                checked={courseForm.isFree}
                onChange={handleCourseInputChange}
                className="rounded"
              />
              <Label htmlFor="edit-isFree">Make this course free (for testing)</Label>
            </div>
            
            {!courseForm.isFree && (
              <div>
                <Label htmlFor="edit-price">Course Price (₹) *</Label>
                <Input
                  id="edit-price"
                  name="price"
                  value={courseForm.price}
                  onChange={handleCourseInputChange}
                  placeholder="Enter course price"
                  type="number"
                  min="0"
                  step="0.01"
                  required={!courseForm.isFree}
                />
              </div>
            )}
            
            {/* Modules Section */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-semibold">Course Modules</Label>
                <Button type="button" onClick={addModule} variant="outline" size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Module
                </Button>
              </div>
              
              {courseForm.modules.length === 0 ? (
                <p className="text-gray-500 text-center py-4 border-2 border-dashed rounded-lg">
                  No modules yet. Add your first module to get started.
                </p>
              ) : (
                <div className="space-y-4">
                  {courseForm.modules.map((module, index) => (
                    <Card key={index} className="relative">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Module {index + 1}</CardTitle>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeModule(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <Label htmlFor={`edit-module-title-${index}`}>Module Title *</Label>
                          <Input
                            id={`edit-module-title-${index}`}
                            value={module.title}
                            onChange={(e) => updateModule(index, 'title', e.target.value)}
                            placeholder="e.g., Introduction to React"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`edit-module-description-${index}`}>Description</Label>
                          <textarea
                            id={`edit-module-description-${index}`}
                            value={module.description}
                            onChange={(e) => updateModule(index, 'description', e.target.value)}
                            placeholder="What will students learn in this module?"
                            className="w-full p-2 border border-gray-300 rounded-md min-h-[80px]"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`edit-module-video-${index}`}>YouTube Video URL *</Label>
                          <Input
                            id={`edit-module-video-${index}`}
                            value={module.videoUrl}
                            onChange={(e) => updateModule(index, 'videoUrl', e.target.value)}
                            placeholder="https://youtube.com/watch?v=... or hosted video URL"
                            type="url"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`edit-module-resources-${index}`}>Resources (Optional)</Label>
                          <Input
                            id={`edit-module-resources-${index}`}
                            value={module.resources}
                            onChange={(e) => updateModule(index, 'resources', e.target.value)}
                            placeholder="PDF links, additional resources, etc."
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? 'Updating...' : 'Update Course'}
              </Button>
              <Button type="button" variant="outline" onClick={() => {
                setShowEditCourse(false)
                setEditingCourse(null)
              }}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )

  const validateQuizForm = () => {
    const newErrors: Record<string, string> = {}

    if (!quiz.title.trim()) {
      newErrors.title = "Quiz title is required"
    }

    if (!currentQuestion.question.trim()) {
      newErrors.question = "Question is required"
    }

    Object.entries(currentQuestion.options).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[`option${key}`] = `Option ${key} is required`
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const addQuestionToQuiz = () => {
    if (!validateQuizForm()) return

    const updatedQuiz = {
      ...quiz,
      questions: [...quiz.questions, currentQuestion],
    }
    setQuiz(updatedQuiz)

    // Reset current question for next input
    setCurrentQuestion({
      id: (quiz.questions.length + 2).toString(),
      question: "",
      options: { A: "", B: "", C: "", D: "" },
      correctAnswer: "A",
    })
    setErrors({})
  }

  const saveQuiz = async () => {
    if (!quiz.title.trim()) {
      setErrors({ title: "Quiz title is required" })
      return
    }

    if (quiz.questions.length === 0) {
      alert("Please add at least one question to the quiz")
      return
    }

    // Add current question if it's filled
    let finalQuiz = quiz
    if (currentQuestion.question.trim() && validateQuizForm()) {
      finalQuiz = {
        ...quiz,
        questions: [...quiz.questions, currentQuestion],
      }
    }

    setLoading(true)
    setMessage("")

    try {
      const response = await fetch('/api/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: finalQuiz.title,
          type: "PRACTICE", // Default type
          questions: finalQuiz.questions.map(q => ({
            questionText: q.question,
            questionType: "multiple_choice",
            points: 1,
            answers: Object.entries(q.options).map(([key, value]) => ({
              answerText: value,
              isCorrect: q.correctAnswer === key
            }))
          }))
        }),
      })

      if (response.ok) {
        setMessage(`Quiz "${finalQuiz.title}" saved successfully!`)
        // Reset form
        setQuiz({ title: "", questions: [] })
        setCurrentQuestion({
          id: "1",
          question: "",
          options: { A: "", B: "", C: "", D: "" },
          correctAnswer: "A",
        })
        setShowAddQuiz(false)
        setErrors({})
      } else {
        const error = await response.json()
        setMessage(error.message || "Failed to save quiz")
      }
    } catch (error) {
      setMessage("An error occurred while saving the quiz")
    } finally {
      setLoading(false)
    }
  }

  const removeQuestion = (questionId: string) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.filter((q) => q.id !== questionId),
    })
  }

  const renderAddQuiz = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setShowAddQuiz(false)} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Examinations
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">Add New Quiz</h2>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Quiz Title */}
        <Card>
          <CardHeader>
            <CardTitle>Quiz Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="quiz-title">Quiz Title *</Label>
                <Input
                  id="quiz-title"
                  value={quiz.title}
                  onChange={(e) => {
                    setQuiz({ ...quiz, title: e.target.value })
                    if (errors.title) setErrors({ ...errors, title: "" })
                  }}
                  placeholder="Enter quiz title"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Existing Questions */}
        {quiz.questions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Added Questions ({quiz.questions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quiz.questions.map((q, index) => (
                  <div key={q.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Question {index + 1}: {q.question}
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                          <div>A) {q.options.A}</div>
                          <div>B) {q.options.B}</div>
                          <div>C) {q.options.C}</div>
                          <div>D) {q.options.D}</div>
                        </div>
                        <p className="text-sm text-green-600 mt-2">
                          Correct Answer: {q.correctAnswer}) {q.options[q.correctAnswer]}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeQuestion(q.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add New Question */}
        <Card>
          <CardHeader>
            <CardTitle>Add Question</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Question Input */}
              <div>
                <Label htmlFor="question">Question *</Label>
                <Input
                  id="question"
                  value={currentQuestion.question}
                  onChange={(e) => {
                    setCurrentQuestion({ ...currentQuestion, question: e.target.value })
                    if (errors.question) setErrors({ ...errors, question: "" })
                  }}
                  placeholder="Enter your question"
                  className={errors.question ? "border-red-500" : ""}
                />
                {errors.question && <p className="text-sm text-red-500 mt-1">{errors.question}</p>}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(["A", "B", "C", "D"] as const).map((option) => (
                  <div key={option}>
                    <Label htmlFor={`option-${option}`}>Option {option} *</Label>
                    <Input
                      id={`option-${option}`}
                      value={currentQuestion.options[option]}
                      onChange={(e) => {
                        setCurrentQuestion({
                          ...currentQuestion,
                          options: { ...currentQuestion.options, [option]: e.target.value },
                        })
                        if (errors[`option${option}`]) {
                          setErrors({ ...errors, [`option${option}`]: "" })
                        }
                      }}
                      placeholder={`Enter option ${option}`}
                      className={errors[`option${option}`] ? "border-red-500" : ""}
                    />
                    {errors[`option${option}`] && (
                      <p className="text-sm text-red-500 mt-1">{errors[`option${option}`]}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Correct Answer Selection */}
              <div>
                <Label>Correct Answer *</Label>
                <RadioGroup
                  value={currentQuestion.correctAnswer}
                  onValueChange={(value: "A" | "B" | "C" | "D") =>
                    setCurrentQuestion({ ...currentQuestion, correctAnswer: value })
                  }
                  className="flex flex-wrap gap-6 mt-2"
                >
                  {(["A", "B", "C", "D"] as const).map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`correct-${option}`} />
                      <Label htmlFor={`correct-${option}`}>Option {option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button onClick={addQuestionToQuiz} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Another Question
                </Button>
                <Button onClick={saveQuiz} className="bg-green-600 hover:bg-green-700">
                  Save Quiz
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderExaminations = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Examination System</h2>
        <Button onClick={() => setShowAddQuiz(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Quiz
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Question Types */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Question Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {questionTypes.map((type, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <h3 className={`font-medium ${type.color}`}>{type.type}</h3>
                  <p className="text-sm text-gray-500 mt-1">{type.count}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Unit Examinations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Unit Examinations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900">Unit 1 Exam</h3>
                <p className="text-sm text-gray-500">25 questions • 30 minutes</p>
                <p className="text-sm text-orange-600 mt-1">89% completion rate</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900">Unit 2 Exam</h3>
                <p className="text-sm text-gray-500">20 questions • 25 minutes</p>
                <p className="text-sm text-orange-600 mt-1">67% completion rate</p>
              </div>
              <Button 
                className="w-full" 
                onClick={() => {
                  setActiveSection("examinations")
                  setShowAddQuiz(true)
                }}
              >
                Create Unit Exam
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Final Examination */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Final Examination</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-red-600">Previous Questions</h3>
                <p className="text-sm text-gray-500 mt-1">45 questions available</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900">Final Exam Setup</h3>
                <p className="text-sm text-gray-500 mt-1">50 questions • 90 minutes</p>
              </div>
              <Button 
                className="w-full bg-red-600 hover:bg-red-700"
                onClick={() => {
                  setActiveSection("examinations")
                  setShowAddQuiz(true)
                }}
              >
                Generate Final Exam
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
        <Button onClick={() => setShowCreateCourse(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New Course
        </Button>
      </div>

      <div className="space-y-6">
        {/* Show real courses if available, otherwise show mock data */}
        {(realCourses.length > 0 ? realCourses : courses).map((course, index) => (
          <Card key={course.id || index} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                  <Badge className={getBadgeStyle(course)}>
                    {course.approvalStatus || course.status}
                  </Badge>
                  {(course.approvalStatus === "APPROVED" || course.status === "active") ? (
                    <Eye className="h-4 w-4 text-gray-400" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  {course.description || `${course.modules} modules • ${course.duration}`}
                </p>
                {course.approvalStatus === "PENDING" && (
                  <p className="text-sm text-yellow-600 mb-2">
                    ⏳ Course is pending admin approval. You will be notified once it's reviewed.
                  </p>
                )}
                {course.approvalStatus === "REJECTED" && (
                  <p className="text-sm text-red-600 mb-2">
                    ❌ Course was rejected by admin. Please review and resubmit.
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
              <div>
                <p className="text-sm text-gray-500">Students</p>
                <p className="text-xl font-bold text-gray-900">{course.students}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Completion Rate</p>
                <p className="text-xl font-bold text-gray-900">{course.completion}%</p>
                <Progress value={course.completion} className="mt-1 h-2" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-xl font-bold text-green-600">{course.revenue}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-xl font-bold text-gray-900">{course.rating}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => startEditCourse(course)}
                disabled={course.approvalStatus === "PENDING"}
              >
                Edit Course
              </Button>
              <Button variant="outline">View Details</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderContent = () => {
    if (showAddQuiz) {
      return renderAddQuiz()
    }

    if (showCreateCourse) {
      return renderCreateCourseForm()
    }

    if (showEditCourse) {
      return renderEditCourseForm()
    }

    switch (activeSection) {
      case "dashboard":
        return renderDashboard()
      case "students":
        return renderStudents()
      case "examinations":
        return renderExaminations()
      case "courses":
        return renderCourses()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Creator Research LMS</h1>
                <p className="text-sm text-gray-500">Teacher Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => {
                setActiveSection("courses")
                setShowCreateCourse(true)
              }} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Course
              </Button>
              <Button 
                variant="outline" 
                onClick={() => signOut({ callbackUrl: '/' })} 
                className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
              <div className="p-2 bg-blue-600 rounded-lg">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-full">
          <nav className="p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
