"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Teacher {
  id: string;
  name: string;
  email: string;
}

interface PendingCourse {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  createdAt: string;
  teacher: Teacher;
}

export default function PendingCoursesPage() {
  const [pendingCourses, setPendingCourses] = useState<PendingCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchPendingCourses = async () => {
    try {
      const response = await fetch('/api/admin/pending-courses');
      if (response.ok) {
        const data = await response.json();
        setPendingCourses(data.courses);
      }
    } catch (error) {
      console.error("Error fetching pending courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingCourses();
  }, []);

  const handleApproval = async (courseId: string, action: "APPROVE" | "REJECT") => {
    try {
      const response = await fetch(`/api/courses/approve/${courseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message);
        // Remove the course from pending list
        setPendingCourses(prev => prev.filter(course => course.id !== courseId));
      } else {
        const error = await response.json();
        setMessage(error.message || `Failed to ${action.toLowerCase()} course`);
      }
    } catch (error) {
      console.error(`Error ${action.toLowerCase()}ing course:`, error);
      setMessage(`An error occurred while ${action.toLowerCase()}ing the course`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-6">Pending Courses for Approval</h1>
        <p>Loading pending courses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Pending Courses for Approval</h1>
      
      {message && (
        <div className={`p-4 mb-6 rounded-lg ${
          message.includes('successfully') || message.includes('approved') 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}

      {pendingCourses.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600">No courses pending approval at this time.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {pendingCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                    <Badge variant="secondary" className="mb-2">
                      Pending Approval
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => handleApproval(course.id, "APPROVE")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Approve
                    </Button>
                    <Button 
                      onClick={() => handleApproval(course.id, "REJECT")}
                      variant="destructive"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Course Details</h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    
                    <div className="space-y-2">
                      <p><span className="font-medium">Price:</span> ${course.price}</p>
                      <p><span className="font-medium">Submitted:</span> {new Date(course.createdAt).toLocaleDateString()}</p>
                      <p><span className="font-medium">Teacher:</span> {course.teacher.name}</p>
                      <p><span className="font-medium">Teacher Email:</span> {course.teacher.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Course Thumbnail</h3>
                    {course.thumbnail ? (
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-40 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.jpg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">No thumbnail provided</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
