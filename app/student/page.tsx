"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Bell,
    BookOpen,
    Calendar,
    Clock,
    FileText,
    GraduationCap,
    Home,
    LogOut,
    Search,
    TrendingUp,
    User
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DashboardStats {
  totalCourses: number;
  assignmentsDue: number;
  studyHours: number;
  averageGrade: string;
  trends: {
    courses: string;
    assignments: string;
    hours: string;
    grade: string;
  };
}

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  User: {
    name: string;
  };
  progress: number;
  lastAccessed: string | null;
  nextClass: string;
}

interface ExploreCourse {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  isFree: boolean;
  User: {
    name: string;
  };
  category: string;
  duration: string;
  createdAt: string;
}

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  course: string;
}

interface Notification {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  type: string;
  read: boolean;
}

export default function StudentDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeView, setActiveView] = useState('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [exploreCourses, setExploreCourses] = useState<ExploreCourse[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (activeView === 'dashboard') {
      Promise.all([
        fetchStats(),
        fetchCourses(),
        fetchAssignments(),
        fetchNotifications()
      ]).finally(() => setLoading(false));
    } else if (activeView === 'courses') {
      fetchExploreCourses().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [activeView]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/student/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchCourses = async () => {
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

  const fetchAssignments = async () => {
    try {
      const response = await fetch('/api/student/assignments');
      if (response.ok) {
        const data = await response.json();
        setAssignments(data.assignments || []);
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/student/notifications');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchExploreCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      if (response.ok) {
        const data = await response.json();
        setExploreCourses(data.courses || []);
      }
    } catch (error) {
      console.error('Error fetching explore courses:', error);
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Tomorrow';
    if (diffInDays > 1) return `in ${diffInDays} days`;
    if (diffInDays === -1) return 'Yesterday';
    return `${Math.abs(diffInDays)} days ago`;
  };

  const formatNotificationTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'my-courses', label: 'My Courses', icon: GraduationCap },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">EduLearn</h2>
        </div>
        
        <div className="px-4 py-2">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-medium">
              {session?.user?.name?.[0]?.toUpperCase() || 'S'}
            </div>
          </div>
        </div>
        
        <nav className="px-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-left transition-colors ${
                activeView === item.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center space-x-3 w-full px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeView === 'dashboard' && (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {session?.user?.name?.split(' ')[0] || 'Student'}! 👋
              </h1>
              <p className="text-gray-600">
                Ready to continue your learning journey? Here's what's happening today.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalCourses || 0}</div>
                  <p className="text-xs text-gray-500 mt-1">{stats?.trends.courses}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Assignments Due</CardTitle>
                  <Calendar className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.assignmentsDue || 0}</div>
                  <p className="text-xs text-gray-500 mt-1">{stats?.trends.assignments}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Study Hours</CardTitle>
                  <Clock className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.studyHours || 0}</div>
                  <p className="text-xs text-gray-500 mt-1">{stats?.trends.hours}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Average Grade</CardTitle>
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.averageGrade || 'N/A'}</div>
                  <p className="text-xs text-gray-500 mt-1">{stats?.trends.grade}</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Enrolled Courses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Enrolled Courses
                  </CardTitle>
                  <p className="text-sm text-gray-600">Your current courses and progress</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {courses.slice(0, 2).map((course) => (
                    <div key={course.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{course.title}</h3>
                          <p className="text-sm text-gray-600">{course.User.name}</p>
                        </div>
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{course.nextClass}</span>
                        <Button variant="outline" size="sm">
                          View Course
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Assignments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Assignments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assignments.slice(0, 3).map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{assignment.title}</h4>
                        <p className="text-sm text-gray-600">Due {formatRelativeTime(assignment.dueDate)}</p>
                      </div>
                      <Badge className={`${getPriorityColor(assignment.priority)} border-0`}>
                        {assignment.priority}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Notifications */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{formatNotificationTime(notification.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeView === 'my-courses' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Courses</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-40 object-cover rounded mb-4"
                    />
                    <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                    <p className="text-sm text-gray-500 mb-4">Instructor: {course.User.name}</p>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => router.push(`/courses/${course.id}/enrolled`)}
                    >
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeView === 'assignments' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Assignments</h1>
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{assignment.title}</h3>
                        <p className="text-gray-600">Course: {assignment.course}</p>
                        <p className="text-sm text-gray-500 mt-1">Due {formatRelativeTime(assignment.dueDate)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={`${getPriorityColor(assignment.priority)} border-0`}>
                          {assignment.priority}
                        </Badge>
                        <Button>View Assignment</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeView === 'notifications' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Notifications</h1>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card key={notification.id} className={notification.read ? 'opacity-75' : ''}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{notification.title}</h3>
                        <p className="text-gray-600 mt-1">{notification.content}</p>
                        <p className="text-sm text-gray-500 mt-2">{formatNotificationTime(notification.timestamp)}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeView === 'courses' && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Courses</h1>
              <p className="text-gray-600">
                Discover new courses and expand your knowledge
              </p>
              
              {/* Search Input */}
              <div className="mt-6 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search courses by title, instructor, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }, (_, i) => (
                  <Card key={`skeleton-${i}`} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="w-full h-40 bg-gray-300 rounded mb-4"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded mb-3"></div>
                      <div className="h-3 bg-gray-300 rounded mb-4"></div>
                      <div className="h-10 bg-gray-300 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exploreCourses
                  .filter(course => {
                    if (!searchQuery) return true;
                    const query = searchQuery.toLowerCase();
                    return (
                      course.title.toLowerCase().includes(query) ||
                      course.User.name.toLowerCase().includes(query) ||
                      course.category.toLowerCase().includes(query) ||
                      course.description.toLowerCase().includes(query)
                    );
                  })
                  .map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-40 object-cover rounded mb-4"
                      />
                      <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                      <p className="text-sm text-gray-500 mb-2">Instructor: {course.User.name}</p>
                      <p className="text-sm text-gray-500 mb-4">Category: {course.category}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {course.isFree ? (
                            <Badge className="bg-green-100 text-green-800 border-0">Free</Badge>
                          ) : (
                            <span className="text-lg font-bold text-gray-900">₹{course.price}</span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{course.duration}</span>
                      </div>
                      
                      <Link href={`/courses/${course.id}`} className="block">
                        <Button className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {!loading && exploreCourses.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses available</h3>
                <p className="text-gray-600">Check back later for new courses!</p>
              </div>
            )}
            
            {!loading && exploreCourses.length > 0 && exploreCourses
              .filter(course => {
                if (!searchQuery) return true;
                const query = searchQuery.toLowerCase();
                return (
                  course.title.toLowerCase().includes(query) ||
                  course.User.name.toLowerCase().includes(query) ||
                  course.category.toLowerCase().includes(query) ||
                  course.description.toLowerCase().includes(query)
                );
              }).length === 0 && (
              <div className="text-center py-12">
                <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600">Try adjusting your search terms or browse all courses</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        )}

        {/* Other views */}
        {activeView === 'profile' && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile</h2>
            <p className="text-gray-600">This section is coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
