"use client";

import { signOut } from "next-auth/react";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </button>
      </div>
      <p>Welcome to your dashboard. Your courses and progress will appear here.</p>
    </div>
  );
}
