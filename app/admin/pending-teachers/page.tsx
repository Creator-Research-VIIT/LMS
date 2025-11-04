"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function PendingTeachersPage() {
  const [pendingTeachers, setPendingTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPendingTeachers() {
      try {
        const res = await axios.get("/api/teachers/pending");
        setPendingTeachers(res.data.teachers || []);
      } catch (err) {
        setError("Failed to fetch pending teachers.");
      } finally {
        setLoading(false);
      }
    }
    fetchPendingTeachers();
  }, []);

  const handleApprove = async (teacherId: string) => {
    try {
      await axios.patch(`/api/teachers/${teacherId}/approve`);
      setPendingTeachers((prev) => prev.filter((t: any) => t.id !== teacherId));
    } catch (err) {
      alert("Failed to approve teacher.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Pending Teachers</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : pendingTeachers.length === 0 ? (
        <p>No pending teachers found.</p>
      ) : (
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingTeachers.map((teacher: any) => (
              <tr key={teacher.id}>
                <td className="py-2 px-4 border-b">{teacher.name}</td>
                <td className="py-2 px-4 border-b">{teacher.email}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                    onClick={() => handleApprove(teacher.id)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
