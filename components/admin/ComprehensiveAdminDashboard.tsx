"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

interface PendingTeacher {
  id: string;
  name: string;
  email: string;
  status: string;
  submittedAt: string;
  referralCode?: string;
}

interface PendingCourse {
  id: string;
  title: string;
  description: string;
  teacherName: string;
  teacherEmail: string;
  price: number;
  thumbnail?: string;
  createdAt: string;
  approvalStatus: string;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [pendingTeachers, setPendingTeachers] = useState<PendingTeacher[]>([]);
  const [pendingCourses, setPendingCourses] = useState<PendingCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'teachers' | 'courses'>('teachers');

  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchPendingItems();
    }
  }, [user]);

  const fetchPendingItems = async () => {
    try {
      setLoading(true);
      
      // Fetch pending teachers
      const teachersResponse = await fetch("/api/teachers/pending");
      const teachersData = await teachersResponse.json();
      
      // Fetch pending courses
      const coursesResponse = await fetch("/api/courses/pending");
      const coursesData = await coursesResponse.json();
      
      if (teachersResponse.ok) {
        setPendingTeachers(teachersData.teachers || []);
      }
      
      if (coursesResponse.ok) {
        setPendingCourses(coursesData.courses || []);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch pending items");
    } finally {
      setLoading(false);
    }
  };

  const approveTeacher = async (teacherId: string) => {
    try {
      const response = await fetch(`/api/teachers/${teacherId}/approve`, {
        method: "PATCH",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to approve teacher");
      }

      const data = await response.json();
      console.log("✅ Teacher approved:", data.message);

      // Remove from pending list
      setPendingTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to approve teacher");
    }
  };

  const rejectTeacher = async (teacherId: string, reason?: string) => {
    try {
      const response = await fetch(`/api/teachers/${teacherId}/reject`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminMessage: reason || "Application did not meet our requirements at this time."
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to reject teacher");
      }

      const data = await response.json();
      console.log("❌ Teacher rejected:", data.message);

      // Remove from pending list
      setPendingTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reject teacher");
    }
  };

  const approveCourse = async (courseId: string) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/approve`, {
        method: "PATCH",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to approve course");
      }

      const data = await response.json();
      console.log("✅ Course approved:", data.message);

      // Remove from pending list
      setPendingCourses(prev => prev.filter(course => course.id !== courseId));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to approve course");
    }
  };

  const rejectCourse = async (courseId: string, reason?: string) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/reject`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminMessage: reason || "Course did not meet our quality standards."
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to reject course");
      }

      const data = await response.json();
      console.log("❌ Course rejected:", data.message);

      // Remove from pending list
      setPendingCourses(prev => prev.filter(course => course.id !== courseId));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reject course");
    }
  };

  if (user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600">You need admin privileges to view this page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage teacher applications and course approvals
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Teachers
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {pendingTeachers.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M12 2l3.09 6.26L22 9l-5 4.87L18.18 21 12 17.77 5.82 21 7 13.87 2 9l6.91-.74L12 2z"/>
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Courses
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {pendingCourses.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Pending
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {pendingTeachers.length + pendingCourses.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('teachers')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'teachers'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending Teachers ({pendingTeachers.length})
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'courses'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending Courses ({pendingCourses.length})
            </button>
          </nav>
        </div>

        {/* Teachers Tab */}
        {activeTab === 'teachers' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Pending Teacher Applications</h3>
              <p className="text-sm text-gray-500">Review and approve teacher applications</p>
            </div>
            <div className="p-6">
              {pendingTeachers.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <p className="text-gray-600">No pending teacher applications</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingTeachers.map((teacher) => (
                    <div
                      key={teacher.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg text-gray-900">{teacher.name}</h4>
                          <p className="text-gray-600">{teacher.email}</p>
                          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                            <span>Applied: {teacher.submittedAt}</span>
                            <span className="capitalize font-medium text-yellow-600">
                              Status: {teacher.status}
                            </span>
                            {teacher.referralCode && (
                              <span>Referral: {teacher.referralCode}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => approveTeacher(teacher.id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              const reason = window.prompt("Reason for rejection (optional):");
                              if (reason !== null) {
                                rejectTeacher(teacher.id, reason || undefined);
                              }
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Pending Course Approvals</h3>
              <p className="text-sm text-gray-500">Review and approve course submissions</p>
            </div>
            <div className="p-6">
              {pendingCourses.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <p className="text-gray-600">No pending course approvals</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {pendingCourses.map((course) => (
                    <div
                      key={course.id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {course.thumbnail && (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-32 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h4 className="font-semibold text-lg text-gray-900 mb-2">{course.title}</h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
                        <div className="text-sm text-gray-500 mb-4">
                          <p>By: {course.teacherName}</p>
                          <p>Email: {course.teacherEmail}</p>
                          <p>Price: ₹{course.price}</p>
                          <p>Submitted: {new Date(course.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => approveCourse(course.id)}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              const reason = window.prompt("Reason for rejection (optional):");
                              if (reason !== null) {
                                rejectCourse(course.id, reason || undefined);
                              }
                            }}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}