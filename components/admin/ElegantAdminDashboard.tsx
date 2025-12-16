"use client";

import AdminAnalyticsDashboard from "@/components/admin/AdminAnalyticsDashboard";
import AdminCoursesTable from "@/components/admin/AdminCoursesTable";
import AdminPaymentsTable from "@/components/admin/AdminPaymentsTable";
import AdminStudentsTable from "@/components/admin/AdminStudentsTable";
import CertificatesTabs from "@/components/admin/certificates/CertificatesTabs";
import { useAuth } from "@/hooks/useAuth";
import {
    AlertCircle,
    Award,
    BarChart3,
    Bell,
    BookOpen,
    Building2,
    CheckCircle,
    Clock,
    DollarSign,
    GraduationCap,
    LogOut,
    Search,
    Star,
    TrendingUp,
    UserCheck,
    Users
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AdminStats {
  totalStudents: number;
  totalCourses: number;
  certificates: number;
  revenue: number;
  pendingTeachers: number;
  pendingCourses: number;
}

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

interface Notification {
  id: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning';
}

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "students", label: "Students", icon: Users },
  { id: "institutes", label: "Institutes", icon: Building2 },
  { id: "pending", label: "Pending", icon: Clock },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "payments", label: "Payments", icon: DollarSign },
];

