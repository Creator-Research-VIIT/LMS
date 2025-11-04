// Sample data for student dashboard development and testing

export const sampleStudentStats = {
  totalCourses: 6,
  assignmentsDue: 3,
  studyHours: 24,
  averageGrade: 'A-',
  trends: {
    courses: '+2 from last semester',
    assignments: '2 due this week',
    hours: 'This week',
    grade: '+0.2 from last month'
  }
};

export const sampleCourses = [
  {
    id: '1',
    title: 'Advanced Mathematics',
    description: 'Advanced calculus and mathematical concepts for computer science',
    thumbnail: '/ml-course-thumbnail.png',
    price: 299,
    teacher: {
      name: 'Dr. Smith'
    },
    progress: 75,
    lastAccessed: new Date().toISOString(),
    nextClass: 'Today, 2:00 PM'
  },
  {
    id: '2',
    title: 'Computer Science Fundamentals',
    description: 'Introduction to programming, algorithms, and data structures',
    thumbnail: '/react-course-thumbnail.png',
    price: 199,
    teacher: {
      name: 'Prof. Johnson'
    },
    progress: 60,
    lastAccessed: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    nextClass: 'Tomorrow, 10:00 AM'
  },
  {
    id: '3',
    title: 'Digital Marketing Strategy',
    description: 'Learn modern digital marketing techniques and strategies',
    thumbnail: '/digital-marketing-course-thumbnail.png',
    price: 149,
    teacher: {
      name: 'Sarah Wilson'
    },
    progress: 30,
    lastAccessed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    nextClass: 'Wednesday, 3:00 PM'
  }
];

export const sampleAssignments = [
  {
    id: '1',
    title: 'Math Problem Set 5',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    priority: 'high' as const,
    course: 'Advanced Mathematics'
  },
  {
    id: '2',
    title: 'CS Project Proposal',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
    priority: 'medium' as const,
    course: 'Computer Science Fundamentals'
  },
  {
    id: '3',
    title: 'Marketing Campaign Analysis',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    priority: 'high' as const,
    course: 'Digital Marketing Strategy'
  },
  {
    id: '4',
    title: 'Algorithm Design Exercise',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
    priority: 'low' as const,
    course: 'Computer Science Fundamentals'
  }
];

export const sampleNotifications = [
  {
    id: '1',
    title: 'New assignment posted in Advanced Mathematics',
    content: 'Math Problem Set 5 has been assigned. Due in 2 days.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    type: 'assignment',
    read: false
  },
  {
    id: '2',
    title: 'Course material updated',
    content: 'New lecture notes available for Computer Science Fundamentals.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    type: 'update',
    read: false
  },
  {
    id: '3',
    title: 'Grade posted for Marketing Campaign Analysis',
    content: 'Your grade for the recent assignment has been posted.',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    type: 'grade',
    read: true
  },
  {
    id: '4',
    title: 'Upcoming class reminder',
    content: 'Don\'t forget about your Advanced Mathematics class tomorrow at 2:00 PM.',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    type: 'reminder',
    read: false
  },
  {
    id: '5',
    title: 'Discussion forum activity',
    content: 'New replies in the Computer Science Fundamentals discussion forum.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    type: 'forum',
    read: true
  }
];

// Utility function to get random sample data
export const getRandomCourseProgress = () => Math.floor(Math.random() * 100);
export const getRandomGrade = () => {
  const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'];
  return grades[Math.floor(Math.random() * grades.length)];
};

// Development note: This data can be used to test the dashboard
// when the backend APIs are not available or during development