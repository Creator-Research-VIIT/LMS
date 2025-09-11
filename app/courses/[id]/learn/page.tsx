"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Settings,
  Maximize,
  FileText,
  CheckCircle,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function CourseLearnPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(1800) // 30 minutes in seconds
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentLecture, setCurrentLecture] = useState(1)
  const [completedLectures, setCompletedLectures] = useState<number[]>([])
  const [note, setNote] = useState("")

  const course = {
    id: Number.parseInt(params.id),
    title: "Complete React Development Course",
    instructor: "John Smith",
    progress: 65,
  }

  const curriculum = [
    {
      id: 1,
      title: "Getting Started with React",
      lectures: [
        { id: 1, title: "Introduction to React", duration: "15:30", type: "video" },
        { id: 2, title: "Setting up Development Environment", duration: "20:45", type: "video" },
        { id: 3, title: "Your First React Component", duration: "18:20", type: "video" },
        { id: 4, title: "Understanding JSX", duration: "22:15", type: "video" },
        { id: 5, title: "Exercise: Building a Profile Card", duration: "30:00", type: "exercise" },
      ],
    },
    {
      id: 2,
      title: "React Hooks Deep Dive",
      lectures: [
        { id: 6, title: "Introduction to Hooks", duration: "18:30", type: "video" },
        { id: 7, title: "useState Hook", duration: "25:45", type: "video" },
        { id: 8, title: "useEffect Hook", duration: "32:20", type: "video" },
        { id: 9, title: "Section Quiz", duration: "10:00", type: "quiz" },
      ],
    },
  ]

  const allLectures = curriculum.flatMap((section) => section.lectures)
  const currentLectureData = allLectures.find((lecture) => lecture.id === currentLecture)

  const notes = [
    {
      id: 1,
      timestamp: "05:30",
      content: "Remember to import React when using JSX",
      lectureId: 1,
    },
    {
      id: 2,
      timestamp: "12:45",
      content: "Components should start with capital letter",
      lectureId: 1,
    },
  ]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const markAsComplete = (lectureId: number) => {
    if (!completedLectures.includes(lectureId)) {
      setCompletedLectures([...completedLectures, lectureId])
    }
  }

  const goToNextLecture = () => {
    const currentIndex = allLectures.findIndex((lecture) => lecture.id === currentLecture)
    if (currentIndex < allLectures.length - 1) {
      setCurrentLecture(allLectures[currentIndex + 1].id)
      markAsComplete(currentLecture)
    }
  }

  const goToPreviousLecture = () => {
    const currentIndex = allLectures.findIndex((lecture) => lecture.id === currentLecture)
    if (currentIndex > 0) {
      setCurrentLecture(allLectures[currentIndex - 1].id)
    }
  }

  const getLectureIcon = (type: string) => {
    switch (type) {
      case "video":
        return <PlayCircle className="h-4 w-4" />
      case "exercise":
        return <FileText className="h-4 w-4" />
      case "quiz":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <PlayCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={`/courses/${params.id}`}>
            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Course
            </Button>
          </Link>
          <div>
            <h1 className="font-semibold">{course.title}</h1>
            <p className="text-sm text-gray-400">by {course.instructor}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Progress:</span>
            <Progress value={course.progress} className="w-24" />
            <span className="text-sm">{course.progress}%</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-gray-800"
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Video Area */}
        <div className={`flex-1 flex flex-col ${sidebarOpen ? "lg:mr-80" : ""}`}>
          {/* Video Player */}
          <div className="flex-1 bg-black relative">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  {currentLectureData?.type === "video" ? (
                    <PlayCircle className="h-16 w-16" />
                  ) : currentLectureData?.type === "exercise" ? (
                    <FileText className="h-16 w-16" />
                  ) : (
                    <CheckCircle className="h-16 w-16" />
                  )}
                </div>
                <h2 className="text-xl font-semibold mb-2">{currentLectureData?.title}</h2>
                <p className="text-gray-400">Duration: {currentLectureData?.duration}</p>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="flex items-center space-x-4">
                  <span className="text-white text-sm">{formatTime(currentTime)}</span>
                  <div className="flex-1">
                    <Progress value={(currentTime / duration) * 100} className="h-1" />
                  </div>
                  <span className="text-white text-sm">{formatTime(duration)}</span>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={goToPreviousLecture}
                      className="text-white hover:bg-white/20"
                    >
                      <SkipBack className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={togglePlayPause}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={goToNextLecture}
                      className="text-white hover:bg-white/20"
                    >
                      <SkipForward className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Volume2 className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Settings className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Maximize className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lecture Navigation */}
          <div className="bg-gray-900 p-4 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={goToPreviousLecture}
              disabled={currentLecture === 1}
              className="text-white hover:bg-gray-800"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="text-center text-white">
              <h3 className="font-medium">{currentLectureData?.title}</h3>
              <p className="text-sm text-gray-400">
                Lecture {currentLecture} of {allLectures.length}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => markAsComplete(currentLecture)}
                disabled={completedLectures.includes(currentLecture)}
                className="bg-transparent border-white text-white hover:bg-white hover:text-black"
              >
                {completedLectures.includes(currentLecture) ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completed
                  </>
                ) : (
                  "Mark Complete"
                )}
              </Button>
              <Button
                onClick={goToNextLecture}
                disabled={currentLecture === allLectures.length}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-80 bg-white border-l flex flex-col">
            <Tabs defaultValue="content" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="qa">Q&A</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {curriculum.map((section) => (
                    <div key={section.id}>
                      <h4 className="font-medium text-gray-900 mb-3">{section.title}</h4>
                      <div className="space-y-2">
                        {section.lectures.map((lecture) => (
                          <button
                            key={lecture.id}
                            onClick={() => setCurrentLecture(lecture.id)}
                            className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-gray-50 ${
                              currentLecture === lecture.id ? "bg-blue-50 border border-blue-200" : ""
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              {completedLectures.includes(lecture.id) ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                getLectureIcon(lecture.type)
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{lecture.title}</p>
                              <p className="text-xs text-gray-500">{lecture.duration}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="notes" className="flex-1 flex flex-col p-4">
                <div className="space-y-4 flex-1">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">My Notes</h4>
                    <div className="space-y-3">
                      {notes
                        .filter((note) => note.lectureId === currentLecture)
                        .map((note) => (
                          <div key={note.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Clock className="h-4 w-4 text-yellow-600" />
                              <span className="text-sm font-medium text-yellow-800">{note.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-700">{note.content}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h5 className="font-medium text-gray-900 mb-2">Add Note</h5>
                  <Textarea
                    placeholder="Add a note at current timestamp..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="mb-2"
                  />
                  <Button size="sm" className="w-full">
                    Save Note
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="qa" className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">Questions & Answers</h4>
                    <Button size="sm">Ask Question</Button>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-blue-600">JD</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-900">John Doe</span>
                            <span className="text-xs text-gray-500">2 hours ago</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">
                            How do I handle state updates in nested components?
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <button className="hover:text-gray-700">Reply</button>
                            <button className="hover:text-gray-700">Like (3)</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
