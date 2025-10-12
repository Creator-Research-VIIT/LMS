"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Play,
  BookOpen,
  Clock,
  CheckCircle,
  User,
  DollarSign
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  price: number;
  youtubeUrl?: string;
  teacher: {
    id: string;
    name: string;
  };
  createdAt: string;
}

interface CourseViewerProps {
  courseId: string;
}

export default function CourseViewer({ courseId }: CourseViewerProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (user && courseId) {
      fetchCourse();
      checkEnrollment();
    }
  }, [user, courseId]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}`);
      if (!response.ok) {
        throw new Error("Course not found");
      }
      const data = await response.json();
      setCourse(data.course);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch course");
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/enrollment`);
      if (response.ok) {
        const data = await response.json();
        setIsEnrolled(data.enrolled);
      }
    } catch (err) {
      console.error("Failed to check enrollment:", err);
    }
  };

  const enrollInCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/enroll`, {
        method: "POST",
      });
      
      if (!response.ok) {
        throw new Error("Failed to enroll in course");
      }
      
      setIsEnrolled(true);
      alert("Successfully enrolled in course!");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to enroll in course");
    }
  };

  const extractVideoId = (url: string) => {
    // Extract YouTube video ID or playlist ID
    const playlistMatch = url.match(/[?&]list=([^&]+)/);
    const videoMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&\n?#]+)/);
    
    if (playlistMatch) {
      return { type: 'playlist', id: playlistMatch[1] };
    } else if (videoMatch) {
      return { type: 'video', id: videoMatch[1] };
    }
    return null;
  };

  const renderVideoPlayer = () => {
    if (!course?.youtubeUrl) return null;
    
    const videoInfo = extractVideoId(course.youtubeUrl);
    if (!videoInfo) return null;

    const embedUrl = videoInfo.type === 'playlist' 
      ? `https://www.youtube.com/embed/videoseries?list=${videoInfo.id}`
      : `https://www.youtube.com/embed/${videoInfo.id}`;

    return (
      <div className="aspect-video w-full bg-gray-900 rounded-lg overflow-hidden">
        <iframe
          src={embedUrl}
          title={course.title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to view courses.</p>
          <button
            onClick={() => router.push('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error || "Course not found"}</p>
          <button
            onClick={() => router.back()}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {isEnrolled ? "Enrolled" : "Not Enrolled"}
              </span>
              {isEnrolled && (
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Enrolled</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>By {course.teacher.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Created {new Date(course.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Video Player or Enrollment Required */}
            {isEnrolled ? (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Course Content</span>
                </h2>
                {renderVideoPlayer()}
                {!course.youtubeUrl && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800">
                      Video content is not available yet. The instructor will add videos soon.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Enroll to Access Course Content
                </h3>
                <p className="text-gray-600 mb-6">
                  You need to enroll in this course to access the video content and materials.
                </p>
                <button
                  onClick={enrollInCourse}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
                >
                  Enroll Now - ₹{course.price}
                </button>
              </div>
            )}

            {/* Course Description */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>About This Course</span>
              </h2>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <p className="text-gray-700 leading-relaxed">{course.description}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              {course.thumbnail && (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
              )}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Price</span>
                  <div className="flex items-center space-x-1 text-lg font-bold text-green-600">
                    <DollarSign className="w-4 h-4" />
                    <span>{course.price}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Instructor</span>
                  <span className="font-medium text-gray-900">{course.teacher.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isEnrolled 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {isEnrolled ? 'Enrolled' : 'Available'}
                  </span>
                </div>
              </div>
              
              {!isEnrolled && (
                <button
                  onClick={enrollInCourse}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
                >
                  Enroll for ₹{course.price}
                </button>
              )}
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">What You'll Learn</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Comprehensive understanding of the subject</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Practical hands-on experience</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Real-world application skills</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Industry best practices</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}