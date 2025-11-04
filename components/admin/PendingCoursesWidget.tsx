"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BookOpen, Clock } from "lucide-react";

interface PendingCourse {
  id: string;
  title: string;
  teacher: {
    name: string;
  };
  createdAt: string;
}

export default function PendingCoursesWidget() {
  const [pendingCourses, setPendingCourses] = useState<PendingCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPendingCourses = async () => {
      try {
        const response = await fetch('/api/courses/pending');
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

    fetchPendingCourses();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Pending Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Pending Courses
          {pendingCourses.length > 0 && (
            <Badge variant="destructive">{pendingCourses.length}</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {pendingCourses.length === 0 ? (
          <p className="text-gray-600">No courses pending approval</p>
        ) : (
          <>
            <div className="space-y-3 mb-4">
              {pendingCourses.slice(0, 3).map((course) => (
                <div key={course.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{course.title}</p>
                    <p className="text-xs text-gray-600">by {course.teacher.name}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Clock className="h-3 w-3" />
                      {new Date(course.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                    Pending
                  </Badge>
                </div>
              ))}
              {pendingCourses.length > 3 && (
                <p className="text-sm text-gray-600">
                  +{pendingCourses.length - 3} more courses pending...
                </p>
              )}
            </div>
            <Button 
              onClick={() => router.push("/admin/pending-courses")}
              className="w-full"
              variant="outline"
            >
              Review All Pending Courses
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
