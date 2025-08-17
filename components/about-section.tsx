"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Target, Users, Award, Globe } from "lucide-react"

const slides = [
  {
    image: "/diverse-students-online.png",
    title: "Global Learning Community",
    description: "Connect with learners from around the world and build lasting professional relationships.",
  },
  {
    image: "/online-course-instructors.png",
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of real-world experience and expertise.",
  },
  {
    image: "/modern-online-learning-platform.png",
    title: "Cutting-Edge Platform",
    description: "Experience seamless learning with our state-of-the-art technology and user-friendly interface.",
  },
]

const features = [
  {
    icon: Target,
    title: "Personalized Learning",
    description: "Tailored course recommendations based on your goals and learning style",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join study groups and connect with peers for collaborative learning",
  },
  {
    icon: Award,
    title: "Certified Courses",
    description: "Earn industry-recognized certificates upon course completion",
  },
  {
    icon: Globe,
    title: "24/7 Access",
    description: "Learn at your own pace with unlimited access to course materials",
  },
]

export function AboutSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-slide-in-left">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">About EduPlatform</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We're on a mission to democratize education and make high-quality learning accessible to everyone,
              everywhere. Our platform connects passionate learners with expert instructors to create transformative
              educational experiences.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={feature.title} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              Learn More About Us
            </Button>
          </div>

          <div className="animate-fade-in-up">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="relative h-96">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="font-heading font-semibold text-xl mb-2">{slide.title}</h3>
                      <p className="text-sm opacity-90">{slide.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
