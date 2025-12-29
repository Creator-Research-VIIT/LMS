'use client'

import { AwardCelebration } from '@/components/award-celebration'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import confetti from 'canvas-confetti'
import { ArrowRight, Award, BookOpen, CheckCircle, Loader2, Play, Share2, Star, Trophy, Users } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
// Lazy load jsPDF only on client interaction
const loadJsPDF = async () => (await import('jspdf')).default

export interface CourseEnrolledClientProps {
  readonly params: {
    readonly id: string;
  };
}

interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  price: number
  isFree: boolean
  duration: string
  category: string
  User: {
    id: string
    name: string
    email: string
  }
  Module?: Array<{
    id: string
    title: string
    description: string
    videoUrl: string
    resources: string
    orderIndex: number
  }>
  _count?: {
    enrollments: number
    contents: number
  }
  enrolledAt?: string
}

export default function CourseEnrolledClient({ params }: CourseEnrolledClientProps) {
  const courseId = params.id
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [hasPlayedConfetti, setHasPlayedConfetti] = useState(false)
  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>([])
  const [progressPercent, setProgressPercent] = useState(0)
  const [togglingModuleId, setTogglingModuleId] = useState<string | null>(null)
  const [certificateReady, setCertificateReady] = useState(false)
  const [quizLoading, setQuizLoading] = useState(true)
  type QuizAnswerOption = { id: string; answerText: string; orderIndex: number }
  type QuizQuestion = { id: string; questionText: string; questionType: string; points: number; Answer: QuizAnswerOption[] }
  type FinalQuiz = { id: string; title: string; passingScore: number; Question: QuizQuestion[]; QuizSubmission?: Array<{ isPassed: boolean }> }
  const [finalQuiz, setFinalQuiz] = useState<FinalQuiz | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, any>>({})
  const [quizSubmitting, setQuizSubmitting] = useState(false)
  const [quizMessage, setQuizMessage] = useState<string | null>(null)
  const [courseCompletedAt, setCourseCompletedAt] = useState<Date | null>(null)
  const [showAwardCelebration, setShowAwardCelebration] = useState(false)
  const [awardData, setAwardData] = useState<{ name: string; description: string; icon: string; color: string } | null>(null)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [feedbackRating, setFeedbackRating] = useState(0)
  const [feedbackComment, setFeedbackComment] = useState('')
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const success = searchParams.get('success') === 'true'

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/login')
      return
    }
    fetchCourse()
    fetchModuleProgress()
    fetchFinalQuiz()
  }, [courseId, session, status])

  useEffect(() => {
    if (success && !hasPlayedConfetti && course) {
      // Play confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      setHasPlayedConfetti(true)
    }
  }, [success, hasPlayedConfetti, course])

  // Allow certificate download when course is complete (100%), regardless of quiz
  useEffect(() => {
    if (progressPercent === 100 || courseCompletedAt) {
      setCertificateReady(true)
    }
  }, [progressPercent, courseCompletedAt])

  const fetchCourse = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/courses/${courseId}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch course')
      }
      
      setCourse(data)
    } catch (error) {
      console.error('Error fetching course:', error)
      setError('Failed to load course details. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartLearning = () => {
    router.push(`/student/courses/${courseId}`)
  }

  const handleModuleClick = (module: any) => {
    // For now, just open the video URL in a new tab if available
    if (module.videoUrl) {
      window.open(module.videoUrl, '_blank')
    }
  }

  const fetchModuleProgress = async () => {
    try {
      const res = await fetch(`/api/progress/modules/${courseId}`)
      if (!res.ok) {
        if (res.status === 403) {
          console.warn('Not enrolled in this course or course not found')
          setProgressPercent(0)
          setCompletedModuleIds([])
          setCourseCompletedAt(null)
        }
        return
      }
      const data = await res.json()
      setCompletedModuleIds(data.completedModuleIds || [])
      setProgressPercent(data.progressPercent || 0)
      setCourseCompletedAt(data.completedAt ? new Date(data.completedAt) : null)
    } catch (e) {
      console.warn('Failed to fetch module progress', e)
    }
  }

  const toggleModule = async (moduleId: string) => {
    // Optimistic update - toggle immediately
    const isCurrentlyCompleted = completedModuleIds.includes(moduleId)
    const newCompletedIds = isCurrentlyCompleted
      ? completedModuleIds.filter(id => id !== moduleId)
      : [...completedModuleIds, moduleId]
    
    setCompletedModuleIds(newCompletedIds)
    setTogglingModuleId(moduleId)
    
    // Calculate optimistic progress
    const totalModules = course?.Module?.length || 1
    const optimisticProgress = (newCompletedIds.length / totalModules) * 100
    setProgressPercent(optimisticProgress)
    
    try {
      const res = await fetch('/api/progress/modules/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId })
      })
      if (!res.ok) {
        // Revert on error - toggle back
        setCompletedModuleIds(isCurrentlyCompleted ? [...newCompletedIds, moduleId] : newCompletedIds.filter(id => id !== moduleId))
        return
      }
      const data = await res.json()
      // Sync with server response
      setProgressPercent(data.aggregate?.progressPercent || optimisticProgress)
    } catch (e) {
      console.error('Failed toggling module', e)
      // Revert on error - toggle back
      setCompletedModuleIds(isCurrentlyCompleted ? [...newCompletedIds, moduleId] : newCompletedIds.filter(id => id !== moduleId))
    } finally {
      setTogglingModuleId(null)
    }
  }

  const handleShareCourse = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `I just enrolled in ${course?.title}!`,
          text: `Check out this amazing course: ${course?.title}`,
          url: `${globalThis.location?.origin}/courses/${courseId}`
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else if (globalThis.navigator?.clipboard) {
      navigator.clipboard.writeText(`${globalThis.location?.origin}/courses/${courseId}`)
      alert('Course link copied to clipboard!')
    }
  }

  const getQuizCertificateMessage = (): string => {
    if (progressPercent < 100) {
      return 'Complete all modules to unlock the final quiz and generate your certificate.'
    }
    if (finalQuiz) {
      return 'Pass the final quiz to generate your certificate.'
    }
    return 'Congratulations! You can now generate your certificate.'
  }

  const fetchFinalQuiz = async () => {
    setQuizLoading(true)
    try {
      const res = await fetch(`/api/quizzes/course/${courseId}`)
      if (!res.ok) {
        setFinalQuiz(null)
        setQuizLoading(false)
        // No quiz, certificate ready immediately
        setCertificateReady(true)
        return
      }
      const data = await res.json()
      const quizzes = data.quizzes || []
      // Treat the latest quiz (sorted desc) as final
      const last = quizzes[0] || null
      if (last) {
        setFinalQuiz(last)
        // If any submission for this quiz is passed, unlock certificate
        if (last.QuizSubmission?.some((s: any) => s.isPassed)) {
          setCertificateReady(true)
        }
        // Note: certificateReady stays true from useEffect if course is complete
      } else {
        setFinalQuiz(null)
        // No quiz, certificate ready immediately
        setCertificateReady(true)
      }
    } catch (e) {
      console.warn('Failed to fetch quizzes', e)
      setFinalQuiz(null)
      // On error, assume no quiz and allow certificate
      setCertificateReady(true)
    } finally {
      setQuizLoading(false)
    }
  }

  const startFinalQuiz = () => {
    // Expands the inline quiz section; nothing to navigate
    const el = document.getElementById('final-quiz-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const selectAnswer = (questionId: string, answerId: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answerId }))
  }

  const submitFinalQuiz = async () => {
    if (!finalQuiz) return
    setQuizSubmitting(true)
    setQuizMessage(null)
    try {
      const res = await fetch(`/api/quizzes/${finalQuiz.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: quizAnswers })
      })
      const data = await res.json()
      if (res.ok) {
        setQuizMessage(`Your score: ${data.result.percentage}%`) 
        if (data.result.isPassed) {
          setCertificateReady(true)
          
          // Trigger award check for course completion milestone
          try {
            const awardRes = await fetch('/api/awards/trigger', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId: session?.user?.id })
            })
            const awardData = await awardRes.json()
            if (awardRes.ok && awardData.newAward) {
              // Show celebration if new award earned
              setAwardData({
                name: awardData.newAward.name,
                description: awardData.newAward.description,
                icon: awardData.newAward.icon,
                color: awardData.newAward.color
              })
              setShowAwardCelebration(true)
            }
          } catch (error) {
            console.error('Error triggering award check:', error)
          }
        }
      } else {
        setQuizMessage(data.error || 'Failed to submit quiz')
      }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An error occurred submitting the quiz'
      setQuizMessage(errorMessage)
    } finally {
      setQuizSubmitting(false)
    }
  }

  const generateCertificate = async () => {
    if (!course || !session?.user) return

    try {
      const jsPDF = await loadJsPDF()
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      // Premium background - luxury cream with subtle pattern
      pdf.setFillColor(252, 250, 245) // Luxury cream
      pdf.rect(0, 0, pageWidth, pageHeight, 'F')

      // Subtle watermark background pattern
      pdf.setTextColor(245, 240, 230)
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(80)
      pdf.text('SkillUP!!', pageWidth / 2, pageHeight / 2, { align: 'center' })

      // Outer premium border - double line with gold gradient
      pdf.setLineWidth(3)
      pdf.setDrawColor(212, 175, 55) // Bright gold
      pdf.rect(8, 8, pageWidth - 16, pageHeight - 16)

      pdf.setLineWidth(1)
      pdf.setDrawColor(184, 134, 11) // Darker gold
      pdf.rect(10, 10, pageWidth - 20, pageHeight - 20)

      // Inner elegant border
      pdf.setLineWidth(0.5)
      pdf.setDrawColor(212, 175, 55)
      pdf.rect(14, 14, pageWidth - 28, pageHeight - 28)

      // Top decorative flourish
      pdf.setLineWidth(0.8)
      pdf.setDrawColor(212, 175, 55)
      const flourishY = 22
      pdf.line(pageWidth / 2 - 40, flourishY, pageWidth / 2 - 20, flourishY)
      pdf.line(pageWidth / 2 + 20, flourishY, pageWidth / 2 + 40, flourishY)

      // Premium seal/emblem circle (top center)
      pdf.setDrawColor(212, 175, 55)
      pdf.setLineWidth(1.5)
      pdf.circle(pageWidth / 2, 32, 8, 'S')

      // Seal star icon (using text)
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(14)
      pdf.setTextColor(212, 175, 55)
      pdf.text('★', pageWidth / 2, 34, { align: 'center' })

      // Premium certificate title
      pdf.setFont('times', 'bold')
      pdf.setFontSize(56)
      pdf.setTextColor(25, 50, 100) // Royal blue
      pdf.text('CERTIFICATE', pageWidth / 2, 50, { align: 'center' })

      // Elegant subtitle line
      pdf.setLineWidth(1)
      pdf.setDrawColor(212, 175, 55)
      pdf.line(pageWidth / 2 - 60, 56, pageWidth / 2 + 60, 56)

      // Of Completion subtitle
      pdf.setFont('times', 'italic')
      pdf.setFontSize(18)
      pdf.setTextColor(184, 134, 11)
      pdf.text('of Completion', pageWidth / 2, 65, { align: 'center' })

      // Presented to text
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(13)
      pdf.setTextColor(80, 80, 80)
      pdf.text('This is proudly presented to', pageWidth / 2, 78, { align: 'center' })

      // Recipient name - premium highlight
      pdf.setFont('times', 'bold')
      pdf.setFontSize(42)
      pdf.setTextColor(25, 50, 100) // Royal blue
      const studentName = session.user.name || 'Student'
      pdf.text(studentName, pageWidth / 2, 102, { align: 'center' })

      // Decorative underline for name with gradient effect
      pdf.setLineWidth(2.5)
      pdf.setDrawColor(212, 175, 55)
      pdf.line(pageWidth / 2 - 65, 108, pageWidth / 2 + 65, 108)
      pdf.setLineWidth(1)
      pdf.setDrawColor(184, 134, 11)
      pdf.line(pageWidth / 2 - 65, 110, pageWidth / 2 + 65, 110)

      // For successfully completing
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(12)
      pdf.setTextColor(80, 80, 80)
      pdf.text('For successfully completing and demonstrating mastery in', pageWidth / 2, 123, { align: 'center' })

      // Course title - premium styling
      pdf.setFont('times', 'bold')
      pdf.setFontSize(18)
      pdf.setTextColor(25, 50, 100)
      const words = course.title.split(' ')
      let currentY = 133
      let line = ''
      const maxWidth = 140

      for (let word of words) {
        const testLine = line + word + ' '
        const textWidth = pdf.getTextWidth(testLine)
        if (textWidth > maxWidth && line) {
          pdf.text(line, pageWidth / 2, currentY, { align: 'center' })
          line = word + ' '
          currentY += 8
        } else {
          line = testLine
        }
      }
      if (line) {
        pdf.text(line, pageWidth / 2, currentY, { align: 'center' })
      }

      // Completion date with premium styling
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(11)
      pdf.setTextColor(100, 100, 100)
      const completionDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      pdf.text(`On this ${completionDate}`, pageWidth / 2, currentY + 15, { align: 'center' })

      // Bottom section - instructor and signature
      const bottomY = pageHeight - 28

      // Instructor info on left
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(10)
      pdf.setTextColor(100, 100, 100)
      pdf.text('Course Instructor', 28, bottomY - 8, { align: 'left' })
      pdf.setFont('times', 'bold')
      pdf.setFontSize(11)
      pdf.setTextColor(25, 50, 100)
      pdf.text(course.User.name, 28, bottomY + 2, { align: 'left' })

      // Signature line on right
      pdf.setLineWidth(1)
      pdf.setDrawColor(80, 80, 80)
      pdf.line(pageWidth - 65, bottomY - 5, pageWidth - 20, bottomY - 5)
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(9)
      pdf.setTextColor(100, 100, 100)
      pdf.text('Authorized Signature', pageWidth - 42, bottomY + 3, { align: 'center' })

      // Bottom decorative flourish
      pdf.setLineWidth(0.8)
      pdf.setDrawColor(212, 175, 55)
      const bottomFlourishY = pageHeight - 12
      pdf.line(pageWidth / 2 - 40, bottomFlourishY, pageWidth / 2 - 20, bottomFlourishY)
      pdf.line(pageWidth / 2 + 20, bottomFlourishY, pageWidth / 2 + 40, bottomFlourishY)

      // Corner decorative elements - premium style
      const cornerSize = 12
      pdf.setLineWidth(2)
      pdf.setDrawColor(212, 175, 55)
      // Top left
      pdf.line(10, 10, 10 + cornerSize, 10)
      pdf.line(10, 10, 10, 10 + cornerSize)
      // Top right
      pdf.line(pageWidth - 10, 10, pageWidth - 10 - cornerSize, 10)
      pdf.line(pageWidth - 10, 10, pageWidth - 10, 10 + cornerSize)
      // Bottom left
      pdf.line(10, pageHeight - 10, 10 + cornerSize, pageHeight - 10)
      pdf.line(10, pageHeight - 10, 10, pageHeight - 10 - cornerSize)
      // Bottom right
      pdf.line(pageWidth - 10, pageHeight - 10, pageWidth - 10 - cornerSize, pageHeight - 10)
      pdf.line(pageWidth - 10, pageHeight - 10, pageWidth - 10, pageHeight - 10 - cornerSize)

      // Download the PDF
      const fileName = `${course.title.replaceAll(' ', '_')}_Certificate_${studentName.replaceAll(' ', '_')}.pdf`
      pdf.save(fileName)
    } catch (error) {
      console.error('Error generating certificate:', error)
      alert('Failed to generate certificate. Please try again.')
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect to login
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
          <Button onClick={() => router.push('/courses')} className="mt-4">
            Browse Courses
          </Button>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-600">Course not found</p>
          <Button onClick={() => router.push('/courses')} className="mt-4">
            Browse Courses
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {showAwardCelebration && awardData && (
        <AwardCelebration 
          award={awardData}
          isOpen={showAwardCelebration}
          onClose={() => setShowAwardCelebration(false)}
        />
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        {success && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🎉 Enrollment Successful!
            </h1>
            <p className="text-xl text-gray-600">
              Welcome to your new learning journey
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Details */}
          <div className="lg:col-span-2">
            <Card>
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  width={800}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-600 text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Enrolled
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-2xl">{course.title}</CardTitle>
                <CardDescription className="text-base">
                  Instructor: {course.User.name}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-gray-700 mb-6">{course.description}</p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <BookOpen className="h-6 w-6 mx-auto mb-1 text-blue-600" />
                    <div className="font-semibold text-gray-900">{course.Module?.length || 0}</div>
                    <div className="text-xs text-gray-600">Modules</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Users className="h-6 w-6 mx-auto mb-1 text-purple-600" />
                    <div className="font-semibold text-gray-900">{course._count?.enrollments || 0}</div>
                    <div className="text-xs text-gray-600">Students</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <Award className="h-6 w-6 mx-auto mb-1 text-yellow-600" />
                    <div className="font-semibold text-gray-900">Certificate</div>
                    <div className="text-xs text-gray-600">Included</div>
                  </div>
                </div>

                {/* Progress Summary */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress</h3>
                  <div className="flex items-center gap-3 mb-1">
                    <Progress value={progressPercent} className="w-full" />
                    <span className="text-sm font-medium w-16 text-right">{Math.round(progressPercent)}%</span>
                  </div>
                  <p className="text-xs text-gray-500">Mark modules as completed to advance your progress.</p>
                  {courseCompletedAt && (
                    <p className="text-xs text-green-600 mt-2">
                      ✓ Completed on {courseCompletedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  )}
                </div>

                {/* Course Modules */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Course Modules</h3>
                  
                  <div className="space-y-3">
                    {course.Module && course.Module.length > 0 ? (
                      course.Module.map((module, index) => (
                        <div key={module.id} className={`flex items-start gap-3 p-4 bg-white border rounded-lg hover:shadow-md transition-all ${togglingModuleId === module.id ? 'opacity-75' : ''}`}>
                          <Checkbox 
                            checked={completedModuleIds.includes(module.id)}
                            onCheckedChange={() => toggleModule(module.id)}
                            disabled={togglingModuleId === module.id}
                            className="mt-1 cursor-pointer"
                          />
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <button onClick={() => handleModuleClick(module)} className="flex-1 text-left">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                {module.title}
                                {completedModuleIds.includes(module.id) && <CheckCircle className="h-4 w-4 text-green-600" />}
                              </h4>
                              {module.videoUrl && <Play className="h-4 w-4 text-blue-600" />}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                            {module.resources && (
                              <p className="text-xs text-green-600 mt-1">+ Additional resources available</p>
                            )}
                          </button>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <BookOpen className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                        <p>No modules available yet</p>
                        <p className="text-sm">Check back later for course content</p>
                      </div>
                    )}
                  </div>
                  {/* Quiz & Certificate Section - Only show if quiz exists or certificate is ready */}
                  {(finalQuiz || (!quizLoading && certificateReady)) && (
                    <div id="final-quiz-section" className="mt-8 border-t pt-6 space-y-4">
                      <h3 className="text-lg font-semibold">Final Quiz & Certificate</h3>
                      <p className="text-sm text-gray-600">
                        {getQuizCertificateMessage()}
                      </p>
                      {progressPercent < 100 && (
                        <div className="text-sm text-yellow-600 flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          Finish remaining modules to unlock the quiz.
                        </div>
                      )}
                      {(progressPercent === 100 || courseCompletedAt) && (
                      <div className="space-y-3">
                        {/* If there's a quiz and it's not completed, show quiz button */}
                        {finalQuiz && !certificateReady && (
                          <>
                            <Button variant="default" className="w-full" onClick={startFinalQuiz}>
                              <Trophy className="h-4 w-4 mr-2" />
                              Take Final Quiz: {finalQuiz.title}
                            </Button>
                            {/* Inline simple quiz UI */}
                            {!certificateReady && (
                              <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold">{finalQuiz.title}</h4>
                                  <span className="text-xs text-gray-600">Passing: {finalQuiz.passingScore}%</span>
                                </div>
                                <div className="space-y-4">
                                  {finalQuiz.Question?.map((q, qi) => (
                                    <div key={q.id} className="bg-white p-3 rounded border">
                                      <div className="font-medium mb-2">{qi + 1}. {q.questionText}</div>
                                      {(q.questionType === 'MULTIPLE_CHOICE' || q.questionType === 'TRUE_FALSE') ? (
                                        <div className="space-y-2">
                                          {q.Answer.map(opt => (
                                            <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                                              <input
                                                type="radio"
                                                name={`q-${q.id}`}
                                                checked={quizAnswers[q.id] === opt.id}
                                                onChange={() => selectAnswer(q.id, opt.id)}
                                              />
                                              <span>{opt.answerText}</span>
                                            </label>
                                          ))}
                                        </div>
                                      ) : (
                                        <div className="text-xs text-gray-500">Question type not supported in inline mode.</div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                                {quizMessage && <div className={`text-sm ${quizMessage.includes('Your score') ? 'text-blue-700' : 'text-red-700'}`}>{quizMessage}</div>}
                                <Button onClick={submitFinalQuiz} disabled={quizSubmitting} className="w-full">
                                  {quizSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                                  Submit Quiz
                                </Button>
                              </div>
                            )}
                          </>
                        )}
                        
                        {/* If quiz is passed or no quiz exists, show certificate button */}
                        {(certificateReady || !finalQuiz) && !quizLoading && (
                          <>
                            {finalQuiz && certificateReady && (
                              <Button variant="default" className="w-full" disabled>
                                <CheckCircle className="h-4 w-4 mr-2" /> Quiz Passed ✓
                              </Button>
                            )}
                            <Button onClick={generateCertificate} className="w-full bg-green-600 hover:bg-green-700">
                              <Award className="h-4 w-4 mr-2" />
                              Download Certificate PDF
                            </Button>
                          </>
                        )}

                        {/* Loading state for quiz */}
                        {quizLoading && (
                          <Button variant="outline" className="w-full" disabled>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Loading Quiz...
                          </Button>
                        )}
                      </div>
                    )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Start Learning / Certificate Card */}
            <Card>
              <CardHeader className="text-center">
                <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                <CardTitle>Ready to Start?</CardTitle>
                <CardDescription>
                  Your learning adventure begins now!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleStartLearning}
                  className="w-full h-12 text-lg font-semibold"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Learning
                </Button>
                {/* Only show certificate if quiz exists and is passed, OR if no quiz exists and course is complete */}
                {(progressPercent === 100 || courseCompletedAt) && certificateReady && !quizLoading && (
                  <Button 
                    onClick={generateCertificate}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Generate Certificate
                  </Button>
                )}
                
                <Button 
                  variant="outline"
                  onClick={() => router.push('/student')}
                  className="w-full"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Go to Dashboard
                </Button>
              </CardContent>
            </Card>

            {/* Course Feedback */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rate This Course</CardTitle>
                <CardDescription>
                  Share your experience with others
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!showFeedbackForm ? (
                  <Button 
                    variant="outline"
                    onClick={() => setShowFeedbackForm(true)}
                    className="w-full"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Leave Feedback
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFeedbackRating(star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= feedbackRating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300 hover:text-yellow-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Comment (Optional)</label>
                      <textarea
                        placeholder="Share your thoughts..."
                        value={feedbackComment}
                        onChange={(e) => setFeedbackComment(e.target.value)}
                        rows={3}
                        className="w-full p-2 border rounded-md resize-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={async () => {
                          if (feedbackRating === 0) return;
                          setFeedbackSubmitting(true);
                          try {
                            const response = await fetch('/api/feedback', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                courseId: courseId,
                                rating: feedbackRating,
                                comment: feedbackComment,
                                type: 'COURSE'
                              }),
                            });
                            if (response.ok) {
                              alert('Thank you for your feedback!');
                              setShowFeedbackForm(false);
                              setFeedbackRating(0);
                              setFeedbackComment('');
                            } else {
                              const error = await response.json();
                              alert(error.error || 'Failed to submit feedback');
                            }
                          } catch (error) {
                            console.error('Error submitting feedback:', error);
                            alert('Failed to submit feedback');
                          } finally {
                            setFeedbackSubmitting(false);
                          }
                        }}
                        disabled={feedbackRating === 0 || feedbackSubmitting}
                        className="flex-1"
                      >
                        {feedbackSubmitting ? 'Submitting...' : 'Submit'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowFeedbackForm(false);
                          setFeedbackRating(0);
                          setFeedbackComment('');
                        }}
                        disabled={feedbackSubmitting}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Course Feedback */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rate This Course</CardTitle>
                <CardDescription>
                  Share your experience with others
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!showFeedbackForm ? (
                  <Button 
                    variant="outline"
                    onClick={() => setShowFeedbackForm(true)}
                    className="w-full"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Leave Feedback
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFeedbackRating(star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= feedbackRating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300 hover:text-yellow-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Comment (Optional)</label>
                      <textarea
                        placeholder="Share your thoughts..."
                        value={feedbackComment}
                        onChange={(e) => setFeedbackComment(e.target.value)}
                        rows={3}
                        className="w-full p-2 border rounded-md resize-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={async () => {
                          if (feedbackRating === 0) return;
                          setFeedbackSubmitting(true);
                          try {
                            const response = await fetch('/api/feedback', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                courseId: courseId,
                                rating: feedbackRating,
                                comment: feedbackComment,
                                type: 'COURSE'
                              }),
                            });
                            if (response.ok) {
                              alert('Thank you for your feedback!');
                              setShowFeedbackForm(false);
                              setFeedbackRating(0);
                              setFeedbackComment('');
                            } else {
                              const error = await response.json();
                              alert(error.error || 'Failed to submit feedback');
                            }
                          } catch (error) {
                            console.error('Error submitting feedback:', error);
                            alert('Failed to submit feedback');
                          } finally {
                            setFeedbackSubmitting(false);
                          }
                        }}
                        disabled={feedbackRating === 0 || feedbackSubmitting}
                        className="flex-1"
                      >
                        {feedbackSubmitting ? 'Submitting...' : 'Submit'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowFeedbackForm(false);
                          setFeedbackRating(0);
                          setFeedbackComment('');
                        }}
                        disabled={feedbackSubmitting}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Share Achievement */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Share Your Achievement</CardTitle>
                <CardDescription>
                  Let others know about your new course!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline"
                  onClick={handleShareCourse}
                  className="w-full"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Course
                </Button>
              </CardContent>
            </Card>

            {/* Enrollment Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Enrollment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Enrolled on:</span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Access:</span>
                  <Badge variant="secondary">Lifetime</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Certificate:</span>
                  <Badge variant="secondary">Included</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => router.push('/courses')}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse More Courses
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => router.push('/student/courses')}
                >
                  <Star className="h-4 w-4 mr-2" />
                  My Courses
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}