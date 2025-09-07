"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

export default function TeacherDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnail: "",
    price: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  interface HandleChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {}

  const handleChange = (e: HandleChangeEvent) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  interface CourseForm {
    title: string;
    description: string;
    thumbnail: string;
    price: string;
  }

  interface ApiError {
    error?: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setMessage("Course submitted for approval!");
        setShowForm(false);
        setForm({ title: "", description: "", thumbnail: "", price: "" });
      } else {
        const data: ApiError = await res.json();
        setMessage(data.error || "Failed to submit course");
      }
    } catch {
      setMessage("Failed to submit course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </button>
      </div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6"
        onClick={() => setShowForm(true)}
      >
        Add Course
      </button>
      {message && <div className="mb-4 text-green-700">{message}</div>}
      {showForm && (
        <form className="bg-white p-6 rounded shadow-md max-w-md mx-auto" onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4">Course Details</h2>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-1">Title</label>
            <input type="text" name="title" id="title" value={form.title} onChange={handleChange} className="w-full border px-2 py-1 rounded" required />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-1">Description</label>
            <textarea name="description" id="description" value={form.description} onChange={handleChange} className="w-full border px-2 py-1 rounded" required />
          </div>
          <div className="mb-4">
            <label htmlFor="thumbnail" className="block mb-1">Thumbnail URL</label>
            <input type="text" name="thumbnail" id="thumbnail" value={form.thumbnail} onChange={handleChange} className="w-full border px-2 py-1 rounded" required />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-1">Price</label>
            <input type="number" name="price" id="price" value={form.price} onChange={handleChange} className="w-full border px-2 py-1 rounded" required min="0" step="0.01" />
          </div>
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? "Submitting..." : "Submit for Approval"}
          </button>
          <button type="button" className="ml-2 px-4 py-2 rounded border" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
