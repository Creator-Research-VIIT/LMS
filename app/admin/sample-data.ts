// Admin Dashboard Sample Data
// This file provides mock data for the admin dashboard when real data is not available

export const sampleCourses = [
  {
    id: "1",
    title: "UX Software",
    progress: 85,
    students: 2100,
    rating: 4.8,
    status: "running" as const
  },
  {
    id: "2",
    title: "Math Online class",
    progress: 70,
    students: 1800,
    rating: 4.6,
    status: "running" as const
  },
  {
    id: "3",
    title: "Digital Marketing",
    progress: 60,
    students: 3200,
    rating: 4.9,
    status: "running" as const
  },
  {
    id: "4",
    title: "Graphic and visual",
    progress: 90,
    students: 1500,
    rating: 4.7,
    status: "running" as const
  }
];

export const sampleStats = {
  totalStudents: 12500,
  totalCourses: 45,
  totalCertificates: 8900,
  pendingTeachers: 5,
  pendingCourses: 8,
  totalRevenue: 125000,
  activeUsers: 3200,
  completionRate: 78
};

export const sampleNotifications = [
  "You have 5 new messages",
  "3 new course submissions pending approval", 
  "Weekly report is ready",
  "2 new teacher applications",
  "System maintenance scheduled for tonight"
];

export const samplePendingTeachers = [
  {
    id: "t1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@email.com",
    status: "pending" as const,
    submittedAt: "2024-01-15"
  },
  {
    id: "t2", 
    name: "Prof. Michael Chen",
    email: "michael.chen@email.com",
    status: "pending" as const,
    submittedAt: "2024-01-14"
  },
  {
    id: "t3",
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@email.com", 
    status: "pending" as const,
    submittedAt: "2024-01-13"
  }
];

export const samplePendingCourses = [
  {
    id: "c1",
    title: "Advanced React Development",
    teacher: "John Smith",
    submittedAt: "2024-01-15",
    status: "pending" as const
  },
  {
    id: "c2",
    title: "Machine Learning Basics", 
    teacher: "Jane Doe",
    submittedAt: "2024-01-14",
    status: "pending" as const
  },
  {
    id: "c3",
    title: "UI/UX Design Principles",
    teacher: "Alex Johnson",
    submittedAt: "2024-01-13", 
    status: "pending" as const
  }
];