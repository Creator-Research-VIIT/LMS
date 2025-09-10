"use client";

import PendingTeachers from "@/components/admin/PendingTeachers";
import PendingCoursesWidget from "@/components/admin/PendingCoursesWidget";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Logout
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <div className="bg-white shadow rounded-lg p-6">
              <PendingTeachers />
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <PendingCoursesWidget />
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={() => router.push("/admin/pending-courses")}
            >
              Manage Pending Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}