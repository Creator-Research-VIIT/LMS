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

// Enhanced Quiz System Interfaces
interface QuizAnswer {
  id?: string
  answerText: string
  isCorrect: boolean
  orderIndex?: number
  matchPair?: string
  blankPosition?: number
}

interface EnhancedQuizQuestion {
  id?: string
  questionText: string
  questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'MATCH_COLUMN' | 'FILL_IN_BLANKS'
  points: number
  orderIndex?: number
  explanation?: string
  questionData?: any
  answers: QuizAnswer[]
}

interface EnhancedQuiz {
  id?: string
  title: string
  description?: string
  courseId: string
  timeLimit?: number
  maxAttempts: number
  passingScore: number
  isPublished: boolean
  questions?: EnhancedQuizQuestion[]
}

// Legacy interfaces for backward compatibility
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

  // Enhanced Quiz System State
  const [quizzes, setQuizzes] = useState<EnhancedQuiz[]>([])
  const [selectedCourseId, setSelectedCourseId] = useState<string>("")
  const [showCreateQuiz, setShowCreateQuiz] = useState(false)
  const [editingQuiz, setEditingQuiz] = useState<EnhancedQuiz | null>(null)
  const [currentEnhancedQuestion, setCurrentEnhancedQuestion] = useState<EnhancedQuizQuestion>({
    questionText: "",
    questionType: "MULTIPLE_CHOICE",
    points: 1,
    answers: [
      { answerText: "", isCorrect: false },
      { answerText: "", isCorrect: false }
    ]
  })
  const [newQuiz, setNewQuiz] = useState<EnhancedQuiz>({
    title: "",
    description: "",
    courseId: "",
    timeLimit: 30,
    maxAttempts: 3,
    passingScore: 60,
    isPublished: false
  })
  const [showQuestionForm, setShowQuestionForm] = useState(false)
  
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
  const [analytics, setAnalytics] = useState({
    totalStudents: 0,
    activeCourses: 0,
    totalRevenue: 0,
    avgRating: "0.0"
  })
  const [analyticsLoading, setAnalyticsLoading] = useState(true)
  const [feedbacks, setFeedbacks] = useState<any[]>([])
  const [feedbacksLoading, setFeedbacksLoading] = useState(false)

  // Fetch real courses data
  useEffect(() => {
    fetchCourses()
    fetchAnalytics()
  }, [])

  // Fetch quizzes when examining section is active
  useEffect(() => {
    if (activeSection === 'examinations') {
      fetchQuizzes()
    }
  }, [activeSection])

  // Fetch feedbacks when feedback section is active
  useEffect(() => {
    if (activeSection === 'feedback') {
      fetchFeedbacks()
    }
  }, [activeSection])

  const fetchFeedbacks = async () => {
    try {
      setFeedbacksLoading(true)
      const response = await fetch('/api/feedback')
      if (response.ok) {
        const data = await response.json()
        setFeedbacks(data.feedbacks || [])
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error)
    } finally {
      setFeedbacksLoading(false)
    }
  }

  const fetchAnalytics = async () => {
    try {
      setAnalyticsLoading(true)
      const response = await fetch('/api/teacher/analytics')
      if (response.ok) {
        const data = await response.json()
        setAnalytics({
          totalStudents: data.totalStudents || 0,
          activeCourses: data.activeCourses || 0,
          totalRevenue: data.totalRevenue || 0,
          avgRating: data.avgRating || "0.0"
        })
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setAnalyticsLoading(false)
    }
  }

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

  // Enhanced Quiz System Functions
  const fetchQuizzes = async (courseId?: string) => {
    try {
      const url = courseId ? `/api/quizzes?courseId=${courseId}` : '/api/quizzes'
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setQuizzes(data.quizzes || [])
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error)
    }
  }

  const createQuiz = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuiz)
      })

      if (response.ok) {
        const data = await response.json()
        setMessage('Quiz created successfully!')
        setShowCreateQuiz(false)
        resetQuizForm()
        fetchQuizzes()
      } else {
        const errorData = await response.json()
        setMessage(errorData.error || 'Failed to create quiz')
      }
    } catch (error) {
      console.error('Error creating quiz:', error)
      setMessage('Error creating quiz')
    } finally {
      setLoading(false)
    }
  }

  const addEnhancedQuestion = async (quizId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/quizzes/${quizId}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentEnhancedQuestion)
      })

      if (response.ok) {
        setMessage('Question added successfully!')
        resetQuestionForm()
        setShowQuestionForm(false)
        fetchQuizzes()
      } else {
        const errorData = await response.json()
        setMessage(errorData.error || 'Failed to add question')
      }
    } catch (error) {
      console.error('Error adding question:', error)
      setMessage('Error adding question')
    } finally {
      setLoading(false)
    }
  }

  const resetQuizForm = () => {
    setNewQuiz({
      title: "",
      description: "",
      courseId: "",
      timeLimit: 30,
      maxAttempts: 3,
      passingScore: 60,
      isPublished: false
    })
  }

  const resetQuestionForm = () => {
    setCurrentEnhancedQuestion({
      questionText: "",
      questionType: "MULTIPLE_CHOICE",
      points: 1,
      answers: [
        { answerText: "", isCorrect: false },
        { answerText: "", isCorrect: false }
      ]
    })
  }

  const addAnswer = () => {
    setCurrentEnhancedQuestion({
      ...currentEnhancedQuestion,
      answers: [...currentEnhancedQuestion.answers, { answerText: "", isCorrect: false }]
    })
  }

  const removeAnswer = (index: number) => {
    if (currentEnhancedQuestion.answers.length > 2) {
      const newAnswers = currentEnhancedQuestion.answers.filter((_, i) => i !== index)
      setCurrentEnhancedQuestion({
        ...currentEnhancedQuestion,
        answers: newAnswers
      })
    }
  }

  const updateAnswer = (index: number, field: string, value: any) => {
    const newAnswers = [...currentEnhancedQuestion.answers]
    newAnswers[index] = { ...newAnswers[index], [field]: value }
    setCurrentEnhancedQuestion({
      ...currentEnhancedQuestion,
      answers: newAnswers
    })
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
    { 
      title: "Total Students", 
      value: analyticsLoading ? "..." : analytics.totalStudents.toString(), 
      icon: Users, 
      bgColor: "bg-blue-50", 
      iconColor: "text-blue-600" 
    },
    { 
      title: "Active Courses", 
      value: analyticsLoading ? "..." : analytics.activeCourses.toString(), 
      icon: BookOpen, 
      bgColor: "bg-green-50", 
      iconColor: "text-green-600" 
    },
    {
      title: "Total Revenue",
      value: analyticsLoading ? "..." : `₹${analytics.totalRevenue.toLocaleString('en-IN')}`,
      icon: DollarSign,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    { 
      title: "Avg. Rating", 
      value: analyticsLoading ? "..." : analytics.avgRating, 
      icon: Star, 
      bgColor: "bg-purple-50", 
      iconColor: "text-purple-600" 
    },
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
          price: courseForm.isFree ? 0 : Number.parseFloat(courseForm.price),
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
          price: courseForm.isFree ? 0 : Number.parseFloat(courseForm.price),
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

  const renderExaminations = () => {
    if (showCreateQuiz) {
      return renderCreateQuizForm()
    }

    if (showQuestionForm) {
      return renderQuestionForm()
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Quiz & Examination System</h2>
          <Button onClick={() => setShowCreateQuiz(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Quiz
          </Button>
        </div>

        {message && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">{message}</p>
          </div>
        )}

        {/* Question Types Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Supported Question Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                <h3 className="font-medium text-blue-800">Multiple Choice</h3>
                <p className="text-sm text-blue-600 mt-1">Standard MCQ with 2-6 options</p>
              </div>
              <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                <h3 className="font-medium text-green-800">True / False</h3>
                <p className="text-sm text-green-600 mt-1">Binary choice questions</p>
              </div>
              <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                <h3 className="font-medium text-purple-800">Match Column</h3>
                <p className="text-sm text-purple-600 mt-1">Match items from two lists</p>
              </div>
              <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                <h3 className="font-medium text-orange-800">Fill in Blanks</h3>
                <p className="text-sm text-orange-600 mt-1">Complete missing words</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Existing Quizzes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Your Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            {quizzes.length > 0 ? (
              <div className="space-y-4">
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-gray-900">{quiz.title}</h3>
                          <Badge variant={quiz.isPublished ? "default" : "secondary"}>
                            {quiz.isPublished ? "Published" : "Draft"}
                          </Badge>
                        </div>
                        {quiz.description && (
                          <p className="text-sm text-gray-600 mb-2">{quiz.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>⏱️ {quiz.timeLimit ? `${quiz.timeLimit} min` : 'No limit'}</span>
                          <span>🔄 {quiz.maxAttempts} attempts</span>
                          <span>📊 {quiz.passingScore}% to pass</span>
                          <span>❓ {quiz.questions?.length || 0} questions</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setEditingQuiz(quiz)
                            setShowQuestionForm(true)
                          }}
                        >
                          Add Questions
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes yet</h3>
                <p className="text-gray-500 mb-4">
                  Create your first quiz to start testing your students
                </p>
                <Button onClick={() => setShowCreateQuiz(true)}>
                  Create Your First Quiz
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderCreateQuizForm = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setShowCreateQuiz(false)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Quizzes
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">Create New Quiz</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quiz Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="quiz-title">Quiz Title *</Label>
            <Input
              id="quiz-title"
              value={newQuiz.title}
              onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
              placeholder="Enter quiz title"
            />
          </div>

          <div>
            <Label htmlFor="quiz-description">Description</Label>
            <Input
              id="quiz-description"
              value={newQuiz.description}
              onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
              placeholder="Brief description of the quiz"
            />
          </div>

          <div>
            <Label htmlFor="quiz-course">Select Course *</Label>
            <select
              id="quiz-course"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newQuiz.courseId}
              onChange={(e) => setNewQuiz({ ...newQuiz, courseId: e.target.value })}
            >
              <option value="">Select a course...</option>
              {realCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="time-limit">Time Limit (minutes)</Label>
              <Input
                id="time-limit"
                type="number"
                value={newQuiz.timeLimit || ''}
                onChange={(e) => setNewQuiz({ ...newQuiz, timeLimit: Number.parseInt(e.target.value) || undefined })}
                placeholder="30"
              />
            </div>
            <div>
              <Label htmlFor="max-attempts">Max Attempts</Label>
              <Input
                id="max-attempts"
                type="number"
                value={newQuiz.maxAttempts}
                onChange={(e) => setNewQuiz({ ...newQuiz, maxAttempts: Number.parseInt(e.target.value) || 3 })}
                placeholder="3"
              />
            </div>
            <div>
              <Label htmlFor="passing-score">Passing Score (%)</Label>
              <Input
                id="passing-score"
                type="number"
                value={newQuiz.passingScore}
                onChange={(e) => setNewQuiz({ ...newQuiz, passingScore: Number.parseFloat(e.target.value) || 60 })}
                placeholder="60"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is-published"
              checked={newQuiz.isPublished}
              onChange={(e) => setNewQuiz({ ...newQuiz, isPublished: e.target.checked })}
              className="rounded border-gray-300"
            />
            <Label htmlFor="is-published">Publish immediately (students can take this quiz)</Label>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setShowCreateQuiz(false)}>
              Cancel
            </Button>
            <Button 
              onClick={createQuiz}
              disabled={loading || !newQuiz.title || !newQuiz.courseId}
            >
              {loading ? 'Creating...' : 'Create Quiz'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderQuestionForm = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setShowQuestionForm(false)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Quiz
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">
          Add Question to "{editingQuiz?.title}"
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Question Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="question-text">Question Text *</Label>
            <textarea
              id="question-text"
              className="w-full p-3 border border-gray-300 rounded-md"
              rows={3}
              value={currentEnhancedQuestion.questionText}
              onChange={(e) => setCurrentEnhancedQuestion({ 
                ...currentEnhancedQuestion, 
                questionText: e.target.value 
              })}
              placeholder="Enter your question here..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="question-type">Question Type *</Label>
              <select
                id="question-type"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={currentEnhancedQuestion.questionType}
                onChange={(e) => {
                  const type = e.target.value as any
                  let defaultAnswers = [
                    { answerText: "", isCorrect: false },
                    { answerText: "", isCorrect: false }
                  ]
                  
                  if (type === 'TRUE_FALSE') {
                    defaultAnswers = [
                      { answerText: "True", isCorrect: false },
                      { answerText: "False", isCorrect: false }
                    ]
                  }
                  
                  setCurrentEnhancedQuestion({ 
                    ...currentEnhancedQuestion, 
                    questionType: type,
                    answers: defaultAnswers
                  })
                }}
              >
                <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                <option value="TRUE_FALSE">True / False</option>
                <option value="MATCH_COLUMN">Match the Column</option>
                <option value="FILL_IN_BLANKS">Fill in the Blanks</option>
              </select>
            </div>
            <div>
              <Label htmlFor="question-points">Points</Label>
              <Input
                id="question-points"
                type="number"
                value={currentEnhancedQuestion.points}
                onChange={(e) => setCurrentEnhancedQuestion({ 
                  ...currentEnhancedQuestion, 
                  points: Number.parseInt(e.target.value) || 1 
                })}
                placeholder="1"
              />
            </div>
          </div>

          {/* Answer Options based on Question Type */}
          {currentEnhancedQuestion.questionType === 'MULTIPLE_CHOICE' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Answer Options * <span className="text-sm text-gray-500">(Select the correct answer)</span></Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addAnswer}
                  disabled={currentEnhancedQuestion.answers.length >= 6}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Option
                </Button>
              </div>
              {currentEnhancedQuestion.answers.map((answer, index) => (
                <div key={index} className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${
                  answer.isCorrect ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correct-answer"
                      checked={answer.isCorrect}
                      onChange={() => {
                        const newAnswers = currentEnhancedQuestion.answers.map((a, i) => ({
                          ...a,
                          isCorrect: i === index
                        }))
                        setCurrentEnhancedQuestion({
                          ...currentEnhancedQuestion,
                          answers: newAnswers
                        })
                      }}
                      className="w-4 h-4 cursor-pointer"
                    />
                    {answer.isCorrect && <span className="text-green-600 font-semibold text-xs">✓ Correct</span>}
                  </div>
                  <Input
                    value={answer.answerText}
                    onChange={(e) => updateAnswer(index, 'answerText', e.target.value)}
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    className="flex-1"
                  />
                  {currentEnhancedQuestion.answers.length > 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeAnswer(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}

          {currentEnhancedQuestion.questionType === 'TRUE_FALSE' && (
            <div className="space-y-4">
              <Label>Select Correct Answer * <span className="text-sm text-gray-500">(Choose True or False)</span></Label>
              {currentEnhancedQuestion.answers.map((answer, index) => (
                <div key={index} className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                  answer.isCorrect ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`} onClick={() => {
                  const newAnswers = currentEnhancedQuestion.answers.map((a, i) => ({
                    ...a,
                    isCorrect: i === index
                  }))
                  setCurrentEnhancedQuestion({
                    ...currentEnhancedQuestion,
                    answers: newAnswers
                  })
                }}>
                  <input
                    type="radio"
                    name="tf-correct-answer"
                    checked={answer.isCorrect}
                    onChange={() => {
                      const newAnswers = currentEnhancedQuestion.answers.map((a, i) => ({
                        ...a,
                        isCorrect: i === index
                      }))
                      setCurrentEnhancedQuestion({
                        ...currentEnhancedQuestion,
                        answers: newAnswers
                      })
                    }}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className={`font-medium text-lg ${answer.isCorrect ? 'text-green-700' : 'text-gray-700'}`}>
                    {answer.answerText}
                  </span>
                  {answer.isCorrect && <span className="ml-auto text-green-600 font-semibold">✓ Correct Answer</span>}
                </div>
              ))}
            </div>
          )}

          {currentEnhancedQuestion.questionType === 'MATCH_COLUMN' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Match Pairs *</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addAnswer}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Pair
                </Button>
              </div>
              {currentEnhancedQuestion.answers.map((answer, index) => (
                <div key={index} className="grid grid-cols-2 gap-3 items-center">
                  <div>
                    <Input
                      value={answer.answerText}
                      onChange={(e) => updateAnswer(index, 'answerText', e.target.value)}
                      placeholder="Left column item"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      value={answer.matchPair || ''}
                      onChange={(e) => updateAnswer(index, 'matchPair', e.target.value)}
                      placeholder="Right column match"
                      className="flex-1"
                    />
                    {currentEnhancedQuestion.answers.length > 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeAnswer(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentEnhancedQuestion.questionType === 'FILL_IN_BLANKS' && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Instructions:</strong> Use _____ (5 underscores) in your question text to mark blanks.
                  Then specify the correct answers for each blank position below.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <Label>Correct Answers for Blanks *</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addAnswer}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Blank
                </Button>
              </div>
              {currentEnhancedQuestion.answers.map((answer, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-sm font-medium">Blank {index + 1}:</span>
                  <Input
                    value={answer.answerText}
                    onChange={(e) => {
                      updateAnswer(index, 'answerText', e.target.value)
                      updateAnswer(index, 'blankPosition', index + 1)
                    }}
                    placeholder="Correct answer for this blank"
                    className="flex-1"
                  />
                  {currentEnhancedQuestion.answers.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeAnswer(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}

          <div>
            <Label htmlFor="explanation">Explanation (Optional)</Label>
            <textarea
              id="explanation"
              className="w-full p-3 border border-gray-300 rounded-md"
              rows={2}
              value={currentEnhancedQuestion.explanation || ''}
              onChange={(e) => setCurrentEnhancedQuestion({ 
                ...currentEnhancedQuestion, 
                explanation: e.target.value 
              })}
              placeholder="Explain why this is the correct answer (shown after submission)"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setShowQuestionForm(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => editingQuiz?.id && addEnhancedQuestion(editingQuiz.id)}
              disabled={
                loading || 
                !currentEnhancedQuestion.questionText || 
                !currentEnhancedQuestion.answers.some(a => a.answerText) ||
                !currentEnhancedQuestion.answers.some(a => a.isCorrect) // Must have at least one correct answer
              }
              title={
                !currentEnhancedQuestion.answers.some(a => a.isCorrect) 
                  ? "Please mark at least one answer as correct" 
                  : ""
              }
            >
              {loading ? 'Adding...' : 'Add Question'}
            </Button>
          </div>
          
          {/* Validation warning */}
          {currentEnhancedQuestion.questionText && 
           currentEnhancedQuestion.answers.some(a => a.answerText) &&
           !currentEnhancedQuestion.answers.some(a => a.isCorrect) && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ <strong>Warning:</strong> Please mark at least one answer as correct by selecting the radio button.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
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

  const renderFeedback = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Course Feedback</h2>
      </div>

      {feedbacksLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading feedback...</p>
          </div>
        </div>
      ) : feedbacks.length === 0 ? (
        <Card className="p-12 text-center">
          <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Feedback Yet</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            You haven't received any feedback from students yet. Once students complete your courses and provide feedback, it will appear here.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((feedback) => (
            <Card key={feedback.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feedback.User.name}</h3>
                    <p className="text-sm text-gray-500">{feedback.User.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < feedback.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-semibold text-gray-700">
                    {feedback.rating}/5
                  </span>
                </div>
              </div>
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-700 mb-1">Course: {feedback.Course.title}</p>
              </div>
              {feedback.comment && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{feedback.comment}</p>
                </div>
              )}
              <div className="mt-4 text-xs text-gray-500">
                {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </Card>
          ))}
        </div>
      )}
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
      case "feedback":
        return renderFeedback()
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
