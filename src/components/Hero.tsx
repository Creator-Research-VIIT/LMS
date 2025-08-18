import React from 'react';
import { Play, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transform your career with 
                <span className="text-purple-600"> expert-led</span> courses
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Master in-demand skills with our comprehensive learning platform. 
                Join millions of learners advancing their careers through hands-on education.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center px-8 py-4 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Start Learning Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              
              <button className="inline-flex items-center px-8 py-4 bg-white text-purple-600 text-lg font-semibold rounded-lg border-2 border-purple-600 hover:bg-purple-50 transition-all duration-300">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50M+</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">190K+</div>
                <div className="text-sm text-gray-600">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">75K+</div>
                <div className="text-sm text-gray-600">Instructors</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg"
                alt="Online Learning"
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="absolute -bottom-4 -left-4 bg-purple-600 text-white p-4 rounded-lg shadow-lg">
                <div className="text-sm font-semibold">Course Progress</div>
                <div className="text-2xl font-bold">87%</div>
              </div>
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg">
                <Play className="h-6 w-6" />
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-1/4 -left-8 bg-blue-500 text-white p-3 rounded-lg shadow-lg animate-bounce">
              <div className="text-sm font-semibold">AI-Powered</div>
            </div>
            
            <div className="absolute bottom-1/4 -right-8 bg-orange-500 text-white p-3 rounded-lg shadow-lg animate-pulse">
              <div className="text-sm font-semibold">Certificate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;