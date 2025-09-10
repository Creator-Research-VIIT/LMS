"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  teacher: {
    name: string;
  };
}

interface Quiz {
  id: string;
  title: string;
  description?: string;
  type: string;
  questions: Question[];
  submissions?: QuizSubmission[];
}

interface Question {
  id: string;
  questionText: string;
  questionType: string;
  points: number;
  answers: Answer[];
}

interface Answer {
  id: string;
  answerText: string;
}

interface QuizSubmission {
  id: string;
  score: number;
  maxScore: number;
  submittedAt: string;
}

export default function StudentDashboard() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await fetch('/api/student/courses');
      if (response.ok) {
        const data = await response.json();
        setCourses(data.courses || []);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchCourseQuizzes = async (courseId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/quizzes/${courseId}`);
      if (response.ok) {
        const data = await response.json();
        setQuizzes(data.quizzes || []);
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setSelectedQuiz(null);
    fetchCourseQuizzes(course.id);
  };

  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
  };

  const backToCourses = () => {
    setSelectedCourse(null);
    setSelectedQuiz(null);
    setQuizzes([]);
  };

  const backToQuizzes = () => {
    setSelectedQuiz(null);
  };

  if (selectedQuiz) {
    return <QuizTaking quiz={selectedQuiz} onBack={backToQuizzes} />;
  }

  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={backToCourses}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              ← Back to Courses
            </button>
            <h1 className="text-2xl font-bold">{selectedCourse.title}</h1>
          </div>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
          <p className="text-sm text-gray-500">Instructor: {selectedCourse.teacher.name}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Course Quizzes</h2>
          
          {loading ? (
            <p>Loading quizzes...</p>
          ) : quizzes.length > 0 ? (
            <div className="grid gap-4">
              {quizzes.map((quiz) => {
                const submission = quiz.submissions?.[0];
                const isCompleted = !!submission;
                
                return (
                  <div key={quiz.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{quiz.title}</h3>
                        {quiz.description && (
                          <p className="text-gray-600 mt-1">{quiz.description}</p>
                        )}
                        <div className="flex gap-4 text-sm text-gray-500 mt-2">
                          <span>Type: {quiz.type}</span>
                          <span>Questions: {quiz.questions.length}</span>
                          {isCompleted && (
                            <span className="text-green-600 font-medium">
                              Score: {submission.score}/{submission.maxScore} 
                              ({Math.round((submission.score / submission.maxScore) * 100)}%)
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {isCompleted ? (
                          <div className="text-center">
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                              Completed
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(submission.submittedAt).toLocaleDateString()}
                            </p>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleQuizSelect(quiz)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                          >
                            Take Quiz
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">No quizzes available for this course.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">My Courses</h2>
        
        {courses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                <p className="text-sm text-gray-500 mb-4">Instructor: {course.teacher.name}</p>
                <button
                  onClick={() => handleCourseSelect(course)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  View Course & Quizzes
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You are not enrolled in any courses yet.</p>
        )}
      </div>
    </div>
  );
}

// Quiz Taking Component
function QuizTaking({ quiz, onBack }: { quiz: Quiz; onBack: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const submissionAnswers = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        ...answer
      }));

      const response = await fetch('/api/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizId: quiz.id,
          answers: submissionAnswers
        })
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.submission);
        setSubmitted(true);
      } else {
        const error = await response.json();
        alert('Error submitting quiz: ' + error.error);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Error submitting quiz');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted && result) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h1 className="text-3xl font-bold mb-4 text-green-600">Quiz Completed!</h1>
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
            <div className="text-3xl font-bold mb-4">
              {result.score}/{result.maxScore} ({result.percentage}%)
            </div>
            <p className="text-gray-600 mb-6">
              Submitted on {new Date(result.submittedAt).toLocaleString()}
            </p>
            <button
              onClick={onBack}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Back to Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const totalAnswered = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            ← Back to Course
          </button>
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <div className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {question.questionText}
            </h2>
            <p className="text-sm text-gray-500">
              Points: {question.points} | Type: {question.questionType}
            </p>
          </div>

          <div className="mb-8">
            {question.questionType === 'multiple_choice' && (
              <div className="space-y-3">
                {question.answers.map((answer) => (
                  <label key={answer.id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={answer.id}
                      checked={answers[question.id]?.selectedAnswerId === answer.id}
                      onChange={() => handleAnswerChange(question.id, { selectedAnswerId: answer.id })}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span>{answer.answerText}</span>
                  </label>
                ))}
              </div>
            )}

            {question.questionType === 'true_false' && (
              <div className="space-y-3">
                {['True', 'False'].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      checked={answers[question.id]?.answer === option}
                      onChange={() => handleAnswerChange(question.id, { answer: option })}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}

            {question.questionType === 'short_answer' && (
              <textarea
                value={answers[question.id]?.answer || ''}
                onChange={(e) => handleAnswerChange(question.id, { answer: e.target.value })}
                placeholder="Type your answer here..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              />
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="bg-gray-300 hover:bg-gray-400 disabled:opacity-50 text-gray-700 px-4 py-2 rounded"
            >
              Previous
            </button>

            <div className="text-sm text-gray-600">
              Answered: {totalAnswered}/{quiz.questions.length}
            </div>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={submitting || totalAnswered < quiz.questions.length}
                className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-2 rounded"
              >
                {submitting ? 'Submitting...' : 'Submit Quiz'}
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
