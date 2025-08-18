"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Martinez",
    role: "Full Stack Developer",
    company: "Tech Innovations Inc.",
    image: "https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg",
    content:
      "LearnHub completely transformed my career. The hands-on projects and expert instruction helped me transition from marketing to software development in just 8 months.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Data Scientist",
    company: "Analytics Pro",
    image: "https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg",
    content:
      "The data science courses are incredibly comprehensive. I went from knowing basic Excel to building machine learning models. The career support was exceptional.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    company: "Design Studio",
    image: "https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg",
    content:
      "As someone with no design background, I was amazed at how well-structured the UX courses were. The portfolio projects helped me land my dream job.",
    rating: 5,
  },
  {
    name: "Michael Thompson",
    role: "Digital Marketing Manager",
    company: "Growth Marketing Co.",
    image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg",
    content:
      "The marketing courses are taught by actual practitioners, not just theorists. I immediately applied what I learned and saw a 300% increase in campaign performance.",
    rating: 5,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleCount(1)
      else if (window.innerWidth < 1024) setVisibleCount(2)
      else setVisibleCount(3)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const getVisibleTestimonials = () => {
    const visible = []
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % testimonials.length
      visible.push(testimonials[index])
    }
    return visible
  }

  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Hear directly from students who
            advanced their careers with LearnHub.
          </p>
        </div>

        {/* Cards */}
        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getVisibleTestimonials().map((testimonial, index) => (
              <Card
                key={`${testimonial.name}-${index}`}
                className="animate-fade-in-up border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur rounded-2xl"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="p-6">
                  {/* Avatar & Info */}
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary/30 shadow-md mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} @ {testimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground leading-relaxed italic">
                    “{testimonial.content}”
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white/80 backdrop-blur rounded-full p-3 shadow-md hover:bg-white transition"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white/80 backdrop-blur rounded-full p-3 shadow-md hover:bg-white transition"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-primary scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
