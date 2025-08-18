import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Martinez",
    role: "Full Stack Developer",
    company: "Tech Innovations Inc.",
    image: "https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg",
    content: "LearnHub completely transformed my career. The hands-on projects and expert instruction helped me transition from marketing to software development in just 8 months.",
    rating: 5
  },
  {
    name: "David Chen",
    role: "Data Scientist",
    company: "Analytics Pro",
    image: "https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg",
    content: "The data science courses are incredibly comprehensive. I went from knowing basic Excel to building machine learning models. The career support was exceptional.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    company: "Design Studio",
    image: "https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg",
    content: "As someone with no design background, I was amazed at how well-structured the UX courses were. The portfolio projects helped me land my dream job.",
    rating: 5
  },
  {
    name: "Michael Thompson",
    role: "Digital Marketing Manager",
    company: "Growth Marketing Co.",
    image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg",
    content: "The marketing courses are taught by actual practitioners, not just theorists. I immediately applied what I learned and saw a 300% increase in campaign performance.",
    rating: 5
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Success stories from our learners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how professionals like you have transformed their careers with our courses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="h-8 w-8 text-purple-600" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-purple-600">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">4.8/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">50M+</div>
            <div className="text-gray-600">Students Worldwide</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">190K+</div>
            <div className="text-gray-600">Courses Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;