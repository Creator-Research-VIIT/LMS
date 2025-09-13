"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [price, setPrice] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, desc, category, duration, link, price, thumbnail });
    alert("✅ Course Saved Successfully!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border"
      >
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Add New Course
        </h1>
        <form onSubmit={handleSave} className="space-y-6 font-semibold">
          {/* Course Title */}
          <div>
            <label className="block text-sm font-bold text-gray-800">
              Course Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-xl font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Course Description */}
          <div>
            <label className="block text-sm font-bold text-gray-800">
              Course Description
            </label>
            <textarea
              rows={4}
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-xl font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Category + Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-800">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-xl font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="">Select Category</option>
                <option value="web">Web Development</option>
                <option value="ml">Machine Learning</option>
                <option value="ai">Artificial Intelligence</option>
                <option value="data">Data Science</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800">
                Duration
              </label>
              <input
                type="text"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 6 weeks"
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-xl font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Course Link */}
          <div>
            <label className="block text-sm font-bold text-gray-800">
              Course Link
            </label>
            <input
              type="url"
              required
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://example.com/course"
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-xl font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Course Price */}
          <div>
            <label className="block text-sm font-bold text-gray-800">
              Course Price (₹)
            </label>
            <input
              type="number"
              min="0"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 499"
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-xl font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* File Upload with animation */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Upload Thumbnail
            </label>
            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center w-full h-32 border-2 border-dashed border-purple-400 rounded-xl cursor-pointer hover:bg-purple-50 transition"
            >
              <span className="text-gray-700 font-medium">
                {thumbnail ? thumbnail.name : "Click or Drag & Drop to Upload"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setThumbnail(e.target.files ? e.target.files[0] : null)
                }
                className="hidden"
              />
            </motion.label>
          </div>

          {/* Save button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl shadow-md hover:bg-purple-700 transition"
          >
            Save Course
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
