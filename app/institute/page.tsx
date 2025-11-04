'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  Bell,
  Plus,
  Search,
  Star,
  Clock,
  Award,
  DollarSign,
  FileText,
  Play,
  ExternalLink,
  Calendar,
  ChevronRight,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  rating: number;
  students: number;
  price: number;
  originalPrice?: number;
  duration: string;
  image: string;
  type: 'internal' | 'external';
  status?: 'approved' | 'pending' | 'rejected';
  progress?: number;
  isPopular?: boolean;
  isNew?: boolean;
  institution?: string;
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'info' | 'warning' | 'success' | 'low' | 'medium' | 'high';
  priority: 'low' | 'medium' | 'high';
}

export default function InstituteMainPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAgreement, setShowAgreement] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dashboardData, setDashboardData] = useState<{
    stats: any;
    courses: Course[];
    announcements: Announcement[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/institute');
    }
  }, [status, router]);

  // Fetch dashboard data
  useEffect(() => {
    if (session) {
      fetchDashboardData();
    }
  }, [session]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/institute/dashboard');
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      } else {
        console.error('Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking authentication or fetching data
  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render page if not authenticated
  if (!session) {
    return null;
  }

  // Helper function to get priority color
  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'bg-red-500';
    if (priority === 'medium') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Use data from API or fallback to defaults
  const stats = dashboardData?.stats ? [
    { 
      title: 'Total Students', 
      value: dashboardData.stats.totalStudents.toLocaleString(), 
      icon: Users, 
      change: '+12.5%', 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50' 
    },
    { 
      title: 'Active Courses', 
      value: dashboardData.stats.activeCourses.toString(), 
      icon: BookOpen, 
      change: '+8.2%', 
      color: 'text-emerald-600', 
      bgColor: 'bg-emerald-50' 
    },
    { 
      title: 'Monthly Revenue', 
      value: `$${dashboardData.stats.monthlyRevenue.toLocaleString()}`, 
      icon: DollarSign, 
      change: '+23.1%', 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-50' 
    },
    { 
      title: 'Completion Rate', 
      value: `${dashboardData.stats.completionRate}%`, 
      icon: Award, 
      change: '-2.1%', 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-50' 
    },
  ] : [
    { title: 'Total Students', value: '0', icon: Users, change: '+0%', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { title: 'Active Courses', value: '0', icon: BookOpen, change: '+0%', color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { title: 'Monthly Revenue', value: '$0', icon: DollarSign, change: '+0%', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { title: 'Completion Rate', value: '0%', icon: Award, change: '+0%', color: 'text-orange-600', bgColor: 'bg-orange-50' },
  ];

  const courses: Course[] = dashboardData?.courses || [];

  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'New Course Partnership',
      message: "We've partnered with Tech University to bring you 5 new advanced programming courses.",
      date: '12/10/2024',
      type: 'info',
      priority: 'high'
    },
    {
      id: '2',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on Dec 15th from 2-4 AM EST. Some features may be temporarily unavailable.',
      date: '12/8/2024',
      type: 'warning',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Course Completion Certificates',
      message: 'Digital certificates are now available for all completed courses.',
      date: '12/3/2024',
      type: 'success',
      priority: 'low'
    },
    {
      id: '4',
      title: 'Holiday Schedule',
      message: 'Support hours will be reduced during the holiday season. Check our support page for details.',
      date: '12/3/2024',
      type: 'info',
      priority: 'medium'
    },
    {
      id: '5',
      title: 'New Agreement Template',
      message: 'Updated course access agreement template is now available for external partnerships.',
      date: '12/1/2024',
      type: 'info',
      priority: 'low'
    }
  ];

  const recentEnrollments = [
    { name: 'Alice Johnson', course: 'Web Development Bootcamp', time: '2 hours ago', avatar: 'AJ' },
    { name: 'Bob Smith', course: 'Machine Learning Fundamentals', time: '4 hours ago', avatar: 'BS' },
    { name: 'Carol Davis', course: 'UI/UX Design Principles', time: '6 hours ago', avatar: 'CD' },
    { name: 'David Wilson', course: 'Digital Marketing Mastery', time: '8 hours ago', avatar: 'DW' },
    { name: 'Emma Brown', course: 'Python for Data Analysis', time: '1 day ago', avatar: 'EB' }
  ];

  const topPerformingCourses = [
    { title: 'Web Development Bootcamp', students: 1247, rating: 4.8, completion: 89 },
    { title: 'Machine Learning Fundamentals', students: 856, rating: 4.9, completion: 92 },
    { title: 'Digital Marketing Mastery', students: 1523, rating: 4.7, completion: 85 }
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderHeader = () => (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EduInstitute</h1>
                <p className="text-xs text-gray-500">Learning Management System</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { id: 'courses', label: 'Courses' },
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'analytics', label: 'Analytics' },
                { id: 'agreements', label: 'Agreements' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === item.id 
                      ? 'text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <a 
                href="/dashboard"
                className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
              >
                ← Back to LMS
              </a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search courses, instructors..."
                className="pl-10 w-80 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                3
              </Badge>
            </Button>
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {session.user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-500">
                  {session.user?.role || 'Member'}
                </p>
              </div>
              <Avatar>
                <AvatarImage src={session.user?.image || ""} />
                <AvatarFallback>
                  {session.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                👋 Welcome to EduInstitute
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Empowering Education Through{' '}
              <span className="text-blue-600">Digital Learning</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Access premium courses from internal faculty and external partner institutions. 
              Manage your learning journey with our comprehensive LMS platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Play className="h-5 w-5 mr-2" />
                Explore Courses
              </Button>
              <Button size="lg" variant="outline" onClick={() => setActiveTab('dashboard')}>
                View Dashboard
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Course Management</h3>
                    <p className="text-sm text-gray-600">Access both internal and external courses through formal partnership agreements.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Activity className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Student Analytics</h3>
                    <p className="text-sm text-gray-600">Track progress, completion rates, and performance metrics across all courses.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Digital Agreements</h3>
                    <p className="text-sm text-gray-600">Streamlined partnership agreements with external educators and institutions.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <Badge variant={stat.change.startsWith('+') ? 'default' : 'destructive'} className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-xs text-gray-500 mt-1">vs last month</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="h-24 flex flex-col gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200" 
              variant="outline"
            >
              <Plus className="h-6 w-6" />
              <span className="font-medium">Upload New Course</span>
            </Button>
            <Button 
              className="h-24 flex flex-col gap-2 bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200" 
              variant="outline"
              onClick={() => setShowAgreement(true)}
            >
              <FileText className="h-6 w-6" />
              <span className="font-medium">Course Access Agreement</span>
            </Button>
            <Button 
              className="h-24 flex flex-col gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200" 
              variant="outline"
              onClick={() => setActiveTab('analytics')}
            >
              <BarChart3 className="h-6 w-6" />
              <span className="font-medium">View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-8">
      {/* Course Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Catalog</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover courses from our internal faculty and external partner institutions
        </p>
      </div>

      {/* My Learning Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Learning</h2>
          <Button variant="outline" size="sm">
            View All Progress
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {courses.filter(c => c.progress).slice(0, 2).map((course) => (
            <Card key={course.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {course.isPopular && (
                    <Badge className="bg-orange-500 hover:bg-orange-500">Popular</Badge>
                  )}
                  <Badge variant={course.type === 'internal' ? 'default' : 'secondary'}>
                    {course.type === 'internal' ? 'Internal' : 'External'}
                  </Badge>
                </div>
                {course.type === 'external' && (
                  <ExternalLink className="absolute top-3 right-3 h-5 w-5 text-white" />
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2 line-clamp-1">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  by {course.instructor}
                  {course.institution && (
                    <span className="text-emerald-600"> • {course.institution}</span>
                  )}
                </p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span className="font-medium text-blue-600">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      {course.rating}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">
                  Continue
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search courses, instructors, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">All Categories</Button>
          <Button variant="outline" size="sm">All Levels</Button>
          <Button variant="outline" size="sm">Latest</Button>
        </div>
      </div>

      {/* Course Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="all" className="data-[state=active]:bg-white">
            All Courses ({filteredCourses.length})
          </TabsTrigger>
          <TabsTrigger value="internal" className="data-[state=active]:bg-white">
            Internal ({filteredCourses.filter(c => c.type === 'internal').length})
          </TabsTrigger>
          <TabsTrigger value="external" className="data-[state=active]:bg-white">
            External ({filteredCourses.filter(c => c.type === 'external').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="border-0 shadow-sm hover:shadow-lg transition-all duration-200 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {course.isNew && (
                      <Badge className="bg-red-500 hover:bg-red-500">New</Badge>
                    )}
                    {course.isPopular && (
                      <Badge className="bg-orange-500 hover:bg-orange-500">Popular</Badge>
                    )}
                    <Badge variant={course.type === 'internal' ? 'default' : 'secondary'}>
                      {course.type === 'internal' ? 'Internal' : 'External'}
                    </Badge>
                  </div>
                  {course.type === 'external' && (
                    <ExternalLink className="absolute top-3 right-3 h-5 w-5 text-white" />
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    by {course.instructor}
                    {course.institution && (
                      <span className="text-emerald-600"> • {course.institution}</span>
                    )}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      {course.rating}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">${course.price}</span>
                      {course.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
                      )}
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      {course.progress ? 'Continue' : 'Enroll Now'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="internal" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.filter(c => c.type === 'internal').map((course) => (
              <Card key={course.id} className="border-0 shadow-sm hover:shadow-lg transition-all duration-200 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {course.isNew && (
                      <Badge className="bg-red-500 hover:bg-red-500">New</Badge>
                    )}
                    {course.isPopular && (
                      <Badge className="bg-orange-500 hover:bg-orange-500">Popular</Badge>
                    )}
                    <Badge variant="default">Internal</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      {course.rating}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">${course.price}</span>
                      {course.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
                      )}
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      {course.progress ? 'Continue' : 'Enroll Now'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="external" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.filter(c => c.type === 'external').map((course) => (
              <Card key={course.id} className="border-0 shadow-sm hover:shadow-lg transition-all duration-200 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {course.isNew && (
                      <Badge className="bg-red-500 hover:bg-red-500">New</Badge>
                    )}
                    {course.isPopular && (
                      <Badge className="bg-orange-500 hover:bg-orange-500">Popular</Badge>
                    )}
                    <Badge variant="secondary">External</Badge>
                  </div>
                  <ExternalLink className="absolute top-3 right-3 h-5 w-5 text-white" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    by {course.instructor}
                    {course.institution && (
                      <span className="text-emerald-600"> • {course.institution}</span>
                    )}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      {course.rating}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">${course.price}</span>
                      {course.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
                      )}
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      {course.progress ? 'Continue' : 'Enroll Now'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Institute Dashboard</h1>
        <p className="text-gray-600">Overview of platform performance and key metrics</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                <div className="flex items-center">
                  <Badge variant={stat.change.startsWith('+') ? 'default' : 'destructive'} className="text-xs">
                    {stat.change} vs last month
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Top Performing Courses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {topPerformingCourses.map((course) => (
              <div key={course.title} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{course.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course.students}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        {course.rating}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{course.completion}%</p>
                    <p className="text-sm text-gray-600">Completion</p>
                  </div>
                </div>
                <Progress value={course.completion} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Enrollments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentEnrollments.map((enrollment) => (
              <div key={enrollment.name} className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {enrollment.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{enrollment.name}</p>
                  <p className="text-sm text-gray-600">{enrollment.course}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {enrollment.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <main className="flex-1">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'courses' && renderCourses()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'agreements' && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Digital Agreements</h2>
                <p className="text-gray-600 mb-6">Manage partnership agreements with external educators</p>
                <Button onClick={() => setShowAgreement(true)}>
                  Create New Agreement
                </Button>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="w-80 space-y-6">
            {/* Announcements */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Announcements
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {announcements.slice(0, 4).map((announcement) => (
                  <div key={announcement.id} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(announcement.priority)}`} />
                        <h4 className="font-medium text-sm text-gray-900">{announcement.title}</h4>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {announcement.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 pl-4">{announcement.message}</p>
                    <div className="flex items-center text-xs text-gray-500 pl-4">
                      <Calendar className="h-3 w-3 mr-1" />
                      {announcement.date}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">24</p>
                    <p className="text-sm text-gray-600">Active Courses</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-600">1.2K</p>
                    <p className="text-sm text-gray-600">Students</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">89%</p>
                    <p className="text-sm text-gray-600">Completion</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">4.8</p>
                    <p className="text-sm text-gray-600">Avg Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Updates */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recent Updates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">125 new student enrollments this week</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Payment integration updated</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">New course partnership approved</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {/* Course Access Agreement Modal */}
      {showAgreement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Course Access Agreement</h2>
            <p className="mb-4">Agreement form will be implemented here.</p>
            <button 
              onClick={() => setShowAgreement(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}