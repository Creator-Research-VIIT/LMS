"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

interface Teacher {
  id: string;
  name: string;
  email: string;
  role: string;
  isApproved: boolean;
  createdAt: string;
  referralCode: string;
}

export default function PendingTeachers() {
  const { user } = useAuth();
  const [pendingTeachers, setPendingTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingTeachers();
  }, []);

  const fetchPendingTeachers = async () => {
    try {
      const response = await fetch("/api/teachers/pending");
      if (!response.ok) {
        throw new Error("Failed to fetch pending teachers");
      }
      const data = await response.json();
      setPendingTeachers(data.teachers);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
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

      // Remove the approved teacher from the list
      setPendingTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to approve teacher");
    }
  };

  if (user?.role !== "ADMIN") {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
        <p className="text-gray-600">You need admin privileges to view this page.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Pending Teacher Approvals</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {pendingTeachers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No pending teacher approvals</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{teacher.name}</h3>
                  <p className="text-gray-600">{teacher.email}</p>
                  <p className="text-sm text-gray-500">
                    Applied: {new Date(teacher.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Referral Code: {teacher.referralCode}
                  </p>
                </div>
                <button
                  onClick={() => approveTeacher(teacher.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 