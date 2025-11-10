'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import confetti from 'canvas-confetti'
import { ArrowRight, Award, BookOpen, CheckCircle, Loader2, Play, Share2, Star, Trophy, Users } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import dynamic from 'next/dynamic'
// Lazy load jsPDF only on client interaction
const loadJsPDF = async () => (await import('jspdf')).default
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

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
  const [certificateReady, setCertificateReady] = useState(false)
  type QuizAnswerOption = { id: string; answerText: string; orderIndex: number }
  type QuizQuestion = { id: string; questionText: string; questionType: string; points: number; Answer: QuizAnswerOption[] }
  type FinalQuiz = { id: string; title: string; passingScore: number; Question: QuizQuestion[]; QuizSubmission?: Array<{ isPassed: boolean }> }
  const [finalQuiz, setFinalQuiz] = useState<FinalQuiz | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, any>>({})
  const [quizSubmitting, setQuizSubmitting] = useState(false)
  const [quizMessage, setQuizMessage] = useState<string | null>(null)
  
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
      if (!res.ok) return
      const data = await res.json()
      setCompletedModuleIds(data.completedModuleIds || [])
      setProgressPercent(data.progressPercent || 0)
    } catch (e) {
      console.warn('Failed to fetch module progress', e)
    }
  }

  const toggleModule = async (moduleId: string) => {
    try {
      const res = await fetch('/api/progress/modules/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId })
      })
      if (!res.ok) return
      const data = await res.json()
      const isCompleted = data.completed
      setProgressPercent(data.aggregate?.progressPercent || 0)
      setCompletedModuleIds(prev => {
        const exists = prev.includes(moduleId)
        if (isCompleted && !exists) return [...prev, moduleId]
        if (!isCompleted && exists) return prev.filter(id => id !== moduleId)
        return prev
      })
    } catch (e) {
      console.error('Failed toggling module', e)
    }
  }

  const generateCertificate = async () => {
    const jsPDF = await loadJsPDF()
    const doc = new jsPDF()
    doc.setFontSize(22)
    doc.text('Certificate of Completion', 105, 30, { align: 'center' })
    doc.setFontSize(14)
    doc.text(`This certifies that ${session?.user?.name || 'Student'}`, 105, 50, { align: 'center' })
    doc.text(`has successfully completed the course`, 105, 60, { align: 'center' })
    doc.setFontSize(16)
    doc.text(course?.title || '', 105, 72, { align: 'center' })
    doc.setFontSize(12)
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 90, { align: 'center' })
    doc.text('Congratulations!', 105, 100, { align: 'center' })
    doc.save(`certificate-${courseId}.pdf`)
  }

  const handleShareCourse = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `I just enrolled in ${course?.title}!`,
          text: `Check out this amazing course: ${course?.title}`,
          url: `${window.location.origin}/courses/${courseId}`
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/courses/${courseId}`)
      alert('Course link copied to clipboard!')
    }
  }

  const fetchFinalQuiz = async () => {
    try {
      const res = await fetch(`/api/quizzes/course/${courseId}`)
      if (!res.ok) return
      const data = await res.json()
      const quizzes = data.quizzes || []
      // Treat the latest quiz (sorted desc) as final
      const last = quizzes[0] || null
      if (last) {
        setFinalQuiz(last)
        // If any submission for this quiz is passed, unlock certificate
        if (last.QuizSubmission && last.QuizSubmission.some((s: any) => s.isPassed)) {
          setCertificateReady(true)
        }
      }
    } catch (e) {
      console.warn('Failed to fetch quizzes', e)
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
      if (!res.ok) {
        setQuizMessage(data.error || 'Failed to submit quiz')
      } else {
        setQuizMessage(`Your score: ${data.result.percentage}%`) 
        if (data.result.isPassed) {
          setCertificateReady(true)
        }
      }
    } catch (e) {
      setQuizMessage('An error occurred submitting the quiz')
    } finally {
      setQuizSubmitting(false)
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
                </div>

                {/* Course Modules */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Course Modules</h3>
                  
                  <div className="space-y-3">
                    {course.Module && course.Module.length > 0 ? (
                      course.Module.map((module, index) => (
                        <div key={module.id} className="flex items-start gap-3 p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
                          <Checkbox 
                            checked={completedModuleIds.includes(module.id)}
                            onCheckedChange={() => toggleModule(module.id)}
                            className="mt-1"
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
                  {/* Quiz & Certificate Section */}
                  <div id="final-quiz-section" className="mt-8 border-t pt-6 space-y-4">
                    <h3 className="text-lg font-semibold">Final Quiz & Certificate</h3>
                    <p className="text-sm text-gray-600">Complete all modules to unlock the final quiz and generate your certificate.</p>
                    {progressPercent < 100 && (
                      <div className="text-sm text-yellow-600 flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Finish remaining modules to unlock the quiz.
                      </div>
                    )}
                    {progressPercent === 100 && (
                      <div className="space-y-3">
                        {!certificateReady && (
                          <Button variant="default" className="w-full" onClick={startFinalQuiz} disabled={!finalQuiz}>
                            <Trophy className="h-4 w-4 mr-2" />
                            {finalQuiz ? `Take Final Quiz: ${finalQuiz.title}` : 'Loading Quiz...'}
                          </Button>
                        )}
                        {/* Inline simple quiz UI */}
                        {progressPercent === 100 && finalQuiz && !certificateReady && (
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
                            {quizMessage && <div className="text-sm text-blue-700">{quizMessage}</div>}
                            <Button onClick={submitFinalQuiz} disabled={quizSubmitting}>
                              {quizSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                              Submit Quiz
                            </Button>
                          </div>
                        )}
                        {certificateReady && (
                          <>
                            <Button variant="default" className="w-full" disabled>
                              <CheckCircle className="h-4 w-4 mr-2" /> Quiz Passed
                            </Button>
                            <Button variant="outline" onClick={generateCertificate} className="w-full">
                              <Award className="h-4 w-4 mr-2" />
                              Download Certificate PDF
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
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
                {progressPercent === 100 && certificateReady && (
                  <Button 
                    variant="secondary"
                    onClick={generateCertificate}
                    className="w-full"
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
  )
}