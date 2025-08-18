import React, { useState, useEffect } from 'react';
import { Award, Trophy, Medal, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const awards = [
  {
    title: "Best Online Learning Platform 2024",
    organization: "Education Excellence Awards",
    year: "2024",
    icon: Trophy,
    color: "from-yellow-400 to-orange-500",
    description: "Recognized for outstanding innovation in digital education"
  },
  {
    title: "Top EdTech Company",
    organization: "Tech Innovation Awards",
    year: "2024",
    icon: Award,
    color: "from-blue-400 to-purple-500",
    description: "Leading the transformation of online education"
  },
  {
    title: "Excellence in Course Quality",
    organization: "Global Learning Institute",
    year: "2023",
    icon: Medal,
    color: "from-green-400 to-teal-500",
    description: "Highest rated courses for practical skill development"
  },
  {
    title: "Student Choice Award",
    organization: "Learner's Voice Awards",
    year: "2023",
    icon: Star,
    color: "from-pink-400 to-red-500",
    description: "Voted #1 by millions of satisfied students worldwide"
  },
  {
    title: "Innovation in AI Learning",
    organization: "Future of Education Summit",
    year: "2024",
    icon: Trophy,
    color: "from-indigo-400 to-blue-500",
    description: "Pioneering AI-powered personalized learning experiences"
  },
  {
    title: "Best Corporate Training Platform",
    organization: "Business Education Awards",
    year: "2023",
    icon: Award,
    color: "from-purple-400 to-pink-500",
    description: "Transforming professional development for enterprises"
  }
];

const AwardsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % awards.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % awards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + awards.length) % awards.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Award-Winning Excellence
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our commitment to educational excellence has been recognized by leading industry organizations
          </p>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Slider */}
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {awards.map((award, index) => {
                const Icon = award.icon;
                return (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 text-center">
                      <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${award.color} mb-8 shadow-2xl`}>
                        <Icon className="h-12 w-12 text-white" />
                      </div>
                      
                      <h3 className="text-3xl font-bold text-white mb-4">
                        {award.title}
                      </h3>
                      
                      <div className="text-lg text-gray-300 mb-2">
                        {award.organization}
                      </div>
                      
                      <div className="text-lg font-semibold text-yellow-400 mb-6">
                        {award.year}
                      </div>
                      
                      <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                        {award.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {awards.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Awards Grid - Thumbnail View */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-16">
          {awards.map((award, index) => {
            const Icon = award.icon;
            return (
              <div
                key={index}
                onClick={() => goToSlide(index)}
                className={`cursor-pointer p-4 rounded-lg transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white/20 scale-105 shadow-lg' 
                    : 'bg-white/10 hover:bg-white/15'
                }`}
              >
                <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r ${award.color} flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-white text-center">
                  <div className="text-xs font-semibold mb-1">{award.year}</div>
                  <div className="text-xs text-gray-300 line-clamp-2">{award.title}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;