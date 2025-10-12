"use client";

import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  approvalStatus: string;
}

interface Quiz {
  id: string;
  title: string;
  description?: string;
  type: string;
  questions: Question[];
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
  isCorrect: boolean;
}

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<'courses' | 'quizzes'>('courses');
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showQuizForm, setShowQuizForm] = useState(false);
  
  // Course form state
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    thumbnail: "",
    price: ""
  });
  
  // Quiz form state
  const [quizForm, setQuizForm] = useState({
    title: "",
    description: "",
    type: "PRACTICE",
    questions: [{
      questionText: "",
      questionType: "multiple_choice",
      points: 1,
      answers: [
        { answerText: "", isCorrect: false },
        { answerText: "", isCorrect: false }
      ]
    }]
  });
  
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      if (res.ok) {
        const data = await res.json();
        // Filter courses by current teacher (this should be handled in API)
        setCourses(data.courses || []);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCourseForm({ ...courseForm, [e.target.name]: e.target.value });
  };

  const handleCourseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseForm)
      });
      if (res.ok) {
        setMessage("Course submitted for approval!");
        setShowCourseForm(false);
        setCourseForm({ title: "", description: "", thumbnail: "", price: "" });
        fetchCourses();
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to submit course");
      }
    } catch {
      setMessage("Failed to submit course");
    } finally {
      setLoading(false);
    }
  };

  const handleQuizSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCourse) {
      setMessage("Please select a course first");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...quizForm,
          courseId: selectedCourse.id
        })
      });
      
      if (res.ok) {
        setMessage("Quiz created successfully!");
        setShowQuizForm(false);
        resetQuizForm();
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to create quiz");
      }
    } catch {
      setMessage("Failed to create quiz");
    } finally {
      setLoading(false);
    }
  };

  const resetQuizForm = () => {
    setQuizForm({
      title: "",
      description: "",
      type: "PRACTICE",
      questions: [{
        questionText: "",
        questionType: "multiple_choice",
        points: 1,
        answers: [
          { answerText: "", isCorrect: false },
          { answerText: "", isCorrect: false }
        ]
      }]
    });
  };

  const updateQuestion = (questionIndex: number, field: string, value: any) => {
    const updatedQuestions = [...quizForm.questions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      [field]: value
    };
    setQuizForm({ ...quizForm, questions: updatedQuestions });
  };

  const updateAnswer = (questionIndex: number, answerIndex: number, field: string, value: any) => {
    const updatedQuestions = [...quizForm.questions];
    updatedQuestions[questionIndex].answers[answerIndex] = {
      ...updatedQuestions[questionIndex].answers[answerIndex],
      [field]: value
    };
    setQuizForm({ ...quizForm, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setQuizForm({
      ...quizForm,
      questions: [...quizForm.questions, {
        questionText: "",
        questionType: "multiple_choice",
        points: 1,
        answers: [
          { answerText: "", isCorrect: false },
          { answerText: "", isCorrect: false }
        ]
      }]
    });
  };

  const addAnswer = (questionIndex: number) => {
    const updatedQuestions = [...quizForm.questions];
    updatedQuestions[questionIndex].answers.push({ answerText: "", isCorrect: false });
    setQuizForm({ ...quizForm, questions: updatedQuestions });
  };

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const updatedQuestions = [...quizForm.questions];
    updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuizForm({ ...quizForm, questions: updatedQuestions });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded mb-4 ${message.includes('success') || message.includes('submitted') 
          ? 'bg-green-100 text-green-700' 
          : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'courses' 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            My Courses
          </button>
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'quizzes' 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Quiz Management
          </button>
        </div>
      </div>

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Courses</h2>
            <button
              onClick={() => setShowCourseForm(!showCourseForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {showCourseForm ? 'Cancel' : 'Add New Course'}
            </button>
          </div>

          {showCourseForm && (
            <form onSubmit={handleCourseSubmit} className="mb-6 p-4 border rounded-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Course Title"
                  value={courseForm.title}
                  onChange={handleCourseChange}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="url"
                  name="thumbnail"
                  placeholder="Thumbnail URL"
                  value={courseForm.thumbnail}
                  onChange={handleCourseChange}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={courseForm.price}
                  onChange={handleCourseChange}
                  className="p-2 border rounded"
                  required
                />
              </div>
              <textarea
                name="description"
                placeholder="Course Description"
                value={courseForm.description}
                onChange={handleCourseChange}
                className="w-full p-2 border rounded mt-4"
                rows={3}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                {loading ? 'Submitting...' : 'Submit Course'}
              </button>
            </form>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <div key={course.id} className="border rounded-lg p-4">
                <img src={course.thumbnail} alt={course.title} className="w-full h-32 object-cover rounded mb-2" />
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-2">${course.price}</p>
                <span className={`inline-block px-2 py-1 rounded text-xs ${
                  course.approvalStatus === 'approved' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {course.approvalStatus}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quizzes Tab */}
      {activeTab === 'quizzes' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Quiz Management</h2>
            <button
              onClick={() => setShowQuizForm(!showQuizForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              disabled={courses.filter(c => c.approvalStatus === 'approved').length === 0}
            >
              {showQuizForm ? 'Cancel' : 'Create New Quiz'}
            </button>
          </div>

          {courses.filter(c => c.approvalStatus === 'approved').length === 0 && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
              You need at least one approved course to create quizzes.
            </div>
          )}

          {showQuizForm && (
            <form onSubmit={handleQuizSubmit} className="mb-6 p-4 border rounded-lg">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Quiz Title"
                  value={quizForm.title}
                  onChange={(e) => setQuizForm({...quizForm, title: e.target.value})}
                  className="p-2 border rounded"
                  required
                />
                <select
                  value={quizForm.type}
                  onChange={(e) => setQuizForm({...quizForm, type: e.target.value})}
                  className="p-2 border rounded"
                >
                  <option value="PRACTICE">Practice</option>
                  <option value="ASSIGNMENT">Assignment</option>
                  <option value="MID_TERM">Mid Term</option>
                  <option value="FINAL_EXAM">Final Exam</option>
                  <option value="CHAPTER_TEST">Chapter Test</option>
                </select>
                <select
                  value={selectedCourse?.id || ''}
                  onChange={(e) => setSelectedCourse(courses.find(c => c.id === e.target.value) || null)}
                  className="p-2 border rounded"
                  required
                >
                  <option value="">Select Course</option>
                  {courses.filter(c => c.approvalStatus === 'approved').map(course => (
                    <option key={course.id} value={course.id}>{course.title}</option>
                  ))}
                </select>
              </div>
              
              <textarea
                placeholder="Quiz Description (optional)"
                value={quizForm.description}
                onChange={(e) => setQuizForm({...quizForm, description: e.target.value})}
                className="w-full p-2 border rounded mb-4"
                rows={2}
              />

              {/* Questions */}
              <div className="space-y-6">
                {quizForm.questions.map((question, qIndex) => (
                  <div key={qIndex} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Question {qIndex + 1}</h4>
                      {quizForm.questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updatedQuestions = quizForm.questions.filter((_, i) => i !== qIndex);
                            setQuizForm({...quizForm, questions: updatedQuestions});
                          }}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="Question text"
                        value={question.questionText}
                        onChange={(e) => updateQuestion(qIndex, 'questionText', e.target.value)}
                        className="col-span-2 p-2 border rounded"
                        required
                      />
                      <select
                        value={question.questionType}
                        onChange={(e) => updateQuestion(qIndex, 'questionType', e.target.value)}
                        className="p-2 border rounded"
                      >
                        <option value="multiple_choice">Multiple Choice</option>
                        <option value="true_false">True/False</option>
                        <option value="short_answer">Short Answer</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Points:</label>
                      <input
                        type="number"
                        min="1"
                        value={question.points}
                        onChange={(e) => updateQuestion(qIndex, 'points', parseInt(e.target.value))}
                        className="w-20 p-2 border rounded"
                      />
                    </div>

                    {question.questionType === 'multiple_choice' && (
                      <div>
                        <label className="block text-sm font-medium mb-2">Answer Options:</label>
                        <div className="space-y-2">
                          {question.answers.map((answer, aIndex) => (
                            <div key={aIndex} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`correct-${qIndex}`}
                                checked={answer.isCorrect}
                                onChange={() => {
                                  const updatedAnswers = question.answers.map((a, i) => ({
                                    ...a,
                                    isCorrect: i === aIndex
                                  }));
                                  updateQuestion(qIndex, 'answers', updatedAnswers);
                                }}
                                className="form-radio"
                              />
                              <input
                                type="text"
                                placeholder={`Option ${aIndex + 1}`}
                                value={answer.answerText}
                                onChange={(e) => updateAnswer(qIndex, aIndex, 'answerText', e.target.value)}
                                className="flex-1 p-2 border rounded"
                                required
                              />
                              {question.answers.length > 2 && (
                                <button
                                  type="button"
                                  onClick={() => removeAnswer(qIndex, aIndex)}
                                  className="text-red-600 hover:text-red-800 text-sm"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addAnswer(qIndex)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            + Add Option
                          </button>
                        </div>
                      </div>
                    )}

                    {question.questionType === 'true_false' && (
                      <div>
                        <label className="block text-sm font-medium mb-2">Correct Answer:</label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`tf-${qIndex}`}
                              checked={question.answers[0]?.answerText === 'True' && question.answers[0]?.isCorrect}
                              onChange={() => updateQuestion(qIndex, 'answers', [
                                { answerText: 'True', isCorrect: true },
                                { answerText: 'False', isCorrect: false }
                              ])}
                              className="form-radio mr-2"
                            />
                            True
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`tf-${qIndex}`}
                              checked={question.answers[1]?.answerText === 'False' && question.answers[1]?.isCorrect}
                              onChange={() => updateQuestion(qIndex, 'answers', [
                                { answerText: 'True', isCorrect: false },
                                { answerText: 'False', isCorrect: true }
                              ])}
                              className="form-radio mr-2"
                            />
                            False
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={addQuestion}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                >
                  Add Question
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  {loading ? 'Creating...' : 'Create Quiz'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