export default function ElegantAdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [stats, setStats] = useState<AdminStats>({
    totalStudents: 12500,
    totalCourses: 45,
    certificates: 8900,
    revenue: 125000,
    pendingTeachers: 0,
    pendingCourses: 0
  });
  const [pendingTeachers, setPendingTeachers] = useState<PendingTeacher[]>([]);
  const [pendingCourses, setPendingCourses] = useState<PendingCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifications] = useState<Notification[]>([
    { id: "1", message: "You have 5 new messages", time: "12 min ago", type: "info" },
    { id: "2", message: "3 new course submissions pending approval", time: "12 min ago", type: "warning" },
    { id: "3", message: "Weekly report is ready", time: "12 min ago", type: "success" },
    { id: "4", message: "2 new teacher applications", time: "12 min ago", type: "info" },
    { id: "5", message: "System maintenance scheduled for tonight", time: "12 min ago", type: "warning" }
  ]);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchPendingData();
    }
  }, [user]);

  const fetchPendingData = async () => {
    try {
      setLoading(true);
      
      const [teachersResponse, coursesResponse] = await Promise.all([
        fetch("/api/teachers/pending", { credentials: 'include', cache: 'no-store' }),
        fetch("/api/courses/pending", { credentials: 'include', cache: 'no-store' }),
      ]);

      const parseJsonSafe = async (res: Response) => {
        const ct = res.headers.get('content-type') || '';
        if (ct.includes('application/json')) {
          return await res.json();
        }
        // Fallback: read text for diagnostics
        const text = await res.text();
        console.warn('Non-JSON response for admin fetch:', {
          url: res.url,
          status: res.status,
          contentType: ct,
          preview: text.slice(0, 200)
        });
        return null;
      };

      const [teachersData, coursesData] = await Promise.all([
        parseJsonSafe(teachersResponse),
        parseJsonSafe(coursesResponse),
      ]);

      if (teachersResponse.ok && teachersData) {
        setPendingTeachers(teachersData.teachers || []);
        setStats(prev => ({ ...prev, pendingTeachers: teachersData.teachers?.length || 0 }));
      } else if (!teachersResponse.ok) {
        console.error('Failed to load pending teachers:', teachersResponse.status);
      }

      if (coursesResponse.ok && coursesData) {
        setPendingCourses(coursesData.courses || []);
        setStats(prev => ({ ...prev, pendingCourses: coursesData.courses?.length || 0 }));
      } else if (!coursesResponse.ok) {
        console.error('Failed to load pending courses:', coursesResponse.status);
      }
      
    } catch (err) {
      console.error("Failed to fetch pending data:", err);
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
        throw new Error("Failed to approve teacher");
      }

      setPendingTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
      setStats(prev => ({ ...prev, pendingTeachers: prev.pendingTeachers - 1 }));
    } catch (err) {
      console.error("Error approving teacher:", err);
    }
  };

  const rejectTeacher = async (teacherId: string) => {
    const reason = window.prompt("Reason for rejection (optional):");
    if (reason === null) return;

    try {
      const response = await fetch(`/api/teachers/${teacherId}/reject`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminMessage: reason || "Application did not meet requirements." })
      });

      if (!response.ok) {
        throw new Error("Failed to reject teacher");
      }

      setPendingTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
      setStats(prev => ({ ...prev, pendingTeachers: prev.pendingTeachers - 1 }));
    } catch (err) {
      console.error("Error rejecting teacher:", err);
    }
  };

  const approveCourse = async (courseId: string) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/approve`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error("Failed to approve course");
      }

      setPendingCourses(prev => prev.filter(course => course.id !== courseId));
      setStats(prev => ({ ...prev, pendingCourses: prev.pendingCourses - 1 }));
    } catch (err) {
      console.error("Error approving course:", err);
    }
  };

  const rejectCourse = async (courseId: string) => {
    const reason = window.prompt("Reason for rejection (optional):");
    if (reason === null) return;

    try {
      const response = await fetch(`/api/courses/${courseId}/reject`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminMessage: reason || "Course did not meet quality standards." })
      });

      if (!response.ok) {
        throw new Error("Failed to reject course");
      }

      setPendingCourses(prev => prev.filter(course => course.id !== courseId));
      setStats(prev => ({ ...prev, pendingCourses: prev.pendingCourses - 1 }));
    } catch (err) {
      console.error("Error rejecting course:", err);
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

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to SkillUP!!</h1>
            <p className="text-blue-100 text-lg">Empower yourself with skills. Learn, grow, and succeed with SkillUP!!</p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Total Students</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalStudents.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Total Courses</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Certificates</p>
            <p className="text-2xl font-bold text-gray-900">{stats.certificates.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Revenue</p>
            <p className="text-2xl font-bold text-gray-900">₹{stats.revenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Course Progress and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Running Courses */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Current Running Courses</h3>
            <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">UX Software</h4>
                    <p className="text-sm text-gray-600">Course A-Z</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">2100 students</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">Math Online class</h4>
                    <p className="text-sm text-gray-600">Course A-Z</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">4.6</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium">70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">1800 students</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Notifications</h3>
          <div className="space-y-4">
            {notifications.map((notification) => {
              let dotColor = 'bg-blue-500';
              if (notification.type === 'success') dotColor = 'bg-green-500';
              if (notification.type === 'warning') dotColor = 'bg-yellow-500';
              
              return (
                <div key={notification.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${dotColor}`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 mb-1">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPending = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pending Approvals</h1>
          <p className="text-gray-600 mt-1">Review and manage pending teachers and courses</p>
        </div>
        <div className="flex space-x-4">
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
            <span className="text-sm text-gray-600">Pending Teachers: </span>
            <span className="font-semibold text-blue-600">{stats.pendingTeachers}</span>
          </div>
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
            <span className="text-sm text-gray-600">Pending Courses: </span>
            <span className="font-semibold text-orange-600">{stats.pendingCourses}</span>
          </div>
        </div>
      </div>

      {/* Pending Teachers */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">Pending Teacher Applications</h3>
          <p className="text-gray-600 mt-1">Review teacher applications and approve or reject them</p>
        </div>
        <div className="p-6">
          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
          {!loading && pendingTeachers.length === 0 && (
            <div className="text-center py-8">
              <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No pending teacher applications</p>
            </div>
          )}
          {!loading && pendingTeachers.length > 0 && (
            <div className="space-y-4">
              {pendingTeachers.map((teacher) => (
                <div key={teacher.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-gray-900">{teacher.name}</h4>
                      <p className="text-gray-600">{teacher.email}</p>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                        <span>Applied: {new Date(teacher.submittedAt).toLocaleDateString()}</span>
                        {teacher.referralCode && <span>Referral: {teacher.referralCode}</span>}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => approveTeacher(teacher.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => rejectTeacher(teacher.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pending Courses */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">Pending Course Submissions</h3>
          <p className="text-gray-600 mt-1">Review course submissions and approve or reject them</p>
        </div>
        <div className="p-6">
          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
          {!loading && pendingCourses.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No pending course submissions</p>
            </div>
          )}
          {!loading && pendingCourses.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pendingCourses.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  {course.thumbnail && (
                    <img src={course.thumbnail} alt={course.title} className="w-full h-32 object-cover" />
                  )}
                  <div className="p-4">
                    <h4 className="font-semibold text-lg text-gray-900 mb-2">{course.title}</h4>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
                    <div className="space-y-1 text-sm text-gray-500 mb-4">
                      <p>By: {course.teacherName}</p>
                      <p>Price: ₹{course.price}</p>
                      <p>Submitted: {new Date(course.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => approveCourse(course.id)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectCourse(course.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
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
    </div>
  );

  const renderGenericSection = (title: string, description: string) => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
        <p className="text-gray-600">This section is under development and will be available soon.</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "pending":
        return renderPending();
      case "courses":
        return <AdminCoursesTable />;
      case "students":
        return <AdminStudentsTable />;
      case "certificates":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Certificates & Awards</h1>
              <p className="text-gray-600 mt-1">Manage certificates and preview award animations</p>
            </div>
            <CertificatesTabs />
          </div>
        );
      case "analytics":
        return <AdminAnalyticsDashboard />;
      case "payments":
        return <AdminPaymentsTable />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">SkillUP!!</span>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Admin</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      if (item.id === "institutes") {
                        router.push("/admin/institutes");
                      } else {
                        setActiveSection(item.id);
                      }
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {item.id === "pending" && (stats.pendingTeachers + stats.pendingCourses) > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {stats.pendingTeachers + stats.pendingCourses}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Admin User</p>
              <p className="text-sm text-gray-500">Administrator</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-6 h-6" />
                {(stats.pendingTeachers + stats.pendingCourses) > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {stats.pendingTeachers + stats.pendingCourses}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}