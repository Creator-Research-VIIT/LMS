"use client"

import { Award, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const awards = [
  {
    year: "2024",
    title: "Best Online Learning Platform 2024",
    org: "Education Excellence Awards",
    description: "Recognized for outstanding innovation in digital education",
    icon: <Award className="w-8 h-8 text-pink-600" />,
  },
  {
    year: "2024",
    title: "Top EdTech Company",
    org: "Global EdTech Awards",
    description: "Celebrated for leadership in technology-driven education",
    icon: <Award className="w-8 h-8 text-purple-600" />,
  },
  {
    year: "2023",
    title: "Excellence in Course Quality",
    org: "Learning Impact Awards",
    description: "Acknowledged for exceptional course content and delivery",
    icon: <Award className="w-8 h-8 text-yellow-600" />,
  },
  {
    year: "2023",
    title: "Student Choice Award",
    org: "National Student Awards",
    description: "Voted as the most trusted platform by students",
    icon: <Award className="w-8 h-8 text-red-600" />,
  },
  {
    year: "2024",
    title: "Innovation in AI Learning",
    org: "AI in Education Summit",
    description: "Recognized for advancing AI-powered learning experiences",
    icon: <Award className="w-8 h-8 text-blue-600" />,
  },
  {
    year: "2023",
    title: "Best Corporate Training Platform",
    org: "Corporate Learning Awards",
    description: "Honored for excellence in workplace training solutions",
    icon: <Award className="w-8 h-8 text-green-600" />,
  },
]

export function AwardsSection() {
  const [current, setCurrent] = useState(0)

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? awards.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev === awards.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Award-Winning Excellence
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Our commitment to educational excellence has been recognized by leading industry organizations
        </p>

        {/* Main Carousel */}
        <div className="relative bg-white rounded-2xl shadow-xl p-10">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-full p-4 shadow-lg">
              {awards[current].icon}
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">
            {awards[current].title}
          </h3>
          <p className="text-gray-500 mt-2">{awards[current].org}</p>
          <p className="text-red-500 font-semibold">{awards[current].year}</p>
          <p className="text-gray-600 mt-4">{awards[current].description}</p>

          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow hover:bg-gray-700"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow hover:bg-gray-700"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-12">
          {awards.map((award, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`cursor-pointer p-4 rounded-xl shadow-md transition ${
                current === index
                  ? "bg-blue-100 border-2 border-blue-500"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-center mb-2">{award.icon}</div>
              <p className="text-sm font-medium text-gray-700">{award.year}</p>
              <p className="text-xs text-gray-500">{award.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}