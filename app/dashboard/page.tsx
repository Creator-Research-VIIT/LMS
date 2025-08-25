"use client";

import { signOut } from "next-auth/react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">LMS Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => signOut({ callbackUrl: "/login" })} // redirects to login page after logout
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to your Dashboard</h3>
              <p className="text-gray-500">Your courses and progress will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
