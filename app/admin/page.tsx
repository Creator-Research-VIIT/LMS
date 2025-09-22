"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Users,
  Award,
  BarChart3,
  Settings,
  Search,
  Bell,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  User,
  GraduationCap,
  DollarSign,
  Star,
  LogOut,
  BookOpenCheck,
  UserCheck
} from "lucide-react";
import { 
  sampleCourses, 
  sampleStats, 
  sampleNotifications, 
  samplePendingTeachers, 
  samplePendingCourses 
} from "./sample-data";

interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  totalCertificates: number;
  pendingTeachers: number;
  pendingCourses: number;
  totalRevenue: number;
  activeUsers: number;
  completionRate: number;
}

interface Course {
  id: string;
  title: string;
  progress: number;
  students: number;
  rating: number;
  status: 'running' | 'upcoming' | 'completed';
}

interface Teacher {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

interface PendingCourse {
  id: string;
  title: string;
  teacher: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalCourses: 0,
    totalCertificates: 0,
    pendingTeachers: 0,
    pendingCourses: 0,
    totalRevenue: 0,
    activeUsers: 0,
    completionRate: 0
  });
  const [courses, setCourses] = useState<Course[]>([]);
  const [pendingTeachers, setPendingTeachers] = useState<Teacher[]>([]);
  const [pendingCourses, setPendingCourses] = useState<PendingCourse[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "students", label: "Students", icon: Users },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard statistics
      const [statsRes, coursesRes, teachersRes, pendingCoursesRes] = await Promise.all([
        fetch('/api/admin/stats').catch(() => null),
        fetch('/api/admin/courses').catch(() => null),
        fetch('/api/teachers/pending').catch(() => null),
        fetch('/api/admin/pending-courses').catch(() => null)
      ]);

      // Use API data or fall back to sample data
      if (statsRes?.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      } else {
        setStats(sampleStats);
      }

      if (coursesRes?.ok) {
        const coursesData = await coursesRes.json();
        setCourses(coursesData.courses || []);
      } else {
        setCourses(sampleCourses);
      }

      if (teachersRes?.ok) {
        const teachersData = await teachersRes.json();
        setPendingTeachers(teachersData.teachers || []);
      } else {
        setPendingTeachers(samplePendingTeachers);
      }

      if (pendingCoursesRes?.ok) {
        const pendingCoursesData = await pendingCoursesRes.json();
        setPendingCourses(pendingCoursesData.courses || []);
      } else {
        setPendingCourses(samplePendingCourses);
      }

      // Set notifications
      setNotifications(sampleNotifications);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // Use all sample data on complete failure
      setStats(sampleStats);
      setCourses(sampleCourses);
      setPendingTeachers(samplePendingTeachers);
      setPendingCourses(samplePendingCourses);
      setNotifications(sampleNotifications);
    }
  };

  const handleTeacherAction = async (teacherId: string, action: 'approve' | 'reject') => {
    try {
      const response = await fetch(`/api/teachers/${teacherId}/${action}`, {
        method: 'POST',
      });
      
      if (response.ok) {
        setPendingTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
        setStats(prev => ({ ...prev, pendingTeachers: prev.pendingTeachers - 1 }));
      }
    } catch (error) {
      console.error(`Failed to ${action} teacher:`, error);
    }
  };

  const handleCourseAction = async (courseId: string, action: 'approve' | 'reject') => {
    try {
      const response = await fetch(`/api/courses/${courseId}/${action}`, {
        method: 'POST',
      });
      
      if (response.ok) {
        setPendingCourses(prev => prev.filter(course => course.id !== courseId));
        setStats(prev => ({ ...prev, pendingCourses: prev.pendingCourses - 1 }));
      }
    } catch (error) {
      console.error(`Failed to ${action} course:`, error);
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome {session?.user?.name || 'Admin'}</h1>
            <p className="text-blue-100 text-lg">Education is the passport to the future, so learn more & more</p>
          </div>
          <div className="hidden md:block">
            <Target className="h-20 w-20 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold">{stats.totalCourses}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Certificates</p>
                <p className="text-2xl font-bold">{stats.totalCertificates}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Running Courses & Pending Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Current Running Courses</CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.slice(0, 4).map((course, index) => {
                  const getBgColor = (idx: number) => {
                    if (idx === 0) return 'bg-blue-100';
                    if (idx === 1) return 'bg-orange-100';
                    if (idx === 2) return 'bg-red-100';
                    return 'bg-cyan-100';
                  };
                  
                  const getTextColor = (idx: number) => {
                    if (idx === 0) return 'text-blue-600';
                    if (idx === 1) return 'text-orange-600';
                    if (idx === 2) return 'text-red-600';
                    return 'text-cyan-600';
                  };

                  return (
                    <Card key={course.id} className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center mb-3">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-3 ${getBgColor(index)}`}>
                            <BookOpen className={`h-5 w-5 ${getTextColor(index)}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm">{course.title}</h3>
                            <p className="text-xs text-gray-500">Course A-Z</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Progress</span>
                            <span className="text-sm font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <div className="flex justify-between items-center pt-2">
                            <span className="text-xs text-gray-500">{course.students} students</span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                              <span className="text-xs">{course.rating}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification, index) => (
                  <div key={`notification-${index}-${notification.slice(0, 10)}`} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-2 w-2 bg-orange-400 rounded-full mt-2"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{notification}</p>
                      <p className="text-xs text-gray-500">12 min ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pending Teachers and Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Pending Teachers
              {stats.pendingTeachers > 0 && (
                <Badge variant="destructive">{stats.pendingTeachers}</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTeachers.slice(0, 3).map((teacher) => (
                <div key={teacher.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{teacher.name}</p>
                      <p className="text-xs text-gray-500">{teacher.email}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleTeacherAction(teacher.id, 'approve')}
                    >
                      <CheckCircle className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleTeacherAction(teacher.id, 'reject')}
                    >
                      <AlertCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
              {pendingTeachers.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No pending teacher applications</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpenCheck className="h-5 w-5" />
              Pending Courses
              {stats.pendingCourses > 0 && (
                <Badge variant="destructive">{stats.pendingCourses}</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingCourses.slice(0, 3).map((course) => (
                <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{course.title}</p>
                      <p className="text-xs text-gray-500">by {course.teacher}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleCourseAction(course.id, 'approve')}
                    >
                      <CheckCircle className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleCourseAction(course.id, 'reject')}
                    >
                      <AlertCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
              {pendingCourses.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No pending course submissions</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "courses":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Courses Management</h2>
            <Card>
              <CardContent className="p-6">
                <p>Course management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case "students":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Students Management</h2>
            <Card>
              <CardContent className="p-6">
                <p>Student management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case "certificates":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Certificates Management</h2>
            <Card>
              <CardContent className="p-6">
                <p>Certificate management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case "analytics":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
            <Card>
              <CardContent className="p-6">
                <p>Analytics and reporting interface will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">System Settings</h2>
            <Card>
              <CardContent className="p-6">
                <p>System settings interface will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">EduAdmin</span>
          </div>
          
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-64 p-6 border-t">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="font-medium text-sm">{session?.user?.name || 'John Doe'}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}