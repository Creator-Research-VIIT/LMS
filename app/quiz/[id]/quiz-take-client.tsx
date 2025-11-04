"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, Clock, HelpCircle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface QuizAnswer {
  id: string
  answerText: string
  orderIndex: number
  matchPair?: string
  blankPosition?: number
}

interface QuizQuestion {
  id: string
  questionText: string
  questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'MATCH_COLUMN' | 'FILL_IN_BLANKS'
  points: number
  orderIndex: number
  explanation?: string
  questionData?: any
  Answer: QuizAnswer[]
}

interface Quiz {
  id: string
  title: string
  description?: string
  timeLimit?: number
  maxAttempts: number
  passingScore: number
  isPublished: boolean
  Question: QuizQuestion[]
  Course: {
    title: string
  }
}

interface QuizSubmission {
  id: string
  score: number
  maxScore: number
  percentage: number
  isPassed: boolean
  attemptNumber: number
  submittedAt: string
}

interface QuizTakeClientProps {
  quizId: string
}

export default function QuizTakeClient({ quizId }: QuizTakeClientProps) {
  const router = useRouter()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [submissions, setSubmissions] = useState<QuizSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [taking, setTaking] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [startTime, setStartTime] = useState<Date | null>(null)

  useEffect(() => {
    fetchQuizData()
    fetchSubmissions()
  }, [quizId])

  // Timer effect
  useEffect(() => {
    if (taking && timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === null || prev <= 1) {
            handleSubmit() // Auto-submit when time runs out
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [taking, timeLeft])

  const fetchQuizData = async () => {
    try {
      const response = await fetch(`/api/quizzes/${quizId}`)
      if (response.ok) {
        const data = await response.json()
        setQuiz(data.quiz)
      } else {
        console.error('Failed to fetch quiz data')
      }
    } catch (error) {
      console.error('Error fetching quiz:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(`/api/quizzes/${quizId}/submit`)
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data.submissions)
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
    }
  }

  const startQuiz = () => {
    setTaking(true)
    setStartTime(new Date())
    setAnswers({})
    setCurrentQuestionIndex(0)
    
    if (quiz?.timeLimit) {
      setTimeLeft(quiz.timeLimit * 60) // Convert minutes to seconds
    }
  }

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleSubmit = async () => {
    if (!quiz || !startTime) return
    
    setSubmitting(true)
    
    const timeSpent = Math.floor((new Date().getTime() - startTime.getTime()) / 1000)
    
    try {
      const response = await fetch(`/api/quizzes/${quizId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          timeSpent
        })
      })

      if (response.ok) {
        const data = await response.json()
        setResults(data.result)
        setShowResults(true)
        setTaking(false)
        fetchSubmissions() // Refresh submissions
      } else {
        const errorData = await response.json()
        alert(errorData.error || 'Failed to submit quiz')
      }
    } catch (error) {
      console.error('Error submitting quiz:', error)
      alert('Error submitting quiz')
    } finally {
      setSubmitting(false)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const renderQuestion = (question: QuizQuestion) => {
    switch (question.questionType) {
      case 'MULTIPLE_CHOICE':
        return (
          <div className="space-y-3">
            {question.Answer.map((answer) => (
              <label key={answer.id} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={answer.id}
                  checked={answers[question.id] === answer.id}
                  onChange={() => handleAnswerChange(question.id, answer.id)}
                  className="text-blue-600"
                />
                <span>{answer.answerText}</span>
              </label>
            ))}
          </div>
        )

      case 'TRUE_FALSE':
        return (
          <div className="space-y-3">
            {question.Answer.map((answer) => (
              <label key={answer.id} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={answer.id}
                  checked={answers[question.id] === answer.id}
                  onChange={() => handleAnswerChange(question.id, answer.id)}
                  className="text-blue-600"
                />
                <span className="font-medium">{answer.answerText}</span>
              </label>
            ))}
          </div>
        )

      case 'MATCH_COLUMN': {
        const leftItems = question.Answer.map(a => ({ id: a.id, text: a.answerText }))
        const rightItems = question.Answer.map(a => ({ id: a.id, text: a.matchPair })).sort(() => Math.random() - 0.5)
        
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Match each item from the left column with the correct item from the right column:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Column A</h4>
                {leftItems.map((item) => (
                  <div key={item.id} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    {item.text}
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Column B</h4>
                {leftItems.map((leftItem) => (
                  <div key={leftItem.id} className="flex items-center space-x-2">
                    <span className="text-sm">{leftItem.text} →</span>
                    <select
                      className="flex-1 p-2 border rounded-md"
                      value={answers[question.id]?.[leftItem.text] || ''}
                      onChange={(e) => {
                        const currentAnswers = answers[question.id] || {}
                        handleAnswerChange(question.id, {
                          ...currentAnswers,
                          [leftItem.text]: e.target.value
                        })
                      }}
                    >
                      <option value="">Select match...</option>
                      {rightItems.map((rightItem) => (
                        <option key={rightItem.id} value={rightItem.text}>
                          {rightItem.text}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }

      case 'FILL_IN_BLANKS': {
        const questionParts = question.questionText.split('_____')
        
        return (
          <div className="space-y-4">
            <div className="text-lg leading-relaxed">
              {questionParts.map((part, index) => (
                <span key={`part-${index}`}>
                  {part}
                  {index < questionParts.length - 1 && (
                    <input
                      type="text"
                      className="inline-block w-32 px-2 py-1 mx-1 border-b-2 border-blue-300 bg-transparent focus:border-blue-500 focus:outline-none"
                      placeholder={`Blank ${index + 1}`}
                      value={answers[question.id]?.[index + 1] || ''}
                      onChange={(e) => {
                        const currentAnswers = answers[question.id] || {}
                        handleAnswerChange(question.id, {
                          ...currentAnswers,
                          [index + 1]: e.target.value
                        })
                      }}
                    />
                  )}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              Fill in the blanks with appropriate words or phrases.
            </p>
          </div>
        )
      }

      default:
        return <div>Unsupported question type</div>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    )
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Quiz Not Found</h2>
          <p className="text-gray-600 mb-4">The quiz you're looking for doesn't exist or isn't available.</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className={`mx-auto mb-4 h-16 w-16 rounded-full flex items-center justify-center ${
                results.isPassed ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {results.isPassed ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-600" />
                )}
              </div>
              <CardTitle className="text-2xl">
                {results.isPassed ? 'Congratulations!' : 'Quiz Completed'}
              </CardTitle>
              <p className="text-gray-600">
                {results.isPassed ? 'You passed the quiz!' : 'You can try again if allowed.'}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{results.score}</p>
                  <p className="text-sm text-gray-600">Points Scored</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-600">{results.maxScore}</p>
                  <p className="text-sm text-gray-600">Total Points</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">{results.percentage}%</p>
                  <p className="text-sm text-gray-600">Percentage</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">{results.attemptNumber}</p>
                  <p className="text-sm text-gray-600">Attempt #{results.attemptNumber}</p>
                </div>
              </div>

              <div className="text-center">
                <Progress value={results.percentage} className="w-full mb-2" />
                <p className="text-sm text-gray-600">
                  Passing Score: {results.passingScore}% | 
                  Attempts: {results.attemptNumber}/{results.maxAttempts}
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <Button onClick={() => router.back()}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Course
                </Button>
                {!results.isPassed && results.attemptNumber < results.maxAttempts && (
                  <Button 
                    onClick={() => {
                      setShowResults(false)
                      setResults(null)
                    }}
                    variant="outline"
                  >
                    Try Again
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (taking) {
    const currentQuestion = quiz.Question[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / quiz.Question.length) * 100

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-semibold">{quiz.title}</h1>
                  <p className="text-sm text-gray-600">
                    Question {currentQuestionIndex + 1} of {quiz.Question.length}
                  </p>
                </div>
                {timeLeft !== null && (
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                    timeLeft < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    <Clock className="h-4 w-4" />
                    <span className="font-mono">{formatTime(timeLeft)}</span>
                  </div>
                )}
              </div>
              <Progress value={progress} className="mt-4" />
            </CardContent>
          </Card>

          {/* Question */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                  {currentQuestionIndex + 1}
                </span>
                <div>
                  {currentQuestion.questionText}
                  <div className="text-sm font-normal text-gray-500 mt-1">
                    {currentQuestion.points} point{currentQuestion.points !== 1 ? 's' : ''}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderQuestion(currentQuestion)}
            </CardContent>
          </Card>

          {/* Navigation */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                
                {currentQuestionIndex === quiz.Question.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {submitting ? 'Submitting...' : 'Submit Quiz'}
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                  >
                    Next
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Quiz overview/start page
  const canTakeQuiz = submissions.length < quiz.maxAttempts
  const bestSubmission = submissions.length > 0 ? 
    submissions.reduce((best, current) => current.percentage > best.percentage ? current : best) 
    : null

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
            <p className="text-gray-600">{quiz.Course.title}</p>
          </div>
        </div>

        {/* Quiz Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Quiz Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {quiz.description && (
              <p className="text-gray-700">{quiz.description}</p>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{quiz.Question.length}</p>
                <p className="text-sm text-blue-700">Questions</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{quiz.passingScore}%</p>
                <p className="text-sm text-green-700">Pass Score</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">{quiz.maxAttempts}</p>
                <p className="text-sm text-orange-700">Max Attempts</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">
                  {quiz.timeLimit ? `${quiz.timeLimit} min` : '∞'}
                </p>
                <p className="text-sm text-purple-700">Time Limit</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Previous Attempts */}
        {submissions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Previous Attempts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {submissions.map((submission, index) => (
                  <div key={submission.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        Attempt {submission.attemptNumber}
                        {submission.isPassed && (
                          <Badge className="ml-2 bg-green-100 text-green-800">Passed</Badge>
                        )}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(submission.submittedAt).toLocaleDateString()} • 
                        Score: {submission.score}/{submission.maxScore} ({submission.percentage}%)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {bestSubmission && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-medium text-blue-800">Best Score: {bestSubmission.percentage}%</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Start Quiz */}
        <Card>
          <CardContent className="p-6 text-center">
            {canTakeQuiz ? (
              <>
                <h3 className="text-xl font-semibold mb-4">Ready to start?</h3>
                <p className="text-gray-600 mb-6">
                  Make sure you have a stable internet connection and won't be interrupted.
                  {quiz.timeLimit && ` You have ${quiz.timeLimit} minutes to complete the quiz.`}
                </p>
                <Button 
                  size="lg" 
                  onClick={startQuiz}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Start Quiz
                </Button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-4">No More Attempts</h3>
                <p className="text-gray-600 mb-6">
                  You have used all {quiz.maxAttempts} attempts for this quiz.
                </p>
                {bestSubmission && bestSubmission.isPassed && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-green-800 font-medium">
                      Congratulations! You passed with {bestSubmission.percentage}%
                    </p>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}