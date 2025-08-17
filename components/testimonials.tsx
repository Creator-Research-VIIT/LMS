"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Software Developer",
    image: "/professional-woman-headshot.png",
    rating: 5,
    text: "EduPlatform transformed my career! The React course was incredibly comprehensive and the instructor was always available to help. I landed my dream job just 3 months after completing the program.",
  },
  {
    id: 2,
    name: "David Chen",
    role: "Marketing Manager",
    image: "/professional-man-headshot.png",
    rating: 5,
    text: "The digital marketing course exceeded my expectations. The practical projects and real-world examples helped me implement strategies that increased our company's ROI by 150%.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX Designer",
    image: "/professional-woman-designer-headshot.png",
    rating: 5,
    text: "Amazing platform with top-notch instructors! The UI/UX design course was perfectly structured and the feedback from mentors was invaluable. Highly recommend to anyone looking to upskill.",
  },
  {
    id: 4,
    name: "Michael Johnson",
    role: "Data Scientist",
    image: "/professional-data-scientist.png",
    rating: 5,
    text: "The machine learning course was exactly what I needed to transition into data science. The hands-on projects and industry insights made all the difference in my learning journey.",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Entrepreneur",
    image: "/professional-woman-entrepreneur-headshot.png",
    rating: 5,
    text: "EduPlatform's business courses gave me the confidence and knowledge to start my own company. The practical advice and networking opportunities were game-changers for my entrepreneurial journey.",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
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
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">What Our Students Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our successful students have to say about their learning
            experience
          </p>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getVisibleTestimonials().map((testimonial, index) => (
              <Card
                key={`${testimonial.id}-${currentIndex}`}
                className="animate-fade-in-up border-0 shadow-md hover:shadow-lg transition-shadow duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-accent fill-current" />
                    ))}
                  </div>

                  <p className="text-muted-foreground leading-relaxed">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
