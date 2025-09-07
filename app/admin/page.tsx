"use client";

import PendingTeachers from "@/components/admin/PendingTeachers";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import PendingCoursesPage from "../admin/pending-courses/page";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6"
            onClick={() => router.push("/admin/pending-courses")}
          >
            Pending Courses
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mb-6 ml-4"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Logout
          </button>
          <div className="bg-white shadow rounded-lg mb-8">
            <PendingTeachers />
          </div>
          <div className="bg-white shadow rounded-lg">
            <PendingCoursesPage />
          </div>
        </div>
      </div>
    </div>
  );
}